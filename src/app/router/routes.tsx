import type { ReactNode } from 'react';
import HomePage from '../../pages/HomePage';
import DashboardPage from '../../pages/DashboardPage';
import ProjectsPage from '../../pages/ProjectsPage';
import LeadsPage from '../../pages/LeadsPage';
import ImportsPage from '../../pages/ImportsPage';
import SearchJobsPage from '../../pages/SearchJobsPage';
import ExportsPage from '../../pages/ExportsPage';
import AiAgentPage from '../../pages/AiAgentPage';
import SettingsPage from '../../pages/SettingsPage';
import AdminPage from '../../pages/AdminPage';

export interface AppRoute {
  element: ReactNode;
  label: string;
  path: string;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/', label: 'Главная', element: <HomePage /> },
  { path: '/dashboard', label: 'Dashboard', element: <DashboardPage /> },
  { path: '/projects', label: 'Проекты', element: <ProjectsPage /> },
  { path: '/leads', label: 'Лиды', element: <LeadsPage /> },
  { path: '/imports', label: 'Импорт', element: <ImportsPage /> },
  { path: '/search-jobs', label: 'Задачи поиска', element: <SearchJobsPage /> },
  { path: '/exports', label: 'Экспорт', element: <ExportsPage /> },
  { path: '/ai-agent', label: 'AI-агент', element: <AiAgentPage /> },
  { path: '/settings', label: 'Настройки', element: <SettingsPage /> },
  { path: '/admin', label: 'Админка', element: <AdminPage /> },
];

export const NAVIGATION_ROUTES = APP_ROUTES;

export function getRouteByPath(path: string): AppRoute | { element: null } {
  return APP_ROUTES.find((route) => route.path === path) ?? { element: null };
}

export function navigateToPath(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('app:navigation'));
}
