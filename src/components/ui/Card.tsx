import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`rounded-3xl border border-slate-800 bg-slate-950 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
