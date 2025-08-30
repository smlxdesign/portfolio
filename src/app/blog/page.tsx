import type { Metadata } from "next";
import { RiNewsLine } from "@remixicon/react";
import { format } from "date-fns";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { getContentData } from "~/data/content";

export const metadata: Metadata = {
	title: "Blog",
	openGraph: {
		title: "Blog",
		description: "A list of my blog posts",
	},
	twitter: {
		title: "Blog",
		description: "A list of my blog posts",
	},
};

export default async function Page() {
	const content = await getContentData();

	return (
		<>
			<Hero>Blog</Hero>
			<ul className="flex flex-col gap-24 px-responsive py-responsive">
				{content.map((post) => (
					<li key={post.id}>
						<Teaser
							{...post}
							description={[
								`Published ${format(post.publishedAt, "PPP")}. Updated ${format(post.updatedAt, "PPP")}`,
								post.description ?? "",
							]}
							links={[
								{
									title: "Read",
									href: `/blog/${post.id}`,
									icon: RiNewsLine,
								},
							]}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
