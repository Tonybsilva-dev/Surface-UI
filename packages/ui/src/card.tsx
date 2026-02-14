/**
 * Card – componente por composição.
 * O consumidor monta a UI com Card (root) + Card.Header, Card.Title, Card.Description,
 * Card.Content, Card.Footer e Card.Action conforme necessário.
 */
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./lib/utils";

export type CardVariant = "elevated" | "outlined" | "filled";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	/** Variante visual: elevated (sombra + borda), outlined (borda), filled (fundo). */
	variant?: CardVariant;
	/** Conteúdo do card. */
	children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
	elevated: "border border-border shadow",
	outlined: "border border-border shadow-none",
	filled: "bg-muted border-0 shadow-none",
};

export interface CardComponent {
	(props: CardProps): JSX.Element;
	Header: typeof CardHeader;
	Title: typeof CardTitle;
	Description: typeof CardDescription;
	Content: typeof CardContent;
	Footer: typeof CardFooter;
	Action: typeof CardAction;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
	{ variant = "elevated", children, className, ...other },
	ref,
) {
	return (
		<div
			className={cn(
				"bg-card text-card-foreground",
				variantClasses[variant],
				className,
			)}
			ref={ref}
			{...other}
		>
			{children}
		</div>
	);
});

CardRoot.displayName = "Card";

export const Card = CardRoot as unknown as CardComponent;

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	function CardHeader({ children, className, ...other }, ref) {
		return (
			<div
				className={cn("flex flex-col space-y-1.5 p-6", className)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "Card.Header";

export interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
	function CardTitle({ className, ...other }, ref) {
		return (
			<div
				className={cn("font-semibold leading-none tracking-tight", className)}
				ref={ref}
				{...other}
			/>
		);
	},
);

CardTitle.displayName = "Card.Title";

export interface CardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(
	function CardDescription({ className, ...other }, ref) {
		return (
			<div
				className={cn("text-sm text-muted-foreground", className)}
				ref={ref}
				{...other}
			/>
		);
	},
);

CardDescription.displayName = "Card.Description";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	function CardContent({ children, className, ...other }, ref) {
		return (
			<div className={cn("p-6 pt-0", className)} ref={ref} {...other}>
				{children}
			</div>
		);
	},
);

CardContent.displayName = "Card.Content";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	function CardFooter({ children, className, ...other }, ref) {
		return (
			<div
				className={cn("flex items-center p-6 pt-0", className)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "Card.Footer";

export interface CardActionProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
	function CardAction({ className, ...other }, ref) {
		return (
			<div
				className={cn("ml-auto flex items-center", className)}
				ref={ref}
				{...other}
			/>
		);
	},
);

CardAction.displayName = "Card.Action";

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Action = CardAction;
