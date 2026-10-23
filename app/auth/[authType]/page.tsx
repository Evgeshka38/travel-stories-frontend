import AuthPageClient from '@/components/pages/AuthPageClient/AuthPageClient';
import css from './AuthPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AuthPage',
};

type Props = {
  params: Promise<{ authType: string }>;
};

export default async function AuthPage({ params }: Props) {
  const { authType } = await params;

  return (
    <div className={css.page}>
      <main className={css.main}>
        <AuthPageClient authType={authType} />
      </main>
    </div>
  );
}
