import PlaceholderPage from './PlaceholderPage';

function ImportsPage() {
  return (
    <PlaceholderPage
      title="Импорт контактов"
      eyebrow="placeholder · imports"
      description="Здесь позже появится безопасный импорт CSV/XLSX и списков компаний. На этом этапе загрузка файлов намеренно не реализуется."
      plannedItems={['предпросмотр CSV отдельным этапом без записи в базу', 'backend-валидация и дедупликация после таблицы leads', 'отчет импорта после подключения хранилища данных']}
    />
  );
}

export default ImportsPage;
