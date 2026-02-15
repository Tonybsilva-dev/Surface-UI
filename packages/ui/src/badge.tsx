import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";

/**
 * Estilo visual alinhado ao protótipo (cva, rounded-md border, variantes default/secondary/destructive/outline).
 * Mantém toda a API: count, badgeContent, dot, overflowCount, showZero, size, wrapper com children.
 */
const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				primary:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "border-input text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground",
				success:
					"border-transparent bg-[#52c41a] text-white shadow hover:opacity-90",
				warning:
					"border-transparent bg-[#faad14] text-white shadow hover:opacity-90",
				error:
					"border-transparent bg-destructive text-primary-foreground shadow hover:bg-destructive/80",
			},
			size: {
				sm: "min-h-5 px-2.5 py-0.5",
				md: "min-h-5 px-2.5 py-0.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
export type BadgeSize = VariantProps<typeof badgeVariants>["size"];

export interface BadgeProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {
	badgeContent?: ReactNode;
	count?: number;
	dot?: boolean;
	overflowCount?: number;
	showZero?: boolean;
	children?: ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element {
	const {
		count,
		badgeContent,
		variant = "default",
		size = "md",
		dot = false,
		overflowCount = 99,
		showZero = false,
		children,
		className,
		style,
		...other
	} = props;

	const visible =
		dot ||
		showZero ||
		(count !== undefined && count > 0) ||
		badgeContent !== undefined;

	const displayValue = dot
		? null
		: badgeContent !== undefined
			? badgeContent
			: count !== undefined
				? count > overflowCount
					? `${overflowCount}+`
					: String(count)
				: null;

	const hasWrapper = children !== undefined;

	const badgeClassName = cn(
		badgeVariants({ variant, size }),
		dot && "min-h-2 min-w-2 p-0",
		dot && variant === "outline" && "bg-muted",
		hasWrapper && "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
	);

	const wrapperClassName = cn("relative inline-block", className);

	if (!visible && !children) {
		return <span className={wrapperClassName} style={style} {...other} />;
	}

	return (
		<span className={wrapperClassName} style={style} {...other}>
			{children}
			{visible ? (
				<span className={badgeClassName}>{displayValue}</span>
			) : null}
		</span>
	);
}

Badge.displayName = "Badge";

export { badgeVariants };
