import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod/v4";

export const schema = z.object({
	id: z.string().min(3),
	title: z.string().min(3),
	description: z.string().optional(),
	image: z.object({
		href: z.string(),
		alt: z.string().optional(),
	}),
	publishedAt: z.iso.date().transform((str) => new Date(str)),
	updatedAt: z.iso.date().transform((str) => new Date(str)),
	tags: z.array(z.string()),
});
export type schema = z.infer<typeof schema>;

const contentDirectory = path.join(process.cwd(), "src", "content");

export async function getContentData() {
	const filenames = await readdir(contentDirectory);
	const contentData = filenames.map(async (filename) => {
		const id = filename.replace(/\.(md|mdx)$/, "");

		const fullPath = path.join(contentDirectory, filename);
		const fileContent = await readFile(fullPath, "utf-8");

		const frontmatter = matter(fileContent);

		return {
			id,
			...frontmatter.data,
		};
	});

	const result: schema[] = [];

	for (const post of contentData) {
		result.push(schema.parse(await post));
	}

	return result;
}

export async function getPostById(id: string) {
	const fullpath = path.join(contentDirectory, `${id}.md`);
	const file = await readFile(fullpath, "utf-8");
	const matterResult = matter(file);

	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	return {
		content: contentHtml,
		...schema.parse({ id, ...matterResult.data }),
	};
}
