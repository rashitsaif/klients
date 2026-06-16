import PlaceholderPage from './PlaceholderPage';

function SearchJobsPage() {
  return (
    <PlaceholderPage
      title="Задачи поиска"
      eyebrow="placeholder · search jobs"
      description="Здесь позже появятся безопасные задачи поиска по разрешенным источникам. Сейчас нет парсинга, очередей, API и фоновых задач."
      plannedItems={['создание задачи после таблицы search_jobs', 'работа только с источниками, разрешенными ТЗ', 'статусы задач и лог ошибок после backend-этапа']}
      safetyNote="Экран не содержит кнопки запуска поиска, потому что реальная backend-логика еще не реализована."
    />
  );
}

export default SearchJobsPage;
