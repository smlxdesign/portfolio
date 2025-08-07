import { RiNewsLine } from "@remixicon/react";
import { notFound } from "next/navigation";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { getContentData } from "~/data/content";
import { products } from "~/data/products";
import { tags } from "~/data/tags";

export async function generateStaticParams() {
	const result: Array<{ tag: string }> = [];

	for (const id of Object.keys(tags)) {
		result.push({ tag: id });
	}

	return result;
}

export default async function Page({
	params,
}: {
	params: Promise<{ tag: string }>;
}) {
	const { tag: tagId } = await params;
	const tag = tags[tagId];

	if (!tag) {
		notFound();
	}

	const posts = await getContentData();

	return (
		<>
			<Hero>Tagged “{tag.title}”</Hero>
			<section className="flex flex-col gap-24 px-responsive py-responsive">
				<ul className="flex flex-col gap-24">
					{posts
						.filter((post) => post.tags.includes(tagId))
						.map((post) => (
							<Teaser
								key={post.id}
								{...post}
								links={[
									{
										title: "Read",
										href: `/blog/${post.id}`,
										icon: RiNewsLine,
									},
								]}
							/>
						))}
				</ul>
				{posts && products && <div className="my-4 h-px w-full bg-border" />}
				<ul className="flex flex-col gap-24">
					{products
						.filter((product) => product.tags.includes(tagId))
						.map((product) => (
							<Teaser key={product.id} {...product} />
						))}
				</ul>
			</section>
		</>
	);
}
