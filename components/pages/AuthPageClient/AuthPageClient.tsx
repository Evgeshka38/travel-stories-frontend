'use client';

import { useParams } from 'next/navigation';
import css from './AuthPageClient.module.css';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';

export default function AuthPageClient() {
  const { authType } = useParams<{ authType: string }>();
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>{`AuthPageClient type: ${authType}`}</h1>
      {authType === 'register' && <RegistrationForm />}
      {authType === 'login' && <LoginForm />}
    </div>
  );
}
