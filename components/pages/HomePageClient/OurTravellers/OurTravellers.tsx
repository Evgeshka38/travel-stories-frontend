import css from './OurTravellers.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
}

interface OurTravellersProps {
  travellers?: Traveller[];
}

export default function OurTravellers({ travellers = [] }: OurTravellersProps) {
  const displayedTravellers = travellers.slice(0, 4);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>Наші Мандрівники</h2>
        </div>

        <div className={css.contentContainer}>
          <ul className={css.list}>
            {displayedTravellers.map((traveller) => (
              <li key={traveller._id} className={css.travellerCard}>
                <div className={css.placeholderImage}>
                  <Image
                    src={traveller.avatarUrl || '/images/default-avatar.webp'}
                    alt={traveller.name}
                    width={112}
                    height={112}
                    className={css.avatar}
                  />
                </div>

                <div className={css.cardContent}>
                  <h3 className={css.title}>{traveller.name}</h3>
                  <p className={css.text}>{traveller.description}</p>
                  <Link href={`/travellers/${traveller._id}`} className={css.button}>
                    Переглянути профіль
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={css.buttonWrapper}>
          <Link href="/travellers" className={css.viewAllButton}>
            Переглянути всіх
          </Link>
        </div>
      </div>
    </section>
  );
}