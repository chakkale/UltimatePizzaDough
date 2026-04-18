import { useState } from 'react';
import type { DoughRecipe } from '../types';
import { roundToOneDecimal, roundToTwoDecimals, gramsToOunces } from '../utils/doughCalculator';
import { useTranslation } from '../context/TranslationContext';
import { Icons } from './Icons';
import { BAKE_TEMP, BAKE_TIME } from './styleMeta';

type Tab = 'ingredients' | 'method' | 'bake';

interface Props {
  recipe: DoughRecipe;
  styleId: string;
  numberOfPizzas: number;
  ballWeight: number;
  hydration: number;
}

const gToOz = (g: number) => gramsToOunces(g).toFixed(1);

const ingredientSwatch = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('flour')) return 'F';
  if (n.includes('water')) return 'W';
  if (n.includes('salt')) return 'S';
  if (n.includes('yeast')) return 'Y';
  if (n.includes('oil')) return 'O';
  if (n.includes('sugar')) return 'Sg';
  if (n.includes('malt')) return 'M';
  if (n.includes('enhancer')) return 'E';
  return '·';
};

const isYeast = (name: string) => name.toLowerCase().includes('yeast');

const prefermentLabel = (type: string | undefined, t: (k: string) => string): string => {
  switch (type) {
    case 'poolish': return t('form.poolish') === 'form.poolish' ? 'Poolish' : t('form.poolish');
    case 'biga': return t('form.biga') === 'form.biga' ? 'Biga' : t('form.biga');
    case 'sponge': return 'Sponge';
    case 'sourdough': return 'Sourdough';
    default: return 'Preferment';
  }
};

export function RecipePanel({ recipe, styleId, numberOfPizzas, ballWeight, hydration }: Props) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('ingredients');

  const total = recipe.ingredients.reduce((s, i) => s + i.weight, 0);
  const sumPct = recipe.ingredients.reduce((s, i) => s + i.percentage, 0);

  const translateIng = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('flour')) return t('ingredient.flour');
    if (n.includes('water')) return t('ingredient.water');
    if (n.includes('salt')) return t('ingredient.salt');
    if (n.includes('yeast')) return t('ingredient.yeast');
    if (n.includes('oil')) return t('ingredient.oil');
    if (n.includes('sugar')) return t('ingredient.sugar');
    if (n.includes('diastatic malt')) return t('ingredient.diastaticMalt');
    if (n.includes('dough enhancer')) return t('ingredient.doughEnhancer');
    return name;
  };

  const copyRecipe = () => {
    const lines = [
      `${t(`style.${styleId}`)} — ${numberOfPizzas} × ${roundToOneDecimal(ballWeight)}g`,
      `Hydration ${hydration}%`,
      '',
      ...recipe.ingredients.map((i) => `• ${translateIng(i.name)}: ${isYeast(i.name) ? roundToTwoDecimals(i.weight) : roundToOneDecimal(i.weight)}g (${i.percentage}%)`),
      '',
      `Total: ${roundToOneDecimal(total)}g`,
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
  };

  const hasPreferment = !!(recipe.preferment && recipe.mainDough);
  const findWt = (name: string) => recipe.ingredients.find((i) => i.name.toLowerCase().includes(name))?.weight ?? 0;

  return (
    <div className="bp-panel">
      <div className="bp-recipe-head">
        <div>
          <div className="bp-eyebrow"><span className="num">02</span> {t('recipe.title')}</div>
          <div className="bp-h-display">{t(`style.${styleId}`)} <em>{t('ingredient.preferment') === 'ingredient.preferment' ? 'dough' : t('recipe.mainDough').toLowerCase()}</em></div>
        </div>
        <div className="bp-live-dot"><span className="dot" /> LIVE</div>
      </div>

      <div className="bp-recipe-stats">
        <div className="bp-stat">
          <div className="k">{t('form.numberOfPizzas')}</div>
          <div className="v">{numberOfPizzas}</div>
        </div>
        <div className="bp-stat">
          <div className="k">{t('form.doughBallWeight') === 'form.doughBallWeight' ? 'Ball weight' : t('form.doughBallWeight')}</div>
          <div className="v">{roundToOneDecimal(ballWeight)}<small>g</small></div>
        </div>
        <div className="bp-stat">
          <div className="k">{t('recipe.total')}</div>
          <div className="v">{roundToOneDecimal(total)}<small>g</small></div>
        </div>
        <div className="bp-stat">
          <div className="k">{t('form.hydration')}</div>
          <div className="v">{hydration}<small>%</small></div>
        </div>
      </div>

      <div className="bp-tabs">
        <button type="button" className={'bp-tab ' + (tab === 'ingredients' ? 'on' : '')} onClick={() => setTab('ingredients')}>
          {t('recipe.ingredients')} <span className="count">{recipe.ingredients.length}</span>
        </button>
        <button type="button" className={'bp-tab ' + (tab === 'method' ? 'on' : '')} onClick={() => setTab('method')}>
          {t('method.title')} <span className="count">{hasPreferment ? '2' : '1'}</span>
        </button>
        <button type="button" className={'bp-tab ' + (tab === 'bake' ? 'on' : '')} onClick={() => setTab('bake')}>
          {t('baking.instructions') === 'baking.instructions' ? 'Bake' : t('baking.instructions')}
        </button>
      </div>

      {tab === 'ingredients' && (
        <div>
          <div className="bp-ing-list">
            {recipe.ingredients.map((i, idx) => (
              <div className="bp-ing-row" key={idx}>
                <span className="swatch">{ingredientSwatch(i.name)}</span>
                <div className="name">
                  {translateIng(i.name)}
                  <span className="sub">per {numberOfPizzas}-ball batch</span>
                </div>
                <div className="wt">
                  {isYeast(i.name) ? roundToTwoDecimals(i.weight) : roundToOneDecimal(i.weight)}g <small>{gToOz(i.weight)}oz</small>
                </div>
                <div className="pct">{i.percentage}%</div>
              </div>
            ))}
            <div className="bp-ing-row total">
              <span />
              <div className="name">{t('recipe.total')}</div>
              <div className="wt">{roundToOneDecimal(total)}g</div>
              <div className="pct">{Math.round(sumPct)}%</div>
            </div>
          </div>

          {hasPreferment && recipe.preferment && recipe.mainDough && (
            <>
              <div className="bp-subtotal">
                <h4>Stage 1 — {prefermentLabel(recipe.prefermentType, t)}</h4>
                <div className="bp-ing-list" style={{ margin: '0 -28px -18px' }}>
                  <div className="bp-ing-row">
                    <span className="swatch">F</span>
                    <div className="name">{t('ingredient.flour')}</div>
                    <div className="wt">{roundToOneDecimal(recipe.preferment.flour)}g</div>
                    <div className="pct">—</div>
                  </div>
                  <div className="bp-ing-row">
                    <span className="swatch">W</span>
                    <div className="name">{t('ingredient.water')}</div>
                    <div className="wt">{roundToOneDecimal(recipe.preferment.water)}g</div>
                    <div className="pct">—</div>
                  </div>
                  {recipe.preferment.yeast !== undefined && (
                    <div className="bp-ing-row">
                      <span className="swatch">Y</span>
                      <div className="name">{t('ingredient.yeast')}</div>
                      <div className="wt">{roundToTwoDecimals(recipe.preferment.yeast)}g</div>
                      <div className="pct">trace</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bp-subtotal" style={{ borderBottom: 0 }}>
                <h4>Stage 2 — {t('recipe.mainDough')}</h4>
                <div className="bp-ing-list" style={{ margin: '0 -28px 0' }}>
                  <div className="bp-ing-row">
                    <span className="swatch">F</span>
                    <div className="name">{t('ingredient.flour')}</div>
                    <div className="wt">{roundToOneDecimal(recipe.mainDough.flour)}g</div>
                    <div className="pct">—</div>
                  </div>
                  <div className="bp-ing-row">
                    <span className="swatch">W</span>
                    <div className="name">{t('ingredient.water')}</div>
                    <div className="wt">{roundToOneDecimal(recipe.mainDough.water)}g</div>
                    <div className="pct">—</div>
                  </div>
                  <div className="bp-ing-row">
                    <span className="swatch">S</span>
                    <div className="name">{t('ingredient.salt')}</div>
                    <div className="wt">{roundToOneDecimal(recipe.mainDough.salt)}g</div>
                    <div className="pct">—</div>
                  </div>
                  {recipe.mainDough.oil !== undefined && (
                    <div className="bp-ing-row">
                      <span className="swatch">O</span>
                      <div className="name">{t('ingredient.oil')}</div>
                      <div className="wt">{roundToOneDecimal(recipe.mainDough.oil)}g</div>
                      <div className="pct">—</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'method' && (
        <div className="bp-method">
          {hasPreferment && recipe.preferment && recipe.mainDough ? (
            <>
              <div className="bp-step">
                <div className="head">
                  <span className="dot" />
                  <h4>{t('preferment.instructions')}</h4>
                  <span className="time">12–18 hr</span>
                </div>
                <ol>
                  <li>
                    {t('preferment.step1')
                      .replace('{flour}', roundToOneDecimal(recipe.preferment.flour).toString())
                      .replace('{flourOz}', gToOz(recipe.preferment.flour))
                      .replace('{water}', roundToOneDecimal(recipe.preferment.water).toString())
                      .replace('{waterOz}', gToOz(recipe.preferment.water))
                      .replace('{yeast}', recipe.preferment.yeast !== undefined
                        ? t('preferment.step1.yeast')
                            .replace('{yeast}', roundToTwoDecimals(recipe.preferment.yeast).toString())
                            .replace('{yeastOz}', gToOz(recipe.preferment.yeast))
                        : '')}
                  </li>
                  <li>{recipe.prefermentType === 'sponge' ? t('preferment.step2.sponge') : t('preferment.step2.poolish')}</li>
                  <li>{recipe.prefermentType === 'sponge' ? t('preferment.step3.sponge') : t('preferment.step3.poolish')}</li>
                </ol>
              </div>
              <div className="bp-step">
                <div className="head">
                  <span className="dot" />
                  <h4>{t('mainDough.instructions')}</h4>
                  <span className="time">30 min mix · 24 hr cold proof</span>
                </div>
                <ol>
                  <li>{t('mainDough.step1').replace('{water}', roundToOneDecimal(recipe.mainDough.water).toString()).replace('{waterOz}', gToOz(recipe.mainDough.water))}</li>
                  <li>{t('mainDough.step2').replace('{flour}', roundToOneDecimal(recipe.mainDough.flour).toString()).replace('{flourOz}', gToOz(recipe.mainDough.flour))}</li>
                  <li>
                    {t('mainDough.step3.start').replace('{salt}', roundToOneDecimal(recipe.mainDough.salt).toString()).replace('{saltOz}', gToOz(recipe.mainDough.salt))}
                    {recipe.mainDough.yeast > 0
                      ? t('mainDough.step3.yeast').replace('{yeast}', roundToTwoDecimals(recipe.mainDough.yeast).toString()).replace('{yeastOz}', gToOz(recipe.mainDough.yeast))
                      : ''}
                    {recipe.mainDough.oil
                      ? t('mainDough.step3.oil').replace('{oil}', roundToOneDecimal(recipe.mainDough.oil).toString()).replace('{oilOz}', gToOz(recipe.mainDough.oil))
                      : ''}
                    {recipe.mainDough.sugar
                      ? t('mainDough.step3.sugar').replace('{sugar}', roundToOneDecimal(recipe.mainDough.sugar).toString()).replace('{sugarOz}', gToOz(recipe.mainDough.sugar))
                      : ''}
                    {recipe.mainDough.diastaticMalt
                      ? t('mainDough.step3.malt').replace('{malt}', roundToOneDecimal(recipe.mainDough.diastaticMalt).toString()).replace('{maltOz}', gToOz(recipe.mainDough.diastaticMalt))
                      : ''}
                    {recipe.mainDough.doughEnhancer
                      ? t('mainDough.step3.enhancer').replace('{enhancer}', roundToOneDecimal(recipe.mainDough.doughEnhancer).toString()).replace('{enhancerOz}', gToOz(recipe.mainDough.doughEnhancer))
                      : ''}
                    {t('mainDough.step3.end')}
                  </li>
                  <li>{t('mainDough.step4')}</li>
                  <li>{t('mainDough.step5')}</li>
                  <li>{t('mainDough.step6')}</li>
                  <li>{t('mainDough.step7')}</li>
                  <li>{t('mainDough.step8')}</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="bp-step">
              <div className="head">
                <span className="dot" />
                <h4>{t('dough.instructions')}</h4>
                <span className="time">~30 min + proof</span>
              </div>
              <ol>
                <li>{t('dough.step1').replace('{water}', roundToOneDecimal(findWt('water')).toString()).replace('{waterOz}', gToOz(findWt('water'))).replace('{flour}', roundToOneDecimal(findWt('flour')).toString()).replace('{flourOz}', gToOz(findWt('flour')))}</li>
                <li>{t('dough.step2')}</li>
                <li>{t('dough.step3.salt').replace('{salt}', roundToOneDecimal(findWt('salt')).toString()).replace('{saltOz}', gToOz(findWt('salt')))}</li>
                {recipe.ingredients.some((i) => isYeast(i.name)) && (
                  <li>
                    {t('dough.step3.yeast')
                      .replace('{yeast}', roundToTwoDecimals(findWt('yeast')).toString())
                      .replace('{yeastOz}', gToOz(findWt('yeast')))
                      .replace('{yeastName}', translateIng(recipe.ingredients.find((i) => isYeast(i.name))?.name ?? 'Yeast'))}
                  </li>
                )}
                {findWt('oil') > 0 && (
                  <li>{t('dough.step3.oil').replace('{oil}', roundToOneDecimal(findWt('oil')).toString()).replace('{oilOz}', gToOz(findWt('oil')))}</li>
                )}
                {findWt('sugar') > 0 && (
                  <li>{t('dough.step3.sugar').replace('{sugar}', roundToOneDecimal(findWt('sugar')).toString()).replace('{sugarOz}', gToOz(findWt('sugar')))}</li>
                )}
                {findWt('diastatic malt') > 0 && (
                  <li>{t('dough.step3.malt').replace('{malt}', roundToOneDecimal(findWt('diastatic malt')).toString()).replace('{maltOz}', gToOz(findWt('diastatic malt')))}</li>
                )}
                {findWt('dough enhancer') > 0 && (
                  <li>{t('dough.step3.enhancer').replace('{enhancer}', roundToOneDecimal(findWt('dough enhancer')).toString()).replace('{enhancerOz}', gToOz(findWt('dough enhancer')))}</li>
                )}
                <li>{t('mainDough.step4')}</li>
                <li>{t('mainDough.step5')}</li>
                <li>{t('mainDough.step6')}</li>
                <li>{t('mainDough.step7')}</li>
                <li>{t('mainDough.step8')}</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {tab === 'bake' && (
        <div className="bp-method">
          {t(`flour.${styleId}`) !== `flour.${styleId}` && (
            <div className="bp-info">{t(`flour.${styleId}`)}</div>
          )}
          <div className="bp-step">
            <div className="head">
              <span className="dot" />
              <h4>{t('baking.instructions')}</h4>
              <span className="time">{BAKE_TIME[styleId] ?? ''}</span>
            </div>
            <ol>
              <li>
                {t(`baking.step1.${styleId}`) !== `baking.step1.${styleId}` ? t(`baking.step1.${styleId}`) : t('baking.step1')}
                {' '}<mark>{BAKE_TEMP[styleId] ?? ''}</mark>
              </li>
              <li>{t(`baking.step2.${styleId}`) !== `baking.step2.${styleId}` ? t(`baking.step2.${styleId}`) : t('baking.step2')}</li>
              <li>{t(`baking.step3.${styleId}`) !== `baking.step3.${styleId}` ? t(`baking.step3.${styleId}`) : t('baking.step3')}</li>
              <li>{t(`baking.step4.${styleId}`) !== `baking.step4.${styleId}` ? t(`baking.step4.${styleId}`) : t('baking.step4')}</li>
            </ol>
          </div>
        </div>
      )}

      <div className="bp-recipe-actions">
        <button type="button" className="bp-btn grow" onClick={copyRecipe}>
          <Icons.Copy /> {t('button.copy') === 'button.copy' ? 'Copy recipe' : t('button.copy')}
        </button>
        <button type="button" className="bp-btn" onClick={() => window.print()}>
          <Icons.Print /> Print
        </button>
      </div>
    </div>
  );
}
