import './design.css';
import { useDoughCalculator } from '../hooks/useDoughCalculator';
import { useTranslation } from '../context/TranslationContext';
import { PIZZA_STYLES, cmToInches, inchesToCm } from '../utils/doughCalculator';
import type { PrefermentType, YeastType } from '../types';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import HeaderControls from '../components/HeaderControls';
import { Hero } from './Hero';
import { StylePicker } from './StylePicker';
import { RecipePanel } from './RecipePanel';
import { Slider, Stepper, Pills } from './controls';
import { Icons } from './Icons';

export function Workshop() {
  const { t } = useTranslation();
  const {
    inputs,
    recipe,
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
    resetToDefaults,
  } = useDoughCalculator();

  const selectedStyle = PIZZA_STYLES.find((s) => s.id === inputs.pizzaStyle);
  const isRectangular =
    selectedStyle?.isRectangular === true ||
    (selectedStyle?.isRectangular === 'both' && inputs.isRectangular);

  const diameterDisplay = inputs.useInches
    ? `${inputs.pizzaDiameter.toFixed(1)}″ · ${inchesToCm(inputs.pizzaDiameter).toFixed(1)}cm`
    : `${inputs.pizzaDiameter}cm · ${cmToInches(inputs.pizzaDiameter).toFixed(1)}″`;

  return (
    <div className="bp-root">
      <div className="bp-topbar">
        <div className="bp-brand">
          <span className="mark" />
          <div className="bp-brand-stack">
            <div>{t('app.title')}</div>
            <small>Pizza Dough Calculator</small>
          </div>
        </div>
        <div className="bp-topbar-actions">
          <div className="bp-unit-toggle">
            <button
              type="button"
              className={!inputs.useInches ? 'on' : ''}
              onClick={() => handleUseInchesChange(false)}
            >
              cm·g
            </button>
            <button
              type="button"
              className={inputs.useInches ? 'on' : ''}
              onClick={() => handleUseInchesChange(true)}
            >
              in·oz
            </button>
          </div>
          <LanguageToggle />
          <ThemeToggle />
          <button type="button" className="bp-icon-btn" onClick={resetToDefaults} title={t('button.reset')}>
            <Icons.Reset />
          </button>
        </div>
      </div>

      <div className="bp-shell">
        <div>
          <Hero recipe={recipe} styleId={inputs.pizzaStyle} numberOfPizzas={inputs.numberOfPizzas} />

          <div className="bp-panel">
            <div className="bp-panel-pad">
              <div className="bp-section">
                <div className="bp-eyebrow"><span className="num">A</span> {t('style.title')}</div>
                <div className="bp-h-display">Six classics, <em>one calculator.</em></div>
                <StylePicker value={inputs.pizzaStyle} onChange={handlePizzaStyleChange} />
              </div>

              <div className="bp-section">
                <div className="bp-eyebrow"><span className="num">B</span> Pan &amp; portions</div>
                <div className="bp-row">
                  <div className="bp-field">
                    <label>{t('form.numberOfPizzas')}</label>
                    <Stepper
                      value={inputs.numberOfPizzas}
                      min={1}
                      max={20}
                      onChange={(v) => handleInputChange('numberOfPizzas', v)}
                    />
                  </div>

                  {isRectangular ? (
                    <div className="bp-field">
                      <label>
                        {t('form.width')} × {t('form.length')}
                        <span className="v">{inputs.panWidth}×{inputs.panLength}{inputs.useInches ? '″' : 'cm'}</span>
                      </label>
                      <div className="bp-row" style={{ gap: 8 }}>
                        <Stepper
                          value={inputs.panWidth ?? 25}
                          min={10}
                          max={60}
                          onChange={(v) => handlePanDimensionsChange(v, inputs.panLength ?? 35)}
                        />
                        <Stepper
                          value={inputs.panLength ?? 35}
                          min={10}
                          max={60}
                          onChange={(v) => handlePanDimensionsChange(inputs.panWidth ?? 25, v)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bp-field">
                      <label>
                        {t('form.pizzaDiameter')} <span className="v">{diameterDisplay}</span>
                      </label>
                      <Stepper
                        value={inputs.pizzaDiameter}
                        min={15}
                        max={60}
                        onChange={handlePizzaDiameterChange}
                      />
                    </div>
                  )}
                </div>

                {selectedStyle?.isRectangular === 'both' && (
                  <div className="bp-field">
                    <label>{t('form.shape')}</label>
                    <Pills
                      value={inputs.isRectangular ? 'rect' : 'round'}
                      onChange={(v) => handleShapeToggle(v === 'rect')}
                      options={[
                        { label: t('form.round'), value: 'round' },
                        { label: t('form.rectangular'), value: 'rect' },
                      ]}
                    />
                  </div>
                )}

                <Slider
                  label={t('form.thicknessFactor')}
                  value={inputs.thicknessFactor}
                  min={0.03}
                  max={0.15}
                  step={0.01}
                  onChange={handleThicknessFactorChange}
                  display={inputs.thicknessFactor.toFixed(2)}
                  lo={t('form.thin')}
                  hi={t('form.thick')}
                  help={`${t('form.doughBallWeight')}: ${Math.round(inputs.ballWeight)}g (${(inputs.ballWeight * 0.03527396).toFixed(1)}oz)`}
                />
              </div>

              <div className="bp-section">
                <div className="bp-eyebrow"><span className="num">C</span> Baker's percentages</div>
                <Slider
                  label={t('form.hydration')}
                  value={inputs.hydration}
                  min={50}
                  max={85}
                  step={1}
                  onChange={(v) => handleInputChange('hydration', v)}
                  suffix="%"
                />
                <Slider
                  label={t('form.salt')}
                  value={inputs.salt}
                  min={1}
                  max={4}
                  step={0.1}
                  onChange={(v) => handleInputChange('salt', Math.round(v * 10) / 10)}
                  suffix="%"
                />
                <Slider
                  label={t('form.yeast')}
                  value={inputs.yeast}
                  min={0}
                  max={2}
                  step={0.01}
                  onChange={(v) => handleInputChange('yeast', Math.round(v * 100) / 100)}
                  display={`${inputs.yeast.toFixed(2)}%`}
                  suffix="%"
                />
                <div className="bp-field">
                  <label>{t('form.yeastType')}</label>
                  <Pills
                    value={inputs.yeastType}
                    onChange={(v) => handleYeastTypeChange(v as YeastType)}
                    options={[
                      { label: t('form.active'), value: 'active_dry' },
                      { label: t('form.instant'), value: 'instant' },
                      { label: t('form.fresh'), value: 'fresh' },
                    ]}
                  />
                </div>
                <Slider
                  label={t('form.oil')}
                  value={inputs.oil}
                  min={0}
                  max={10}
                  step={0.5}
                  onChange={(v) => handleInputChange('oil', v)}
                  suffix="%"
                />
                <Slider
                  label={t('form.sugar')}
                  value={inputs.sugar}
                  min={0}
                  max={5}
                  step={0.5}
                  onChange={(v) => handleInputChange('sugar', v)}
                  suffix="%"
                />
                <Slider
                  label={t('form.diastaticMalt')}
                  value={inputs.diastaticMalt}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(v) => handleInputChange('diastaticMalt', Math.round(v * 10) / 10)}
                  suffix="%"
                />
                <Slider
                  label="Dough enhancer"
                  value={inputs.doughEnhancer}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(v) => handleInputChange('doughEnhancer', Math.round(v * 10) / 10)}
                  suffix="%"
                />
              </div>

              <div className="bp-section">
                <div className="bp-eyebrow"><span className="num">D</span> {t('form.preferment')}</div>
                <p className="bp-help" style={{ marginBottom: 12 }}>
                  Optional first stage — improves flavor, structure, and shelf life.
                </p>
                <div className="bp-field">
                  <label>{t('form.preferment')}</label>
                  <Pills
                    value={inputs.preferment.type}
                    onChange={(v) => handlePrefermentTypeChange(v as PrefermentType)}
                    options={[
                      { label: t('form.none'), value: 'none' },
                      { label: t('form.poolish'), value: 'poolish' },
                      { label: t('form.biga'), value: 'biga' },
                      { label: 'Sponge', value: 'sponge' },
                      { label: 'Sourdough', value: 'sourdough' },
                    ]}
                  />
                </div>
                {inputs.preferment.type !== 'none' && (
                  <>
                    <Slider
                      label={t('form.prefermentPercentage')}
                      value={inputs.preferment.percentage}
                      min={10}
                      max={100}
                      step={5}
                      onChange={handlePrefermentPercentageChange}
                      suffix="%"
                    />
                    <Slider
                      label={t('form.prefermentHydration')}
                      value={inputs.preferment.hydration}
                      min={50}
                      max={125}
                      step={5}
                      onChange={handlePrefermentHydrationChange}
                      suffix="%"
                      help="Poolish ≈100%, Biga 50–60%, Sponge 65–80%, Sourdough varies"
                    />
                  </>
                )}
              </div>

              <div className="bp-section">
                <HeaderControls />
              </div>
            </div>
          </div>
        </div>

        <div className="bp-sticky">
          {recipe && (
            <RecipePanel
              recipe={recipe}
              styleId={inputs.pizzaStyle}
              numberOfPizzas={inputs.numberOfPizzas}
              ballWeight={inputs.ballWeight}
              hydration={inputs.hydration}
            />
          )}
          <div className="bp-foot">
            {t('app.footer')} ·{' '}
            <a href="https://dogukanatlihan.com" target="_blank" rel="noopener noreferrer">
              Dogukan Atlihan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
