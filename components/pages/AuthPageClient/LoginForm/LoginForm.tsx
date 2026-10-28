'use client';

import dynamic from 'next/dynamic';

const LoginFormContent = dynamic(() => import('./LoginFormContent'), {
  ssr: false,
  loading: () => null,
});

export default function LoginForm() {
  return <LoginFormContent />;
}
