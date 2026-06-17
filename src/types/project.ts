export type ProjectStatus = 'active' | 'archived';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  service_description: string;
  target_audience: string;
  offer: string;
  region: string;
  niches: string[];
  tone: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormValues {
  name: string;
  service_description: string;
  target_audience: string;
  offer: string;
  region: string;
  niches: string;
  tone: string;
}

export interface ProjectCreateInput {
  name: string;
  service_description: string;
  target_audience: string;
  offer: string;
  region: string;
  niches: string[];
  tone: string;
  status?: ProjectStatus;
}

export interface ProjectUpdateInput {
  name?: string;
  service_description?: string;
  target_audience?: string;
  offer?: string;
  region?: string;
  niches?: string[];
  tone?: string;
  status?: ProjectStatus;
}
