import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as yaml from "yaml";
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

const generateMdast = unified()
	.use(remarkParse)
	.use(remarkFrontmatter)
	.use(remarkGfm);

function getFrontmatter(file: string) {
	return yaml.parse(
		generateMdast()
			.parse(file)
			.children.find((child) => child.type === "yaml")?.value ?? "",
	);
}

export async function getContentData() {
	const filenames = await readdir(contentDirectory);
	const contentData = filenames.map(async (filename) => {
		const id = filename.replace(/\.(md|mdx)$/, "");

		const fullPath = path.join(contentDirectory, filename);
		const fileContent = await readFile(fullPath, "utf-8");

		const frontmatter = getFrontmatter(fileContent);

		return {
			id,
			...frontmatter,
		};
	});

	const result: schema[] = [];

	for (const post of contentData) {
		console.log(await post);
		result.push(schema.parse(await post));
	}

	return result;
}

export async function getPostById(id: string) {
	const fullpath = path.join(contentDirectory, `${id}.md`);
	const file = await readFile(fullpath, "utf-8");

	const frontmatter = getFrontmatter(file);

	const html = await generateMdast()
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(file);

	return {
		content: html.toString(),
		...schema.parse({ id, ...frontmatter }),
	};
}
