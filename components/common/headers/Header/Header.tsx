'use client';

import css from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import NavigationList from './NavigationList/NavigationList';
import Button from './ui/Button/Button';
import ConfirmModal from '@/components/common/modals/ConfirmModal/ConfirmModal';

import { NavLink } from '@/types/link';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logout } from '@/lib/api/clientApi';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const publicNavLinks: NavLink[] = [
    {
      linkText: 'Головна',
      linkRoute: '/',
    },
    {
      linkText: 'Історії',
      linkRoute: '/stories',
    },
    {
      linkText: 'Мандрівники',
      linkRoute: '/travellers',
    },
  ];

  const isHomePage = pathname === '/';
  const isAuth = pathname === '/auth/register' || pathname === '/auth/login';
  const isAuthenticated = Boolean(user);

  const navLinks: NavLink[] = isAuthenticated
    ? [
        ...publicNavLinks,
        {
          linkText: 'Мій Профіль',
          linkRoute: '/profile',
        },
      ]
    : publicNavLinks;

  const toggleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();

      queryClient.setQueryData(['currentUser'], null);

      setIsLogoutModalOpen(false);

      toast.success('Ви успішно вийшли з акаунта');

      router.push('/auth/login');
      router.refresh();
    } catch {
      toast.error('Не вдалося вийти. Спробуйте ще раз.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    if (!isLoggingOut) {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <div className={clsx(css.absoluteWrapper, isHomePage && css.absolute)}>
        <div className={clsx(css.container, isHomePage && css.homePageStyles)}>
          <header className={css.header}>
            <Link
              className={css.logoLink}
              href="/"
              aria-label="Домашня сторінка"
            >
              <svg className={css.logoIcon} width={156} height={40}>
                <use
                  href={isHomePage ? '/sprite.svg#icon-logo-home' : '/logo.svg'}
                  aria-hidden="true"
                />
              </svg>
            </Link>

            <div className={clsx(css.authHidden, isAuth && css.hidden)}>
              <div className={css.menuControls}>
                <div
                  className={clsx(css.storyPublicBtn, isAuth && css.displayOff)}
                >
                  <Button
                    semanticVariant="link"
                    styleVariant="primary"
                    linkRoute="/stories/create"
                    ariaLabel="Опублікувати історію"
                  >
                    Опублікувати історію
                  </Button>
                </div>

                <Button
                  semanticVariant="button"
                  styleVariant="custom"
                  styleCustomName="menu"
                  buttonType="button"
                  ariaLabel={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
                  isHomePage={isHomePage}
                  handler={toggleMenuOpen}
                >
                  {isMenuOpen ? (
                    <svg className={css.menuIcon} width="24" height="24">
                      <use href="/sprite.svg#icon-close" aria-hidden="true" />
                    </svg>
                  ) : (
                    <svg className={css.menuIcon} width="24" height="24">
                      <use href="/sprite.svg#icon-menu" aria-hidden="true" />
                    </svg>
                  )}
                </Button>
              </div>

              <div className={clsx(css.menu, isMenuOpen && css.menuOpen)}>
                <nav
                  className={clsx(
                    css.navigation,
                    isHomePage && css.homePageStyles,
                  )}
                  aria-label="Сторінки"
                >
                  <NavigationList navItems={navLinks} isHomePage={isHomePage} />
                </nav>

                <div
                  className={clsx(
                    css.authControls,
                    isAuthenticated && css.displayOff,
                  )}
                >
                  <Button
                    semanticVariant="link"
                    styleVariant="custom"
                    styleCustomName="login"
                    linkRoute="/auth/login"
                    ariaLabel="Увійти в застосунок"
                    isHomePage={isHomePage}
                  >
                    Вхід
                  </Button>

                  <Button
                    semanticVariant="link"
                    styleVariant="custom"
                    styleCustomName="register"
                    linkRoute="/auth/register"
                    ariaLabel="Реєстрація"
                    isHomePage={isHomePage}
                  >
                    Реєстрація
                  </Button>
                </div>

                <div
                  className={clsx(
                    css.storyPrivateBtn,
                    isAuthenticated && css.displayOn,
                  )}
                >
                  <Button
                    semanticVariant="link"
                    styleVariant="primary"
                    linkRoute="/stories/create"
                    ariaLabel="Опублікувати історію"
                  >
                    Опублікувати історію
                  </Button>
                </div>

                <div
                  className={clsx(
                    css.userControls,
                    isAuthenticated && css.displayOn,
                  )}
                >
                  <Image
                    className={css.userPhoto}
                    src={user?.avatarUrl || '/images/placeholderImage.webp'}
                    width={32}
                    height={32}
                    alt="Фото профілю"
                  />

                  <p className={css.userName}>{user?.name || "Ім'я"}</p>

                  <span className={css.divider} />

                  <Button
                    semanticVariant="button"
                    styleVariant="custom"
                    styleCustomName="logout"
                    buttonType="button"
                    ariaLabel="Вихід з профілю"
                    handler={handleLogout}
                  >
                    <svg className={css.logoutIcon} width="24" height="24">
                      <use href="/sprite.svg#icon-logout" aria-hidden="true" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {isLogoutModalOpen && (
        <ConfirmModal
          title="Вийти з акаунта?"
          text="Ви впевнені, що хочете вийти з акаунта?"
          confirmButtonText={isLoggingOut ? 'Вихід...' : 'Вийти'}
          cancelButtonText="Скасувати"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </>
  );
}
