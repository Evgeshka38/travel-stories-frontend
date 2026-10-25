import css from "./Header.module.css";
import Link from "next/link";
import NavigationList from "./NavigationList/NavigationList";
import { NavLink } from "@/types/link";
import Button from "./ui/Button/Button";

interface HeaderProps {
	isAuthenticate?: boolean;
}

export default function Header({ isAuthenticate = false }: HeaderProps) {
	const navLinks: NavLink[] = [
		{ linkText: "Головна", linkRoute: "/" },
		{ linkText: "Історії", linkRoute: "/stories" },
		{ linkText: "Мандрівники", linkRoute: "/travellers" },
	];

	const isHomePage = true;

	if (isAuthenticate)
		navLinks.push({ linkText: "Мій Профіль", linkRoute: "/profile" });

	return (
		<div className={css.container}>
			<header className={css.header}>
				<Link className={css.logoLink} href="/" aria-label="Home page">
					<svg className={css.logoIcon} width="auto" height="auto">
						<use href="/logo.svg" aria-hidden="true"></use>
					</svg>
				</Link>
				<div className={css.menuControls}>
					<div className={css.storyPublicBtn}></div>

					<Button type="button" variant="menu" isHomePage={isHomePage}>
						<svg className={css.menuIcon} width="24" height="24">
							<use href="/sprite.svg#icon-menu" aria-hidden="true"></use>
						</svg>
					</Button>
				</div>
				<div className={css.menu}>
					<nav className={css.navigation}>
						<NavigationList navItems={navLinks} />
					</nav>
					<div className={css.authControls}></div>
					<div className={css.userControls}>
						<div className={css.storyUserBtn}></div>
					</div>
				</div>
			</header>
		</div>
	);
}
