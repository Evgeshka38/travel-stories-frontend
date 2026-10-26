'use client';
import css from './Header.module.css';
import Link from 'next/link';
import NavigationList from './NavigationList/NavigationList';
import { NavLink } from '@/types/link';
import Button from './ui/Button/Button';
import { useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
  const isAuthenticated = user ? true : false; //! original
  // const isAuthenticated = true; //! test

  const navLinks = isAuthenticated
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

  const handleLogout = () => {};

  return (
    <div className={clsx(css.absoluteWrapper, isHomePage && css.absolute)}>
      <div className={clsx(css.container, isHomePage && css.homePageStyles)}>
        <header className={css.header}>
          <Link className={css.logoLink} href="/" aria-label="Домашня сторінка">
            <svg className={css.logoIcon} width="auto" height="auto">
              <use
                href={isHomePage ? '/sprite.svg/#icon-logo-home' : '/logo.svg'}
                aria-hidden="true"
              ></use>
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
                ariaLabel={!isMenuOpen ? 'Відкрити меню' : 'Закрити меню'}
                isHomePage={isHomePage}
                handler={toggleMenuOpen}
              >
                {!isMenuOpen ? (
                  <svg className={css.menuIcon} width="24" height="24">
                    <use href="/sprite.svg#icon-menu" aria-hidden="true"></use>
                  </svg>
                ) : (
                  <svg className={css.menuIcon} width="24" height="24">
                    <use href="/sprite.svg#icon-close" aria-hidden="true"></use>
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
                  src={
                    user ? `${user.avatarUrl}` : '/images/placeholderImage.webp'
                  }
                  width={32}
                  height={32}
                  alt="Фото профілю"
                  aria-label="Фото користувача"
                />
                <p className={css.userName}>{user ? user.name : "Ім'я"}</p>
                <span className={css.divider}></span>
                <Button
                  semanticVariant="button"
                  styleVariant="custom"
                  styleCustomName="logout"
                  buttonType="button"
                  ariaLabel="Вихід з профілю"
                  handler={handleLogout}
                >
                  <svg className={css.logoutIcon} width="24" height="24">
                    <use
                      href="/sprite.svg#icon-logout"
                      aria-hidden="true"
                    ></use>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
