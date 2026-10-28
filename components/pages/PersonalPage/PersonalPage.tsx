'use client';
import React, { useRef, useState } from 'react';
import css from './PersonalPage.module.css';
import Image from 'next/image';
import { updateUser, updateUserAvatar } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UpdateDataFile {
  description: string;
  avatarFile: File | null;
}

export default function PersonalPage() {
  //*state///
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  //?change///
  const router = useRouter();
  const maxLength = 150;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  //!function///

  const updateProfileMutation = useMutation({
    mutationFn: async ({ description, avatarFile }: UpdateDataFile) => {
      if (about.trim()) {
        await updateUser({ description: about.trim() });
      }
      if (avatarFile) {
        await updateUserAvatar(avatarFile);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/');
    },
  });

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfileMutation.mutate({
      description: about,
      avatarFile,
    });
  };

  const handleBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };

  //!--avatar

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Лише фото');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Занадто великий файл');
        return;
      }
      setError('');
      setAvatarFile(file);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
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
            {preview ? (
              <Image
                width={117}
                height={117}
                src={preview}
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
              accept="image/*"
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
            value={about}
            maxLength={maxLength}
            onChange={handleAboutChange}
          />
          <p className={css.counter}>
            Лишилось символів:{maxLength - about.length}
          </p>
          <button
            className={css.buttonForm}
            disabled={about.trim().length === 0}
            type="submit"
          >
            Зберегти
          </button>
        </form>
      </div>
    </div>
  );
}
