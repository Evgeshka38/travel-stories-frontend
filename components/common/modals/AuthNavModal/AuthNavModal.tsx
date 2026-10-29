'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import css from './AuthNavModal.module.css';

interface AuthNavModalProps {
  onClose: () => void;
}

export default function AuthNavModal({ onClose }: AuthNavModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-nav-title"
      aria-describedby="auth-nav-text"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg width={24} height={24} aria-hidden="true">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 id="auth-nav-title" className={css.title}>
          Помилка під час збереження
        </h2>

        <p id="auth-nav-text" className={css.text}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>

        <div className={css.buttons}>
          <Link href="/auth/login" className={`${css.link} ${css.login}`}>
            Увійти
          </Link>

          <Link href="/auth/register" className={`${css.link} ${css.register}`}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
