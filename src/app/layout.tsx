import "~/styles/globals.css";

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";

const description =
	"Hey! I am Samuel, a passionate Software Engineer that loves to build websites and user interfaces";

export const metadata: Metadata = {
	title: {
		template: "%s – SMLX Design",
		default: "SMLX Design",
	},
	openGraph: {
		title: {
			template: "%s – SMLX Design",
			default: "SMLX Design",
		},
		url: "https://portfolio-smlxdesign.vercel.app",
		description,
		siteName: "SMLX Design",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: {
			template: "%s – SMLX Design",
			default: "SMLX Design",
		},
		site: "@smlxdesign",
		creator: "@smlxdesign",
		description,
	},
	robots: {
		index: true,
		follow: true,
	},
	description,
	manifest: "/site.webmanifest",
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
