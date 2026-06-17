import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'info' | 'warning' | 'neutral' | 'disabled';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  info: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  neutral: 'border-slate-600 bg-slate-800 text-slate-200',
  disabled: 'border-slate-700 bg-slate-900 text-slate-500',
};

function Badge({ children, className = '', variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export default Badge;
