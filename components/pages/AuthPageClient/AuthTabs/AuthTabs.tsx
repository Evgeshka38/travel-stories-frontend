import Link from 'next/link';
import css from './AuthTabs.module.css';

interface AuthTabsProps {
  authType: string;
}

export default function AuthTabs({ authType }: AuthTabsProps) {
  const isRegister = authType === 'register';

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.authTabs}>
          <Link
            href="/auth/register"
            className={`${css.authTabRegister} ${isRegister ? css.active : ''}`}
          >
            Реєстрація
          </Link>
          <Link
            href="/auth/login"
            className={`${css.authTabLogin} ${!isRegister ? css.active : ''}`}
          >
            Вхід
          </Link>
        </div>
      </div>
    </section>
  );
}
