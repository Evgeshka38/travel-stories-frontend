'use client';

import css from './AuthPageClient.module.css';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';
import AuthTabs from './AuthTabs/AuthTabs';

type Props = {
  authType: string;
};

export default function AuthPageClient({ authType }: Props) {
  
  return (
    <div className={css.container}>
      <AuthTabs authType={authType} />
      {authType === 'register' && <RegistrationForm />}
      {authType === 'login' && <LoginForm />}
    </div>
  );
}
