import css from './PopularStoriesSection.module.css';
import PopularStories from '@/components/common/PopularStories/PopularStories';
import clsx from 'clsx';
import Link from 'next/link';

// todo
export default function PopularStoriesSection() {
  return (
    <section className={clsx(css.container, css.globalLocalStyles)}>
      <PopularStories />
      {/* todo: Tab and Pc only */}
      <Link href="/stories">Переглянути всі </Link>
    </section>
  );
}
