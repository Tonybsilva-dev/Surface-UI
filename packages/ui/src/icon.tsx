import type { ReactNode } from "react";
import { cn } from "./lib/utils";

export type IconSize = "sm" | "md" | "large";

export interface IconProps {
	children?: ReactNode;
	size?: IconSize;
	color?: string;
	ariaHidden?: boolean;
	ariaLabel?: string;
	className?: string;
}

const sizeClasses: Record<IconSize, string> = {
	sm: "size-4",
	md: "size-5",
	large: "size-6",
};

export function Icon(props: IconProps): JSX.Element {
	const {
		children,
		size = "md",
		ariaHidden = true,
		ariaLabel,
		className,
	} = props;

	return (
		<span
			aria-hidden={ariaLabel ? undefined : ariaHidden}
			role={ariaLabel ? "img" : undefined}
			aria-label={ariaLabel}
			className={cn(
				"inline-flex shrink-0 items-center justify-center text-foreground [&_svg]:size-inherit",
				sizeClasses[size],
				className,
			)}
		>
			{children}
		</span>
	);
}

Icon.displayName = "Icon";
