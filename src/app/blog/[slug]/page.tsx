import Image from "next/image";
import { redirect } from "next/navigation";
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
	const post = await getPostById((await params).slug);

	if (!post) {
		redirect("/blog");
	}

	return (
		<>
			<Image
				src={post.data.image.href}
				alt={post.data.image.alt ?? ""}
				width={1920}
				height={1080}
				className="aspect-[4/3] w-full object-cover sm:aspect-[12/5]"
			/>
			<section>
				<div></div>
				<div></div>
			</section>
		</>
	);
}
