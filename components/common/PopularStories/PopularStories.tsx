import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './PopularStories.module.css';

export default function PopularStories() {
  return (
    <div className={css.container}>
      <h2>Популярні історії</h2>

      <ul>
        <li>
          <TravellersStoriesItem />
        </li>
        <li>
          <TravellersStoriesItem />
        </li>
        <li>
          <TravellersStoriesItem />
        </li>
      </ul>
    </div>
  );
}
