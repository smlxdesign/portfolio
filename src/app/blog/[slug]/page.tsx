import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

	try {
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
				<section className="flex min-h-lvh flex-col gap-20 px-responsive lg:flex-row-reverse">
					<div className="sticky top-0 flex h-fit w-xl max-w-full flex-col gap-4 py-responsive">
						{post.description && <p>{post.description}</p>}
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tagId) => {
								const tag = tags[tagId];

								if (!tag) return null;

								return (
									<Badge asChild key={tagId} variant="secondary">
										<Link href={`/blog/tags/${tagId}`}>
											<tag.icon /> {tag.title}
										</Link>
									</Badge>
								);
							})}
						</div>
					</div>
					<div className="flex w-full flex-col gap-18 py-responsive">
						<Title className="text-balance">{post.title}</Title>
						<div className="prose prose-a:descriptive-link-icon prose-a:font-normal prose-p:text-foreground">
							{post.content}
						</div>
					</div>
				</section>
			</>
		);
	} catch (_) {
		notFound();
	}
}
