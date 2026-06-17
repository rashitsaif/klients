import { useCallback, useEffect, useState } from 'react';
import { archiveProject, createProject, listMyProjects, updateProject } from '../../../services/projects';
import type { Project, ProjectCreateInput, ProjectUpdateInput } from '../../../types';

export function useProjects() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const reloadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await listMyProjects();
    setProjects(result.data ?? []);
    setError(result.error?.message ?? null);
    setIsLoading(false);
    return result;
  }, []);

  const createMyProject = useCallback(async (input: ProjectCreateInput) => {
    setIsSaving(true);
    setError(null);
    const result = await createProject(input);
    setError(result.error?.message ?? null);
    await reloadProjects();
    setIsSaving(false);
    return result;
  }, [reloadProjects]);

  const updateMyProject = useCallback(async (projectId: string, input: ProjectUpdateInput) => {
    setIsSaving(true);
    setError(null);
    const result = await updateProject(projectId, input);
    setError(result.error?.message ?? null);
    await reloadProjects();
    setIsSaving(false);
    return result;
  }, [reloadProjects]);

  const archiveMyProject = useCallback(async (projectId: string) => {
    setIsSaving(true);
    setError(null);
    const result = await archiveProject(projectId);
    setError(result.error?.message ?? null);
    await reloadProjects();
    setIsSaving(false);
    return result;
  }, [reloadProjects]);

  useEffect(() => {
    void reloadProjects();
  }, [reloadProjects]);

  return {
    archiveMyProject,
    createMyProject,
    error,
    isLoading,
    isSaving,
    projects,
    reloadProjects,
    updateMyProject,
  };
}
