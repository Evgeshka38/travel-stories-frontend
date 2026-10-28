import css from './PageToggle.module.css';

interface PageToggleProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function PageToggle({
  onClick,
  isLoading = false,
}: PageToggleProps) {
  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.button}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Завантаження...' : 'Показати ще'}
      </button>
    </div>
  );
}