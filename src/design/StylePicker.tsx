import { PIZZA_STYLES } from '../utils/doughCalculator';
import { useTranslation } from '../context/TranslationContext';
import { STYLE_IMAGES, STYLE_HINTS } from './styleMeta';
import { Icons } from './Icons';

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export function StylePicker({ value, onChange }: Props) {
  const { t } = useTranslation();
  const styles = PIZZA_STYLES.filter((s) => s.id !== 'custom');

  return (
    <div className="bp-style-picker">
      {styles.map((s) => (
        <button
          type="button"
          key={s.id}
          className={'bp-style-card ' + (value === s.id ? 'on' : '')}
          onClick={() => onChange(s.id)}
        >
          <div className="img" style={{ backgroundImage: `url(${STYLE_IMAGES[s.id]})` }} />
          <div className="meta">
            <div className="name">{t(`style.${s.id}`)}</div>
            <div className="hint">{STYLE_HINTS[s.id]}</div>
          </div>
          <div className="flag"><Icons.Check /></div>
        </button>
      ))}
    </div>
  );
}
