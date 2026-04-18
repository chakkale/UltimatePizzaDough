import { PIZZA_STYLES, type StyleId } from './calc';
import { Icons } from './Icons';

interface Props {
  value: StyleId;
  onChange: (id: StyleId) => void;
}

export function StylePicker({ value, onChange }: Props) {
  return (
    <div className="style-picker">
      {PIZZA_STYLES.map((s) => (
        <button
          type="button"
          key={s.id}
          className={'style-card ' + (value === s.id ? 'on' : '')}
          onClick={() => onChange(s.id)}
        >
          <div className="img" style={{ backgroundImage: `url(${s.img})` }} />
          <div className="meta">
            <h4 className="name">{s.name}</h4>
            <div className="hint">{s.hint}</div>
          </div>
          <div className="flag"><Icons.Check /></div>
        </button>
      ))}
    </div>
  );
}
