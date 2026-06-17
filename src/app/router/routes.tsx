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
import { ForgotPasswordPage, LoginPage, ProtectedRoute, PublicRoute, RegisterPage } from '../../features/auth';

export interface AppRoute {
  element: ReactNode;
  label: string;
  path: string;
  requiresAuth?: boolean;
  showInNav?: boolean;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/', label: 'Главная', element: <HomePage /> },
  { path: '/login', label: 'Вход', element: <PublicRoute><LoginPage /></PublicRoute>, showInNav: false },
  { path: '/register', label: 'Регистрация', element: <PublicRoute><RegisterPage /></PublicRoute>, showInNav: false },
  { path: '/forgot-password', label: 'Восстановление', element: <PublicRoute><ForgotPasswordPage /></PublicRoute>, showInNav: false },
  { path: '/dashboard', label: 'Dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/projects', label: 'Проекты', element: <ProtectedRoute><ProjectsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/leads', label: 'Лиды', element: <ProtectedRoute><LeadsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/imports', label: 'Импорт', element: <ProtectedRoute><ImportsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/search-jobs', label: 'Задачи поиска', element: <ProtectedRoute><SearchJobsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/exports', label: 'Экспорт', element: <ProtectedRoute><ExportsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/ai-agent', label: 'AI-агент', element: <ProtectedRoute><AiAgentPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/settings', label: 'Настройки', element: <ProtectedRoute><SettingsPage /></ProtectedRoute>, requiresAuth: true },
  { path: '/admin', label: 'Админка', element: <ProtectedRoute><AdminPage /></ProtectedRoute>, requiresAuth: true },
];

export const NAVIGATION_ROUTES = APP_ROUTES.filter((route) => route.showInNav !== false);

export function getRouteByPath(path: string): AppRoute | { element: null } {
  return APP_ROUTES.find((route) => route.path === path) ?? { element: null };
}

export function navigateToPath(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('app:navigation'));
}
