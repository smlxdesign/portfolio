import "~/styles/globals.css";

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";

export const metadata: Metadata = {
	title: "SMLX Design",
	description:
		"Hey! I am Samuel, a passionate Software Engineer that loves to build websites and user interfaces. During the summer of 2024, I finished the SuperSimpleDev’s Javascript course. After building some simple apps, I realized there was something missing; autocomplete in my IDE. I found out about Typescript and instantly got in love with the language.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${spaceGrotesk.className}`}>
			<body className="flex flex-col">
				<Navbar />
				<main>{children}</main>
				<footer>
					<Contact />
					<Footer />
				</footer>
			</body>
		</html>
	);
}
