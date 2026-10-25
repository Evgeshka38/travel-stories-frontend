import css from './Join.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Join() {
  return (
    <section className={css.section} aria-labelledby="join-title">
      <div className={css.container}>
        <div className={css.card}>
          <Image
            className={css.bg}
            src="/images/join_2x.jpg"
            alt=""
            fill
            sizes="(min-width: 1440px) 1312px, (min-width: 768px) 704px, 335px"
          />

          <div className={css.content}>
            <h2 id="join-title" className={css.title}>
              Приєднуйтесь до нашої спільноти
            </h2>
            <p className={css.text}>
              Долучайтеся до мандрівників, які діляться своїми історіями та
              надихають на нові пригоди.
            </p>
            <Link className={css.button} href="/auth/register">
              Зареєструватися
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
