import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import css from './TravellersStoriesItem.module.css';

import { formatDateFromApi } from '@/lib/util/formatUtils';
import placeholderImage from '@/public/images/placeholderImage.webp';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import AuthNavModal from '../modals/AuthNavModal/AuthNavModal';
import {
  addStoryToFavorites,
  getUsersMe,
  removeStoryFromFavorites,
} from '@/lib/api/clientApi';
import { useFavoriteStoriesStore } from '@/lib/store/favoriteStoriesIdsStore';
import Loader from '../Loader/Loader';

import { AddRemoveStoryToFormFavoritesResponse } from '@/lib/types/stories';

type Props = {
  id: string;

  imgUrl: string;
  categoryName: string;
  title: string;
  article: string;

  ownerAvatarUrl: string;
  ownerName: string;
  ownerId: string;

  date: string;
  favoriteCount: number;

  variant: 'save' | 'edit';

  queryKey: QueryKey;
};

function handleError(
  error: AxiosError<AddRemoveStoryToFormFavoritesResponse>,
  fallbackMessage: string,
) {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (data && data.message && typeof data.message === 'string') {
      toast.error(data.message);
    } else {
      toast.error(fallbackMessage);
    }
  }
}

export default function TravellersStoriesItem({
  id,
  imgUrl,
  categoryName,
  title,
  article,
  ownerAvatarUrl,
  ownerName,
  ownerId,
  date,
  favoriteCount,
  variant,
  queryKey,
}: Props) {
  const queryClient = useQueryClient();

  const favoriteStoriesIds = useFavoriteStoriesStore(
    (store) => store.favoriteStoriesIds,
  );

  const setFavoriteStoriesIds = useFavoriteStoriesStore(
    (store) => store.setFavoriteStoriesIds,
  );

  const isSaved = favoriteStoriesIds.includes(id);

  const saveAriaText = isSaved
    ? 'Видалити із збережених історії'
    : 'Додати в збережені історії';

  const { data: currentUser } = useCurrentUser();

  const [isAuthNavModalShown, setAuthNavModalShown] =
    useState<boolean>(false);

  const userMeQuery = useQuery({
    queryKey: ['userMe'],
    queryFn: () => getUsersMe(),
    enabled: !!currentUser,
    retry: 0,
  });

  useEffect(() => {
    const ids = userMeQuery.data?.data?.favorites;

    if (ids) {
      setFavoriteStoriesIds(ids);
    }
  }, [userMeQuery.data, setFavoriteStoriesIds]);

  const saveMutation = useMutation({
    mutationFn: () => addStoryToFavorites(id),

    onSuccess: async (data) => {
      if (data.data) {
        setFavoriteStoriesIds(data.data.user.favorites);
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey,
        }),

        queryClient.invalidateQueries({
          queryKey: ['userMe'],
        }),
      ]);
    },

    onError: (
      error: AxiosError<AddRemoveStoryToFormFavoritesResponse>,
    ) => {
      handleError(error, 'Не вдалося зберегти історію');
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeStoryFromFavorites(id),

    onSuccess: async (data) => {
      if (data.data) {
        setFavoriteStoriesIds(data.data.user.favorites);
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey,
        }),

        queryClient.invalidateQueries({
          queryKey: ['userMe'],
        }),
      ]);
    },

    onError: (
      error: AxiosError<AddRemoveStoryToFormFavoritesResponse>,
    ) => {
      handleError(
        error,
        'Не вдалося видалити історію зі збережених',
      );
    },
  });

  function handleButtonSquareIconClick() {
    if (!currentUser) {
      setAuthNavModalShown(true);
      return;
    }

    if (isSaved) {
      removeMutation.mutate();
      return;
    }

    saveMutation.mutate();
  }

  const isActionPending =
    saveMutation.isPending ||
    removeMutation.isPending ||
    (!!currentUser && userMeQuery.isPending);

  return (
    <>
      <article className={css.container}>
        <Image
          className={css.image}
          alt={'Обкладинка статті ' + title}
          src={imgUrl || placeholderImage}
          width={335}
          height={223}
        />

        <div className={css.infoContainer}>
          <header className={css.mainText}>
            <p className={css.category}>{categoryName}</p>

            <h3 className={css.title}>{title}</h3>

            <p className={css.description}>{article}</p>
          </header>

          <footer className={css.details}>
            <Image
              className={css.authorImage}
              alt={'Фото автора статті - ' + ownerName}
              src={ownerAvatarUrl || placeholderImage}
              width={48}
              height={48}
            />

            <div className={css.detailsRight}>
              <span className={css.authorName}>
                {ownerName}
              </span>

              <div className={css.detailsLine}>
                <time
                  className={css.date}
                  dateTime={date}
                >
                  {formatDateFromApi(date)}
                </time>

                <span
                  className={css.decorationDot}
                  aria-hidden="true"
                />

                <span className={css.favoriteWrapper}>
                  <span className={css.favoriteCount}>
                    {favoriteCount}
                  </span>

                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/sprite.svg#icon-bookmark" />
                  </svg>
                </span>
              </div>
            </div>
          </footer>

          <div className={css.actions}>
            <Link
              href={`/stories/${id}`}
              className={clsx(
                css.button,
                css.buttonWide,
              )}
            >
              Переглянути статтю
            </Link>

            {variant === 'save' && (
              <button
                className={clsx(
                  css.button,
                  css.buttonSquare,
                  isSaved && css.buttonSaved,
                )}
                type="button"
                disabled={isActionPending}
                title={saveAriaText}
                aria-label={saveAriaText}
                name={saveAriaText}
                onClick={handleButtonSquareIconClick}
              >
                {isActionPending ? (
                  <Loader width={22} height={22} />
                ) : (
                  <svg
                    className={css.buttonSquareIcon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href="/sprite.svg#icon-bookmark" />
                  </svg>
                )}
              </button>
            )}

            {variant === 'edit' && (
              <Link
                href={`/stories/${id}/edit`}
                className={clsx(
                  css.button,
                  css.buttonSquare,
                )}
                aria-label="Редагувати історію"
              >
                <svg
                  className={css.buttonSquareIcon}
                  width="24"
                  height="24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="/sprite.svg#icon-edit" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </article>

      {isAuthNavModalShown && (
        <AuthNavModal
          onClose={() => setAuthNavModalShown(false)}
        />
      )}
    </>
  );
}