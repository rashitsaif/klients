import PlaceholderPage from './PlaceholderPage';

function DashboardPage() {
  return (
    <PlaceholderPage
      title="Dashboard"
      eyebrow="placeholder · будущая приватная зона"
      description="Здесь позже появится обзор проектов, лидов, импортов, экспортов и AI-генераций. Сейчас это пустой экран без авторизации и реальных данных."
      plannedItems={['счетчики проектов и лидов после подключения базы', 'последние задачи и импорты после backend-этапов', 'быстрые действия только после реальной логики']}
      safetyNote="Экран не показывает личный кабинет как рабочий: авторизация еще не подключена."
    />
  );
}

export default DashboardPage;
