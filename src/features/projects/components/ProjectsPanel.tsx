import { useState } from 'react';
import { ErrorState, LoadingState } from '../../../components/feedback';
import { Card } from '../../../components/ui';
import { mapProjectFormToCreateInput } from '../../../services/projects';
import type { Project, ProjectFormValues } from '../../../types';
import { ProjectForm } from './ProjectForm';
import { ProjectList } from './ProjectList';
import { useProjects } from '../hooks/useProjects';

export function ProjectsPanel() {
  const { archiveMyProject, createMyProject, error, isLoading, isSaving, projects, updateMyProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (values: ProjectFormValues): Promise<boolean> => {
    setSuccessMessage(null);
    const input = mapProjectFormToCreateInput(values);
    const result = editingProject
      ? await updateMyProject(editingProject.id, input)
      : await createMyProject(input);

    if (!result.error) {
      setSuccessMessage(editingProject ? 'Проект обновлен.' : 'Проект создан.');
      setEditingProject(null);
      return true;
    }

    return false;
  };

  const handleArchive = async (projectId: string) => {
    setSuccessMessage(null);
    const result = await archiveMyProject(projectId);

    if (!result.error) {
      setSuccessMessage('Проект архивирован. Физическое удаление на этом этапе не используется.');
      setEditingProject(null);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">projects · stage 7</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">Проект B2B-услуги</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Проект хранится только для текущего пользователя. Обязательные поля валидируются на frontend и в базе.</p>
        </div>

        <ProjectForm
          disabled={isSaving}
          editingProject={editingProject}
          onCancelEdit={() => setEditingProject(null)}
          onSubmit={handleSubmit}
        />

        {successMessage ? <div className="mt-4 rounded-2xl border border-emerald-700 bg-emerald-950/40 p-4 text-sm text-emerald-200">{successMessage}</div> : null}
      </Card>

      {isLoading ? <LoadingState title="Загружаем проекты" /> : null}
      {error ? <ErrorState title="Ошибка проектов" description={error} /> : null}

      {!isLoading ? (
        <ProjectList
          disabled={isSaving}
          onArchive={handleArchive}
          onEdit={(project) => setEditingProject(project)}
          projects={projects}
        />
      ) : null}
    </div>
  );
}
