import PlaceholderPage from './PlaceholderPage';

function LeadsPage() {
  return (
    <PlaceholderPage
      title="Лиды"
      eyebrow="placeholder · leads"
      description="Здесь позже появится таблица найденных или импортированных контактов потенциальных B2B-клиентов. Сейчас реальные лиды не загружаются."
      plannedItems={['таблица лидов после миграций и RLS', 'фильтры по проекту, нише, региону, статусу и контактам', 'карточка лида после отдельного этапа']}
      safetyNote="На экране нет mock-таблицы с псевдореальными клиентами, чтобы не создавать фейковую реализацию."
    />
  );
}

export default LeadsPage;
