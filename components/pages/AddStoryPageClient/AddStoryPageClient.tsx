'use client';
import * as Yup from 'yup';
import css from './AddStoryPageClient.module.css';
import AddStoryFormUniversal from '../EditStoryPageClient/AddStoryFormUniversal/AddStoryFormUniversal';
import { Category, createStory } from '@/lib/api/clientApi';
import { AddStoryFormUniversalValues } from '@/lib/types/stories';
interface AddStoryPageClientProps {
  categories: Category[];
}

export default function AddStoryPageClient({
  categories,
}: AddStoryPageClientProps) {
  const createStorySchema = Yup.object({
    cover: Yup.mixed<File>()
      .required("Обов'язкове поле")
      .test(
        'fileSize',
        'Максимальний розмір файлу — 2 МБ',
        (file) => !file || file.size <= 2 * 1024 * 1024,
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
    const createdStory = await createStory({
      title: values.title,
      category: values.category,
      article: values.content,
      cover: values.cover!,
    });
    return createdStory;
  };

  return (
    <div className={css.container}>
      {/* <AddStoryForm /> */}
      {
        <AddStoryFormUniversal
          categories={categories}
          editStorySchema={createStorySchema}
          onSubmit={handleSubmit}
        />
      }
    </div>
  );
}
