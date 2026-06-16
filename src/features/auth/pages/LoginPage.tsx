import type { FormEvent } from 'react';
import { useState } from 'react';
import { ErrorState } from '../../../components/feedback';
import { Button, Input } from '../../../components/ui';
import { navigateToPath } from '../../../app/router/routes';
import { useAuth } from '../session/AuthProvider';
import { AuthLayout } from './AuthLayout';

function getRedirectPath() {
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  return redirect && redirect.startsWith('/') ? redirect : '/dashboard';
}

export function LoginPage() {
  const { authError, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error?.message ?? 'Не удалось войти. Проверьте email и пароль.');
      return;
    }

    navigateToPath(getRedirectPath());
  };

  return (
    <AuthLayout title="Вход" description="Войдите, чтобы открыть личный кабинет и приватные маршруты MVP.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required type="email" value={email} />
        <Input label="Пароль" minLength={6} name="password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />

        {formError || authError ? <ErrorState title="Ошибка входа" description={formError ?? authError ?? undefined} /> : null}

        <Button disabled={isSubmitting} type="submit" variant="primary">
          {isSubmitting ? 'Входим...' : 'Войти'}
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <button className="text-cyan-300 hover:text-cyan-200" onClick={() => navigateToPath('/register')} type="button">
          Создать аккаунт
        </button>
        <button className="text-slate-400 hover:text-slate-200" onClick={() => navigateToPath('/forgot-password')} type="button">
          Забыли пароль?
        </button>
      </div>
    </AuthLayout>
  );
}
