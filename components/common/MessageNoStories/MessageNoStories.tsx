import Link from 'next/link';
import css from './MessageNoStories.module.css';

type Props = {
  text: string;
  buttonText: string;
  href: string;
};

export default function MessageNoStories({ text, buttonText, href }: Props) {
  return (
    <div className={css.container}>
      <p className={css.text}>{text}</p>
      <Link href={href} className={css.button}>
        {buttonText}
      </Link>
    </div>
  );
}
