import type { HTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	src?: string;
	alt?: string;
	initials?: string;
	size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
	sm: "h-8 w-8 min-h-8 min-w-8 text-xs",
	md: "h-10 w-10 min-h-10 min-w-10 text-sm",
	lg: "h-12 w-12 min-h-12 min-w-12 text-base",
};

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

export function Avatar(props: AvatarProps): JSX.Element {
	const {
		src,
		alt = "",
		initials: initialsProp,
		size = "md",
		className,
		...other
	} = props;

	const initials = initialsProp != null ? getInitials(initialsProp) : null;

	return (
		<span
			{...other}
			className={cn(
				"inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-muted text-muted-foreground font-medium leading-none",
				sizeClasses[size],
				className,
			)}
		>
			{src != null ? (
				<img src={src} alt={alt} className="size-full object-cover" />
			) : initials != null ? (
				<span className="select-none">{initials}</span>
			) : (
				<span aria-hidden className="text-[0.35em]">?</span>
			)}
		</span>
	);
}

Avatar.displayName = "Avatar";
