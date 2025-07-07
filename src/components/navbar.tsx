"use client";

import {
	type RemixiconComponentType,
	RiBox3Fill,
	RiBox3Line,
	RiContactsBook3Fill,
	RiContactsBook3Line,
	RiEditFill,
	RiEditLine,
	RiHomeFill,
	RiHomeLine,
} from "@remixicon/react";
import Image from "next/image";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import logo from "~/assets/logo.svg";
import { cn } from "~/lib/utils";

export function Navbar() {
	function NavbarItem(
		props: LinkProps & {
			icon: { fill: RemixiconComponentType; line: RemixiconComponentType };
			children: ReactNode;
		},
	) {
		const pathname = usePathname();

		const active = props.href === pathname;

		return (
			<Link
				href={props.href}
				className={cn(
					"rounded-full p-3",
					active
						? "bg-primary text-primary-foreground"
						: "hover:bg-secondary hover:text-secondary-foreground",
				)}
			>
				{active ? (
					<props.icon.fill className="size-5" />
				) : (
					<props.icon.line className="size-5" />
				)}
				<span className="sr-only">{props.children}</span>
			</Link>
		);
	}

	return (
		<nav className="-translate-x-1/2 fixed top-4 left-1/2 z-100 flex gap-2 rounded-full border bg-white p-2">
			<Image
				src={logo}
				alt="SMLX Design Logo"
				className="mr-2 size-11 rounded-full"
			/>
			<NavbarItem href="/" icon={{ fill: RiHomeFill, line: RiHomeLine }}>
				Home
			</NavbarItem>
			<NavbarItem
				href="/products"
				icon={{ fill: RiBox3Fill, line: RiBox3Line }}
			>
				Products
			</NavbarItem>
			<NavbarItem href="/blog" icon={{ fill: RiEditFill, line: RiEditLine }}>
				Blog
			</NavbarItem>
			<NavbarItem
				href="/contact"
				icon={{ fill: RiContactsBook3Fill, line: RiContactsBook3Line }}
			>
				Contact
			</NavbarItem>
		</nav>
	);
}
