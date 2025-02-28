import { DoughCalculatorInputs, DoughRecipe, DoughIngredient, PizzaStyle, YeastType } from '../types';

// Conversion constants
const GRAMS_TO_OUNCES = 0.03527396;
const OUNCES_TO_GRAMS = 28.3495;

// Yeast conversion factors relative to active dry yeast
const YEAST_CONVERSION_FACTORS = {
  active_dry: 1,      // Base reference
  instant: 0.75,      // Use 25% less than active dry
  fresh: 3            // Use 3x more than active dry
};

// Yeast display names for recipe output
export const YEAST_TYPE_NAMES = {
  active_dry: 'Active Dry Yeast',
  instant: 'Instant Yeast',
  fresh: 'Fresh Yeast'
};

// Convert grams to ounces
export const gramsToOunces = (grams: number): number => {
  return grams * GRAMS_TO_OUNCES;
};

// Convert ounces to grams
export const ouncesToGrams = (ounces: number): number => {
  return ounces * OUNCES_TO_GRAMS;
};

// Convert inches to cm
export const inchesToCm = (inches: number): number => Math.round(inches * 2.54 * 10) / 10;

// Convert cm to inches
export const cmToInches = (cm: number): number => Math.round(cm * 0.393701 * 10) / 10;

// Pizza styles with their default hydration levels and thickness factors
export const PIZZA_STYLES: PizzaStyle[] = [
  {
    id: 'neapolitan',
    name: 'Neapolitan',
    defaultHydration: 60,
    defaultThicknessFactor: 0.06, // Thin crust in oz/in²
    description: 'Traditional Italian style with a thin center and puffy, airy crust.'
  },
  {
    id: 'ny',
    name: 'New York',
    defaultHydration: 62,
    defaultThicknessFactor: 0.08, // Medium-thin crust in oz/in²
    description: 'Thin, foldable slices with a crispy exterior and chewy interior.'
  },
  {
    id: 'sicilian',
    name: 'Sicilian',
    defaultHydration: 70,
    defaultThicknessFactor: 0.12, // Thick crust in oz/in²
    description: 'Thick, rectangular pizza with a fluffy, airy interior and crispy bottom.',
    isRectangular: true
  },
  {
    id: 'detroit',
    name: 'Detroit',
    defaultHydration: 70,
    defaultThicknessFactor: 0.10, // Medium-thick crust in oz/in²
    description: 'Rectangular pan pizza with a thick, airy crust and crispy cheese edges.',
    isRectangular: true
  },
  {
    id: 'focaccia',
    name: 'Focaccia',
    defaultHydration: 75,
    defaultThicknessFactor: 0.14, // Very thick crust in oz/in²
    description: 'Italian flatbread with a high hydration for an open, airy crumb.',
    isRectangular: 'both'
  },
  {
    id: 'custom',
    name: 'Custom',
    defaultHydration: 65,
    defaultThicknessFactor: 0.08, // Medium crust in oz/in²
    description: 'Create your own custom style with your preferred parameters.'
  }
];

// Calculate the total dough weight
const calculateTotalDoughWeight = (numberOfPizzas: number, ballWeight: number): number => {
  return numberOfPizzas * ballWeight;
};

// Calculate thickness factor based on dough ball weight and pizza dimensions
// TF = Dough ball weight in ounces/(3.14159 × R × R), where R is the radius in inches
export const calculateThicknessFactor = (
  ballWeight: number, // in grams
  diameter: number,   // in cm or inches based on useInches
  isRectangular: boolean | 'both' = false,
  panWidth?: number,  // in cm or inches based on useInches
  panLength?: number,  // in cm or inches based on useInches
  useInches: boolean = false
): number => {
  // Convert ball weight from grams to ounces
  const ballWeightOz = gramsToOunces(ballWeight);
  
  if ((isRectangular === true || isRectangular === 'both') && panWidth && panLength) {
    // For rectangular pizzas, we use a modified formula
    // TF = Dough ball weight in ounces / (width × length)
    
    // Convert dimensions to inches if needed
    const widthInches = useInches ? panWidth : cmToInches(panWidth);
    const lengthInches = useInches ? panLength : cmToInches(panLength);
    
    const area = widthInches * lengthInches;
    return ballWeightOz / area;
  } else {
    // For round pizzas, use the standard formula
    // Convert diameter to inches if needed
    const diameterInches = useInches ? diameter : cmToInches(diameter);
    const radiusInches = diameterInches / 2;
    return ballWeightOz / (Math.PI * radiusInches * radiusInches);
  }
};

// Calculate dough ball weight based on pizza dimensions and thickness factor
export const calculateDoughBallWeight = (
  pizzaStyle: string,
  diameter: number,      // in cm or inches based on useInches
  panWidth?: number,     // in cm or inches based on useInches
  panLength?: number,    // in cm or inches based on useInches
  thicknessFactor: number = 0.1,
  useInches: boolean = false
): number => {
  const selectedStyle = PIZZA_STYLES.find(style => style.id === pizzaStyle);
  const isRectangular = selectedStyle?.isRectangular;
  
  if ((isRectangular === true || isRectangular === 'both') && panWidth && panLength) {
    // For rectangular pizzas
    // Convert dimensions to inches if needed
    const widthInches = useInches ? panWidth : cmToInches(panWidth);
    const lengthInches = useInches ? panLength : cmToInches(panLength);
    
    const area = widthInches * lengthInches;
    
    // Calculate weight in ounces then convert to grams
    const weightOz = thicknessFactor * area;
    return Math.round(ouncesToGrams(weightOz));
  } else {
    // For round pizzas
    // Convert diameter to inches if needed
    const diameterInches = useInches ? diameter : cmToInches(diameter);
    const radiusInches = diameterInches / 2;
    const area = Math.PI * radiusInches * radiusInches;
    
    // Calculate weight in ounces then convert to grams
    const weightOz = thicknessFactor * area;
    return Math.round(ouncesToGrams(weightOz));
  }
};

// Calculate flour weight based on total dough weight and baker's percentages
const calculateFlourWeight = (
  totalDoughWeight: number,
  hydration: number,
  salt: number,
  yeast: number,
  oil: number,
  sugar: number,
  diastaticMalt: number,
  doughEnhancer: number
): number => {
  // Convert percentages to decimals
  const hydrationDecimal = hydration / 100;
  const saltDecimal = salt / 100;
  const yeastDecimal = yeast / 100;
  const oilDecimal = oil / 100;
  const sugarDecimal = sugar / 100;
  const diastaticMaltDecimal = diastaticMalt / 100;
  const doughEnhancerDecimal = doughEnhancer / 100;

  // Calculate flour weight using baker's percentage formula
  // Flour is always 100%, so we divide by the sum of all percentages
  return totalDoughWeight / (1 + hydrationDecimal + saltDecimal + yeastDecimal + oilDecimal + sugarDecimal + diastaticMaltDecimal + doughEnhancerDecimal);
};

// Calculate preferment amounts
const calculatePreferment = (
  flourWeight: number, 
  prefermentPercentage: number, 
  prefermentHydration: number,
  _yeast: number,
  yeastType: YeastType
) => {
  const prefermentFlour = (flourWeight * prefermentPercentage) / 100;
  const prefermentWater = (prefermentFlour * prefermentHydration) / 100;
  
  // For poolish and biga, we add a small amount of yeast to the preferment
  // For sourdough, we don't add commercial yeast
  const basePrefermentYeast = prefermentPercentage > 0 ? (flourWeight * 0.1) / 100 : 0;
  const prefermentYeast = basePrefermentYeast * YEAST_CONVERSION_FACTORS[yeastType];
  
  return {
    flour: prefermentFlour,
    water: prefermentWater,
    yeast: prefermentYeast
  };
};

// Calculate the main dough ingredients
export const calculateDoughRecipe = (inputs: DoughCalculatorInputs): DoughRecipe => {
  const {
    numberOfPizzas,
    ballWeight,
    pizzaStyle,
    hydration,
    salt,
    yeast,
    yeastType,
    oil,
    sugar,
    diastaticMalt,
    doughEnhancer,
    thicknessFactor,
    pizzaDiameter,
    panWidth,
    panLength,
    preferment,
    useInches
  } = inputs;

  // Calculate total dough weight
  const totalDoughWeight = calculateTotalDoughWeight(numberOfPizzas, ballWeight);
  
  // Calculate flour weight
  const totalFlour = calculateFlourWeight(totalDoughWeight, hydration, salt, yeast, oil, sugar, diastaticMalt, doughEnhancer);
  
  // Calculate ingredient weights
  const waterWeight = (totalFlour * hydration) / 100;
  const saltWeight = (totalFlour * salt) / 100;
  
  // Calculate base yeast weight (as active dry equivalent)
  const baseYeastWeight = (totalFlour * yeast) / 100;
  
  // Convert to the selected yeast type
  const yeastWeight = baseYeastWeight * YEAST_CONVERSION_FACTORS[yeastType];
  
  const oilWeight = (totalFlour * oil) / 100;
  const sugarWeight = (totalFlour * sugar) / 100;
  const diastaticMaltWeight = (totalFlour * diastaticMalt) / 100;
  const doughEnhancerWeight = (totalFlour * doughEnhancer) / 100;

  // Get selected pizza style
  const selectedStyle = PIZZA_STYLES.find(style => style.id === pizzaStyle);
  const isRectangular = selectedStyle?.isRectangular;
  
  // Calculate pizza area
  let area: number;
  if ((isRectangular === true || isRectangular === 'both') && panWidth && panLength) {
    // If dimensions are in inches, convert to cm for area calculation in cm²
    const widthCm = useInches ? inchesToCm(panWidth) : panWidth;
    const lengthCm = useInches ? inchesToCm(panLength) : panLength;
    area = widthCm * lengthCm;
  } else {
    // If diameter is in inches, convert to cm for area calculation in cm²
    const diameterCm = useInches ? inchesToCm(pizzaDiameter) : pizzaDiameter;
    const radius = diameterCm / 2;
    area = Math.PI * radius * radius;
  }

  // Initialize ingredients array
  const ingredients: DoughIngredient[] = [
    {
      name: 'Flour',
      weight: totalFlour,
      percentage: 100,
      unit: 'g'
    },
    {
      name: 'Water',
      weight: waterWeight,
      percentage: hydration,
      unit: 'g'
    },
    {
      name: 'Salt',
      weight: saltWeight,
      percentage: salt,
      unit: 'g'
    },
    {
      name: YEAST_TYPE_NAMES[yeastType],
      weight: yeastWeight,
      percentage: yeast,
      unit: 'g'
    }
  ];

  // Add optional ingredients if they exist
  if (oil > 0) {
    ingredients.push({
      name: 'Oil',
      weight: oilWeight,
      percentage: oil,
      unit: 'g'
    });
  }

  if (sugar > 0) {
    ingredients.push({
      name: 'Sugar',
      weight: sugarWeight,
      percentage: sugar,
      unit: 'g'
    });
  }

  if (diastaticMalt > 0) {
    ingredients.push({
      name: 'Diastatic Malt',
      weight: diastaticMaltWeight,
      percentage: diastaticMalt,
      unit: 'g'
    });
  }

  if (doughEnhancer > 0) {
    ingredients.push({
      name: 'Dough Enhancer',
      weight: doughEnhancerWeight,
      percentage: doughEnhancer,
      unit: 'g'
    });
  }

  // Base recipe without preferment
  const recipe: DoughRecipe = {
    totalFlour,
    ingredients,
    pizzaInfo: {
      thicknessFactor,
      area,
      useInches,
      ...(isRectangular && panWidth && panLength 
        ? { panWidth: useInches ? inchesToCm(panWidth) : panWidth, 
            panLength: useInches ? inchesToCm(panLength) : panLength } 
        : { diameter: useInches ? inchesToCm(pizzaDiameter) : pizzaDiameter })
    }
  };

  // If using a preferment, calculate the preferment and main dough
  if (preferment.type !== 'none' && preferment.percentage > 0) {
    const { flour: prefermentFlour, water: prefermentWater, yeast: prefermentYeast } = calculatePreferment(
      totalFlour,
      preferment.percentage,
      preferment.hydration,
      yeast,
      yeastType
    );

    // Add preferment type to the recipe
    recipe.prefermentType = preferment.type;

    // Calculate main dough ingredients
    const mainDoughFlour = totalFlour - prefermentFlour;
    const mainDoughWater = waterWeight - prefermentWater;
    const mainDoughYeast = preferment.type === 'sourdough' ? 0 : yeastWeight - prefermentYeast;

    recipe.preferment = {
      flour: prefermentFlour,
      water: prefermentWater,
      yeast: preferment.type !== 'sourdough' ? prefermentYeast : undefined
    };

    recipe.mainDough = {
      flour: mainDoughFlour,
      water: mainDoughWater,
      salt: saltWeight,
      yeast: mainDoughYeast,
      oil: oilWeight > 0 ? oilWeight : undefined,
      sugar: sugarWeight > 0 ? sugarWeight : undefined,
      diastaticMalt: diastaticMaltWeight > 0 ? diastaticMaltWeight : undefined,
      doughEnhancer: doughEnhancerWeight > 0 ? doughEnhancerWeight : undefined
    };
  }

  return recipe;
};

// Round to 1 decimal place for display
export const roundToOneDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
}; 

// Round to 2 decimal places for display
export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
}; 
