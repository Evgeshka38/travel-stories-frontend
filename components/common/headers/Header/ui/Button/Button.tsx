"use client";
import Link from "next/link";
import css from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps {
	children: React.ReactNode;
	semanticVariant: "button" | "link";
	styleVariant?: "primary" | "secondary" | "menu";
	linkRoute?: string;
	buttonType?: "button" | "submit" | "reset";
	isHomePage?: boolean;
}

export default function Button({
	children,
	semanticVariant,
	styleVariant = "primary",
	linkRoute = "/",
	buttonType = "submit",
	isHomePage = false,
}: ButtonProps) {
	return (
		<>
			{semanticVariant === "button" && (
				<div className={css.container}>
					<button
						className={clsx(
							css.button,
							styleVariant && css[styleVariant],
							styleVariant === "menu" && css.secondary,
							isHomePage && css.homePage,
						)}
						type={buttonType}
					>
						{children}
					</button>
				</div>
			)}

			{semanticVariant === "link" && (
				<div className={css.container}>
					<Link
						href={linkRoute}
						aria-label=""
						className={clsx(
							css.link,
							styleVariant && css[styleVariant],
							styleVariant === "menu" && css.secondary,
							isHomePage && css.homePage,
						)}
						type={buttonType}
					>
						{children}
					</Link>
				</div>
			)}
		</>
	);
}
