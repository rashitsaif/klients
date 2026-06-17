import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ErrorState, LoadingState } from '../../../components/feedback';
import { Badge, Button, Card, Input } from '../../../components/ui';
import { useMyProfile } from '../hooks/useMyProfile';

export function ProfilePanel() {
  const { error, isLoading, isSaving, profile, saveProfile } = useMyProfile();
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.company_name ?? '');
      setFullName(profile.full_name ?? '');
    }
  }, [profile]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);

    const result = await saveProfile({
      company_name: companyName.trim() || null,
      full_name: fullName.trim() || null,
    });

    if (!result.error) {
      setSuccessMessage('Профиль сохранен. Role не отправляется с клиента.');
    }
  };

  if (isLoading) {
    return <LoadingState title="Загружаем профиль" description="Профиль читается только для текущего пользователя." />;
  }

  if (!profile) {
    return <ErrorState title="Профиль не найден" description={error ?? 'Проверьте миграцию profiles.'} />;
  }

  return (
    <Card title="Профиль" description="Можно менять только имя и компанию. Role доступна только для чтения.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500">Email</span>
            <span className="text-slate-200">{profile.email}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500">Role</span>
            <Badge variant={profile.role === 'admin' ? 'warning' : 'info'}>{profile.role}</Badge>
          </div>
        </div>

        <Input label="Имя" name="full_name" onChange={(event) => setFullName(event.target.value)} value={fullName} />
        <Input label="Компания" name="company_name" onChange={(event) => setCompanyName(event.target.value)} value={companyName} />

        {error ? <ErrorState title="Ошибка профиля" description={error} /> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-4 text-sm text-emerald-200">{successMessage}</div> : null}

        <Button disabled={isSaving} type="submit" variant="primary">
          {isSaving ? 'Сохраняем...' : 'Сохранить профиль'}
        </Button>
      </form>
    </Card>
  );
}
