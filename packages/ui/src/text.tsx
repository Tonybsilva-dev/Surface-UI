import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type TextVariant =
	| "displayLarge"
	| "displayMedium"
	| "displaySmall"
	| "headlineLarge"
	| "headlineMedium"
	| "headlineSmall"
	| "titleLarge"
	| "titleMedium"
	| "titleSmall"
	| "bodyLarge"
	| "bodyMedium"
	| "bodySmall"
	| "labelLarge"
	| "labelMedium"
	| "labelSmall";

export type TextTone = "default" | "muted" | "primary" | "error" | "inverse";

export type TextAs = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const variantClasses: Record<TextVariant, string> = {
	displayLarge: "text-5xl font-normal tracking-tight leading-tight",
	displayMedium: "text-4xl font-normal leading-tight",
	displaySmall: "text-3xl font-normal leading-snug",
	headlineLarge: "text-2xl font-normal leading-snug",
	headlineMedium: "text-xl font-normal leading-snug",
	headlineSmall: "text-lg font-normal leading-snug",
	titleLarge: "text-xl font-medium leading-snug",
	titleMedium: "text-lg font-medium leading-snug",
	titleSmall: "text-base font-medium leading-snug",
	bodyLarge: "text-base font-normal leading-relaxed",
	bodyMedium: "text-base font-normal leading-normal",
	bodySmall: "text-sm font-normal leading-normal",
	labelLarge: "text-sm font-medium leading-none",
	labelMedium: "text-sm font-medium leading-none",
	labelSmall: "text-xs font-medium leading-none",
};

const toneClasses: Record<TextTone, string> = {
	default: "text-foreground",
	muted: "text-muted-foreground",
	primary: "text-primary",
	error: "text-destructive",
	inverse: "text-primary-foreground",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	variant?: TextVariant;
	tone?: TextTone;
	as?: TextAs;
	truncate?: boolean;
	align?: "left" | "center" | "right";
}

export function Text(props: TextProps): JSX.Element {
	const {
		children,
		variant = "bodyMedium",
		tone = "default",
		as: Component = "span",
		truncate = false,
		align,
		className,
		style,
		...other
	} = props;

	return (
		<Component
			{...other}
			className={cn(
				variantClasses[variant],
				toneClasses[tone],
				truncate && "overflow-hidden text-ellipsis whitespace-nowrap",
				align === "left" && "text-left",
				align === "center" && "text-center",
				align === "right" && "text-right",
				className,
			)}
			style={style}
		>
			{children}
		</Component>
	);
}

Text.displayName = "Text";
