import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { ErrorState } from '../../components/feedback';
import PlaceholderPage from '../../pages/PlaceholderPage';
import { AuthProvider } from '../../features/auth';
import { getRouteByPath } from './routes';

function getCurrentPath(): string {
  return window.location.pathname || '/';
}

function AppRouter() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const currentRoute = getRouteByPath(currentPath);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(getCurrentPath());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('app:navigation', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('app:navigation', handleLocationChange);
    };
  }, []);

  return (
    <AuthProvider>
      <AppLayout currentPath={currentPath}>
        {currentRoute.element ?? (
          <PlaceholderPage
            title="Страница не найдена"
            eyebrow="404 · placeholder"
            description="Такого маршрута нет в каркасе MVP. Используйте навигацию, чтобы перейти к одному из утвержденных экранов."
            plannedItems={['Без редиректов и скрытой логики', 'Без обращения к API', 'Без фейковых данных']}
            safetyNote="404-экран использует ErrorState только как UI-состояние без логирования и внешних сервисов."
          >
            <ErrorState title="Маршрут отсутствует" />
          </PlaceholderPage>
        )}
      </AppLayout>
    </AuthProvider>
  );
}

export default AppRouter;
