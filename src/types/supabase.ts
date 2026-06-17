import type { Profile, ProfileUpdateInput } from './profile';
import type { Project, ProjectCreateInput, ProjectUpdateInput } from './project';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: ProfileUpdateInput;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: ProjectCreateInput & {
          id?: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: ProjectUpdateInput;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      profile_role: 'user' | 'admin';
      project_status: 'active' | 'archived';
    };
  };
}
