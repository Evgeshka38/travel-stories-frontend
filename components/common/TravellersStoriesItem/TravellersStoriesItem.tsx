import Image from 'next/image';
import css from './TravellersStoriesItem.module.css';
import Link from 'next/link';

export default function TravellersStoriesItem() {
  return (
    <div className={css.container}>
      <Image
        className={css.image}
        alt="Будівлі побудовані на воді"
        src="https://ftp.goit.study/img/travel-blog/68498236a100312bea079039.webp"
        width={335}
        height={223}
      />
      <div className={css.mainText}>
        <p className={css.category}>Європа</p>
        <h3 className={css.title}>
          Венеція без туристів: маршрути для справжніх мандрівників
        </h3>
        <p className={css.description}>
          Венеція — це не лише площа Святого Марка і гондоли на Канале Ґранде.
          Ми вирішили дослідити місто з іншого боку — вулицями, де не ходять
          натовпи
        </p>
      </div>
      <div className={css.details}>
        <Image
          className={css.authorImage}
          alt="Жінка із русявим волоссям"
          src="https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd009.webp"
          width={48}
          height={48}
        />
        <div className={css.detailsRight}>
          <p className={css.authorName}>Анастасія Олійник</p>
          <div className={css.detailsLine}>
            <p className={css.date}>27.03.2025</p>
            <div className={css.decorationDot} />
            <p className={css.favoriteCount}>5</p>
            <svg className={css.favoriteIcon} width="16" height="16">
              <use href={'/sprite.svg#icon-bookmark'} />
            </svg>
          </div>
        </div>
      </div>
      <div className={css.actions}>
        <Link href="/stories/123">Переглянути статтю</Link>
        <button
          type="button"
          title="Додати в збережені історії | Видалити із збережених історій"
          aria-label="Додати в збережені історії | Видалити із збережених історій"
          name="Додати в збережені історії | Видалити із збережених історій"
          onClick={() => alert('todo')}
        >
          <svg className={css.saveStory} width="24" height="24">
            <use href={'/sprite.svg#icon-bookmark'} />
          </svg>
        </button>
      </div>
    </div>
  );
}
