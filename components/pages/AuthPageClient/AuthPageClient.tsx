'use client';

import css from './AuthPageClient.module.css';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';

type Props = {
  authType: string;
};

export default function AuthPageClient({ authType }: Props) {
  return (
    <div className={css.container}>
      {authType === 'register' && <RegistrationForm />}
      {authType === 'login' && <LoginForm />}
    </div>
  );
}
