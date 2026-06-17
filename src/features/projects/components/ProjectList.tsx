import { Badge, Button, Card } from '../../../components/ui';
import type { Project } from '../../../types';

interface ProjectListProps {
  disabled?: boolean;
  onArchive(projectId: string): void;
  onEdit(project: Project): void;
  projects: Project[];
}

function formatNiches(project: Project): string {
  return project.niches.length > 0 ? project.niches.join(', ') : 'Ниши не указаны';
}

export function ProjectList({ disabled = false, onArchive, onEdit, projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-slate-100">Проектов пока нет</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">Создайте первый проект под конкретную B2B-услугу. Данные будут привязаны к текущему пользователю.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <Card className={project.status === 'archived' ? 'opacity-70' : ''} key={project.id}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-100">{project.name}</h3>
                <Badge variant={project.status === 'active' ? 'info' : 'warning'}>{project.status === 'active' ? 'active' : 'archived'}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{project.service_description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled={disabled} onClick={() => onEdit(project)} variant="secondary">
                Редактировать
              </Button>
              <Button disabled={disabled || project.status === 'archived'} onClick={() => onArchive(project.id)} variant="ghost">
                Архивировать
              </Button>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
            <div>
              <dt className="text-slate-500">Аудитория</dt>
              <dd className="mt-1 text-slate-200">{project.target_audience}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Регион</dt>
              <dd className="mt-1 text-slate-200">{project.region}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Оффер</dt>
              <dd className="mt-1 text-slate-200">{project.offer}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Ниши</dt>
              <dd className="mt-1 text-slate-200">{formatNiches(project)}</dd>
            </div>
          </dl>
        </Card>
      ))}
    </div>
  );
}
