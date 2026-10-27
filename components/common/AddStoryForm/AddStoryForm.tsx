'use client';

import dynamic from 'next/dynamic';

const AddStoryFormContent = dynamic(() => import('./AddStoryFormContent'), {
  ssr: false,
  loading: () => null,
});

export default function AddStoryForm() {
  return <AddStoryFormContent />;
}
