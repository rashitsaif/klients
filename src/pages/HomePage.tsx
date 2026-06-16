import { Badge, Button, Card, Input, Select, Table, Textarea, type TableColumn } from '../components/ui';
import { EmptyState, LoadingState } from '../components/feedback';
import { UI_STATUS, UI_STATUS_BADGE_VARIANTS, UI_STATUS_LABELS } from '../constants';

interface ComponentRow {
  name: string;
  purpose: string;
  state: string;
}

const columns: TableColumn<ComponentRow>[] = [
  { key: 'name', label: 'Компонент' },
  { key: 'purpose', label: 'Назначение' },
  { key: 'state', label: 'Статус' },
];

const rows: ComponentRow[] = [
  { name: 'Button', purpose: 'Будущие действия', state: 'disabled готов' },
  { name: 'Input / Textarea / Select', purpose: 'Будущие формы', state: 'без отправки' },
  { name: 'Card / Badge / Table', purpose: 'Каркас интерфейса', state: 'UI only' },
];

function HomePage() {
  return (
    <section className="grid gap-8">
      <Card className="bg-gradient-to-br from-slate-950 via-slate-950 to-cyan-950/30">
        <Badge variant={UI_STATUS_BADGE_VARIANTS[UI_STATUS.PLACEHOLDER]}>
          {UI_STATUS_LABELS[UI_STATUS.PLACEHOLDER]}
        </Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">
          B2B Lead Finder AI — каркас MVP для поиска B2B-клиентов
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Сейчас реализованы маршруты, layout, адаптивная навигация, базовые UI-компоненты и placeholder-состояния.
        </p>
        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
          Auth, база данных, AI/API, парсинг, импорт, экспорт, платежи и реальные данные не подключены.
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-white">Минимальный набор компонентов</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Это UI-слой, а не рабочий личный кабинет и не данные клиентов.</p>
          <div className="mt-5">
            <Table columns={columns} rows={rows} />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-white">Disabled state для будущих форм</h2>
          <div className="mt-5 grid gap-4">
            <Input disabled label="Название проекта" placeholder="Будет доступно позже" />
            <Select disabled label="Статус" options={[{ label: UI_STATUS_LABELS[UI_STATUS.INACTIVE], value: UI_STATUS.INACTIVE }]} />
            <Textarea disabled label="Описание услуги" placeholder="Рабочий ввод появится позже" />
            <Button disabled variant="primary">Сохранение отключено</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LoadingState title="LoadingState готов" />
        <EmptyState title="EmptyState готов" />
      </div>
    </section>
  );
}

export default HomePage;
