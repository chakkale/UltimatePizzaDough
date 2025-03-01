// Define the gtag function type to avoid TypeScript errors
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        [key: string]: unknown;
      }
    ) => void;
  }
}

// Initialize analytics (called when the app starts)
export const initializeAnalytics = (): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    console.log('Google Analytics initialized');
  }
};

// Track a page view
export const trackPageView = (title: string, path: string): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: path,
    });
  }
};

// Track an event
export const trackEvent = (
  eventName: string,
  eventParams: { [key: string]: unknown } = {}
): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

// Specific event tracking functions for the Pizza Calculator app
export const trackPizzaStyleChange = (style: string): void => {
  trackEvent('select_pizza_style', { style });
};

export const trackPrefermentTypeChange = (type: string): void => {
  trackEvent('select_preferment_type', { type });
};

export const trackYeastTypeChange = (type: string): void => {
  trackEvent('select_yeast_type', { type });
};

export const trackUnitChange = (useInches: boolean): void => {
  trackEvent('change_units', { units: useInches ? 'inches' : 'centimeters' });
};

export const trackThemeChange = (theme: string): void => {
  trackEvent('change_theme', { theme });
};

export const trackRecipeGenerated = (
  pizzaStyle: string,
  numberOfPizzas: number,
  hydration: number,
  prefermentType: string,
  salt?: number,
  yeast?: number,
  yeastType?: string,
  oil?: number,
  sugar?: number,
  diastaticMalt?: number,
  doughEnhancer?: number,
  isRectangular?: boolean,
  ballWeight?: number
): void => {
  trackEvent('generate_recipe', {
    pizza_style: pizzaStyle,
    number_of_pizzas: numberOfPizzas,
    hydration: hydration,
    preferment_type: prefermentType,
    salt: salt,
    yeast: yeast,
    yeast_type: yeastType,
    oil: oil,
    sugar: sugar,
    diastatic_malt: diastaticMalt,
    dough_enhancer: doughEnhancer,
    shape: isRectangular ? 'rectangular' : 'round',
    ball_weight: ballWeight
  });
};

export const trackTabChange = (tab: string): void => {
  trackEvent('view_tab', { tab });
};

export const trackReset = (): void => {
  trackEvent('reset_calculator');
};

// Add these new tracking functions for templates
export const trackTemplateSaved = (templateName: string, templateData?: Record<string, unknown>): void => {
  const eventParams: { [key: string]: unknown } = { template_name: templateName };
  
  // Add template details if available
  if (templateData) {
    eventParams.pizza_style = templateData.pizzaStyle;
    eventParams.hydration = templateData.hydration;
    eventParams.salt = templateData.salt;
    eventParams.yeast = templateData.yeast;
    eventParams.oil = templateData.oil;
    eventParams.sugar = templateData.sugar;
    eventParams.diastatic_malt = templateData.diastaticMalt;
    eventParams.dough_enhancer = templateData.doughEnhancer;
    eventParams.shape = templateData.isRectangular ? 'rectangular' : 'round';
    eventParams.thickness_factor = templateData.thicknessFactor;
  }
  
  trackEvent('save_template', eventParams);
};

export const trackTemplateApplied = (templateName: string, templateData?: Record<string, unknown>): void => {
  const eventParams: { [key: string]: unknown } = { template_name: templateName };
  
  // Add template details if available
  if (templateData) {
    eventParams.pizza_style = templateData.pizzaStyle;
    eventParams.hydration = templateData.hydration;
    eventParams.shape = templateData.isRectangular ? 'rectangular' : 'round';
  }
  
  trackEvent('apply_template', eventParams);
};

export const trackTemplateDeleted = (templateName: string): void => {
  trackEvent('delete_template', { template_name: templateName });
};

export const trackShapeToggled = (shape: 'round' | 'rectangular'): void => {
  trackEvent('toggle_shape', { shape });
};

// Track significant recipe adjustments
export const trackRecipeAdjustment = (
  parameterName: string,
  oldValue: number | string,
  newValue: number | string,
  pizzaStyle: string
): void => {
  trackEvent('recipe_adjustment', {
    parameter: parameterName,
    old_value: oldValue,
    new_value: newValue,
    pizza_style: pizzaStyle
  });
};

// Track custom template usage statistics
export const trackCustomTemplateStats = (): void => {
  // This function would be called periodically or when the app loads
  // to send aggregate data about template usage
  
  // Get templates from local storage (you'd need to implement this)
  const getTemplatesFromStorage = () => {
    try {
      const templatesJson = localStorage.getItem('pizza-calculator-templates');
      return templatesJson ? JSON.parse(templatesJson) : [];
    } catch (error) {
      console.error('Error reading templates from storage:', error);
      return [];
    }
  };
  
  const templates = getTemplatesFromStorage();
  
  if (templates.length > 0) {
    // Calculate some statistics
    const templateCount = templates.length;
    const styleDistribution: {[key: string]: number} = {};
    const shapeDistribution = {
      round: 0,
      rectangular: 0
    };
    
    templates.forEach((template: Record<string, unknown>) => {
      // Count by pizza style
      if (template.pizzaStyle) {
        styleDistribution[template.pizzaStyle as string] = (styleDistribution[template.pizzaStyle as string] || 0) + 1;
      }
      
      // Count by shape
      if (template.isRectangular) {
        shapeDistribution.rectangular++;
      } else {
        shapeDistribution.round++;
      }
    });
    
    // Send the statistics to Google Analytics
    trackEvent('custom_template_stats', {
      template_count: templateCount,
      style_distribution: JSON.stringify(styleDistribution),
      shape_distribution: JSON.stringify(shapeDistribution)
    });
  }
}; 