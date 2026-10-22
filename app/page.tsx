import { Metadata } from 'next';
import css from './HomePage.module.css';
import HomePageClient from '@/components/pages/HomePageClient/HomePageClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export const metadata: Metadata = {
  title: 'HomePage',
};

export default async function HomePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient
      .query({ queryKey: ['test1'], queryFn: () => 'test1' })
      .catch((error) => console.log(error)),
    queryClient
      .query({ queryKey: ['test2'], queryFn: () => 'test2' })
      .catch((error) => console.log(error)),
    ,
  ]);

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomePageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
