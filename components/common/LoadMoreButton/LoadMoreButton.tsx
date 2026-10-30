import css from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function LoadMoreButton({
  onClick,
  isLoading = false,
}: LoadMoreButtonProps) {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.button}
        onClick={onClick}
        disabled={isLoading || !onClick}
      >
        {isLoading ? 'Завантаження...' : 'Показати ще'}
      </button>
    </div>
  );
}