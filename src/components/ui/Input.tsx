import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hint?: string;
  label?: string;
}

function Input({ className = '', hint, id, label, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="grid gap-2 text-sm text-slate-300" htmlFor={inputId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <input
        className={`rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        id={inputId}
        {...props}
      />
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export default Input;
