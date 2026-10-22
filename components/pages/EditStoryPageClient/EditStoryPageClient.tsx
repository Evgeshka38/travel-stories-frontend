'use client';

import { useParams } from 'next/navigation';
import css from './EditStoryPageClient.module.css';
import AddStoryForm from '@/components/common/AddStoryForm/AddStoryForm';

export default function EditStoryPageClient() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>{`EditStoryPageClient id: ${id}`}</h1>
      <AddStoryForm />
    </div>
  );
}
