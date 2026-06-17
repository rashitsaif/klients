interface LoadingStateProps {
  title?: string;
}

function LoadingState({ title = 'Загрузка интерфейса' }: LoadingStateProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-400">
      <div className="mb-3 h-2 w-24 animate-pulse rounded-full bg-cyan-400/50" />
      <p>{title}. Это только UI-состояние, без обращения к API.</p>
    </div>
  );
}

export default LoadingState;
