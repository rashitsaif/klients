export type ProfileRole = 'user' | 'admin';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  role: ProfileRole;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateInput {
  full_name?: string | null;
  company_name?: string | null;
}
