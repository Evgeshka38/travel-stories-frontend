import css from './PopularStoriesSection.module.css';
import PopularStories from '@/components/common/PopularStories/PopularStories';
import clsx from 'clsx';
import Link from 'next/link';

export default function PopularStoriesSection() {
  return (
    <section className={clsx(css.container, css.globalLocalStyles)}>
      <PopularStories />
      <Link className={css.link} href="/stories">
        Переглянути всі
      </Link>
    </section>
  );
}
