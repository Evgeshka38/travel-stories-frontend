'use client';
import css from './ConfirmModal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  title: string;
  text?: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити"
        >
          <svg className={css.closeIcon} width={24} height={24} aria-hidden="true">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={css.title}>{title}</h2>
        {text && <p className={css.text}>{text}</p>}

        <div className={css.buttons}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button type="button" className={css.confirmButton} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}