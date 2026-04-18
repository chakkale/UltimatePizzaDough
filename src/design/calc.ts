import neapolitanImg from '../assets/style-neapolitan.png';
import nyImg from '../assets/style-newyork.png';
import sicilianImg from '../assets/style-sicilian.png';
import detroitImg from '../assets/style-detroit.png';
import panImg from '../assets/style-pan.png';
import focacciaImg from '../assets/style-focaccia.png';

export type StyleId = 'neapolitan' | 'ny' | 'sicilian' | 'detroit' | 'pan' | 'focaccia';
export type YeastType = 'active_dry' | 'instant' | 'fresh';
export type PrefermentType = 'none' | 'poolish' | 'biga' | 'sourdough';

export interface PizzaStyle {
  id: StyleId;
  name: string;
  hint: string;
  hyd: number;
  tf: number;
  img: string;
  rect?: boolean;
}

export const PIZZA_STYLES: PizzaStyle[] = [
  { id: 'neapolitan', name: 'Neapolitan', hint: 'Wood-fired · 60s bake', hyd: 60, tf: 0.06, img: neapolitanImg },
  { id: 'ny',         name: 'New York',   hint: 'Foldable · steel deck', hyd: 65, tf: 0.08, img: nyImg },
  { id: 'sicilian',   name: 'Sicilian',   hint: 'Pan · airy crumb',      hyd: 70, tf: 0.12, img: sicilianImg, rect: true },
  { id: 'detroit',    name: 'Detroit',    hint: 'Steel pan · cheese edge', hyd: 68, tf: 0.10, img: detroitImg, rect: true },
  { id: 'pan',        name: 'Pan',        hint: 'Deep dish · fluffy',    hyd: 65, tf: 0.11, img: panImg },
  { id: 'focaccia',   name: 'Focaccia',   hint: 'High hydration · oily', hyd: 80, tf: 0.14, img: focacciaImg, rect: true },
];

const YEAST_FACTOR: Record<YeastType, number> = { active_dry: 1, instant: 0.75, fresh: 3 };
const YEAST_LABEL: Record<YeastType, string> = {
  active_dry: 'Active Dry Yeast',
  instant: 'Instant Yeast',
  fresh: 'Fresh Yeast',
};

export interface Inputs {
  styleId: StyleId;
  qty: number;
  diameter: number;
  panW: number;
  panL: number;
  tf: number;
  hyd: number;
  salt: number;
  yeast: number;
  yeastType: YeastType;
  oil: number;
  sugar: number;
  malt: number;
  useInches: boolean;
  preferment: PrefermentType;
  prefPct: number;
  prefHyd: number;
}

export interface Ingredient {
  name: string;
  pct: number;
  g: number;
  key: string;
}

export interface Recipe {
  ingredients: Ingredient[];
  preferment: { flour: number; water: number; yeast: number | null; type: PrefermentType } | null;
  mainDough: {
    flour: number;
    water: number;
    salt: number;
    yeast: number;
    oil: number | null;
    sugar: number | null;
    malt: number | null;
  } | null;
  ballGrams: number;
  totalGrams: number;
  sumPct: number;
  style: PizzaStyle;
  isRect: boolean;
  area: number;
}

export const DEFAULTS: Inputs = {
  styleId: 'neapolitan',
  qty: 4,
  diameter: 30,
  panW: 25,
  panL: 35,
  tf: 0.06,
  hyd: 60,
  salt: 2.8,
  yeast: 0.2,
  yeastType: 'instant',
  oil: 0,
  sugar: 0,
  malt: 0,
  useInches: false,
  preferment: 'none',
  prefPct: 30,
  prefHyd: 100,
};

export function calcRecipe(inputs: Inputs): Recipe {
  const style = PIZZA_STYLES.find(s => s.id === inputs.styleId) ?? PIZZA_STYLES[0];
  const isRect = !!style.rect;

  let area: number;
  if (isRect) {
    area = (inputs.panW / 2.54) * (inputs.panL / 2.54);
  } else {
    const r = inputs.diameter / 2 / 2.54;
    area = Math.PI * r * r;
  }

  const ozPerPizza = area * inputs.tf;
  const ballGrams = ozPerPizza / 0.03527396;
  const totalGrams = ballGrams * inputs.qty;

  const sumPct = inputs.hyd + inputs.salt + inputs.yeast + inputs.oil + inputs.sugar + inputs.malt;
  const flour = totalGrams / (1 + sumPct / 100);
  const water = (flour * inputs.hyd) / 100;
  const yeastWeight = ((flour * inputs.yeast) / 100) * YEAST_FACTOR[inputs.yeastType];
  const salt = (flour * inputs.salt) / 100;
  const oil = (flour * inputs.oil) / 100;
  const sugar = (flour * inputs.sugar) / 100;
  const malt = (flour * inputs.malt) / 100;

  const ingredients: Ingredient[] = [
    { name: 'Flour', pct: 100, g: flour, key: 'F' },
    { name: 'Water', pct: inputs.hyd, g: water, key: 'W' },
    { name: 'Salt', pct: inputs.salt, g: salt, key: 'S' },
  ];

  if (inputs.preferment !== 'sourdough' && inputs.yeast > 0) {
    ingredients.push({ name: YEAST_LABEL[inputs.yeastType], pct: inputs.yeast, g: yeastWeight, key: 'Y' });
  }
  if (inputs.oil > 0) ingredients.push({ name: 'Olive Oil', pct: inputs.oil, g: oil, key: 'O' });
  if (inputs.sugar > 0) ingredients.push({ name: 'Sugar', pct: inputs.sugar, g: sugar, key: 'Sg' });
  if (inputs.malt > 0) ingredients.push({ name: 'Diastatic Malt', pct: inputs.malt, g: malt, key: 'M' });

  let preferment: Recipe['preferment'] = null;
  let mainDough: Recipe['mainDough'] = null;

  if (inputs.preferment !== 'none') {
    const pFlour = (flour * inputs.prefPct) / 100;
    const pWater = (pFlour * inputs.prefHyd) / 100;
    const pYeast = inputs.preferment === 'sourdough' ? null : Math.max(yeastWeight * 0.05, 0.1);
    preferment = { flour: pFlour, water: pWater, yeast: pYeast, type: inputs.preferment };
    mainDough = {
      flour: flour - pFlour,
      water: water - pWater,
      salt,
      yeast: yeastWeight - (pYeast ?? 0),
      oil: oil > 0 ? oil : null,
      sugar: sugar > 0 ? sugar : null,
      malt: malt > 0 ? malt : null,
    };
  }

  return {
    ingredients,
    preferment,
    mainDough,
    ballGrams,
    totalGrams,
    sumPct: 100 + sumPct,
    style,
    isRect,
    area,
  };
}

export const round1 = (n: number) => Math.round(n * 10) / 10;
export const round2 = (n: number) => Math.round(n * 100) / 100;
export const gToOz = (g: number) => (g * 0.03527396).toFixed(1);
