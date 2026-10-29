'use client';

import { usePathname } from 'next/navigation';
import Footer from '../Footer/Footer';
import AuthFooter from '../AuthFooter/AuthFooter';

export default function AppFooter() {
  const pathname = usePathname();

  const isAuthPage =
    pathname === '/auth/login' ||
    pathname === '/auth/register' ||
    pathname === '/edit';

  return isAuthPage ? <AuthFooter /> : <Footer />;
}
