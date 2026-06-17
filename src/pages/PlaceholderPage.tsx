import type { ReactNode } from 'react';
import { Badge, Card } from '../components/ui';
import { EmptyState } from '../components/feedback';
import { UI_STATUS, UI_STATUS_BADGE_VARIANTS, UI_STATUS_LABELS } from '../constants';

interface PlaceholderPageProps {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  plannedItems: string[];
  safetyNote?: string;
  title: string;
}

function PlaceholderPage({ children, description, eyebrow, plannedItems, safetyNote, title }: PlaceholderPageProps) {
  return (
    <section className="grid gap-6">
      <Card>
        <Badge variant={UI_STATUS_BADGE_VARIANTS[UI_STATUS.PLACEHOLDER]}>
          {UI_STATUS_LABELS[UI_STATUS.PLACEHOLDER]}
        </Badge>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">{description}</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={UI_STATUS_BADGE_VARIANTS[UI_STATUS.OFFLINE]}>
              {UI_STATUS_LABELS[UI_STATUS.OFFLINE]}
            </Badge>
            <Badge variant={UI_STATUS_BADGE_VARIANTS[UI_STATUS.INACTIVE]}>
              {UI_STATUS_LABELS[UI_STATUS.INACTIVE]}
            </Badge>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">Что появится позже</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-400">
            {plannedItems.map((item) => (
              <li className="rounded-2xl border border-slate-800 bg-slate-900 p-4" key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <EmptyState title="Пустое состояние" description="На этом экране нет реальных данных и имитации backend-логики." />
      </div>

      {safetyNote ? <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">{safetyNote}</div> : null}
      {children}
    </section>
  );
}

export default PlaceholderPage;
