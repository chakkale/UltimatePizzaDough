import { round1, type Recipe } from './calc';

export function Hero({ recipe }: { recipe: Recipe }) {
  return (
    <div className="hero-card">
      <div className="strip">
        <div className="copy">
          <div className="eyebrow"><span className="num">01</span> Pizza Dough Calculator · v2</div>
          <h1>Better dough,<br /><em>by the gram.</em></h1>
          <p className="lede">
            A baker's-percentage workshop for pizza. Pick a style, dial in the variables,
            get a precise recipe and method — calibrated as you type.
          </p>
          <div className="meta-row">
            <span>{recipe.style.name}</span>
            <span>{round1(recipe.totalGrams)}g batch</span>
            <span>{recipe.ingredients.length} ingredients</span>
          </div>
        </div>
        <div className="img-wrap" style={{ backgroundImage: `url(${recipe.style.img})` }}>
          <div className="badge">{recipe.style.name}</div>
        </div>
      </div>
    </div>
  );
}
