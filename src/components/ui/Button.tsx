import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
  secondary: 'border border-slate-700 bg-slate-900 text-slate-100 hover:border-cyan-400',
  ghost: 'text-slate-300 hover:bg-slate-900',
};

function Button({ children, className = '', disabled, variant = 'secondary', type = 'button', ...props }: ButtonProps) {
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${variantClasses[variant]} ${disabledClasses} ${className}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
