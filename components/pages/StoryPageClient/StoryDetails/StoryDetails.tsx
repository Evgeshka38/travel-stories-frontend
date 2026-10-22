import { useParams } from 'next/navigation';
import css from './StoryDetails.module.css';

export default function StoryDetails() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={css.container}>
      <h2>{`StoryDetails id: ${id}`}</h2>
    </div>
  );
}
