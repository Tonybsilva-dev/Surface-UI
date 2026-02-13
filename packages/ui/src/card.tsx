import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	spacingTokens,
	componentShapeTokens,
	elevationTokens,
	typographyTokens,
} from "./foundation";

export type CardVariant = "elevated" | "outlined" | "filled";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	/** Variante visual: elevated (sombra), outlined (borda), filled (fundo). */
	variant?: CardVariant;
	/** Conteúdo do card. */
	children: ReactNode;
	/** Estilos no container. */
	style?: CSSProperties;
}

const variantStyles: Record<CardVariant, CSSProperties> = {
	elevated: {
		boxShadow: elevationTokens.level1.boxShadow,
		border: "none",
	},
	outlined: {
		boxShadow: "none",
		border: `1px solid ${lightColorScheme.outline}`,
	},
	filled: {
		boxShadow: "none",
		border: "none",
		backgroundColor: lightColorScheme.surfaceVariant,
	},
};

export interface CardComponent {
	(props: CardProps): JSX.Element;
	Header: typeof CardHeader;
	Content: typeof CardContent;
	Footer: typeof CardFooter;
}

function CardRoot(props: CardProps): JSX.Element {
	const { variant = "elevated", children, className, style, ...other } = props;

	const baseStyles: CSSProperties = {
		display: "block",
		borderRadius: componentShapeTokens.card,
		backgroundColor: lightColorScheme.surface,
		padding: spacingTokens[5],
		boxSizing: "border-box",
	};

	return (
		<div
			className={className}
			style={{
				...baseStyles,
				...variantStyles[variant],
				...style,
			}}
			{...other}
		>
			{children}
		</div>
	);
}

CardRoot.displayName = "Card";

export const Card = CardRoot as unknown as CardComponent;

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	style?: CSSProperties;
}

export function CardHeader(props: CardHeaderProps): JSX.Element {
	const { children, style, ...other } = props;
	const font = typographyTokens.title.medium;
	return (
		<div
			{...other}
			style={{
				fontFamily: font.fontFamily,
				fontSize: font.fontSize,
				fontWeight: font.fontWeight,
				lineHeight: font.lineHeight,
				color: lightColorScheme.onSurface,
				marginBottom: spacingTokens[2],
				...style,
			}}
		>
			{children}
		</div>
	);
}

CardHeader.displayName = "Card.Header";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	style?: CSSProperties;
}

export function CardContent(props: CardContentProps): JSX.Element {
	const { children, style, ...other } = props;
	return (
		<div {...other} style={{ marginBottom: spacingTokens[2], ...style }}>
			{children}
		</div>
	);
}

CardContent.displayName = "Card.Content";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	style?: CSSProperties;
}

export function CardFooter(props: CardFooterProps): JSX.Element {
	const { children, style, ...other } = props;
	return (
		<div
			{...other}
			style={{
				paddingTop: spacingTokens[3],
				borderTop: `1px solid ${lightColorScheme.outlineVariant}`,
				marginTop: spacingTokens[2],
				...style,
			}}
		>
			{children}
		</div>
	);
}

CardFooter.displayName = "Card.Footer";

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
