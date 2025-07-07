import { RiNewsLine } from "@remixicon/react";
import { format } from "date-fns";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { getContentData } from "~/data/content";

export default function Page() {
	const content = getContentData();

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
