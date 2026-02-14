import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "./lib/utils";

/**
 * Estilos alinhados ao teu protótipo; foundation: --disabled-opacity, --primary, --ring, etc.
 */
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive: "bg-destructive text-white hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-none px-3",
				lg: "h-11 rounded-none px-8",
				icon: "h-10 w-10 rounded-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	children?: ReactNode;
	fullWidth?: boolean;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			fullWidth,
			leadingIcon,
			trailingIcon,
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					fullWidth && "w-full",
				)}
				ref={ref}
				type={asChild ? undefined : "button"}
				{...props}
			>
				{asChild ? (
					children
				) : (
					<>
						{leadingIcon ? (
							<span aria-hidden className="inline-flex shrink-0 items-center">
								{leadingIcon}
							</span>
						) : null}
						{children}
						{trailingIcon ? (
							<span aria-hidden className="inline-flex shrink-0 items-center">
								{trailingIcon}
							</span>
						) : null}
					</>
				)}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
