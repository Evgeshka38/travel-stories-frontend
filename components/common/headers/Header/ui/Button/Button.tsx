"use client";
import css from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "menu";

	isHomePage?: boolean;
	type?: "button" | "submit" | "reset";
}

export default function Button({
	children,
	variant = "primary",
	isHomePage = false,
	type = "submit",
}: ButtonProps) {
	return (
		<div className={css.container}>
			<button
				className={clsx(
					css.button,
					variant && css[variant],
					variant === "menu" && css.secondary,
					isHomePage && css.homePage,
				)}
				type={type}
			>
				{children}
			</button>
		</div>
	);
}
