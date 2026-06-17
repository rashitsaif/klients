import { ProfilePanel } from '../features/profile/components/ProfilePanel';
import PlaceholderPage from './PlaceholderPage';

function SettingsPage() {
  return (
    <PlaceholderPage
      title="Настройки"
      eyebrow="profiles · settings"
      description="На этом этапе подключен только профиль пользователя. Остальные настройки будут добавлены отдельными безопасными этапами."
      plannedItems={['профиль текущего пользователя через RLS', 'список исключений отдельным этапом', 'лимиты только после backend-проверок']}
      safetyNote="Role отображается только для чтения. Клиент обновляет только full_name и company_name."
    >
      <ProfilePanel />
    </PlaceholderPage>
  );
}

export default SettingsPage;
