export type PizzaStyle = {
  id: string;
  name: string;
  defaultHydration: number;
  defaultThicknessFactor: number;
  description: string;
  isRectangular?: boolean | 'both'; // Flag for rectangular pizzas like Detroit, or 'both' for styles that can be either
};

export type PrefermentType = 'none' | 'poolish' | 'biga' | 'sourdough' | 'sponge';

export type YeastType = 'active_dry' | 'instant' | 'fresh';

export type PrefermentConfig = {
  type: PrefermentType;
  percentage: number; // % of total flour
  hydration: number; // % hydration of preferment
};

export interface PizzaInfo {
  diameter?: number;
  panWidth?: number;
  panLength?: number;
  thicknessFactor: number;
  area: number;
  useInches: boolean;
}

export interface MainDough {
  flour: number;
  water: number;
  salt: number;
  yeast: number;
  oil?: number;
  sugar?: number;
  diastaticMalt?: number;
  doughEnhancer?: number;
}

export type DoughCalculatorInputs = {
  numberOfPizzas: number;
  ballWeight: number;
  pizzaStyle: string;
  hydration: number;
  salt: number;
  yeast: number;
  yeastType: YeastType;
  oil: number;
  sugar: number;
  diastaticMalt: number;
  doughEnhancer: number;
  thicknessFactor: number;
  pizzaDiameter: number;
  panWidth?: number;
  panLength?: number;
  preferment: PrefermentConfig;
  useInches: boolean;
  isRectangular?: boolean; // Added for custom templates
};

export type DoughIngredient = {
  name: string;
  weight: number;
  percentage: number;
  unit: string;
};

export type DoughRecipe = {
  totalFlour: number;
  ingredients: DoughIngredient[];
  pizzaInfo?: PizzaInfo;
  prefermentType?: PrefermentType;
  preferment?: {
    flour: number;
    water: number;
    yeast?: number;
  };
  mainDough?: MainDough;
};

// New type for custom pizza templates
export type CustomPizzaTemplate = {
  id: string;
  name: string;
  hydration: number;
  thicknessFactor: number;
  isRectangular: boolean;
  salt: number;
  oil: number;
  sugar: number;
  diastaticMalt: number;
  doughEnhancer: number;
  yeast: number;
  yeastType: YeastType;
  preferment: PrefermentConfig;
  createdAt: number; // timestamp
}; 