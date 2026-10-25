import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './PopularStories.module.css';

export default function PopularStories() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Популярні історії</h2>

      <ul className={css.popularStoriesList}>
        <li className={css.popularStoriesListItem}>
          <TravellersStoriesItem />
        </li>
        <li className={css.popularStoriesListItem}>
          <TravellersStoriesItem />
        </li>
        <li className={css.popularStoriesListItem}>
          <TravellersStoriesItem />
        </li>
      </ul>
    </div>
  );
}
