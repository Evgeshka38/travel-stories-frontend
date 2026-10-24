import css from './Hero.module.css';

export default function Hero() {
  return (
    <div className={css.container}>
      <section className={css.hero}>
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
        </div>
        <a href="#join-section" className={css.joinBtn}>
          Доєднатись
        </a>
      </section>
    </div>
  );
}
