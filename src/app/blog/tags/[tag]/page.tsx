import { RiNewsLine } from "@remixicon/react";
import type { Metadata } from "next";
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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ tag: string }>;
}): Promise<Metadata> {
	const { tag: tagId } = await params;
	try {
		const tag = tags[tagId];
		if (!tag) throw Error("Tag not found");

		return {
			title: `Tagged “${tag.title}”`,
			description: `All my blog posts tagged with “${tag.title}”`,
			openGraph: {
				title: `Tagged “${tag.title}”`,
				description: `All my blog posts tagged with “${tag.title}”`,
			},
			twitter: {
				title: `Tagged “${tag.title}”`,
				description: `All my blog posts tagged with “${tag.title}”`,
			},
		};
	} catch (error) {
		console.error(error);
		return {};
	}
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

	const filteredPosts = (await getContentData()).filter((post) =>
		post.tags.includes(tagId),
	);

	const filteredProducts = products.filter((product) =>
		product.tags.includes(tagId),
	);

	const filteredPostsAndProducts = filteredProducts
		.concat(
			filteredPosts.map((post) => ({
				...post,
				links: [
					{
						title: "Read",
						href: `/blog/${post.id}`,
						icon: RiNewsLine,
					},
				],
			})),
		)
		.toSorted((a, b) => a.title.toLowerCase().localeCompare(b.title));

	return (
		<>
			<Hero>Tagged “{tag.title}”</Hero>
			<section className="flex flex-col gap-24 px-responsive py-responsive">
				{filteredPostsAndProducts.length > 0 ? (
					<ul className="flex flex-col gap-24">
						{filteredPostsAndProducts.map((item) => (
							<Teaser
								key={`${item.title}-${item.id}`}
								{...item}
								links={item.links}
							/>
						))}
					</ul>
				) : (
					<div className="flex h-[60svh] items-center justify-center">
						<p>Whoops! There is nothing tagged with “{tag.title}”</p>
					</div>
				)}
			</section>
		</>
	);
}
