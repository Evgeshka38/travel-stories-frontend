import css from './PopularStoriesSection.module.css';
import PopularStories from '@/components/common/PopularStories/PopularStories';
import Link from 'next/link';

// todo
export default function PopularStoriesSection() {
  return (
    <div className={css.container}>
      <PopularStories />
      {/* todo: Tab and Pc only */}
      <Link href="/stories">Переглянути всі </Link>
    </div>
  );
}
