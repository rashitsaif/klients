import PlaceholderPage from './PlaceholderPage';

function AdminPage() {
  return (
    <PlaceholderPage
      title="Админка"
      eyebrow="placeholder · admin"
      description="Здесь позже появится минимальная read-only админка. Сейчас нет ролей, прав доступа, backend-проверок и админских действий."
      plannedItems={['backend-проверка роли admin до отображения данных', 'просмотр задач и ошибок после audit/backend-этапов', 'без изменения ролей и пользовательских данных в MVP-минимуме']}
      safetyNote="Админка не считается рабочей: без backend-проверки роли здесь нет данных и действий."
    />
  );
}

export default AdminPage;
