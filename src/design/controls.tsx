import type { CSSProperties, ReactNode } from 'react';

interface SliderProps {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
  display?: string;
  lo?: string;
  hi?: string;
  help?: ReactNode;
}

export function Slider({ label, value, min, max, step, onChange, suffix = '', display, lo, hi, help }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="bp-field">
      <label>
        {label} <span className="v">{display ?? `${value}${suffix}`}</span>
      </label>
      <div className="bp-slider-wrap">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ ['--pct' as string]: pct + '%' } as CSSProperties}
        />
        <div className="bp-slider-bounds">
          <span>{lo ?? `${min}${suffix}`}</span>
          <span>{hi ?? `${max}${suffix}`}</span>
        </div>
      </div>
      {help && <p className="bp-help">{help}</p>}
    </div>
  );
}

interface StepperProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}

export function Stepper({ value, min, max, step = 1, onChange }: StepperProps) {
  return (
    <div className="bp-stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))}>−</button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange(v);
        }}
      />
      <button type="button" onClick={() => onChange(Math.min(max, value + step))}>+</button>
    </div>
  );
}

interface PillsProps<T extends string | number> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}

export function Pills<T extends string | number>({ options, value, onChange }: PillsProps<T>) {
  return (
    <div className="bp-pills">
      {options.map((o) => (
        <button
          type="button"
          key={String(o.value)}
          className={value === o.value ? 'on' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
