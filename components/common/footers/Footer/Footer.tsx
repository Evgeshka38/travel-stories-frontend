import Link from 'next/link';
import Image from 'next/image';
import css from './Footer.module.css';

const socialLinks = [
  {
    name: 'Facebook',
    icon: 'icon-facebook',
    href: 'https://www.facebook.com/',
  },
  {
    name: 'Instagram',
    icon: 'icon-instagram',
    href: 'https://www.instagram.com/',
  },
  {
    name: 'X',
    icon: 'icon-x',
    href: 'https://x.com/',
  },
  {
    name: 'YouTube',
    icon: 'icon-youtube',
    href: 'https://www.youtube.com/',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.top}>
          <Link href="/" className={css.logoLink}>
            <Image
              src="/logo.svg"
              alt="Подорожники"
              width={116}
              height={24}
              className={css.logo}
            />
          </Link>

          <ul className={css.socials}>
            {socialLinks.map(({ name, icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className={css.socialLink}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className={css.socialIcon}>
                    <use href={`/sprite.svg#${icon}`} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <nav className={css.nav} aria-label="Footer navigation">
            <Link href="/">Головна</Link>
            <Link href="/stories">Історії</Link>
            <Link href="/travellers">Мандрівники</Link>
          </nav>
        </div>

        <div className={css.divider} />

        <p className={css.copyright}>
          © {currentYear} Подорожники. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}