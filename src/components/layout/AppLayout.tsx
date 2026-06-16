import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button } from '../ui';
import { NAVIGATION_ROUTES, navigateToPath } from '../../app/router/routes';

interface AppLayoutProps {
  children: ReactNode;
  currentPath: string;
}

function AppLayout({ children, currentPath }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigateToPath(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button className="text-left" onClick={() => handleNavigate('/')} type="button">
            <span className="block text-base font-bold text-white">B2B Lead Finder AI</span>
            <span className="block text-xs text-slate-500">MVP shell</span>
          </button>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Основная навигация">
            {NAVIGATION_ROUTES.map((route) => (
              <button
                className={`rounded-xl px-3 py-2 text-sm transition ${currentPath === route.path ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                key={route.path}
                onClick={() => handleNavigate(route.path)}
                type="button"
              >
                {route.label}
              </button>
            ))}
          </nav>

          <Button className="lg:hidden" onClick={() => setIsMenuOpen((value) => !value)} variant="secondary">
            Меню
          </Button>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-slate-800 px-4 py-3 lg:hidden" aria-label="Мобильная навигация">
            <div className="grid gap-2">
              {NAVIGATION_ROUTES.map((route) => (
                <button
                  className={`rounded-xl px-3 py-2 text-left text-sm ${currentPath === route.path ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                  type="button"
                >
                  {route.label}
                </button>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default AppLayout;
