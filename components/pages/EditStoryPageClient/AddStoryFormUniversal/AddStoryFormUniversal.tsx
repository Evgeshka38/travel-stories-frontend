'use client';

import css from './AddStoryFormUniversal.module.css';

import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { type Category } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import SessionDraft from '@/components/common/SessionDraft/SessionDraft';
import { AddStoryFormUniversalValues, Story } from '@/lib/types/stories';
import { Schema } from 'yup';

const defaultValues: AddStoryFormUniversalValues = {
  title: '',
  category: '',
  content: '',
  cover: null,
};

interface StoryDraft {
  title?: unknown;
  category?: unknown;
  content?: unknown;
}

interface EditStoryFormProps {
  editingStory?: Story;
  categories: Category[];
  editStorySchema: Schema;
  onSubmit: (values: AddStoryFormUniversalValues) => Promise<Story>;
}

function getInitialValues(story?: Story): AddStoryFormUniversalValues {
  if (story)
    return {
      title: story.title,
      category: story.category._id,
      content: story.article,
      cover: story.img,
    };

  const savedDraft = sessionStorage.getItem('add-story-draft');

  if (!savedDraft) {
    return { ...defaultValues };
  }

  try {
    const parsed: unknown = JSON.parse(savedDraft);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      const draft = parsed as StoryDraft;

      return {
        ...defaultValues,
        title: typeof draft.title === 'string' ? draft.title : '',
        category: typeof draft.category === 'string' ? draft.category : '',
        content: typeof draft.content === 'string' ? draft.content : '',
        cover: null,
      };
    }
  } catch {
    sessionStorage.removeItem('add-story-draft');
  }

  return defaultValues;
}

const draftFields = ['title', 'category', 'content'];

export default function AddStoryFormUniversal({
  editingStory,
  categories,
  onSubmit,
  editStorySchema,
}: EditStoryFormProps) {
  const router = useRouter();
  const [coverPreview, setCoverPreview] = useState<string>(
    editingStory ? editingStory.img : '',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [initialValues] = useState<AddStoryFormUniversalValues>(() =>
    getInitialValues(editingStory),
  );

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const handleSubmit = async (values: AddStoryFormUniversalValues) => {
    if (!editingStory && !values.cover) {
      toast.error('Завантажте обкладинку історії');
      return;
    }

    setIsSubmitting(true);

    try {
      const story = await onSubmit(values);

      sessionStorage.removeItem('add-story-draft');
      toast.success(
        editingStory
          ? 'Історію успішно відредаговано'
          : 'Історію успішно створено',
      );
      router.push(`/stories/${story._id}`);
    } catch (error) {
      console.error(
        editingStory
          ? 'Не вдалося відредагувати історію:'
          : 'Не вдалося створити історію:',
        error,
      );
      toast.error(
        editingStory
          ? 'Помилка збереження історії'
          : 'Помилка створення історії ',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${css.section} ${css.editStory}`}>
      <div className={css.container}>
        <h1 className={css.sectionTitle}>Редагувати історію</h1>
        <label className={css.formLabel} htmlFor="cover-upload">
          Обкладинка статті
        </label>

        <Formik
          initialValues={initialValues}
          validationSchema={editStorySchema}
          onSubmit={handleSubmit}
        >
          {({
            resetForm,
            values,
            setFieldValue,
            setFieldTouched,
            errors,
            touched,
            dirty,
          }) => {
            const selectedCategory = categories.find(
              (category) => category._id === values.category,
            );
            const isSaveDisabled = editingStory
              ? isSubmitting || !dirty
              : isSubmitting ||
                !values.title.trim() ||
                !values.category ||
                !values.content.trim() ||
                !values.cover;
            return (
              <Form className={css.storyForm}>
                <SessionDraft
                  storageKey="add-story-draft"
                  fields={draftFields}
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
                      accept="image/jpeg,image/png,image/webp"
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
                      // disabled={isLoadingCategories}
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
                      <span className={css.categoryButtonContent}>
                        {selectedCategory ? selectedCategory.name : 'Категорія'}
                      </span>

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
                      {touched.content && errors.content ? errors.content : ''}
                    </span>
                  </div>
                </div>
                <div className={css.actions}>
                  <button
                    type="submit"
                    className={`${css.saveBtn} ${
                      isSaveDisabled ? css.disabledBtn : ''
                    }`}
                    disabled={isSaveDisabled}
                  >
                    {isSubmitting ? 'Збереження...' : 'Зберегти'}
                  </button>

                  <button
                    type="button"
                    className={css.cancelBtn}
                    onClick={() => {
                      resetForm({ values: defaultValues });
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
      </div>
    </section>
  );
}
