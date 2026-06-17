import { getSupabaseClient } from '../../lib/supabaseClient';
import type { Project, ProjectCreateInput, ProjectUpdateInput } from '../../types';

const PROJECT_COLUMNS = 'id,user_id,name,service_description,target_audience,offer,region,niches,tone,status,created_at,updated_at';

export interface ProjectServiceError {
  message: string;
}

export interface ProjectServiceResult<T> {
  data: T | null;
  error: ProjectServiceError | null;
}

function getMissingClientError(): ProjectServiceError {
  return { message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.' };
}

function getMissingSessionError(): ProjectServiceError {
  return { message: 'User session not found.' };
}

async function getCurrentUserId(): Promise<ProjectServiceResult<string>> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: null, error: getMissingClientError() };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { data: null, error: userError ?? getMissingSessionError() };
  }

  return { data: userData.user.id, error: null };
}

function createBaseProjectQuery() {
  const supabase = getSupabaseClient();
  return supabase?.from('projects') ?? null;
}

export async function listMyProjects(): Promise<ProjectServiceResult<Project[]>> {
  const query = createBaseProjectQuery();

  if (!query) {
    return { data: null, error: getMissingClientError() };
  }

  const userResult = await getCurrentUserId();

  if (!userResult.data) {
    return { data: null, error: userResult.error ?? getMissingSessionError() };
  }

  const { data, error } = await query
    .select(PROJECT_COLUMNS)
    .eq('user_id', userResult.data)
    .order('updated_at', { ascending: false });

  return { data: data ?? [], error };
}

export async function createProject(input: ProjectCreateInput): Promise<ProjectServiceResult<Project>> {
  const query = createBaseProjectQuery();

  if (!query) {
    return { data: null, error: getMissingClientError() };
  }

  const userResult = await getCurrentUserId();

  if (!userResult.data) {
    return { data: null, error: userResult.error ?? getMissingSessionError() };
  }

  const { data, error } = await query
    .insert({
      ...input,
      status: input.status ?? 'active',
      user_id: userResult.data,
    })
    .select(PROJECT_COLUMNS)
    .single();

  return { data: data ?? null, error };
}

export async function updateProject(projectId: string, input: ProjectUpdateInput): Promise<ProjectServiceResult<Project>> {
  const query = createBaseProjectQuery();

  if (!query) {
    return { data: null, error: getMissingClientError() };
  }

  const userResult = await getCurrentUserId();

  if (!userResult.data) {
    return { data: null, error: userResult.error ?? getMissingSessionError() };
  }

  const { data, error } = await query
    .update(input)
    .eq('id', projectId)
    .eq('user_id', userResult.data)
    .select(PROJECT_COLUMNS)
    .single();

  return { data: data ?? null, error };
}

export async function archiveProject(projectId: string): Promise<ProjectServiceResult<Project>> {
  return updateProject(projectId, { status: 'archived' });
}
