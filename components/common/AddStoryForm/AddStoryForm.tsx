'use client';

import css from './AddStoryForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { createStory, getCategories, type Category } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import SessionDraft from '../../common/SessionDraft/SessionDraft';

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
  cover: Yup.mixed<File>().required("Обов'язкове поле"),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [initialFormValues, setInitialFormValues] =
    useState<CreateStoryValues>(initialValues);
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    const savedDraft = sessionStorage.getItem('add-story-draft');

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);

        setInitialFormValues({
          ...initialValues,
          title: draft.title ?? '',
          category: draft.category ?? '',
          description: draft.description ?? '',
          content: draft.content ?? '',
          cover: null,
        });
      } catch {
        sessionStorage.removeItem('add-story-draft');
      }
    }

    setIsReady(true);
  }, []);

  const handleSubmit = async (values: CreateStoryValues) => {
    if (!values.cover) {
      toast.error('Завантажте обкладинку історії');
      return;
    }

    setIsSubmitting(true);

    try {
      const story = await createStory({
        title: values.title,
        category: values.category,
        article: values.content,
        cover: values.cover,
      });

      sessionStorage.removeItem('add-story-draft');
      toast.success('Історію успішно створено');
      router.push(`/stories/${story._id}`);
    } catch (error) {
      console.error('Не вдалося створити історію:', error);
      toast.error('Помилка збереження');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${css.section} ${css.createStory}`}>
      <div className={css.container}>
        <h1 className={css.sectionTitle}>Створити нову історію</h1>
        <label className={css.formLabel} htmlFor="cover-upload">
          Обкладинка статті
        </label>
        {isReady && (
          <Formik
            initialValues={initialFormValues}
            validationSchema={createStorySchema}
            onSubmit={handleSubmit}
          >
            {({
              resetForm,
              values,
              setFieldValue,
              setFieldTouched,
              isValid,
              dirty,
              errors,
              touched,
            }) => {
              const selectedCategory = categories.find(
                (category) => category._id === values.category,
              );
              return (
                <Form className={css.storyForm}>
                  <SessionDraft
                    storageKey="add-story-draft"
                    fields={['title', 'category', 'description', 'content']}
                  />
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
                            setFieldValue('cover', file, true);
                            setCoverPreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      <label htmlFor="cover-upload" className={css.uploadBtn}>
                        Завантажити фото
                      </label>
                      <span
                        className={`${css.errorMessage} ${
                          touched.cover && errors.cover ? css.visibleError : ''
                        }`}
                      >
                        {touched.cover && errors.cover ? errors.cover : ''}
                      </span>
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
                      <button
                        type="button"
                        className={css.isOpenCategory}
                        onClick={() => {
                          setFieldTouched('category', true);
                          setIsOpenCategory((prev) => !prev);
                        }}
                        aria-label={
                          isOpenCategory
                            ? 'Закрити список категорій'
                            : 'Відкрити список категорій'
                        }
                      >
                        {selectedCategory ? selectedCategory.name : 'Категорія'}
                        <svg
                          className={`${css.icon} ${isOpenCategory ? css.rotated : ''}`}
                        >
                          <use href="/sprite.svg#icon-arrow-down" />
                        </svg>
                      </button>
                      {isOpenCategory && (
                        <div className={css.categoryDropdown}>
                          {categories.map((category) => (
                            <button
                              className={css.categoryOption}
                              type="button"
                              key={category._id}
                              onClick={() => {
                                setFieldValue('category', category._id);
                                setIsOpenCategory(false);
                              }}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      )}
                      <span className={css.errorMessage}>
                        {touched.category && errors.category
                          ? errors.category
                          : ''}
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

                      <p className={css.charsLeft}>
                        Лишилось символів: {100 - values.description.length}
                      </p>
                      <span className={css.errorMessage}>
                        {touched.description && errors.description
                          ? errors.description
                          : ''}
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

                      <span className={css.errorMessage}>
                        {touched.content && errors.content
                          ? errors.content
                          : ''}
                      </span>
                    </div>
                  </div>
                  <div className={css.actions}>
                    <button
                      type="submit"
                      className={`${css.saveBtn} ${
                        !dirty || !isValid ? css.disabledBtn : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Збереження...' : 'Зберегти'}
                    </button>

                    <button
                      type="button"
                      className={css.cancelBtn}
                      onClick={() => {
                        resetForm({ values: initialValues });
                        setInitialFormValues(initialValues);
                        setCoverPreview('');
                        setIsOpenCategory(false);
                        sessionStorage.removeItem('add-story-draft');
                      }}
                    >
                      Відмінити
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </section>
  );
}
