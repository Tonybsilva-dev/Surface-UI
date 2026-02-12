import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	typographyTokens,
	componentShapeTokens,
} from "./foundation";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * Número a exibir. Se undefined e content também for undefined, nada é exibido (ou dot).
	 */
	count?: number;
	/**
	 * Conteúdo customizado (ex.: texto). Se definido, count é ignorado, exceto em modo dot.
	 */
	badgeContent?: ReactNode;
	/** Variante de cor. */
	variant?: BadgeVariant;
	/** Tamanho do badge. */
	size?: BadgeSize;
	/** Exibir apenas um ponto (sem número/texto). */
	dot?: boolean;
	/** Valor máximo antes de exibir overflowCount+ (ex.: 99+). */
	overflowCount?: number;
	/** Se true, mostra "0" quando count === 0. Se false, oculta o badge quando 0. */
	showZero?: boolean;
	/** Elemento que o badge posiciona sobre (canto superior direito). */
	children?: ReactNode;
	/** Estilos inline no wrapper. */
	style?: CSSProperties;
}

function getVariantColors(variant: BadgeVariant): { bg: string; color: string } {
	switch (variant) {
		case "primary":
			return { bg: lightColorScheme.primary, color: lightColorScheme.onPrimary };
		case "success":
			return { bg: "#52c41a", color: "#fff" };
		case "warning":
			return { bg: "#faad14", color: "#fff" };
		case "error":
			return { bg: lightColorScheme.error, color: lightColorScheme.onError };
		default:
			return { bg: lightColorScheme.outline, color: lightColorScheme.onSurface };
	}
}

const sizeStyles: Record<BadgeSize, { minHeight: number; padding: string; fontSize: string }> = {
	sm: { minHeight: 16, padding: "0 5px", fontSize: typographyTokens.label.small.fontSize },
	md: { minHeight: 20, padding: "0 6px", fontSize: typographyTokens.label.medium.fontSize },
};

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
		style,
		...other
	} = props;

	const { bg, color } = getVariantColors(variant);
	const sizes = sizeStyles[size];

	const visible =
		dot || showZero || (count !== undefined && count > 0) || badgeContent !== undefined;

	const displayValue =
		dot ? null : badgeContent !== undefined
			? badgeContent
			: count !== undefined
				? count > overflowCount
					? `${overflowCount}+`
					: String(count)
				: null;

	const hasWrapper = children !== undefined;

	const badgeStyles: CSSProperties = {
		...(hasWrapper
			? { position: "absolute" as const, top: 0, right: 0, transform: "translate(50%, -50%)" }
			: {}),
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: dot ? 8 : sizes.minHeight,
		minWidth: dot ? 8 : undefined,
		padding: dot ? 0 : sizes.padding,
		fontFamily: typographyTokens.fontFamily.default,
		fontSize: sizes.fontSize,
		fontWeight: typographyTokens.label.medium.fontWeight,
		lineHeight: 1,
		color,
		backgroundColor: bg,
		borderRadius: componentShapeTokens.chip,
		boxSizing: "border-box",
		border: "2px solid transparent", // evita corte com fundo claro
	};

	const wrapperStyles: CSSProperties = {
		position: "relative",
		display: "inline-block",
		...style,
	};

	if (!visible && !children) {
		return <span style={wrapperStyles} {...other} />;
	}

	return (
		<span style={wrapperStyles} {...other}>
			{children}
			{visible ? (
				<span style={badgeStyles}>
					{displayValue}
				</span>
			) : null}
		</span>
	);
}

Badge.displayName = "Badge";
