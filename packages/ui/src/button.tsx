import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	spacingTokens,
	typographyTokens,
	componentShapeTokens,
	disabledOpacity,
} from "./foundation";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	/**
	 * Variante visual do botão.
	 * - primary: ação principal (filled)
	 * - secondary: ação secundária (outlined)
	 * - ghost: ação neutra (text/ghost)
	 */
	variant?: ButtonVariant;
	/**
	 * Tamanho do botão.
	 * - sm: compact
	 * - md: padrão
	 * - lg: maior área clicável
	 */
	size?: ButtonSize;
	/** Ocupa 100% da largura disponível. */
	fullWidth?: boolean;
	/** Ícone antes do texto. */
	leadingIcon?: React.ReactNode;
	/** Ícone depois do texto. */
	trailingIcon?: React.ReactNode;
}

const baseFont = typographyTokens.label.large;

function getPadding(size: ButtonSize | undefined): {
	paddingInline: string;
	paddingBlock: string;
	minHeight: number;
} {
	switch (size) {
		case "sm":
			return {
				paddingInline: spacingTokens[3], // 12px
				paddingBlock: spacingTokens[1], // 4px
				minHeight: 32,
			};
		case "lg":
			return {
				paddingInline: spacingTokens[5], // 20px
				paddingBlock: spacingTokens[3], // 12px
				minHeight: 48,
			};
		case "md":
		default:
			return {
				paddingInline: spacingTokens[4], // 16px
				paddingBlock: spacingTokens[2], // 8px
				minHeight: 40,
			};
	}
}

export function Button(props: ButtonProps): JSX.Element {
	const {
		children,
		variant = "primary",
		size = "md",
		fullWidth,
		leadingIcon,
		trailingIcon,
		disabled,
		style,
		...other
	} = props;

	const padding = getPadding(size);

	let background = "transparent";
	let color = lightColorScheme.onSurface;
	let borderColor = "transparent";

	switch (variant) {
		case "primary": {
			background = lightColorScheme.primary;
			color = lightColorScheme.onPrimary;
			break;
		}
		case "secondary": {
			background = lightColorScheme.surface;
			color = lightColorScheme.primary;
			borderColor = lightColorScheme.outline;
			break;
		}
		case "ghost": {
			background = "transparent";
			color = lightColorScheme.primary;
			break;
		}
		default:
			break;
	}

	const baseStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		borderRadius: componentShapeTokens.button,
		border: `1px solid ${borderColor}`,
		backgroundColor: background,
		color,
		fontFamily: baseFont.fontFamily,
		fontSize: baseFont.fontSize,
		lineHeight: baseFont.lineHeight,
		fontWeight: baseFont.fontWeight,
		paddingInline: padding.paddingInline,
		paddingBlock: padding.paddingBlock,
		minHeight: padding.minHeight,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		outline: "none",
		width: fullWidth ? "100%" : undefined,
		transition:
			"background-color 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out",
	};

	const stateStyles: CSSProperties = {};

	return (
		<button
			type="button"
			{...other}
			disabled={disabled}
			style={{
				...baseStyles,
				...stateStyles,
				...style,
			}}
		>
			{leadingIcon ? (
				<span
					aria-hidden
					style={{
						display: "inline-flex",
						alignItems: "center",
						color,
					}}
				>
					{leadingIcon}
				</span>
			) : null}
			<span style={{ color }}>{children}</span>
			{trailingIcon ? (
				<span
					aria-hidden
					style={{
						display: "inline-flex",
						alignItems: "center",
						color,
					}}
				>
					{trailingIcon}
				</span>
			) : null}
		</button>
	);
}

Button.displayName = "Button";
