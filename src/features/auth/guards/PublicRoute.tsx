import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { LoadingState } from '../../../components/feedback';
import { navigateToPath } from '../../../app/router/navigation';
import { useAuth } from '../session/AuthProvider';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateToPath('/dashboard');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <LoadingState title="Проверяем сессию" />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
