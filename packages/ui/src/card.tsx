import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	spacingTokens,
	componentShapeTokens,
	elevationTokens,
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

export function Card(props: CardProps): JSX.Element {
	const { variant = "elevated", children, className, style, ...other } = props;

	const baseStyles: CSSProperties = {
		display: "block",
		borderRadius: componentShapeTokens.card,
		backgroundColor: lightColorScheme.surface,
		padding: spacingTokens[5],
		boxSizing: "border-box",
	};

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

Card.displayName = "Card";
