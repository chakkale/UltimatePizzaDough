import { CustomPizzaTemplate, DoughCalculatorInputs } from '../types';
import { getCookie, setCookie } from './cookieUtils';

const TEMPLATES_COOKIE_KEY = 'pizza_calculator_templates';

/**
 * Get all saved templates from cookies
 */
export const getTemplates = (): CustomPizzaTemplate[] => {
  const templatesJson = getCookie(TEMPLATES_COOKIE_KEY);
  if (!templatesJson) {
    return [];
  }
  
  try {
    return JSON.parse(templatesJson);
  } catch (error) {
    console.error('Error parsing templates from cookie:', error);
    return [];
  }
};

/**
 * Save templates to cookies
 */
export const saveTemplates = (templates: CustomPizzaTemplate[]): void => {
  try {
    const templatesJson = JSON.stringify(templates);
    setCookie(TEMPLATES_COOKIE_KEY, templatesJson);
  } catch (error) {
    console.error('Error saving templates to cookie:', error);
  }
};

/**
 * Add a new template
 */
export const addTemplate = (name: string, inputs: DoughCalculatorInputs): CustomPizzaTemplate => {
  const templates = getTemplates();
  
  // Generate a unique ID
  const id = `template_${Date.now()}`;
  
  // Create the new template
  const newTemplate: CustomPizzaTemplate = {
    id,
    name,
    hydration: inputs.hydration,
    thicknessFactor: inputs.thicknessFactor,
    isRectangular: inputs.isRectangular ?? false,
    salt: inputs.salt,
    oil: inputs.oil,
    sugar: inputs.sugar,
    diastaticMalt: inputs.diastaticMalt,
    doughEnhancer: inputs.doughEnhancer,
    yeast: inputs.yeast,
    yeastType: inputs.yeastType,
    preferment: { ...inputs.preferment },
    createdAt: Date.now()
  };
  
  // Add to templates and save
  templates.push(newTemplate);
  saveTemplates(templates);
  
  return newTemplate;
};

/**
 * Delete a template by ID
 */
export const deleteTemplate = (id: string): void => {
  const templates = getTemplates();
  const filteredTemplates = templates.filter(template => template.id !== id);
  saveTemplates(filteredTemplates);
};

/**
 * Update a template
 */
export const updateTemplate = (template: CustomPizzaTemplate): void => {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === template.id);
  
  if (index !== -1) {
    templates[index] = {
      ...template,
      createdAt: Date.now() // Update timestamp
    };
    saveTemplates(templates);
  }
};

/**
 * Apply a template to the calculator inputs
 */
export const applyTemplate = (template: CustomPizzaTemplate, currentInputs: DoughCalculatorInputs): DoughCalculatorInputs => {
  return {
    ...currentInputs,
    pizzaStyle: 'custom',
    hydration: template.hydration,
    thicknessFactor: template.thicknessFactor,
    salt: template.salt,
    oil: template.oil,
    sugar: template.sugar,
    diastaticMalt: template.diastaticMalt,
    doughEnhancer: template.doughEnhancer,
    yeast: template.yeast,
    yeastType: template.yeastType,
    preferment: { ...template.preferment },
    isRectangular: template.isRectangular
  };
}; 