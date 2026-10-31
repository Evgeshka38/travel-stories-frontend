import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import './globals.css';

import Header from '@/components/common/headers/Header/Header';
import AppFooter from '@/components/common/footers/AppFooter/AppFooter';
import TanStackProvider from '@/components/providers/TanStackProvider/TanStackProvider';
import { checkSessionServer, getUsersMe } from '@/lib/api/serverApi';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Подорожники',
  description: 'Подорожники - спільнота мандрівників',
  openGraph: {
    title: 'Подорожники',
    description: 'Подорожники - спільнота мандрівників',
  },
};

export default async function RootLayout({
  children,
}: LayoutProps<'/'>) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient
      .query({
        queryKey: ['currentUser'],
        queryFn: () => checkSessionServer(),
      })
      .catch(() => {
        queryClient.setQueryData(['currentUser'], null);
      }),

    queryClient
      .query({
        queryKey: ['userMe'],
        queryFn: () => getUsersMe(),
      })
      .catch(() => undefined),
  ]);

  return (
    <html lang="uk" className={`${inter.variable} ${nunitoSans.variable}`}>
      <body>
        <TanStackProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />

            <div className="page-content">{children}</div>

            <AppFooter />
            <Toaster position="top-right" />
          </HydrationBoundary>
        </TanStackProvider>
      </body>
    </html>
  );
}