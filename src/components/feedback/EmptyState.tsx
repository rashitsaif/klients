interface EmptyStateProps {
  description?: string;
  title?: string;
}

function EmptyState({ description = 'Данные появятся после подключения соответствующего backend-этапа.', title = 'Пока пусто' }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
      <h3 className="text-base font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;
