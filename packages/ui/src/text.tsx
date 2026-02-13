import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	typographyTokens,
	type TypeScaleToken,
} from "./foundation";

/** Variantes da type scale: Display, Headline, Title, Body, Label (guidelines). */
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

/** Tom de cor do texto (contraste e acessibilidade conforme guidelines). */
export type TextTone =
	| "default"   // onSurface – texto principal
	| "muted"     // onSurfaceVariant – secundário/hint
	| "primary"   // primary – ênfase
	| "error"     // error – erro
	| "inverse";  // inverseOnSurface – sobre fundo escuro

/** Elemento HTML renderizado (semântica e acessibilidade). */
export type TextAs = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const variantToToken: Record<TextVariant, TypeScaleToken> = {
	displayLarge: typographyTokens.display.large,
	displayMedium: typographyTokens.display.medium,
	displaySmall: typographyTokens.display.small,
	headlineLarge: typographyTokens.headline.large,
	headlineMedium: typographyTokens.headline.medium,
	headlineSmall: typographyTokens.headline.small,
	titleLarge: typographyTokens.title.large,
	titleMedium: typographyTokens.title.medium,
	titleSmall: typographyTokens.title.small,
	bodyLarge: typographyTokens.body.large,
	bodyMedium: typographyTokens.body.medium,
	bodySmall: typographyTokens.body.small,
	labelLarge: typographyTokens.label.large,
	labelMedium: typographyTokens.label.medium,
	labelSmall: typographyTokens.label.small,
};

const toneToColor: Record<TextTone, string> = {
	default: lightColorScheme.onSurface,
	muted: lightColorScheme.onSurfaceVariant,
	primary: lightColorScheme.primary,
	error: lightColorScheme.error,
	inverse: lightColorScheme.inverseOnSurface,
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	/**
	 * Variante da type scale (Display, Headline, Title, Body, Label).
	 * Define fontFamily, fontSize, lineHeight, fontWeight, letterSpacing.
	 */
	variant?: TextVariant;
	/** Tom de cor: default (principal), muted (secundário), primary, error, inverse. */
	tone?: TextTone;
	/** Elemento HTML (span padrão; use p para parágrafo, h1–h6 para títulos). */
	as?: TextAs;
	/** Se true, aplica ellipsis quando o texto transborda (uma linha). */
	truncate?: boolean;
	/** Alinhamento do texto. */
	align?: CSSProperties["textAlign"];
	/** Estilos inline. */
	style?: CSSProperties;
}

export function Text(props: TextProps): JSX.Element {
	const {
		children,
		variant = "bodyMedium",
		tone = "default",
		as: Component = "span",
		truncate = false,
		align,
		style,
		...other
	} = props;

	const token = variantToToken[variant];
	const color = toneToColor[tone];

	const baseStyles: CSSProperties = {
		fontFamily: token.fontFamily,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight,
		fontWeight: token.fontWeight,
		letterSpacing: token.letterSpacing,
		color,
		...(align !== undefined && { textAlign: align }),
		...(truncate && {
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap" as const,
		}),
	};

	return (
		<Component {...other} style={{ ...baseStyles, ...style }}>
			{children}
		</Component>
	);
}

Text.displayName = "Text";
