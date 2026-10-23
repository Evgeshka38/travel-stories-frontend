import css from './StoryDetails.module.css';

type Props = {
  storyId: string;
};

export default function StoryDetails({ storyId }: Props) {
  return (
    <div className={css.container}>
      <h2>{`StoryDetails id: ${storyId}`}</h2>
    </div>
  );
}
