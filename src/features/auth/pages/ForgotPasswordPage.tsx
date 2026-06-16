import type { FormEvent } from 'react';
import { useState } from 'react';
import { ErrorState } from '../../../components/feedback';
import { Button, Input } from '../../../components/ui';
import { navigateToPath } from '../../../app/router/routes';
import { useAuth } from '../session/AuthProvider';
import { AuthLayout } from './AuthLayout';

export function ForgotPasswordPage() {
  const { authError, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const result = await resetPassword(email);
    setIsSubmitting(false);

    if (!result.success) {
      setFormError(result.error?.message ?? 'Не удалось отправить письмо восстановления.');
      return;
    }

    setSuccessMessage('Письмо восстановления отправлено, если такой email зарегистрирован в Supabase.');
  };

  return (
    <AuthLayout title="Восстановление пароля" description="Введите email, чтобы получить ссылку восстановления через Supabase Auth.">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required type="email" value={email} />

        {formError || authError ? <ErrorState title="Ошибка восстановления" description={formError ?? authError ?? undefined} /> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-4 text-sm text-emerald-200">{successMessage}</div> : null}

        <Button disabled={isSubmitting} type="submit" variant="primary">
          {isSubmitting ? 'Отправляем...' : 'Отправить ссылку'}
        </Button>
      </form>

      <div className="mt-4 text-sm">
        <button className="text-cyan-300 hover:text-cyan-200" onClick={() => navigateToPath('/login')} type="button">
          Вернуться ко входу
        </button>
      </div>
    </AuthLayout>
  );
}
