import { cn } from "~/lib/utils";

export function Title({
	children,
	className,
	...props
}: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn(
				"text-4xl text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl",
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}
