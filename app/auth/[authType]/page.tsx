import AuthPageClient from '@/components/pages/AuthPageClient/AuthPageClient';
import css from './AuthPage.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ authType: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { authType } = await params;

  if (authType === 'login')
    return {
      title: 'Вхід - Подорожники',
      openGraph: {
        title: 'Вхід - Подорожники',
      },
    };

  if (authType === 'register')
    return {
      title: 'Реєстрація - Подорожники',
      openGraph: {
        title: 'Реєстрація - Подорожники',
      },
    };

  return {
    title: 'Подорожники',
    openGraph: {
      title: 'Подорожники',
    },
  };
}

export default async function AuthPage({ params }: Props) {
  const { authType } = await params;

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
