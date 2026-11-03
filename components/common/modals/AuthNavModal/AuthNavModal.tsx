'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import css from './AuthNavModal.module.css';

interface AuthNavModalProps {
  onClose: () => void;
}

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AuthNavModal({ onClose }: AuthNavModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;

    const getFocusableElements = () =>
      Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS) ?? [],
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocusedElement?.focus();
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
      <div ref={modalRef} className={css.modal}>
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
