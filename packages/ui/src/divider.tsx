import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "fullWidth" | "inset";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	orientation?: DividerOrientation;
	variant?: DividerVariant;
	children?: ReactNode;
}

export function Divider(props: DividerProps): JSX.Element {
	const {
		orientation = "horizontal",
		variant = "fullWidth",
		children,
		className,
		style,
		"aria-orientation": _ariaOrientation,
		...other
	} = props;

	const isHorizontal = orientation === "horizontal";
	const hasLabel = children != null;
	const insetClass = variant === "inset" ? (isHorizontal ? "mx-4" : "my-4") : "";

	if (isHorizontal && !hasLabel) {
		return (
			<hr
				{...other}
				className={cn("w-full border-0 border-t border-border", insetClass, className)}
				style={style}
			/>
		);
	}

	const containerClass = isHorizontal
		? "flex items-center w-full shrink-0"
		: "inline-flex flex-col self-stretch shrink-0";
	const lineClass = isHorizontal
		? cn("flex-1 h-px min-w-0 bg-border", hasLabel && "flex-none")
		: cn("w-px flex-1 min-h-0 bg-border", hasLabel && "flex-none");
	const labelClass = isHorizontal ? "px-2 shrink-0" : "py-2 shrink-0";

	return (
		<div role="presentation" className={cn(containerClass, insetClass, className)} style={style} {...other}>
			<div className={lineClass} />
			{hasLabel ? <span className={labelClass}>{children}</span> : null}
			{hasLabel ? <div className={lineClass} /> : null}
		</div>
	);
}

Divider.displayName = "Divider";
