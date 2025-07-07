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
	date: z.iso.date().transform((str) => new Date(str)),
	tags: z.array(z.string()),
});

const contentDirectory = path.join(process.cwd(), "src", "content");

export function getContentData() {
	const filenames = readdirSync(contentDirectory);
	const contentData = filenames.map((filename) => {
		const id = filename.replace(/\.(md|mdx)$/, "");
		console.log(`id: ${id}`);

		const fullPath = path.join(contentDirectory, filename);
		const fileContent = readFileSync(fullPath, "utf-8");
		console.log(fullPath, fileContent);

		const frontmatter = matter(fileContent);
		console.log(frontmatter);

		return {
			id,
			...frontmatter.data,
		};
	});
	return z.array(schema).parse(contentData);
}
