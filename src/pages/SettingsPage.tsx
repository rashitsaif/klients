import PlaceholderPage from './PlaceholderPage';

function SettingsPage() {
  return (
    <PlaceholderPage
      title="Настройки"
      eyebrow="placeholder · settings"
      description="Здесь позже появятся настройки профиля, источников, лимитов и списка исключений. Сейчас настройки не сохраняются."
      plannedItems={['профиль после этапа auth и profiles', 'список исключений отдельным этапом', 'лимиты только после backend-проверок']}
    />
  );
}

export default SettingsPage;
