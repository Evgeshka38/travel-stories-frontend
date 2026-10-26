'use client';
import Link from 'next/link';
import css from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps {
	children: React.ReactNode;
	semanticVariant: 'button' | 'link';
	styleVariant: 'primary' | 'secondary' | 'custom';
	buttonType?: 'button' | 'submit' | 'reset';
	styleCustomName?: string;
	linkRoute?: string;
	linkAreaLabel?: string;
	isHomePage?: boolean;
	handler?: (
		event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	) => void;
}

export default function Button({
	children,
	semanticVariant,
	styleVariant,
	styleCustomName = 'custom',
	linkRoute = '/',
	linkAreaLabel = '',
	buttonType = 'submit',
	isHomePage = false,
	handler = () => {},
}: ButtonProps) {
	return (
		<>
			{semanticVariant === 'button' && (
				<div className={css.container}>
					<button
						className={clsx(
							css.button,
							styleVariant !== 'custom'
								? css[styleVariant]
								: css[styleCustomName],
							styleCustomName === 'menu' && css.secondary,
							styleCustomName === 'menu' && isHomePage && css.homePage,
						)}
						type={buttonType}
						onClick={handler}
					>
						{children}
					</button>
				</div>
			)}

			{semanticVariant === 'link' && (
				<div className={css.container}>
					<Link
						href={linkRoute}
						aria-label={linkAreaLabel}
						className={clsx(
							css.link,
							styleVariant !== 'custom'
								? css[styleVariant]
								: css[styleCustomName],
						)}
					>
						{children}
					</Link>
				</div>
			)}
		</>
	);
}
