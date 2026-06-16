import PlaceholderPage from './PlaceholderPage';

function ProjectsPage() {
  return (
    <PlaceholderPage
      title="Проекты"
      eyebrow="placeholder · projects"
      description="Здесь позже пользователь сможет создавать проекты под конкретные B2B-услуги. На этом этапе формы и сохранение не реализуются."
      plannedItems={['создание проекта после auth и таблицы projects', 'редактирование услуги, региона, ниши и оффера', 'привязка лидов к проекту после этапа базы данных']}
    />
  );
}

export default ProjectsPage;
