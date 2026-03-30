import {
	type RemixiconComponentType,
	RiArrowLeftRightLine,
	RiDatabase2Line,
	RiGlobalLine,
	RiGuideLine,
	RiReactjsLine,
	RiTailwindCssLine,
	RiWindowLine,
} from "@remixicon/react";

export interface Tag {
	title: string;
	icon: RemixiconComponentType;
}

export const tags: Record<string, Tag> = {
	"web-app": {
		title: "Web App",
		icon: RiGlobalLine,
	},
	"side-project": {
		title: "Side Project",
		icon: RiArrowLeftRightLine,
	},
	frontend: {
		title: "Frontend",
		icon: RiWindowLine,
	},
	react: {
		title: "React",
		icon: RiReactjsLine,
	},
	tailwindcss: {
		title: "Tailwindcss",
		icon: RiTailwindCssLine,
	},
	convex: {
		title: "Convex",
		icon: RiDatabase2Line,
	},
	"tanstack-router": {
		title: "Tanstack Router",
		icon: RiGuideLine,
	},
	"game": {
		title: "Game",
		icon: RiGamepadLine,
	},
	"godot": {
		title: "Godot",
		icon: RiRobot2Line,
	}
};
