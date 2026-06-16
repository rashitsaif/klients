export interface SupabasePublicEnv {
  supabaseAnonKey: string;
  supabaseUrl: string;
}

export const SUPABASE_PUBLIC_ENV_KEYS = {
  anonKey: 'VITE_SUPABASE_ANON_KEY',
  url: 'VITE_SUPABASE_URL',
} as const;

function readPublicEnvValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidUrl(value: string): boolean {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'https:' || parsedUrl.hostname === 'localhost';
  } catch {
    return false;
  }
}

export function getSupabasePublicEnv(): SupabasePublicEnv {
  return {
    supabaseAnonKey: readPublicEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY),
    supabaseUrl: readPublicEnvValue(import.meta.env.VITE_SUPABASE_URL),
  };
}

export function validateSupabasePublicEnv(env: SupabasePublicEnv = getSupabasePublicEnv()): string[] {
  const errors: string[] = [];

  if (!env.supabaseUrl) {
    errors.push(`${SUPABASE_PUBLIC_ENV_KEYS.url} is required.`);
  } else if (!isValidUrl(env.supabaseUrl)) {
    errors.push(`${SUPABASE_PUBLIC_ENV_KEYS.url} must be a valid https URL or localhost URL.`);
  }

  if (!env.supabaseAnonKey) {
    errors.push(`${SUPABASE_PUBLIC_ENV_KEYS.anonKey} is required.`);
  }

  return errors;
}
