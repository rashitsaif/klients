import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hint?: string;
  label?: string;
}

function Textarea({ className = '', hint, id, label, rows = 4, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="grid gap-2 text-sm text-slate-300" htmlFor={textareaId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <textarea
        className={`rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        id={textareaId}
        rows={rows}
        {...props}
      />
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export default Textarea;
