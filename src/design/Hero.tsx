import { useTranslation } from '../context/TranslationContext';
import { STYLE_IMAGES } from './styleMeta';
import type { DoughRecipe } from '../types';
import { roundToOneDecimal } from '../utils/doughCalculator';

interface Props {
  recipe: DoughRecipe | null;
  styleId: string;
}

export function Hero({ recipe, styleId }: Props) {
  const { t } = useTranslation();
  const styleName = t(`style.${styleId}`);
  const total = recipe ? recipe.ingredients.reduce((s, i) => s + i.weight, 0) : 0;
  const img = STYLE_IMAGES[styleId] ?? STYLE_IMAGES.neapolitan;

  return (
    <div className="bp-hero-card">
      <div className="bp-hero-strip">
        <div className="bp-hero-copy">
          <div className="bp-eyebrow"><span className="num">01</span> Pizza Dough Calculator · v2</div>
          <h1>
            {t('hero.titleLine1') !== 'hero.titleLine1' ? t('hero.titleLine1') : 'Better dough,'}
            <br />
            <em>
              {t('hero.titleLine2') !== 'hero.titleLine2' ? t('hero.titleLine2') : 'by the gram.'}
            </em>
          </h1>
          <p className="lede">
            {t('hero.lede') !== 'hero.lede'
              ? t('hero.lede')
              : "A baker's-percentage workshop for pizza. Pick a style, dial in the variables, get a precise recipe and method — calibrated as you type."}
          </p>
          <div className="bp-meta-row">
            <span>{styleName}</span>
            <span>{roundToOneDecimal(total)}g batch</span>
            <span>{recipe?.ingredients.length ?? 0} ingredients</span>
          </div>
        </div>
        <div className="bp-hero-img" style={{ backgroundImage: `url(${img})` }}>
          <div className="badge">{styleName}</div>
        </div>
      </div>
    </div>
  );
}
