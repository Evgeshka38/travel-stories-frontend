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

const MOCK_TRAVELLERS: Traveller[] = [
  {
    _id: '1',
    name: 'Анастасія Олійник',
    avatarUrl: '/images/avatar_1.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros',
  },
  {
    _id: '2',
    name: 'Назар Ткаченко',
    avatarUrl: '/images/avatar_2.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros',
  },
  {
    _id: '3',
    name: 'Єва Бондаренко',
    avatarUrl: '/images/avatar_3.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros',
  },
  {
    _id: '4',
    name: 'Дмитро Романенко',
    avatarUrl: '/images/avatar_4.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros',
  },
];

export default function OurTravellers({ travellers = MOCK_TRAVELLERS }: OurTravellersProps) {
  const displayedTravellers = (travellers.length > 0 ? travellers : MOCK_TRAVELLERS).slice(0, 4);

  return (
    <section className={css.section}>
      <div className={css.container}>
        {/* Section Header / Title */}
        <div className={css.sectionHeader}>
          <h2 className={css.sectionTitle}>Наші Мандрівники</h2>
        </div>

        {/* Content Container (список + кнопка внизу) e8eeff */}
        <div className={css.contentContainer}>
          <ul className={css.list}>
            {displayedTravellers.map((traveller) => (
              <li key={traveller._id} className={css.travellerCard}>
                {/* Placeholder Image */}
                <div className={css.placeholderImage}>
                  <Image
                    src={traveller.avatarUrl}
                    alt={traveller.name}
                    width={112}
                    height={112}
                    className={css.avatar}
                  />
                </div>

                {/* Card Content */}
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
        
        {/* Bottom Navigation Button */}
          <div className={css.buttonWrapper}>
            <Link href="/travellers" className={css.viewAllButton}>
              Переглянути всіх
            </Link>
          </div>
      </div>
    </section>
  );
}