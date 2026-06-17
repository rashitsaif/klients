import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { LoadingState } from '../../../components/feedback';
import { Card } from '../../../components/ui';
import { navigateToPath } from '../../../app/router/navigation';
import { useAuth } from '../session/AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectPath = encodeURIComponent(window.location.pathname || '/dashboard');
      navigateToPath(`/login?redirect=${redirectPath}`);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <LoadingState title="Проверяем сессию" />;
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold text-white">Нужна авторизация</h2>
          <p className="text-sm text-slate-400">Перенаправляем на страницу входа. Приватные данные не отображаются до проверки сессии.</p>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
