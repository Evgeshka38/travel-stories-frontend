'use client';

import css from './AddStoryForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { getCategories, type Category } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

interface CreateStoryValues {
  title: string;
  category: string;
  description: string;
  content: string;
  cover: File | null;
}

const initialValues: CreateStoryValues = {
  title: '',
  category: '',
  description: '',
  content: '',
  cover: null,
};

const createStorySchema = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  category: Yup.string().required('Оберіть категорію'),
  description: Yup.string()
    .min(10, 'Мінімум 10 символів')
    .max(100, 'Максимум 100 символів')
    .required("Обов'язкове поле"),
  content: Yup.string()
    .min(10, 'Мінімум 10 символів')
    .required("Обов'язкове поле"),
});

export default function AddStoryForm() {
  const router = useRouter();
  const [coverPreview, setCoverPreview] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Не вдалося завантажити категорії:', error);
        toast.error('Не вдалося завантажити категорії');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: CreateStoryValues) => {
    console.log(values);
  };

  return (
    <section className={`${css.section} ${css.createStory}`}>
      <div className={css.container}>
        <h1 className={css.sectionTitle}>Створити нову історію</h1>
        <label className={css.formLabel} htmlFor="cover-upload">
          Обкладинка статті
        </label>

        <Formik
          initialValues={initialValues}
          validationSchema={createStorySchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isValid, dirty, errors, touched }) => (
            <Form className={css.storyForm}>
              <div className={css.wrapperForm}>
                <div className={css.coverSection}>
                  <div className={css.coverPreview}>
                    <Image
                      src={coverPreview || '/images/placeholderImage.webp'}
                      alt="Попередній перегляд обкладинки"
                      fill
                      className={css.image}
                    />
                  </div>

                  <input
                    type="file"
                    id="cover-upload"
                    accept="image/*"
                    hidden
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] ?? null;

                      if (file) {
                        setFieldValue('cover', file);
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  <label htmlFor="cover-upload" className={css.uploadBtn}>
                    Завантажити фото
                  </label>
                </div>

                <div
                  className={`${css.field} ${
                    touched.title && errors.title ? css.hasError : ''
                  }`}
                >
                  <label htmlFor="title" className={css.formLabel}>
                    Заголовок
                  </label>

                  <Field
                    className={css.storyInput}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Введіть заголовок історії"
                  />

                  <span className={css.errorMessage}>
                    {touched.title && errors.title ? errors.title : ''}
                  </span>
                </div>

                <div
                  className={`${css.field} ${
                    touched.category && errors.category ? css.hasError : ''
                  }`}
                >
                  <label htmlFor="category" className={css.formLabel}>
                    Категорія
                  </label>

                  <Field
                    as="select"
                    className={css.storyInput}
                    id="category"
                    name="category"
                  >
                    <option value="" disabled>
                      Категорія
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>

                  {/* <ErrorMessage
                    name="category"
                    component="span"
                    className={css.errorMessage}
                  /> */}
                  <span className={css.errorMessage}>
                    {touched.title && errors.title ? errors.title : ''}
                  </span>
                </div>

                <div
                  className={`${css.field} ${css.fieldDescription} ${
                    touched.description && errors.description
                      ? css.hasError
                      : ''
                  }`}
                >
                  <label htmlFor="description" className={css.formLabel}>
                    Короткий опис
                  </label>

                  <Field
                    as="textarea"
                    className={css.description}
                    id="description"
                    name="description"
                    maxLength={100}
                    placeholder="Введіть короткий опис історії"
                  />

                  {/* <ErrorMessage
                    name="description"
                    component="span"
                    className={css.errorMessage}
                  /> */}
                  <p className={css.charsLeft}>
                    Лишилось символів: {100 - values.description.length}
                  </p>
                  <span className={css.errorMessage}>
                    {touched.title && errors.title ? errors.title : ''}
                  </span>
                </div>

                <div
                  className={`${css.field} ${
                    touched.content && errors.content ? css.hasError : ''
                  }`}
                >
                  <label htmlFor="content" className={css.formLabel}>
                    Текст історії
                  </label>

                  <Field
                    as="textarea"
                    className={css.content}
                    id="content"
                    name="content"
                    placeholder="Ваша історія тут"
                  />

                  {/* <ErrorMessage
                    name="content"
                    component="span"
                    className={css.errorMessage}
                  /> */}
                  <span className={css.errorMessage}>
                    {touched.title && errors.title ? errors.title : ''}
                  </span>
                </div>
              </div>
              <div className={css.actions}>
                <button
                  type="submit"
                  className={css.saveBtn}
                  disabled={!dirty || !isValid}
                >
                  Зберегти
                </button>

                <button
                  type="button"
                  className={css.cancelBtn}
                  onClick={() => router.back()}
                >
                  Відмінити
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
