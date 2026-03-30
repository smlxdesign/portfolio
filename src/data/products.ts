import {
	type RemixiconComponentType,
	RiChatQuoteLine,
	RiCodeLine,
	RiDraftLine,
	RiDrinks2Line,
	RiGlobalLine,
	RiNewsLine,
	RiCircleLine,
	RiGamepadLine,
} from "@remixicon/react";

export interface Link {
	title: string;
	href: string;
	icon: RemixiconComponentType;
}

export interface Product {
	id: string;
	title: string;
	description?: string;
	image: {
		href: string;
		alt?: string;
	};
	icon?: RemixiconComponentType;
	links: Link[];
	tags: string[];
}

export const products: Product[] = [
	{
		id: "pong",
		title: "Pong",
		description: "Modern recreation of the classic Pong game!",
		image: {
			href: "/images/pong.png",
			alt: "Screenshot of pong gameplay",
		},
		icon: RiCircleLine,
		links: [
			{
				title: "Play",
				href: "https://smlxdesign.itch.io/pong",
				icon: RiGamepadLine,
			},
			{
				title: "Source Code",
				href: "https://codeberg.org/smlxdesign/pong",
				icon: RiCodeLine,
			}
		],
		tags: [
			"game",
			"godot",
		]
	},
	{
		id: "pepsi-vs-coke",
		title: "Soda Voting App",
		description:
			"An app to help you find out which soda brand is more popular among consumers; Pepsi or Coke.",
		image: {
			href: "/images/pepsi-vs-coke.webp",
			alt: "Laptop screen showing two large buttons: 'Coke (489)' and 'Pepsi (403)'.",
		},
		icon: RiDrinks2Line,
		links: [
			{
				title: "Case Study",
				href: "/blog/pepsi-vs-coke",
				icon: RiNewsLine,
			},
			{
				title: "Source Code",
				href: "https://sr.ht/~smlxdesign/pepsi-vs-coke/",
				icon: RiCodeLine,
			},
			{
				title: "Live Site",
				href: "https://pepsi-eller-cola.vercel.app/",
				icon: RiGlobalLine,
			},
		],
		tags: [
			"web-app",
			"side-project",
			"frontend",
			"react",
			"tailwindcss",
			"convex",
		],
	},
	{
		id: "homework-app",
		title: "Homework App",
		description:
			"A web-app to track your assignments, homework, and upcoming tests.",
		image: {
			href: "/images/homework-app.webp",
			alt: "Phone app showing a list of assignments.",
		},
		icon: RiDraftLine,
		links: [
			{
				title: "Case Study",
				href: "/blog/homework-app",
				icon: RiNewsLine,
			},
			{
				title: "Source Code",
				href: "https://sr.ht/~smlxdesign/homework-app/",
				icon: RiCodeLine,
			},
			{
				title: "Live Site",
				href: "https://homework.smlxdesign.is-a.dev/",
				icon: RiGlobalLine,
			},
		],
		tags: [
			"web-app",
			"side-project",
			"frontend",
			"react",
			"tailwindcss",
			"tanstack-router",
		],
	},
	{
		id: "westquote",
		title: "WestQuote™",
		description:
			"Really simple app that fetches the kanye.rest api and displays the returned quote.",
		image: {
			href: "/images/westquote.webp",
			alt: "Phone screen showing the quote 'Artists are founders' by Kanye West",
		},
		icon: RiChatQuoteLine,
		links: [
			{
				title: "Source Code",
				href: "https://github.com/smlxdesign/westquote",
				icon: RiCodeLine,
			},
			{
				title: "Live Site",
				href: "https://westquote.netlify.app/",
				icon: RiGlobalLine,
			},
		],
		tags: ["web-app", "side-project", "frontend", "react", "tailwindcss"],
	},
];
