import neapolitanImg from '../assets/style-neapolitan.png';
import newyorkImg from '../assets/style-newyork.png';
import sicilianImg from '../assets/style-sicilian.png';
import detroitImg from '../assets/style-detroit.png';
import panImg from '../assets/style-pan.png';
import focacciaImg from '../assets/style-focaccia.png';

export const STYLE_IMAGES: Record<string, string> = {
  neapolitan: neapolitanImg,
  ny: newyorkImg,
  sicilian: sicilianImg,
  detroit: detroitImg,
  pan: panImg,
  focaccia: focacciaImg,
};

export const STYLE_HINTS: Record<string, string> = {
  neapolitan: 'Wood-fired · 60s bake',
  ny: 'Foldable · steel deck',
  sicilian: 'Pan · airy crumb',
  detroit: 'Steel pan · cheese edge',
  pan: 'Deep dish · fluffy',
  focaccia: 'High hydration · oily',
};

export const BAKE_TEMP: Record<string, string> = {
  neapolitan: '500°C / 932°F',
  ny: '290°C / 550°F',
  sicilian: '250°C / 480°F',
  detroit: '260°C / 500°F',
  pan: '240°C / 465°F',
  focaccia: '230°C / 445°F',
};

export const BAKE_TIME: Record<string, string> = {
  neapolitan: '60–90s',
  ny: '8–10 min',
  sicilian: '15–20 min',
  detroit: '12–14 min',
  pan: '12–15 min',
  focaccia: '18–22 min',
};
