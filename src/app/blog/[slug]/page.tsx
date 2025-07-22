import Image from "next/image";
import { Title } from "~/components/typography/title";
import { Badge } from "~/components/ui/badge";
import { getContentData, getPostById } from "~/data/content";
import { tags } from "~/data/tags";

export async function generateStaticParams() {
	const posts = await getContentData();

	return posts.map((post) => ({
		slug: post.id,
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const post = await getPostById(slug);

	return (
		<>
			<Image
				src={post.image.href}
				alt={post.image.alt ?? ""}
				width={1920}
				height={1080}
				priority
				className="aspect-[4/3] w-full object-cover sm:aspect-[12/5]"
			/>
			<section className="flex min-h-lvh flex-col gap-16 px-responsive lg:flex-row-reverse">
				<div className="sticky top-0 flex h-fit w-full flex-col gap-4 py-responsive">
					{post.description && <p>{post.description}</p>}
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tagId) => {
							const tag = tags[tagId];

							if (!tag) return null;

							return (
								<Badge key={tagId} variant="secondary">
									<tag.icon /> {tag.title}
								</Badge>
							);
						})}
					</div>
				</div>
				<div className="flex w-full flex-col gap-10 py-responsive">
					<Title className="text-balance">{post.title}</Title>
					<div
						className="prose prose-headings:text-primary prose-p:text-foreground"
						/* biome-ignore lint/security/noDangerouslySetInnerHtml: the docs told me to do this */
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>
			</section>
		</>
	);
}
