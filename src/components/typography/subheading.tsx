import type React from "react";
import { cn } from "~/lib/utils";

export function Subheading({
	children,
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-semibold text-lg text-slate-900 tracking-tighter md:text-xl lg:text-2xl",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
}
