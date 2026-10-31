import AuthPageClient from '@/components/pages/AuthPageClient/AuthPageClient';
import css from './AuthPage.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Головна - Подорожники',
  openGraph: {
    title: 'Головна - Подорожники',
  },
};

type Props = {
  params: Promise<{ authType: string }>;
};

export default async function AuthPage({ params }: Props) {
  const { authType } = await params;
  if (authType !== 'register' && authType !== 'login') {
    notFound();
  }

  if (authType !== 'register' && authType !== 'login') {
    notFound();
  }

  return (
    <div className={css.page}>
      <main className={css.main}>
        <AuthPageClient authType={authType} />
      </main>
    </div>
  );
}