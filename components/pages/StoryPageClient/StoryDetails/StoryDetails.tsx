'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import css from './StoryDetails.module.css';
import Loader from '@/components/common/Loader/Loader';
import AuthNavModal from '@/components/common/modals/AuthNavModal/AuthNavModal';
import { addStoryToFavorites, getStoryById } from '@/lib/api/clientApi';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDateFromApi } from '@/lib/util/formatUtils';
import { Story } from '@/lib/types/stories';

type Props = {
  storyId: string;
};

export default function StoryDetails({ storyId }: Props) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthNavModalShown, setAuthNavModalShown] = useState(false);

  const {
    data: story,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => getStoryById(storyId),
    retry: false,
  });

  const { mutate: saveStory, isPending: isSaving } = useMutation({
    mutationFn: () => addStoryToFavorites(storyId),
    onSuccess: (response) => {
      setIsSaved(true);
      queryClient.setQueryData<Story>(['story', storyId], (old) =>
        old
          ? { ...old, favoriteCount: response.data.story.favoriteCount }
          : old,
      );
      toast.success('Історію збережено');
    },
    onError: (error) => {
      const status = isAxiosError(error) ? error.response?.status : undefined;

      if (status === 400) {
        setIsSaved(true);
        toast('Ця історія вже у збережених');
        return;
      }
      if (status === 401) {
        toast.error('Увійдіть, щоб зберігати історії');
        setAuthNavModalShown(true);
        return;
      }
      toast.error('Не вдалося зберегти історію');
    },
  });

  const handleSave = () => {
    if (!currentUser) {
      toast.error('Увійдіть, щоб зберігати історії');
      setAuthNavModalShown(true);
      return;
    }
    saveStory();
  };

  if (isLoading) {
    return (
      <div className={css.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  if (isError || !story) {
    return (
      <p className={css.error}>
        Не вдалося завантажити історію. Спробуйте оновити сторінку.
      </p>
    );
  }

  return (
    <section className={css.section}>
      <div className={css.content1}>
        <h1 className={css.title}>{story.title}</h1>
        <div className={css.meta}>
          <p className={css.metaItem}>
            <span className={css.metaLabel}>Автор статті</span>
            {story.ownerId.name}
          </p>
          <p className={css.metaItem}>
            <span className={css.metaLabel}>Опубліковано</span>
            <time dateTime={story.date}>{formatDateFromApi(story.date)}</time>
          </p>
          <p className={css.category}>{story.category.name}</p>
        </div>

        <Image
          className={css.image}
          src={story.img}
          alt={'Обкладинка історії ' + story.title}
          width={1312}
          height={874}
          sizes="(min-width: 1440px) 1312px, (min-width: 768px) 704px, 335px"
          priority
        />
      </div>

      <div className={css.content2}>
        <p className={css.article}>{story.article}</p>

        <aside className={css.saveBox}>
          <h2 className={css.saveTitle}>Збережіть собі історію</h2>
          <p className={css.saveText}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button
            className={css.saveButton}
            type="button"
            onClick={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaved ? 'Збережено' : isSaving ? 'Зберігаємо…' : 'Зберегти'}
          </button>
        </aside>
      </div>

      {isAuthNavModalShown && (
        <AuthNavModal onClose={() => setAuthNavModalShown(false)} />
      )}
    </section>
  );
}
