import { useCallback, useEffect, useState } from 'react';
import { getMyProfile, updateMyProfile } from '../../../services/profile/profileService';
import type { Profile, ProfileUpdateInput } from '../../../types';

export function useMyProfile() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getMyProfile();
    setProfile(result.data);
    setError(result.error?.message ?? null);
    setIsLoading(false);
  }, []);

  const saveProfile = useCallback(async (input: ProfileUpdateInput) => {
    setIsSaving(true);
    setError(null);

    const result = await updateMyProfile(input);
    setProfile(result.data);
    setError(result.error?.message ?? null);
    setIsSaving(false);

    return result;
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  return {
    error,
    isLoading,
    isSaving,
    profile,
    reloadProfile: loadProfile,
    saveProfile,
  };
}
