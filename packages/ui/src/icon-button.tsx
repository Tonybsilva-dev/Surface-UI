import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./lib/utils";

export type IconButtonVariant =
	| "default"
	| "primary"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type IconButtonSize = "default" | "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	"aria-label": string;
	variant?: IconButtonVariant;
	size?: IconButtonSize;
}

const variantClasses: Record<IconButtonVariant, string> = {
	default:
		"bg-primary text-primary-foreground hover:bg-primary/90 border-transparent",
	primary:
		"bg-primary text-primary-foreground hover:bg-primary/90 border-transparent",
	destructive:
		"bg-destructive text-primary-foreground hover:bg-destructive/90 border-transparent",
	outline:
		"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
	ghost: "hover:bg-accent hover:text-accent-foreground border-transparent",
	link: "text-primary underline-offset-4 hover:underline border-transparent",
};

const sizeClasses: Record<IconButtonSize, string> = {
	sm: "h-8 w-8 min-h-8 min-w-8 [&_svg]:size-[18px]",
	default: "h-10 w-10 min-h-10 min-w-10 [&_svg]:size-5",
	md: "h-10 w-10 min-h-10 min-w-10 [&_svg]:size-5",
	lg: "h-12 w-12 min-h-12 min-w-12 [&_svg]:size-6",
};

const baseClasses =
	"inline-flex items-center justify-center shrink-0 rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] p-0";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{ icon, variant = "default", size = "default", className, ...other },
		ref,
	) {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					baseClasses,
					variantClasses[variant],
					sizeClasses[size],
					className,
				)}
				{...other}
			>
				<span aria-hidden className="inline-flex items-center justify-center text-current">
					{icon}
				</span>
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
