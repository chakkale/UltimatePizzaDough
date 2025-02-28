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
  prefermentType: string
): void => {
  trackEvent('generate_recipe', {
    pizza_style: pizzaStyle,
    number_of_pizzas: numberOfPizzas,
    hydration: hydration,
    preferment_type: prefermentType,
  });
};

export const trackTabChange = (tab: string): void => {
  trackEvent('view_tab', { tab });
};

export const trackReset = (): void => {
  trackEvent('reset_calculator');
};

// Add these new tracking functions for templates
export const trackTemplateSaved = (templateName: string): void => {
  trackEvent('save_template', { template_name: templateName });
};

export const trackTemplateApplied = (templateName: string): void => {
  trackEvent('apply_template', { template_name: templateName });
};

export const trackTemplateDeleted = (templateName: string): void => {
  trackEvent('delete_template', { template_name: templateName });
};

export const trackShapeToggled = (shape: 'round' | 'rectangular'): void => {
  trackEvent('toggle_shape', { shape });
}; 