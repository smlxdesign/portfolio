/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import CreateMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
	pageExtensions: ["js", "ts", "jsx", "tsx", "md", "mdx"],
};

const withMDX = CreateMDX({
	extension: /\.(md|mdx)$/,
});

export default withMDX(config);
