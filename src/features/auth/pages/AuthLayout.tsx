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
      <Card title={title} description={description}>
        {children}
      </Card>
      <p className="text-center text-xs text-slate-500">
        Auth работает только через Supabase public anon key. Service role и другие секреты не используются во frontend.
      </p>
    </div>
  );
}
