import type React from "react";
import { cn } from "~/lib/utils";

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
			<h1 className="h1">{children}</h1>
		</section>
	);
}
