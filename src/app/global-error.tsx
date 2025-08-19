"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { Hero } from "~/components/sections/hero";

export default function Page({ error }: { error: unknown }) {
	useEffect(() => {
		posthog.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<Hero>Something went wrong, but we do not know what or why :/</Hero>
			</body>
		</html>
	);
}
