import Image from "next/image";
import { redirect } from "next/navigation";
import { Heading } from "~/components/typography/heading";
import { getContentData, getPostById } from "~/data/content";

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
			<section className="flex flex-col px-responsive lg:flex-row-reverse">
				<div>
					<Heading>{post.title}</Heading>
					{/**
					 *	biome-ignore lint/security/noDangerouslySetInnerHtml: the docs told me to do this
					 *	https://nextjs.org/learn/pages-router/dynamic-routes-render-markdown
					 */}
					<div dangerouslySetInnerHTML={{ __html: post.content }} />
				</div>
				<div></div>
			</section>
		</>
	);
}
