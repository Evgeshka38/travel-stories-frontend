'use client';

import css from './EditStoryPageClient.module.css';
import AddStoryForm from '@/components/common/AddStoryForm/AddStoryForm';

type Props = {
  storyId: string;
};

export default function EditStoryPageClient({ storyId }: Props) {
  return (
    <div className={css.container}>
      <h1>{`Edit story: ${storyId}`}</h1>
      <AddStoryForm />
    </div>
  );
}
