'use client';
import css from './Error.module.css';

type Props = {
  error: Error;
  reset?: () => void;
};
export default function Error({ error, reset }: Props) {
  return (
    <div className={css.container}>
      <h2 className={css.heading}>Loading Error</h2>
      <p className={css.errorMessage}>{error.message}</p>
      <button className={css.resetButton} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
