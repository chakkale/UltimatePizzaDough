import { Pills } from './controls';

export interface TweakState {
  accent: string;
  density: number;
  layout: 'split' | 'stacked';
  dark: boolean;
}

export const TWEAK_DEFAULTS: TweakState = {
  accent: '#C2582D',
  density: 1,
  layout: 'split',
  dark: false,
};

const ACCENTS = [
  { name: 'Tomato', val: '#C2582D' },
  { name: 'Basil',  val: '#5B7A3A' },
  { name: 'Char',   val: '#2C1810' },
  { name: 'Crust',  val: '#D89A55' },
  { name: 'Plum',   val: '#7A3B5C' },
];

interface Props {
  state: TweakState;
  setState: (s: TweakState) => void;
  open: boolean;
  onClose: () => void;
}

export function Tweaks({ state, setState, open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="tweaks open">
      <h5>
        Tweaks <button type="button" onClick={onClose}>×</button>
      </h5>
      <div className="tw-row">
        <label>Accent</label>
        <div className="swatches">
          {ACCENTS.map((a) => (
            <button
              type="button"
              key={a.val}
              title={a.name}
              className={state.accent === a.val ? 'on' : ''}
              style={{ background: a.val }}
              onClick={() => setState({ ...state, accent: a.val })}
            />
          ))}
        </div>
      </div>
      <div className="tw-row">
        <label>Density</label>
        <Pills
          value={state.density}
          onChange={(v) => setState({ ...state, density: v })}
          options={[
            { label: 'Cozy', value: 0.85 },
            { label: 'Default', value: 1 },
            { label: 'Roomy', value: 1.2 },
          ]}
        />
      </div>
      <div className="tw-row">
        <label>Layout</label>
        <Pills
          value={state.layout}
          onChange={(v) => setState({ ...state, layout: v })}
          options={[
            { label: 'Split', value: 'split' },
            { label: 'Stacked', value: 'stacked' },
          ]}
        />
      </div>
      <div className="tw-row">
        <label>Theme</label>
        <Pills
          value={state.dark ? 'dark' : 'light'}
          onChange={(v) => setState({ ...state, dark: v === 'dark' })}
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
        />
      </div>
    </div>
  );
}
