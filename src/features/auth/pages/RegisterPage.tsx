import type { FormEvent } from 'react';
import { useState } from 'react';
import { ErrorState } from '../../../components/feedback';
import { Button, Input } from '../../../components/ui';
import { navigateToPath } from '../../../app/router/navigation';
import { useAuth } from '../session/AuthProvider';
import { AuthLayout } from './AuthLayout';

export function RegisterPage() {
  const { authError, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const result = await signUp(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error?.message ?? 'Не удалось создать аккаунт. Проверьте данные.');
      return;
    }

    setSuccessMessage('Аккаунт создан. Проверьте почту, если в Supabase включено подтверждение email.');
  };

  return (
    <AuthLayout title="Регистрация" description="Создайте аккаунт для доступа к приватным маршрутам MVP.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required type="email" value={email} />
        <Input hint="Минимум 6 символов." label="Пароль" minLength={6} name="password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />

        {formError || authError ? <ErrorState title="Ошибка регистрации" description={formError ?? authError ?? undefined} /> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-4 text-sm text-emerald-200">{successMessage}</div> : null}

        <Button disabled={isSubmitting} type="submit" variant="primary">
          {isSubmitting ? 'Создаем...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <div className="mt-4 text-sm">
        <button className="text-cyan-300 hover:text-cyan-200" onClick={() => navigateToPath('/login')} type="button">
          Уже есть аккаунт? Войти
        </button>
      </div>
    </AuthLayout>
  );
}
