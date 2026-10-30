import Image from 'next/image';
import css from './TravellerInfo.module.css';
import placeholderImage from '@/public/images/placeholderImage.webp';

type Traveller = {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
  articlesAmount: number;
};

type Props = {
  traveller?: Traveller;
};

export default function TravellerInfo({ traveller }: Props) {
  if (!traveller) return null;

  return (
    <div className={css.container}>
      <Image
        src={traveller.avatarUrl || placeholderImage}
        alt={traveller.name}
        width={199}
        height={199}
        className={css.avatar}
      />
      <div className={css.text_content}>
        <h1 className={css.name}>{traveller.name}</h1>
        <p className={css.description}>{traveller.description}</p>
      </div>
    </div>
  );
}