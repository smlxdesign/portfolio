import Link from "next/link";
import type { ReactNode } from "react";
import { Hero } from "~/components/sections/hero";
import { tags } from "~/data/tags";

export default function Page() {
	const tagsElements: ReactNode[] = [];

	for (const [id, value] of Object.entries(tags)) {
		tagsElements.push(
			<li key={id}>
				<Link
					href={`/blog/tags/${id}`}
					className="flex items-center gap-2 rounded px-6 py-4 text-lg hover:bg-secondary"
				>
					<value.icon className="size-6" />
					{value.title}
				</Link>
			</li>,
		);
	}

	return (
		<>
			<Hero>All Tags</Hero>
			<section className="px-responsive py-responsive">
				<ul className="flex flex-col">{tagsElements}</ul>
			</section>
		</>
	);
}
