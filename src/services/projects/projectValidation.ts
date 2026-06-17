import type { ProjectCreateInput, ProjectFormValues } from '../../types';

export type ProjectValidationErrors = Partial<Record<keyof ProjectFormValues, string>>;

const REQUIRED_MESSAGE = 'Заполните обязательное поле.';

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function parseNiches(value: string): string[] {
  return value
    .split(',')
    .map((item) => normalizeText(item))
    .filter(Boolean);
}

export function getEmptyProjectFormValues(): ProjectFormValues {
  return {
    name: '',
    service_description: '',
    target_audience: '',
    offer: '',
    region: '',
    niches: '',
    tone: 'professional',
  };
}

export function validateProjectForm(values: ProjectFormValues): ProjectValidationErrors {
  const errors: ProjectValidationErrors = {};

  if (!normalizeText(values.name)) {
    errors.name = REQUIRED_MESSAGE;
  }

  if (!normalizeText(values.service_description)) {
    errors.service_description = REQUIRED_MESSAGE;
  }

  if (!normalizeText(values.target_audience)) {
    errors.target_audience = REQUIRED_MESSAGE;
  }

  if (!normalizeText(values.offer)) {
    errors.offer = REQUIRED_MESSAGE;
  }

  if (!normalizeText(values.region)) {
    errors.region = REQUIRED_MESSAGE;
  }

  return errors;
}

export function hasProjectValidationErrors(errors: ProjectValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function mapProjectFormToCreateInput(values: ProjectFormValues): ProjectCreateInput {
  return {
    name: normalizeText(values.name),
    service_description: normalizeText(values.service_description),
    target_audience: normalizeText(values.target_audience),
    offer: normalizeText(values.offer),
    region: normalizeText(values.region),
    niches: parseNiches(values.niches),
    tone: normalizeText(values.tone) || 'professional',
  };
}
