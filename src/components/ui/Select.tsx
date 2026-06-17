import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

function Select({ className = '', label, options, ...props }: SelectProps) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        className={`rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
