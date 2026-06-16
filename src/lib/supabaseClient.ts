import { getSupabasePublicEnv, validateSupabasePublicEnv } from '../config';

export interface SupabaseBrowserClientConfig {
  supabaseAnonKey: string;
  supabaseUrl: string;
}

const supabasePublicEnv = getSupabasePublicEnv();

export const supabasePublicEnvValidationErrors = validateSupabasePublicEnv(supabasePublicEnv);
export const isSupabaseConfigured = supabasePublicEnvValidationErrors.length === 0;

export const supabaseClientConfig: SupabaseBrowserClientConfig | null = isSupabaseConfigured
  ? {
      supabaseAnonKey: supabasePublicEnv.supabaseAnonKey,
      supabaseUrl: supabasePublicEnv.supabaseUrl,
    }
  : null;
