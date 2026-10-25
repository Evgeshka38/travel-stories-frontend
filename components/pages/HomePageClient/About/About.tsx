import css from './About.module.css';

export default function About() {
  return (
    <section className={css.container}>
      <h2 className={css.title}>
        Проєкт, створений для тих, хто живе подорожами
      </h2>

      <div className={css.content}>
        <div className={css.description}>
          <p>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об'єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>

          <div className={css.feature}>
            <div className={css.featureHeading}>
              <svg className={css.icon} aria-hidden="true">
                <use href="/sprite.svg#icon-wand-stars" />
              </svg>
              <h3>Наша місія</h3>
            </div>
            <p>
              Об'єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </div>

          <div className={css.feature}>
            <div className={css.featureHeading}>
              <svg className={css.icon} aria-hidden="true">
                <use href="/sprite.svg#icon-luggage" />
              </svg>
              <h3>Автентичні історії</h3>
            </div>
            <p>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </div>

          <div className={css.feature}>
            <div className={css.featureHeading}>
              <svg className={css.icon} aria-hidden="true">
                <use href="/sprite.svg#icon-communication" />
              </svg>
              <h3>Ваша спільнота</h3>
            </div>
            <p>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
