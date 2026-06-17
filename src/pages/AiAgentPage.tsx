import PlaceholderPage from './PlaceholderPage';

function AiAgentPage() {
  return (
    <PlaceholderPage
      title="AI-агент"
      eyebrow="placeholder · AI agent"
      description="Здесь позже появится генерация КП, первого сообщения, follow-up и скрипта переписки. Сейчас AI/API не подключаются."
      plannedItems={['backend-функция AI после готовой базы лидов', 'выбор проекта и лида после подключения данных', 'история генераций отдельным этапом']}
      safetyNote="AI-ключи и обращения к AI-провайдерам отсутствуют во frontend."
    />
  );
}

export default AiAgentPage;
