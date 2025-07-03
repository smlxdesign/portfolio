import { RiErrorWarningLine } from "@remixicon/react";
import type React from "react";
import { cn } from "~/lib/utils";

export function InlineError({
	children,
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			role="alert"
			className={cn(
				"flex flex-row items-center gap-2 rounded-md border px-3 py-2 text-xs",
				className,
			)}
			{...props}
		>
			<RiErrorWarningLine className="size-5 text-destructive" />
			{children}
		</div>
	);
}
