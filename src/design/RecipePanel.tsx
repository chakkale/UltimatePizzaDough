import { useState } from 'react';
import { Icons } from './Icons';
import { round1, round2, gToOz, type Inputs, type Recipe } from './calc';

interface Props {
  recipe: Recipe;
  inputs: Inputs;
}

type Tab = 'ingredients' | 'method' | 'bake';

const prefermentTitle = (t: Inputs['preferment']) =>
  t === 'sourdough' ? 'Levain' : t === 'biga' ? 'Biga' : t === 'poolish' ? 'Poolish' : 'Sponge';

export function RecipePanel({ recipe, inputs }: Props) {
  const [tab, setTab] = useState<Tab>('ingredients');

  const copyRecipe = () => {
    const lines = [
      `${recipe.style.name} Pizza Dough — ${inputs.qty} × ${round1(recipe.ballGrams)}g balls`,
      `Hydration ${inputs.hyd}% · Salt ${inputs.salt}% · Yeast ${inputs.yeast}%`,
      '',
      ...recipe.ingredients.map((i) => `• ${i.name}: ${i.key === 'Y' ? round2(i.g) : round1(i.g)}g (${i.pct}%)`),
      '',
      `Total: ${round1(recipe.totalGrams)}g`,
    ];
    navigator.clipboard?.writeText(lines.join('\n'));
  };

  const findIng = (name: string) => recipe.ingredients.find((i) => i.name === name);

  return (
    <div className="panel">
      <div className="recipe-head">
        <div>
          <div className="eyebrow"><span className="num">02</span> The Recipe</div>
          <div className="h-display">{recipe.style.name} <em>dough</em></div>
        </div>
        <div className="live-dot"><span className="dot" /> LIVE</div>
      </div>

      <div className="recipe-stats">
        <div className="stat">
          <div className="k">Pizzas</div>
          <div className="v">{inputs.qty}</div>
        </div>
        <div className="stat">
          <div className="k">Ball weight</div>
          <div className="v">{round1(recipe.ballGrams)}<small>g</small></div>
        </div>
        <div className="stat">
          <div className="k">Total dough</div>
          <div className="v">{round1(recipe.totalGrams)}<small>g</small></div>
        </div>
        <div className="stat">
          <div className="k">Hydration</div>
          <div className="v">{inputs.hyd}<small>%</small></div>
        </div>
      </div>

      <div className="tabs">
        <button type="button" className={'tab ' + (tab === 'ingredients' ? 'on' : '')} onClick={() => setTab('ingredients')}>
          Ingredients <span className="count">{recipe.ingredients.length}</span>
        </button>
        <button type="button" className={'tab ' + (tab === 'method' ? 'on' : '')} onClick={() => setTab('method')}>
          Method <span className="count">{recipe.preferment ? '2 stages' : '1 stage'}</span>
        </button>
        <button type="button" className={'tab ' + (tab === 'bake' ? 'on' : '')} onClick={() => setTab('bake')}>
          Bake
        </button>
      </div>

      {tab === 'ingredients' && (
        <div>
          <div className="ing-list">
            {recipe.ingredients.map((i, idx) => (
              <div className="ing-row" key={idx}>
                <span className="swatch">{i.key}</span>
                <div className="name">{i.name}<span className="sub">per {inputs.qty}-ball batch</span></div>
                <div className="wt">
                  {i.key === 'Y' ? round2(i.g) : round1(i.g)}g <small>{gToOz(i.g)}oz</small>
                </div>
                <div className="pct">{i.pct}%</div>
              </div>
            ))}
            <div className="ing-row total">
              <span />
              <div className="name">Total dough weight</div>
              <div className="wt">{round1(recipe.totalGrams)}g</div>
              <div className="pct">{round1(recipe.sumPct)}%</div>
            </div>
          </div>

          {recipe.preferment && recipe.mainDough && (
            <>
              <div className="subtotal-section">
                <h4>Stage 1 — {prefermentTitle(inputs.preferment)}</h4>
                <div className="ing-list" style={{ margin: '0 -28px -18px' }}>
                  <div className="ing-row">
                    <span className="swatch">F</span>
                    <div className="name">Flour</div>
                    <div className="wt">{round1(recipe.preferment.flour)}g</div>
                    <div className="pct">{inputs.prefPct}%</div>
                  </div>
                  <div className="ing-row">
                    <span className="swatch">W</span>
                    <div className="name">Water</div>
                    <div className="wt">{round1(recipe.preferment.water)}g</div>
                    <div className="pct">{inputs.prefHyd}%</div>
                  </div>
                  {recipe.preferment.yeast !== null && (
                    <div className="ing-row">
                      <span className="swatch">Y</span>
                      <div className="name">Yeast</div>
                      <div className="wt">{round2(recipe.preferment.yeast)}g</div>
                      <div className="pct">trace</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="subtotal-section" style={{ borderBottom: 0 }}>
                <h4>Stage 2 — Final Dough</h4>
                <div className="ing-list" style={{ margin: '0 -28px 0' }}>
                  <div className="ing-row">
                    <span className="swatch">F</span>
                    <div className="name">Flour</div>
                    <div className="wt">{round1(recipe.mainDough.flour)}g</div>
                    <div className="pct">—</div>
                  </div>
                  <div className="ing-row">
                    <span className="swatch">W</span>
                    <div className="name">Water</div>
                    <div className="wt">{round1(recipe.mainDough.water)}g</div>
                    <div className="pct">—</div>
                  </div>
                  <div className="ing-row">
                    <span className="swatch">S</span>
                    <div className="name">Salt</div>
                    <div className="wt">{round1(recipe.mainDough.salt)}g</div>
                    <div className="pct">—</div>
                  </div>
                  {recipe.mainDough.oil !== null && (
                    <div className="ing-row">
                      <span className="swatch">O</span>
                      <div className="name">Olive Oil</div>
                      <div className="wt">{round1(recipe.mainDough.oil)}g</div>
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
        <div className="method">
          {recipe.preferment && recipe.mainDough ? (
            <>
              <div className="step-group">
                <div className="head">
                  <span className="dot" />
                  <h4>Build the {inputs.preferment}</h4>
                  <span className="time">12–18 hr</span>
                </div>
                <ol>
                  <li>
                    Combine <mark>{round1(recipe.preferment.flour)}g flour</mark> with{' '}
                    <mark>{round1(recipe.preferment.water)}g water</mark>
                    {recipe.preferment.yeast !== null && (
                      <> and <mark>{round2(recipe.preferment.yeast)}g yeast</mark></>
                    )}
                    .
                  </li>
                  <li>Mix until no dry flour remains. Cover and rest at 18–22°C.</li>
                  <li>Ready when domed, bubbly, and slightly collapsed in the center.</li>
                </ol>
              </div>
              <div className="step-group">
                <div className="head">
                  <span className="dot" />
                  <h4>Final dough</h4>
                  <span className="time">30 min mix · 24 hr cold proof</span>
                </div>
                <ol>
                  <li>Add <mark>{round1(recipe.mainDough.water)}g water</mark> to the preferment and break it up.</li>
                  <li>Add <mark>{round1(recipe.mainDough.flour)}g flour</mark> and mix to a shaggy mass.</li>
                  <li>
                    Rest 20 min, then add <mark>{round1(recipe.mainDough.salt)}g salt</mark>
                    {recipe.mainDough.oil !== null && (
                      <> and <mark>{round1(recipe.mainDough.oil)}g oil</mark></>
                    )}
                    .
                  </li>
                  <li>Knead 8–10 min to a smooth, elastic dough.</li>
                  <li>Bulk ferment 1 hr at room temp, then divide into <mark>{inputs.qty}× {round1(recipe.ballGrams)}g</mark> balls.</li>
                  <li>Cold-proof 24–48 hr in oiled containers.</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="step-group">
              <div className="head">
                <span className="dot" />
                <h4>Mix &amp; Knead</h4>
                <span className="time">~30 min + proof</span>
              </div>
              <ol>
                <li>
                  Dissolve <mark>{round1(findIng('Salt')?.g ?? 0)}g salt</mark> in{' '}
                  <mark>{round1(findIng('Water')?.g ?? 0)}g water</mark>.
                </li>
                <li>Add yeast (if used) and stir to dissolve.</li>
                <li>
                  Incorporate <mark>{round1(findIng('Flour')?.g ?? 0)}g flour</mark> a third at a time.
                </li>
                <li>Rest 20 min (autolyse), then knead 8–10 minutes until smooth.</li>
                <li>
                  Bulk ferment 1–2 hr, then divide into <mark>{inputs.qty}× {round1(recipe.ballGrams)}g</mark> balls.
                </li>
                <li>Cold-proof 24–72 hr — flavor improves with time.</li>
                <li>Pull from fridge 1–2 hr before stretching.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {tab === 'bake' && (
        <div className="method">
          <div className="step-group">
            <div className="head">
              <span className="dot" />
              <h4>Oven setup</h4>
              <span className="time">45 min preheat</span>
            </div>
            <ol>
              <li>
                Preheat to{' '}
                <mark>
                  {inputs.styleId === 'neapolitan'
                    ? '500°C / 932°F'
                    : inputs.styleId === 'ny'
                    ? '290°C / 550°F'
                    : inputs.styleId === 'detroit'
                    ? '260°C / 500°F'
                    : '250°C / 480°F'}
                </mark>{' '}
                with stone or steel for ≥45 min.
              </li>
              <li>
                {inputs.styleId === 'detroit' || inputs.styleId === 'sicilian' || inputs.styleId === 'focaccia'
                  ? 'Oil pan generously, press dough to edges.'
                  : 'Stretch dough on a floured peel; do not use a rolling pin.'}
              </li>
              <li>Top sparingly — let the crust speak.</li>
              <li>
                Bake{' '}
                <mark>
                  {inputs.styleId === 'neapolitan'
                    ? '60–90s'
                    : inputs.styleId === 'ny'
                    ? '8–10 min'
                    : inputs.styleId === 'detroit'
                    ? '12–14 min'
                    : '10–14 min'}
                </mark>
                , rotating once if needed.
              </li>
            </ol>
          </div>
        </div>
      )}

      <div className="recipe-actions">
        <button type="button" className="btn grow" onClick={copyRecipe}>
          <Icons.Copy /> Copy recipe
        </button>
        <button type="button" className="btn" onClick={() => window.print()}>
          <Icons.Print /> Print
        </button>
        <button type="button" className="btn btn-primary">
          <Icons.Save /> Save
        </button>
      </div>
    </div>
  );
}
