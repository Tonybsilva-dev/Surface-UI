import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type SkeletonVariant = "rectangular" | "circular" | "text";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: SkeletonVariant;
	width?: string | number;
	height?: string | number;
}

export function Skeleton(props: SkeletonProps): JSX.Element {
	const {
		variant = "rectangular",
		width,
		height,
		className,
		style,
		...other
	} = props;

	const dimensionStyle =
		width !== undefined || height !== undefined
			? {
					width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
					height:
						height !== undefined
							? typeof height === "number"
								? `${height}px`
								: height
							: variant === "text"
								? "1em"
								: undefined,
				}
			: undefined;

	return (
		<span
			{...other}
			aria-hidden
			className={cn(
				"inline-block bg-muted rounded-md animate-pulse",
				variant === "circular" && "rounded-full",
				variant === "text" && "rounded-sm",
				className,
			)}
			style={{ ...dimensionStyle, ...style }}
		/>
	);
}

Skeleton.displayName = "Skeleton";
