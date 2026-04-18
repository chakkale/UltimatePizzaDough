import { useEffect, useMemo, useState } from 'react';
import './design.css';
import { calcRecipe, DEFAULTS, PIZZA_STYLES, round1, round2, gToOz, type Inputs, type StyleId } from './calc';
import { Hero } from './Hero';
import { StylePicker } from './StylePicker';
import { RecipePanel } from './RecipePanel';
import { Tweaks, TWEAK_DEFAULTS, type TweakState } from './Tweaks';
import { Slider, Stepper, Pills } from './controls';
import { Icons } from './Icons';

const STORAGE_KEY = 'pdc.inputs';

function loadInputs(): Inputs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function BetterPizzaApp() {
  const [inputs, setInputs] = useState<Inputs>(loadInputs);
  const [tweaks, setTweaks] = useState<TweakState>(TWEAK_DEFAULTS);
  const [tweakOpen, setTweakOpen] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    el.style.setProperty('--accent', tweaks.accent);
    el.style.setProperty('--density', String(tweaks.density));
    el.style.setProperty('--accent-soft', tweaks.accent + (tweaks.dark ? '33' : '22'));
  }, [tweaks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  }, [inputs]);

  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  const onStyle = (id: StyleId) => {
    const s = PIZZA_STYLES.find((x) => x.id === id);
    if (!s) return;
    setInputs((p) => ({ ...p, styleId: id, hyd: s.hyd, tf: s.tf }));
  };

  const recipe = useMemo(() => calcRecipe(inputs), [inputs]);
  const style = PIZZA_STYLES.find((s) => s.id === inputs.styleId) ?? PIZZA_STYLES[0];
  const isRect = !!style.rect;
  const reset = () => setInputs(DEFAULTS);

  return (
    <div className="bp-root">
      <div className="topbar">
        <div className="brand">
          <span className="mark" />
          <div>
            <div>Better Pizza</div>
            <small>Dough Calculator</small>
          </div>
        </div>
        <div className="topbar-actions">
          <div className="unit-toggle">
            <button type="button" className={!inputs.useInches ? 'on' : ''} onClick={() => set('useInches', false)}>cm·g</button>
            <button type="button" className={inputs.useInches ? 'on' : ''} onClick={() => set('useInches', true)}>in·oz</button>
          </div>
          <button type="button" className="icon-btn" onClick={() => setTweaks({ ...tweaks, dark: !tweaks.dark })} title="Theme">
            {tweaks.dark ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          <button type="button" className="icon-btn" onClick={() => setTweakOpen(!tweakOpen)} title="Tweaks">
            <Icons.Tweak />
          </button>
          <button type="button" className="icon-btn" onClick={reset} title="Reset"><Icons.Reset /></button>
        </div>
      </div>

      <div className={'shell ' + (tweaks.layout === 'stacked' ? 'stacked' : '')}>
        <div>
          <Hero recipe={recipe} />
          <div className="panel">
            <div className="panel-pad">
              <div className="section">
                <div className="eyebrow"><span className="num">A</span> Choose a style</div>
                <div className="h-display">Six classics, <em>one calculator.</em></div>
                <StylePicker value={inputs.styleId} onChange={onStyle} />
              </div>

              <div className="section">
                <div className="eyebrow"><span className="num">B</span> Pan &amp; portions</div>
                <div className="row">
                  <div className="field">
                    <label>Pizzas</label>
                    <Stepper value={inputs.qty} min={1} max={20} onChange={(v) => set('qty', v)} />
                  </div>
                  {isRect ? (
                    <div className="field">
                      <label>Pan size <span className="v">{inputs.panW}×{inputs.panL}cm</span></label>
                      <div className="row" style={{ gap: 8 }}>
                        <Stepper value={inputs.panW} min={10} max={50} onChange={(v) => set('panW', v)} />
                        <Stepper value={inputs.panL} min={10} max={50} onChange={(v) => set('panL', v)} />
                      </div>
                    </div>
                  ) : (
                    <div className="field">
                      <label>Diameter <span className="v">{inputs.diameter}cm · {(inputs.diameter * 0.394).toFixed(1)}″</span></label>
                      <Stepper value={inputs.diameter} min={15} max={50} onChange={(v) => set('diameter', v)} />
                    </div>
                  )}
                </div>
                <Slider
                  label="Crust thickness factor"
                  value={inputs.tf}
                  min={0.03}
                  max={0.15}
                  step={0.01}
                  onChange={(v) => set('tf', round2(v))}
                  suffix=" oz/in²"
                  lo="THIN"
                  hi="THICK"
                  help={`Per pizza: ${round1(recipe.ballGrams)}g (${gToOz(recipe.ballGrams)}oz)`}
                />
              </div>

              <div className="section">
                <div className="eyebrow"><span className="num">C</span> Baker's percentages</div>
                <Slider label="Hydration" value={inputs.hyd} min={50} max={85} step={1} onChange={(v) => set('hyd', v)} suffix="%" />
                <Slider label="Salt" value={inputs.salt} min={1} max={4} step={0.1} onChange={(v) => set('salt', round1(v))} suffix="%" />
                <Slider label="Yeast" value={inputs.yeast} min={0} max={2} step={0.01} onChange={(v) => set('yeast', round2(v))} suffix="%" />
                <div className="field">
                  <label>Yeast type</label>
                  <Pills
                    value={inputs.yeastType}
                    onChange={(v) => set('yeastType', v)}
                    options={[
                      { label: 'Active Dry', value: 'active_dry' },
                      { label: 'Instant', value: 'instant' },
                      { label: 'Fresh', value: 'fresh' },
                    ]}
                  />
                </div>
                <Slider label="Olive oil" value={inputs.oil} min={0} max={10} step={0.5} onChange={(v) => set('oil', v)} suffix="%" />
                <Slider label="Sugar" value={inputs.sugar} min={0} max={5} step={0.5} onChange={(v) => set('sugar', v)} suffix="%" />
                <Slider
                  label="Diastatic malt"
                  value={inputs.malt}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(v) => set('malt', round1(v))}
                  suffix="%"
                  help="Improves browning & fermentation"
                />
              </div>

              <div className="section">
                <div className="eyebrow"><span className="num">D</span> Preferment</div>
                <p className="help" style={{ marginBottom: 14 }}>
                  Optional first stage that improves flavor, structure, and shelf life.
                </p>
                <div className="field">
                  <label>Type</label>
                  <Pills
                    value={inputs.preferment}
                    onChange={(v) => set('preferment', v)}
                    options={[
                      { label: 'None', value: 'none' },
                      { label: 'Poolish', value: 'poolish' },
                      { label: 'Biga', value: 'biga' },
                      { label: 'Sourdough', value: 'sourdough' },
                    ]}
                  />
                </div>
                {inputs.preferment !== 'none' && (
                  <>
                    <Slider
                      label="Pre-fermented flour"
                      value={inputs.prefPct}
                      min={10}
                      max={100}
                      step={5}
                      onChange={(v) => set('prefPct', v)}
                      suffix="%"
                    />
                    <Slider
                      label="Preferment hydration"
                      value={inputs.prefHyd}
                      min={50}
                      max={125}
                      step={5}
                      onChange={(v) => set('prefHyd', v)}
                      suffix="%"
                      help="Poolish ≈100%, Biga 50–60%, Sourdough varies"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 84 }}>
          <RecipePanel recipe={recipe} inputs={inputs} />
          <div className="foot">
            Made by{' '}
            <a href="https://dogukanatlihan.com" target="_blank" rel="noopener noreferrer">Dogukan Atlihan</a>
            {' '}· Recalculates as you type
          </div>
        </div>
      </div>

      <Tweaks state={tweaks} setState={setTweaks} open={tweakOpen} onClose={() => setTweakOpen(false)} />
    </div>
  );
}
