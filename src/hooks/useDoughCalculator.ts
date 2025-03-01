import { useState, useEffect } from 'react';
import { DoughCalculatorInputs, DoughRecipe, PrefermentType, YeastType, CustomPizzaTemplate } from '../types';
import { 
  calculateDoughRecipe, 
  PIZZA_STYLES, 
  calculateDoughBallWeight,
  calculateThicknessFactor,
  cmToInches,
  inchesToCm
} from '../utils/doughCalculator';
import { 
  trackPizzaStyleChange, 
  trackPrefermentTypeChange, 
  trackYeastTypeChange, 
  trackUnitChange,
  trackReset,
  trackRecipeGenerated,
  trackTemplateSaved,
  trackTemplateApplied,
  trackTemplateDeleted,
  trackShapeToggled,
  trackRecipeAdjustment,
  trackCustomTemplateStats
} from '../utils/analytics';
import { getTemplates, addTemplate, deleteTemplate, applyTemplate } from '../utils/templateUtils';

// Update default thickness factors based on the new calculation method
// These values represent the thickness factor in ounces per square inch
const DEFAULT_INPUTS: DoughCalculatorInputs = {
  numberOfPizzas: 1,
  ballWeight: 250,
  pizzaStyle: 'neapolitan',
  hydration: 65,
  salt: 2.8,
  yeast: 0.05,
  yeastType: 'instant',
  oil: 0,
  sugar: 0,
  diastaticMalt: 0.05,
  doughEnhancer: 0,
  thicknessFactor: 0.06,
  pizzaDiameter: 30,
  panWidth: 30,
  panLength: 40,
  preferment: {
    type: 'none',
    percentage: 30,
    hydration: 100
  },
  useInches: false,
  isRectangular: false
};

export const useDoughCalculator = () => {
  const [inputs, setInputs] = useState<DoughCalculatorInputs>(DEFAULT_INPUTS);
  const [recipe, setRecipe] = useState<DoughRecipe | null>(null);
  const [templates, setTemplates] = useState<CustomPizzaTemplate[]>([]);

  // Load templates on initial render
  useEffect(() => {
    const savedTemplates = getTemplates();
    setTemplates(savedTemplates);
    
    // Track template statistics
    trackCustomTemplateStats();
  }, []);

  // Update recipe whenever inputs change
  useEffect(() => {
    const newRecipe = calculateDoughRecipe(inputs);
    setRecipe(newRecipe);
    
    // Track recipe generation (debounced to avoid excessive events)
    const timer = setTimeout(() => {
      trackRecipeGenerated(
        inputs.pizzaStyle,
        inputs.numberOfPizzas,
        inputs.hydration,
        inputs.preferment.type,
        inputs.salt,
        inputs.yeast,
        inputs.yeastType,
        inputs.oil,
        inputs.sugar,
        inputs.diastaticMalt,
        inputs.doughEnhancer,
        inputs.isRectangular,
        inputs.ballWeight
      );
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [inputs]);

  // Handle input changes
  const handleInputChange = (name: string, value: string | number) => {
    // Track significant adjustments for key parameters
    const significantParameters = ['hydration', 'salt', 'yeast', 'oil', 'sugar', 'diastaticMalt', 'doughEnhancer'];
    if (significantParameters.includes(name)) {
      const oldValue = inputs[name as keyof DoughCalculatorInputs];
      // Only track if the change is significant (more than 5% difference for percentages)
      if (typeof oldValue === 'number' && typeof value === 'number' && 
          Math.abs(oldValue - value) > (oldValue * 0.05)) {
        trackRecipeAdjustment(name, oldValue, value, inputs.pizzaStyle);
      }
    }
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., preferment.percentage)
      const [parent, child] = name.split('.');
      setInputs((prevInputs) => {
        const parentObj = prevInputs[parent as keyof DoughCalculatorInputs];
        if (typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...prevInputs,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          };
        }
        return prevInputs;
      });
    } else {
      // Handle direct properties
      setInputs((prevInputs) => {
        const newInputs = {
          ...prevInputs,
          [name]: value
        };

        // If ballWeight changes, recalculate thickness factor
        if (name === 'ballWeight') {
          const ballWeight = Number(value);
          const { pizzaStyle, pizzaDiameter, panWidth, panLength, useInches } = newInputs;
          const selectedStyle = PIZZA_STYLES.find(style => style.id === pizzaStyle);
          const isRectangular = selectedStyle?.isRectangular;

          if ((isRectangular === true || isRectangular === 'both') && panWidth && panLength) {
            newInputs.thicknessFactor = calculateThicknessFactor(
              ballWeight,
              pizzaDiameter,
              isRectangular,
              panWidth,
              panLength,
              useInches
            );
          } else {
            newInputs.thicknessFactor = calculateThicknessFactor(
              ballWeight,
              pizzaDiameter,
              false,
              undefined,
              undefined,
              useInches
            );
          }
        }

        return newInputs;
      });
    }
  };

  // Handle pizza style selection
  const handlePizzaStyleChange = (styleId: string) => {
    const selectedStyle = PIZZA_STYLES.find(style => style.id === styleId);
    
    if (selectedStyle) {
      // Recalculate ball weight based on the new style
      let newBallWeight: number;
      
      if (selectedStyle.isRectangular === true) {
        // For rectangular pizzas
        newBallWeight = calculateDoughBallWeight(
          styleId,
          0, // diameter not used for rectangular
          inputs.panWidth,
          inputs.panLength,
          selectedStyle.defaultThicknessFactor
        );
      } else if (selectedStyle.isRectangular === 'both') {
        // For styles that can be either shape (like Focaccia)
        // Default to round unless pan dimensions are already set
        if (inputs.panWidth && inputs.panLength) {
          newBallWeight = calculateDoughBallWeight(
            styleId,
            0,
            inputs.panWidth,
            inputs.panLength,
            selectedStyle.defaultThicknessFactor
          );
        } else {
          newBallWeight = calculateDoughBallWeight(
            styleId,
            inputs.pizzaDiameter,
            undefined,
            undefined,
            selectedStyle.defaultThicknessFactor
          );
        }
      } else {
        // For round pizzas
        newBallWeight = calculateDoughBallWeight(
          styleId,
          inputs.pizzaDiameter,
          undefined,
          undefined,
          selectedStyle.defaultThicknessFactor
        );
      }
      
      // Set style-specific default values
      let oil = 0;
      let sugar = 0;
      let salt = 2.5;
      let yeast = 0.5;
      let diastaticMalt = 0.5;
      let doughEnhancer = 0.5;
      
      // Set values based on pizza style
      switch (styleId) {
        case 'neapolitan':
          oil = 0;
          sugar = 0;
          salt = 2.8; // 2.5-3%
          yeast = 0.05; // 0.03-0.06% for instant dry
          diastaticMalt = 0.05; // 0-0.1%
          doughEnhancer = 0; // 0%
          break;
        case 'ny':
          oil = 2; // 1-3%
          sugar = 1.5; // 1-2%
          salt = 2.25; // 2-2.5%
          yeast = 0.4; // 0.3-0.5%
          diastaticMalt = 0.75; // 0.5-1%
          doughEnhancer = 0.4; // 0.25-0.5%
          break;
        case 'sicilian':
          oil = 3.5; // 2-5%
          sugar = 2; // 1-3%
          salt = 2.25; // 2-2.5%
          yeast = 0.5; // 0.4-0.6%
          diastaticMalt = 0.4; // 0.25-0.5%
          doughEnhancer = 0.4; // 0.25-0.5%
          break;
        case 'detroit':
          oil = 4; // 3-5%
          sugar = 1.5; // 1-2%
          salt = 2.25; // 2-2.5%
          yeast = 0.5; // 0.4-0.6%
          diastaticMalt = 0.75; // 0.5-1%
          doughEnhancer = 0.5; // 0.25-0.75%
          break;
        case 'focaccia':
          oil = 6; // 4-8%
          sugar = 0.5; // 0-1%
          salt = 2.5; // 2-3%
          yeast = 0.4; // 0.3-0.5%
          diastaticMalt = 0.4; // 0.25-0.5%
          doughEnhancer = 0.1; // 0-0.25%
          break;
        case 'custom':
          // Keep current values or use defaults
          oil = inputs.oil;
          sugar = inputs.sugar;
          salt = inputs.salt;
          yeast = inputs.yeast;
          diastaticMalt = inputs.diastaticMalt;
          doughEnhancer = inputs.doughEnhancer;
          break;
      }
      
      setInputs(prev => ({
        ...prev,
        pizzaStyle: styleId,
        hydration: selectedStyle.defaultHydration,
        thicknessFactor: selectedStyle.defaultThicknessFactor,
        ballWeight: newBallWeight,
        isRectangular: selectedStyle.isRectangular === true,
        oil,
        sugar,
        salt,
        yeast,
        diastaticMalt,
        doughEnhancer
      }));
      
      // Track the pizza style change
      trackPizzaStyleChange(styleId);
    }
  };

  // Handle shape toggle for custom style
  const handleShapeToggle = (isRectangular: boolean) => {
    setInputs(prev => {
      // Preserve all existing values
      const newInputs = { ...prev, isRectangular };
      
      if (isRectangular) {
        // Set to rectangular shape
        newInputs.panWidth = prev.panWidth || 25;
        newInputs.panLength = prev.panLength || 35;
        
        // Ensure thickness factor is not zero
        const thicknessFactor = prev.thicknessFactor || 0.08; // Default to medium thickness if zero
        
        // Recalculate ball weight
        newInputs.ballWeight = calculateDoughBallWeight(
          prev.pizzaStyle,
          0,
          newInputs.panWidth,
          newInputs.panLength,
          thicknessFactor,
          prev.useInches
        );
        
        // Ensure ball weight is not zero
        if (newInputs.ballWeight <= 0) {
          newInputs.ballWeight = prev.ballWeight || 250; // Keep previous value or use default
        }
      } else {
        // Set to round shape
        newInputs.pizzaDiameter = prev.pizzaDiameter || 30;
        
        // Ensure thickness factor is not zero
        const thicknessFactor = prev.thicknessFactor || 0.08; // Default to medium thickness if zero
        
        // Recalculate ball weight
        newInputs.ballWeight = calculateDoughBallWeight(
          prev.pizzaStyle,
          newInputs.pizzaDiameter,
          undefined,
          undefined,
          thicknessFactor,
          prev.useInches
        );
        
        // Ensure ball weight is not zero
        if (newInputs.ballWeight <= 0) {
          newInputs.ballWeight = prev.ballWeight || 250; // Keep previous value or use default
        }
      }
      
      // Track shape toggle
      trackShapeToggled(isRectangular ? 'rectangular' : 'round');
      
      return newInputs;
    });
  };

  // Handle saving a template
  const handleSaveTemplate = (name: string) => {
    const newTemplate = addTemplate(name, inputs);
    setTemplates(prev => [...prev, newTemplate]);
    trackTemplateSaved(name, inputs);
    return newTemplate;
  };

  // Handle applying a template
  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newInputs = applyTemplate(template, inputs);
      
      // Ensure proper dimensions are set based on shape
      if (template.isRectangular) {
        // For rectangular pizzas, ensure pan dimensions are set
        if (!newInputs.panWidth || !newInputs.panLength) {
          newInputs.panWidth = 25;
          newInputs.panLength = 35;
        }
      } else {
        // For round pizzas, ensure diameter is set
        if (!newInputs.pizzaDiameter) {
          newInputs.pizzaDiameter = 30;
        }
      }
      
      setInputs(newInputs);
      trackTemplateApplied(template.name, template);
    }
  };

  // Handle deleting a template
  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      deleteTemplate(templateId);
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      trackTemplateDeleted(template.name);
    }
  };

  // Handle pizza diameter change
  const handlePizzaDiameterChange = (diameter: number) => {
    setInputs((prevInputs) => {
      const newInputs = {
        ...prevInputs,
        pizzaDiameter: diameter
      };

      // Recalculate ball weight based on new diameter and thickness factor
      const { pizzaStyle, thicknessFactor, useInches } = newInputs;
      newInputs.ballWeight = calculateDoughBallWeight(
        pizzaStyle,
        diameter,
        undefined,
        undefined,
        thicknessFactor,
        useInches
      );

      return newInputs;
    });
  };

  // Handle thickness factor change
  const handleThicknessFactorChange = (factor: number) => {
    setInputs((prevInputs) => {
      const newInputs = {
        ...prevInputs,
        thicknessFactor: factor
      };

      // Recalculate ball weight based on new thickness factor
      const { pizzaStyle, pizzaDiameter, panWidth, panLength, useInches } = newInputs;
      const selectedStyle = PIZZA_STYLES.find(style => style.id === pizzaStyle);
      const isRectangular = selectedStyle?.isRectangular;

      if ((isRectangular === true || isRectangular === 'both') && panWidth && panLength) {
        newInputs.ballWeight = calculateDoughBallWeight(
          pizzaStyle,
          pizzaDiameter,
          panWidth,
          panLength,
          factor,
          useInches
        );
      } else {
        newInputs.ballWeight = calculateDoughBallWeight(
          pizzaStyle,
          pizzaDiameter,
          undefined,
          undefined,
          factor,
          useInches
        );
      }

      return newInputs;
    });
  };

  // Handle pan dimensions change
  const handlePanDimensionsChange = (width: number, length: number) => {
    setInputs((prevInputs) => {
      const newInputs = {
        ...prevInputs,
        panWidth: width,
        panLength: length
      };

      // Recalculate ball weight based on new pan dimensions
      const { pizzaStyle, thicknessFactor, useInches } = newInputs;
      newInputs.ballWeight = calculateDoughBallWeight(
        pizzaStyle,
        0, // Not used for rectangular pizzas
        width,
        length,
        thicknessFactor,
        useInches
      );

      return newInputs;
    });
  };

  // Handle useInches toggle
  const handleUseInchesChange = (useInches: boolean) => {
    setInputs((prevInputs) => {
      const newInputs = {
        ...prevInputs,
        useInches
      };

      // Convert measurements if needed
      if (useInches !== prevInputs.useInches) {
        if (useInches) {
          // Convert from cm to inches
          newInputs.pizzaDiameter = cmToInches(prevInputs.pizzaDiameter);
          if (prevInputs.panWidth) newInputs.panWidth = cmToInches(prevInputs.panWidth);
          if (prevInputs.panLength) newInputs.panLength = cmToInches(prevInputs.panLength);
        } else {
          // Convert from inches to cm
          newInputs.pizzaDiameter = inchesToCm(prevInputs.pizzaDiameter);
          if (prevInputs.panWidth) newInputs.panWidth = inchesToCm(prevInputs.panWidth);
          if (prevInputs.panLength) newInputs.panLength = inchesToCm(prevInputs.panLength);
        }
      }
      
      // Track the unit change
      trackUnitChange(useInches);
      
      return newInputs;
    });
  };

  // Handle preferment type change
  const handlePrefermentTypeChange = (type: PrefermentType) => {
    setInputs(prev => {
      // Set default values based on preferment type
      let percentage = prev.preferment.percentage;
      let hydration = prev.preferment.hydration;
      let yeast = prev.yeast;
      
      if (type === 'none') {
        percentage = 0;
        hydration = 100;
        yeast = 0.5;
      } else if (type === 'poolish') {
        percentage = percentage || 30;
        hydration = 100;
        yeast = 0.3;
      } else if (type === 'biga') {
        percentage = percentage || 30;
        hydration = 60;
        yeast = 0.3;
      } else if (type === 'sponge') {
        percentage = percentage || 50;
        hydration = 75;
        yeast = 0.4;
      } else if (type === 'sourdough') {
        percentage = percentage || 20;
        hydration = 100;
        yeast = 0; // No commercial yeast for sourdough
      }
      
      const newInputs = {
        ...prev,
        yeast,
        preferment: {
          type,
          percentage,
          hydration
        }
      };
      
      // Track the preferment type change
      trackPrefermentTypeChange(type);
      
      return newInputs;
    });
  };

  // Handle preferment percentage change
  const handlePrefermentPercentageChange = (percentage: number) => {
    setInputs(prev => ({
      ...prev,
      preferment: {
        ...prev.preferment,
        percentage
      }
    }));
  };

  // Handle preferment hydration change
  const handlePrefermentHydrationChange = (hydration: number) => {
    setInputs(prev => ({
      ...prev,
      preferment: {
        ...prev.preferment,
        hydration
      }
    }));
  };

  // Handle yeast type change
  const handleYeastTypeChange = (yeastType: YeastType) => {
    setInputs(prev => {
      const newInputs = {
        ...prev,
        yeastType: yeastType
      };
      
      // Track the yeast type change
      trackYeastTypeChange(yeastType);
      
      return newInputs;
    });
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setInputs(DEFAULT_INPUTS);
    
    // Track the reset action
    trackReset();
  };

  return {
    inputs,
    recipe,
    templates,
    handleInputChange,
    handlePizzaStyleChange,
    handlePrefermentTypeChange,
    handlePizzaDiameterChange,
    handleThicknessFactorChange,
    handlePanDimensionsChange,
    handleUseInchesChange,
    handlePrefermentPercentageChange,
    handlePrefermentHydrationChange,
    handleYeastTypeChange,
    handleShapeToggle,
    handleSaveTemplate,
    handleApplyTemplate,
    handleDeleteTemplate,
    resetToDefaults
  };
}; 