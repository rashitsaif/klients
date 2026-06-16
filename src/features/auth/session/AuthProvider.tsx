import type { AuthError, Session, User } from '@supabase/supabase-js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getSupabaseClient, isSupabaseConfigured, supabasePublicEnvValidationErrors } from '../../../lib/supabaseClient';

interface AuthResult {
  error: AuthError | Error | null;
  success: boolean;
}

interface AuthContextValue {
  authError: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  resetPassword(email: string): Promise<AuthResult>;
  session: Session | null;
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<AuthResult>;
  signUp(email: string, password: string): Promise<AuthResult>;
  user: User | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getMissingConfigError() {
  return new Error(`Supabase is not configured: ${supabasePublicEnvValidationErrors.join(' ')}`);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setSession(null);
      setAuthError(isSupabaseConfigured ? null : supabasePublicEnvValidationErrors.join(' '));
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      setSession(data.session ?? null);
      setAuthError(error?.message ?? null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
      setAuthError(null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = getMissingConfigError();
      setAuthError(error.message);
      return { error, success: false };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setSession(data.session ?? null);
    setAuthError(error?.message ?? null);

    return { error, success: !error };
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = getMissingConfigError();
      setAuthError(error.message);
      return { error, success: false };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    setSession(data.session ?? null);
    setAuthError(error?.message ?? null);

    return { error, success: !error };
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = getMissingConfigError();
      setAuthError(error.message);
      return { error, success: false };
    }

    const redirectTo = `${window.location.origin}/login`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setAuthError(error?.message ?? null);

    return { error, success: !error };
  }, []);

  const signOut = useCallback(async (): Promise<AuthResult> => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      const error = getMissingConfigError();
      setAuthError(error.message);
      return { error, success: false };
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
    }
    setAuthError(error?.message ?? null);

    return { error, success: !error };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      authError,
      isAuthenticated: Boolean(session),
      isLoading,
      resetPassword,
      session,
      signIn,
      signOut,
      signUp,
      user: session?.user ?? null,
    }),
    [authError, isLoading, resetPassword, session, signIn, signOut, signUp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
