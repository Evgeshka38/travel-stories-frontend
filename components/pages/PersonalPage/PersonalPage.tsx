'use client';
import React, { useRef, useState } from 'react';
import css from './PersonalPage.module.css';
import Image from 'next/image';
import {
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} from '@/lib/api/clientApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UpdateDataFile {
  description: string;
  avatarFile: File | null;
}

export default function PersonalPage() {
  const [about, setAbout] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const router = useRouter();
  const maxLength = 150;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const validTypeImg = ['image/jpeg', 'image/png', 'image/webp'];
  const avatarMaxSize = 512000;

  const currentAvatar = preview ?? user?.avatarUrl ?? null;

  const updateProfileMutation = useMutation({
    mutationFn: async ({ description, avatarFile }: UpdateDataFile) => {
      if (description !== (user?.description ?? '')) {
        await updateUser({ description });
      }
      if (avatarFile) {
        await updateUserAvatar(avatarFile);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Профіль оновлено');
      router.push('/profile/saved');
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(
        typeof message === 'string'
          ? message
          : 'Не вдалось оновити профіль спробуйте ще раз ',
      );
    },
  });

  const aboutValue = about ?? user?.description ?? '';
  const isDescriptionChange = aboutValue.trim() !== (user?.description ?? '');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfileMutation.mutate({
      description: aboutValue.trim(),
      avatarFile,
    });
  };

  const handleBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validTypeImg.includes(file.type)) {
      toast.error('Дозволені лише формати JPEG, PNG та WebP');
      e.target.value = '';
      setAvatarFile(null);
      setPreview(null);
      return;
    }
    if (file.size > avatarMaxSize) {
      toast.error('Розмір файлу не має перевищувати 500 KiB (512000 bytes)');
      e.target.value = '';
      setAvatarFile(null);
      setPreview(null);
      return;
    }
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={css.container}>
      <div className={css.personalPageWrapper}>
        <h2 className={css.title}>Давайте познайомимось ближче</h2>

        <div className={css.avatarContainer}>
          <p className={css.textAvatar}>Аватар</p>
          <div className={css.personalPageChange}>
            {currentAvatar ? (
              <Image
                width={117}
                height={117}
                src={currentAvatar}
                alt="Ваше фото"
                className={css.avatar}
              />
            ) : (
              <svg width="117" height="117" aria-hidden="true">
                <use href="/sprite.svg#icon-avatar" />
              </svg>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={handleBtnClick}
              className={css.downloadBtn}
            >
              Завантажити фото
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="about" className={css.label}>
            Короткий опис
          </label>
          <textarea
            id="about"
            className={css.textarea}
            placeholder="Розкажіть більше про вас"
            value={aboutValue}
            maxLength={maxLength}
            onChange={handleAboutChange}
          />
          <p className={css.counter}>
            Лишилось символів:{maxLength - aboutValue.length}
          </p>
          <button
            className={css.buttonForm}
            disabled={
              (!isDescriptionChange && !avatarFile) ||
              updateProfileMutation.isPending
            }
            type="submit"
          >
            {updateProfileMutation.isPending ? 'Зберігається...' : 'Зберегти'}
          </button>
        </form>
      </div>
    </div>
  );
}
