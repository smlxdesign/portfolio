import type { RemixiconComponentType } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { tags } from "~/data/tags";
import { Heading } from "./typography/heading";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Teaser(props: {
	image: { href: string; alt?: string };
	title: string;
	description?: string;
	tags: string[];
	links: Array<{
		href: string;
		title: string;
		icon: RemixiconComponentType;
	}>;
}) {
	return (
		<div className="flex flex-col gap-16 md:flex-row">
			<Image
				src={props.image.href}
				alt={props.image.alt ?? ""}
				width={1920}
				height={1080}
				className="w-full rounded-xl"
			/>
			<div className="flex w-full flex-col justify-between">
				<div className="flex flex-col gap-3">
					<Heading>{props.title}</Heading>
					<div className="flex flex-wrap gap-2">
						{props.tags.map((tagId) => {
							const tag = tags[tagId];

							if (tag === undefined) {
								return null;
							}

							return (
								<Badge variant="secondary" key={tag.title}>
									<tag.icon />
									{tag.title}
								</Badge>
							);
						})}
					</div>
					<p className="max-w-[65ch]">{props.description}</p>
				</div>
				<div className="flex gap-2">
					{props.links.map((link, index) => (
						<Button
							key={link.href}
							asChild
							variant={index === 0 ? "default" : "secondary"}
						>
							<Link href={link.href}>
								<link.icon />
								{link.title}
							</Link>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
