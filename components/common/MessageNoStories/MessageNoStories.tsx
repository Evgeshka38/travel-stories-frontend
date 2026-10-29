import css from './MessageNoStories.module.css';

export default function MessageNoStories() {
  return (
    <div className={css.container}>
      <h2>У вас поки немає збережених історій.</h2>
    </div>
  );
}
