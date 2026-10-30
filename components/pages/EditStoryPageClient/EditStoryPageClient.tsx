'use client';

import * as Yup from 'yup';

import css from './EditStoryPageClient.module.css';
import EditStoryForm from './AddStoryFormUniversal/AddStoryFormUniversal';
import { AddStoryFormUniversalValues, Story } from '@/lib/types/stories';
import { Category, editStory } from '@/lib/api/clientApi';

type EditStoryPageClientProps = {
  story: Story;
  categories: Category[];
};

export default function EditStoryPageClient({
  story,
  categories,
}: EditStoryPageClientProps) {
  const editStorySchema = Yup.object({
    cover: Yup.mixed<File>()
      .nullable()
      .notRequired()
      .test(
        'fileSize',
        'Максимальний розмір файлу — 2 МБ',
        (file) => !file || file.size <= 2 * 1024 * 1024,
      )
      .test(
        'fileType',
        'Допустимі формати: JPEG, PNG або WebP',
        (file) =>
          !file ||
          ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      ),
    title: Yup.string()
      .max(80, 'Максимум 80 символів')
      .trim()
      .required("Обов'язкове поле"),
    category: Yup.string().required('Оберіть категорію'),
    content: Yup.string()
      .trim()
      .min(10, 'Мінімум 10 символів')
      .max(2500, 'Максимум 2500 символів')
      .required("Обов'язкове поле"),
  });

  const handleSubmit = async (values: AddStoryFormUniversalValues) => {
    const editedStory = await editStory({
      title: story.title !== values.title ? values.title : undefined,
      category:
        story.category._id !== values.category ? values.category : undefined,
      article: story.article !== values.content ? values.content : undefined,
      cover: values.cover ? values.cover : undefined,

      id: story._id,
    });

    return editedStory;
  };
  return (
    <div className={css.container}>
      <EditStoryForm
        editingStory={story}
        categories={categories}
        onSubmit={handleSubmit}
        editStorySchema={editStorySchema}
      />
    </div>
  );
}
