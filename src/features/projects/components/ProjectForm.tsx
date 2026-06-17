import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Button, Input, Select, Textarea } from '../../../components/ui';
import {
  getEmptyProjectFormValues,
  hasProjectValidationErrors,
  validateProjectForm,
  type ProjectValidationErrors,
} from '../../../services/projects';
import type { Project, ProjectFormValues } from '../../../types';

interface ProjectFormProps {
  disabled?: boolean;
  editingProject: Project | null;
  onCancelEdit(): void;
  onSubmit(values: ProjectFormValues): Promise<boolean>;
}

function mapProjectToFormValues(project: Project | null): ProjectFormValues {
  if (!project) {
    return getEmptyProjectFormValues();
  }

  return {
    name: project.name,
    service_description: project.service_description,
    target_audience: project.target_audience,
    offer: project.offer,
    region: project.region,
    niches: project.niches.join(', '),
    tone: project.tone,
  };
}

export function ProjectForm({ disabled = false, editingProject, onCancelEdit, onSubmit }: ProjectFormProps) {
  const [errors, setErrors] = useState<ProjectValidationErrors>({});
  const [values, setValues] = useState<ProjectFormValues>(() => mapProjectToFormValues(editingProject));

  useEffect(() => {
    setValues(mapProjectToFormValues(editingProject));
    setErrors({});
  }, [editingProject]);

  const setFieldValue = (field: keyof ProjectFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateProjectForm(values);
    setErrors(nextErrors);

    if (hasProjectValidationErrors(nextErrors)) {
      return;
    }

    const success = await onSubmit(values);

    if (success && !editingProject) {
      setValues(getEmptyProjectFormValues());
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input
        disabled={disabled}
        label="Название проекта *"
        onChange={(event) => setFieldValue('name', event.target.value)}
        placeholder="Например: Бухгалтерия для ИП"
        value={values.name}
      />
      {errors.name ? <p className="text-xs text-rose-300">{errors.name}</p> : null}

      <Textarea
        disabled={disabled}
        label="Описание B2B-услуги *"
        onChange={(event) => setFieldValue('service_description', event.target.value)}
        placeholder="Что продаем и какую проблему бизнеса решаем"
        value={values.service_description}
      />
      {errors.service_description ? <p className="text-xs text-rose-300">{errors.service_description}</p> : null}

      <Textarea
        disabled={disabled}
        label="Целевая аудитория *"
        onChange={(event) => setFieldValue('target_audience', event.target.value)}
        placeholder="Кому подходит услуга"
        value={values.target_audience}
      />
      {errors.target_audience ? <p className="text-xs text-rose-300">{errors.target_audience}</p> : null}

      <Textarea
        disabled={disabled}
        label="Оффер *"
        onChange={(event) => setFieldValue('offer', event.target.value)}
        placeholder="Короткое коммерческое предложение"
        value={values.offer}
      />
      {errors.offer ? <p className="text-xs text-rose-300">{errors.offer}</p> : null}

      <Input
        disabled={disabled}
        label="Регион *"
        onChange={(event) => setFieldValue('region', event.target.value)}
        placeholder="Например: Москва и область"
        value={values.region}
      />
      {errors.region ? <p className="text-xs text-rose-300">{errors.region}</p> : null}

      <Input
        disabled={disabled}
        hint="Через запятую. Например: кафе, салоны красоты, ремонт"
        label="Ниши"
        onChange={(event) => setFieldValue('niches', event.target.value)}
        value={values.niches}
      />

      <Select
        disabled={disabled}
        label="Тон коммуникации"
        onChange={(event) => setFieldValue('tone', event.target.value)}
        options={[
          { label: 'Деловой', value: 'professional' },
          { label: 'Дружелюбный', value: 'friendly' },
          { label: 'Короткий и прямой', value: 'direct' },
        ]}
        value={values.tone}
      />

      <div className="flex flex-wrap gap-3">
        <Button disabled={disabled} type="submit" variant="primary">
          {editingProject ? 'Сохранить проект' : 'Создать проект'}
        </Button>
        {editingProject ? (
          <Button disabled={disabled} onClick={onCancelEdit} type="button" variant="ghost">
            Отменить редактирование
          </Button>
        ) : null}
      </div>
    </form>
  );
}
