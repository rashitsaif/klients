import type { ReactNode } from 'react';
import { Card } from '../../../components/ui';

interface AuthLayoutProps {
  children: ReactNode;
  description: string;
  title: string;
}

export function AuthLayout({ children, description, title }: AuthLayoutProps) {
  return (
    <div className="mx-auto grid max-w-xl gap-6">
      <Card>
        <div className="mb-6 grid gap-2">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        {children}
      </Card>
      <p className="text-center text-xs text-slate-500">
        Auth uses Supabase public anon key only. Frontend code must not contain service role or provider secrets.
      </p>
    </div>
  );
}
