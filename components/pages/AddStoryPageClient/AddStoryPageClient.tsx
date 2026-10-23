'use client';
import AddStoryForm from '@/components/common/AddStoryForm/AddStoryForm';
import css from './AddStoryPageClient.module.css';

export default function AddStoryPageClient() {
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>AddStoryPageClient</h1>
      <AddStoryForm />
    </div>
  );
}
