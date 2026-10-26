import Image from 'next/image';
import css from './TravellersStoriesItem.module.css';
import Link from 'next/link';

import storyImg from '@/public/images/story_1.webp';
import avatarImg from '@/public/images/avatar_1.webp';
import clsx from 'clsx';

export default function TravellersStoriesItem() {
  return (
    <article className={css.container}>
      <Image
        className={css.image}
        alt="Будівлі побудовані на воді"
        src={storyImg}
        width={335}
        height={223}
      />
      <div className={css.infoContainer}>
        <header className={css.mainText}>
          <p className={css.category}>Європа</p>
          <h3 className={css.title}>
            Венеція без туристів: маршрути для справжніх мандрівників
          </h3>
          <p className={css.description}>
            Венеція — це не лише площа Святого Марка і гондоли на Канале Ґранде.
            Ми вирішили дослідити місто з іншого боку — вулицями, де не ходять
            натовпи
          </p>
        </header>
        <footer className={css.details}>
          <Image
            className={css.authorImage}
            alt="Жінка із русявим волоссям"
            src={avatarImg}
            width={48}
            height={48}
          />
          <div className={css.detailsRight}>
            <span className={css.authorName}>Анастасія Олійник</span>
            <div className={css.detailsLine}>
              <time className={css.date} dateTime="2025-03-27">
                27.03.2025
              </time>
              <span className={css.decorationDot} aria-hidden="true" />
              <span className={css.favoriteWrapper}>
                <span className={css.favoriteCount}>5</span>
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href={'/sprite.svg#icon-bookmark'} />
                </svg>
              </span>
            </div>
          </div>
        </footer>
        <div className={css.actions}>
          <Link
            href="/stories/123"
            className={clsx(css.button, css.buttonWide)}
          >
            Переглянути статтю
          </Link>
          <button
            className={clsx(css.button, css.buttonSquare)}
            type="button"
            title="Додати в збережені історії"
            aria-label="Додати в збережені історії"
            name="Додати в збережені історії"
          >
            <svg
              className={css.buttonSquareIcon}
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <use href={'/sprite.svg#icon-bookmark'} />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
