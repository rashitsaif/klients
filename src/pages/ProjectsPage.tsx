import { ProjectsPanel } from '../features/projects';
import PlaceholderPage from './PlaceholderPage';

function ProjectsPage() {
  return (
    <PlaceholderPage
      title="Проекты"
      eyebrow="projects · stage 7"
      description="Создайте проект под конкретную B2B-услугу: услуга, аудитория, оффер, регион, ниши и тон коммуникации. Проекты привязаны к текущему пользователю через RLS."
      plannedItems={['лиды будут подключены отдельным этапом', 'импорт и экспорт не входят в этот этап', 'AI-генерация КП будет подключена позже через backend']}
      safetyNote="Физическое удаление проектов не используется: проект архивируется через статус archived. Доступ к чужим проектам ограничен RLS по auth.uid()."
    >
      <ProjectsPanel />
    </PlaceholderPage>
  );
}

export default ProjectsPage;
