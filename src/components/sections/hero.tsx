import type React from "react";
import { cn } from "~/lib/utils";
import { Title } from "../typography/title";

export function Hero({
	children,
	className,
	...props
}: React.ComponentProps<"section">) {
	return (
		<section
			className={cn("px-6 pt-32 pb-16 md:pt-48 lg:px-24 xl:px-48", className)}
			{...props}
		>
			<Title>{children}</Title>
		</section>
	);
}
