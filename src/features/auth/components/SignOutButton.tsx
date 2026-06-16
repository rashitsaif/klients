import { useState } from 'react';
import { navigateToPath } from '../../../app/router/routes';
import { Button } from '../../../components/ui';
import { useAuth } from '../session/AuthProvider';

export function SignOutButton() {
  const { isAuthenticated, signOut, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    setIsSubmitting(true);
    const result = await signOut();
    setIsSubmitting(false);

    if (result.success) {
      navigateToPath('/login');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-48 truncate text-xs text-slate-500 sm:inline">{user?.email}</span>
      <Button disabled={isSubmitting} onClick={handleSignOut} variant="ghost">
        {isSubmitting ? 'Выходим...' : 'Выйти'}
      </Button>
    </div>
  );
}
