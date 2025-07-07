import { RiNewsLine } from "@remixicon/react";
import { format } from "date-fns";
import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { getContentData } from "~/data/content";

export default function Page() {
	const content = getContentData();

	return (
		<div className="flex flex-col">
			<Navbar />
			<main>
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
			</main>
			<footer>
				<Contact />
				<Footer />
			</footer>
		</div>
	);
}
