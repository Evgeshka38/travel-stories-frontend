import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/headers/Header/Header";
import AppFooter from "@/components/common/footers/AppFooter/AppFooter";
import TanStackProvider from "@/components/providers/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"],
	weight: ["700"],
	display: "swap",
});

const nunitoSans = Nunito_Sans({
	variable: "--font-nunito-sans",
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Travel Stories",
	description: "Travel Stories app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="uk" className={`${inter.variable} ${nunitoSans.variable}`}>
			<body>
				<TanStackProvider>
					<Header />
					{children}
					<AppFooter />
					<Toaster position="top-right" />
				</TanStackProvider>
			</body>
		</html>
	);
}
