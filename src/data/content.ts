import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSanitize from "rehype-sanitize";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import * as yaml from "yaml";
import { z } from "zod/v4";
import { Heading } from "~/components/typography/heading";
import { Subheading } from "~/components/typography/subheading";
import { Title } from "~/components/typography/title";

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
	.use([remarkFrontmatter, remarkGfm]);

async function getFrontmatter(file: string): Promise<Record<string, unknown>> {
	const mdast = generateMdast().parse(file);

	return yaml.parse(
		mdast.children.find((child) => child.type === "yaml")?.value ?? "",
	);
}

export async function getContentData() {
	const filenames = await readdir(contentDirectory);
	const contentData = filenames.map(async (filename) => {
		const id = filename.replace(/\.(md|mdx)$/, "");

		const fullPath = path.join(contentDirectory, filename);
		const fileContent = await readFile(fullPath, "utf-8");

		const frontmatter = await getFrontmatter(fileContent);

		return {
			id,
			...frontmatter,
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

	const frontmatter = await getFrontmatter(file);

	const content = await generateMdast()
		.use([
			[remarkRehype, { allowDangerousHtml: true }],
			rehypeRaw,
			//rehypeSanitize,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
				},
			],
			[
				rehypeReact,
				{
					Fragment,
					jsx,
					jsxs,
					components: {
						a: Link,
						img: Image,
						h1: Title,
						h2: Heading,
						h3: Subheading,
					},
				},
			],
		])
		//.use(rehypeStringify)
		.process(file);

	return {
		content: content.result,
		...schema.parse({ id, ...frontmatter }),
	};
}
