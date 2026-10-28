import css from './Loader.module.css';

interface LoaderProps {
  height?: number;
  width?: number;
}

export default function Loader({ height, width }: LoaderProps) {
  return (
    <div
      className={css.loader}
      style={{ height: height, width: width }}
      role="status"
      aria-label="Завантаження"
    />
  );
}
