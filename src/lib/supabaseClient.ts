import { createClient, type SupabaseClient } from '@supabase/supabase-js';
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

let browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseClientConfig) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(supabaseClientConfig.supabaseUrl, supabaseClientConfig.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }

  return browserClient;
}
