import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
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

export function getContentData() {
	const filenames = readdirSync(contentDirectory);
	const contentData = filenames.map((filename) => {
		const id = filename.replace(/\.(md|mdx)$/, "");

		const fullPath = path.join(contentDirectory, filename);
		const fileContent = readFileSync(fullPath, "utf-8");

		const frontmatter = matter(fileContent);

		return {
			id,
			...frontmatter.data,
		};
	});
	return z.array(schema).parse(contentData);
}
