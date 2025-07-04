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
			className={cn("mt-20 px-responsive py-responsive", className)}
			{...props}
		>
			<Title>{children}</Title>
		</section>
	);
}
