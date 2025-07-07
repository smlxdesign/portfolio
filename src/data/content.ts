import matter from "gray-matter";
import path from "node:path";
import { readdirSync, readFileSync } from "node:fs";

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

	return contentData;
}
