import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type LinkVariant = "default" | "primary" | "muted";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	variant?: LinkVariant;
	underline?: "always" | "hover" | "none";
}

const variantClasses: Record<LinkVariant, string> = {
	default: "text-foreground",
	primary: "text-primary",
	muted: "text-muted-foreground",
};

export function Link(props: LinkProps): JSX.Element {
	const {
		children,
		variant = "primary",
		underline = "hover",
		className,
		...other
	} = props;

	return (
		<a
			{...other}
			className={cn(
				"cursor-pointer outline-none transition-colors duration-150 ease-out",
				variantClasses[variant],
				underline === "always" && "underline",
				underline === "hover" && "no-underline hover:underline",
				underline === "none" && "no-underline",
				className,
			)}
		>
			{children}
		</a>
	);
}

Link.displayName = "Link";
