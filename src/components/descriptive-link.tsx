import type { UrlObject } from "node:url";
import { RiArrowRightUpLine, RiHashtag } from "@remixicon/react";
import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

function getLinkType(
	href: string | UrlObject,
): "external" | "scroll" | "internal" {
	if (typeof href !== "string") {
		return "external";
	}

	if (href.startsWith("http") || href.startsWith("mailto")) {
		return "external";
	}

	if (href.startsWith("#")) {
		return "scroll";
	}

	return "internal";
}

export function DescriptiveLink({
	href,
	children,
	className,
	...props
}: LinkProps & { children: ReactNode; className?: string }) {
	const type = getLinkType(href);

	const iconStyle = "size-4 transition-transform";

	return (
		<Link
			className={cn(
				"group inline-flex w-fit items-center gap-1 text-foreground underline underline-offset-2 hover:no-underline",
				className,
			)}
			href={href}
			{...props}
		>
			{children}
			{type === "external" && (
				<RiArrowRightUpLine
					className={cn(
						iconStyle,
						"group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
					)}
				/>
			)}
			{type === "scroll" && (
				<RiHashtag className={cn(iconStyle, "group-hover:rotate-12")} />
			)}
		</Link>
	);
}
