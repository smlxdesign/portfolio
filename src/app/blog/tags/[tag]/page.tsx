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

	return (
		<>
			<Hero>Tagged “{tag.title}”</Hero>
			<section className="flex flex-col gap-24 px-responsive py-responsive">
				{filteredPosts.length > 0 && (
					<ul className="flex flex-col gap-24">
						{filteredPosts.map((post) => (
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
				)}
				{filteredPosts.length > 0 && filteredProducts.length > 0 && (
					<div className="my-4 h-px w-full bg-border" />
				)}
				{filteredProducts.length > 0 && (
					<ul className="flex flex-col gap-24">
						{filteredProducts.map((product) => (
							<Teaser key={product.id} {...product} />
						))}
					</ul>
				)}
			</section>
		</>
	);
}
