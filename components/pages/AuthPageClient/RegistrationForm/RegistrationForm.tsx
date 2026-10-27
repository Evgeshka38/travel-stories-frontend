'use client';

import dynamic from 'next/dynamic';

const RegistrationFormContent = dynamic(
  () => import('./RegistrationFormContent'),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function RegistrationForm() {
  return <RegistrationFormContent />;
}
