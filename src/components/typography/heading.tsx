import type React from "react";
import { cn } from "~/lib/utils";

export function Heading({
	children,
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(
				"font-semibold text-2xl text-slate-900 tracking-tighter md:text-3xl lg:text-4xl",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
}
