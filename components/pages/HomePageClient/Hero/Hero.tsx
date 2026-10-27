import { useCurrentUser } from '@/hooks/useCurrentUser';
import css from './Hero.module.css';
import clsx from 'clsx';

export default function Hero() {
  const { data: user } = useCurrentUser();

  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>
            Відкрийте світ <br className={css.tabletBr} /> подорожей{' '}
            <br className={css.mobilDesk} /> з нами!
          </h1>
          <p className={css.heroText}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            <br className={css.mobileBr} /> своїми історіями та отримувати
            натхнення для нових пригод. Відкрийте для себе нові місця та
            знайдіть однодумців!
          </p>
          {
            <a
              href="#join-title"
              className={clsx(css.joinBtn, user && css.isHidden)}
            >
              Доєднатись
            </a>
          }
        </div>
      </div>
    </section>
  );
}
