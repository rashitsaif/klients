import PlaceholderPage from './PlaceholderPage';

function ExportsPage() {
  return (
    <PlaceholderPage
      title="Экспорт"
      eyebrow="placeholder · exports"
      description="Здесь позже появится выгрузка контактов в CSV/XLSX. Сейчас скачивание файлов не реализуется."
      plannedItems={['CSV-экспорт после рабочей таблицы лидов', 'XLSX-экспорт отдельным этапом', 'backend-проверка прав перед выгрузкой']}
      safetyNote="Экспорт является критической операцией, поэтому здесь нет фейковой кнопки скачивания."
    />
  );
}

export default ExportsPage;
