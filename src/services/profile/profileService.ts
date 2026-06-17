import { getSupabaseClient } from '../../lib/supabaseClient';
import type { Profile, ProfileUpdateInput } from '../../types';

const PROFILE_COLUMNS = 'id,user_id,email,full_name,company_name,role,created_at,updated_at';

export interface ProfileServiceError {
  message: string;
}

export interface ProfileServiceResult<T> {
  data: T | null;
  error: ProfileServiceError | null;
}

function getMissingClientError(): ProfileServiceError {
  return { message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.' };
}

function getMissingSessionError(): ProfileServiceError {
  return { message: 'User session not found.' };
}

export async function getMyProfile(): Promise<ProfileServiceResult<Profile>> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: null, error: getMissingClientError() };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { data: null, error: userError ?? getMissingSessionError() };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .eq('user_id', userData.user.id)
    .single();

  return { data: data ?? null, error };
}

export async function updateMyProfile(input: ProfileUpdateInput): Promise<ProfileServiceResult<Profile>> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: null, error: getMissingClientError() };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { data: null, error: userError ?? getMissingSessionError() };
  }

  const safeUpdate: ProfileUpdateInput = {
    company_name: input.company_name ?? null,
    full_name: input.full_name ?? null,
  };

  const { data, error } = await supabase
    .from('profiles')
    .update(safeUpdate)
    .eq('user_id', userData.user.id)
    .select(PROFILE_COLUMNS)
    .single();

  return { data: data ?? null, error };
}
