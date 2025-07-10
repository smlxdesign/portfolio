import { RiFacebookCircleLine, RiTwitterLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Heading } from "~/components/typography/heading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
				className="aspect-[4/3] w-full object-cover sm:aspect-[12/5]"
			/>
			<section className="flex min-h-lvh flex-col gap-16 px-responsive lg:flex-row-reverse">
				<div className="sticky top-0 flex min-h-lvh w-full flex-col gap-4 py-responsive">
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
				<div className="w-full py-responsive">
					<Heading>{post.title}</Heading>
					{/**
					 *	biome-ignore lint/security/noDangerouslySetInnerHtml: the docs told me to do this
					 *	https://nextjs.org/learn/pages-router/dynamic-routes-render-markdown
					 */}
					<div dangerouslySetInnerHTML={{ __html: post.content }} />
				</div>
			</section>
		</>
	);
}
