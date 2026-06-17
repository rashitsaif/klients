interface ErrorStateProps {
  description?: string;
  title?: string;
}

function ErrorState({ description = 'Действие не выполнено, потому что рабочая логика еще не подключена.', title = 'Состояние ошибки' }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-100">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-rose-200/80">{description}</p>
    </div>
  );
}

export default ErrorState;
