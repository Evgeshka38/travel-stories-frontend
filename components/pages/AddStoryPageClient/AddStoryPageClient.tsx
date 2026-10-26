'use client';
import AddStoryForm from '@/components/common/AddStoryForm/AddStoryForm';

import css from './AddStoryPageClient.module.css';

export default function AddStoryPageClient() {
  return (
    <div className={css.container}>
      <AddStoryForm />
    </div>
  );
}
