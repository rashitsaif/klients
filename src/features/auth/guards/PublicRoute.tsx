import { useEffect } from 'react';
import { LoadingState } from '../../../components/feedback';
import { navigateToPath } from '../../../app/router/routes';
import { useAuth } from '../session/AuthProvider';

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigateToPath('/dashboard');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <LoadingState title="Проверяем сессию" description="Если сессия уже активна, вы будете перенаправлены в личный кабинет." />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
