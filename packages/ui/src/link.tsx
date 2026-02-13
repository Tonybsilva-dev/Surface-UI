import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { lightColorScheme, typographyTokens } from "./foundation";

export type LinkVariant = "default" | "primary" | "muted";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	/**
	 * Variante visual: default (onSurface), primary (ênfase), muted (secundário).
	 * Alinhado às guidelines de cor para links.
	 */
	variant?: LinkVariant;
	/**
	 * Sublinhado: always (sempre), hover (ao passar o mouse), none.
	 */
	underline?: "always" | "hover" | "none";
	/** Estilos inline. */
	style?: CSSProperties;
}

const variantToColor: Record<LinkVariant, string> = {
	default: lightColorScheme.onSurface,
	primary: lightColorScheme.primary,
	muted: lightColorScheme.onSurfaceVariant,
};

const baseFont = typographyTokens.body.medium;

/** Classe usada para sublinhado no hover; estilo injetado com !important para prevalecer sobre resets. */
const HOVER_UNDERLINE_CLASS = "surface-link-underline-hover";

const hoverUnderlineStyle = (
	<style>{`.${HOVER_UNDERLINE_CLASS} { text-decoration: none; }.${HOVER_UNDERLINE_CLASS}:hover { text-decoration: underline !important; }`}</style>
);

export function Link(props: LinkProps): JSX.Element {
	const {
		children,
		variant = "primary",
		underline = "hover",
		style,
		className,
		...other
	} = props;

	const color = variantToColor[variant];

	let textDecoration: "underline" | "none" = "none";
	if (underline === "always") {
		textDecoration = "underline";
	}

	const baseStyles: CSSProperties = {
		color,
		cursor: "pointer",
		fontFamily: baseFont.fontFamily,
		fontSize: baseFont.fontSize,
		fontWeight: baseFont.fontWeight,
		lineHeight: baseFont.lineHeight,
		outline: "none",
		textDecoration,
		transition: "color 150ms ease-out, text-decoration-color 150ms ease-out",
	};

	// underline="hover": não definir textDecoration no inline; a classe + estilo injetado controlam o hover.
	const effectiveStyles =
		underline === "hover"
			? (() => {
					const { textDecoration: _td, ...rest } = baseStyles;
					return rest;
				})()
			: baseStyles;

	const stateStyles: CSSProperties = {};
	const combinedClassName =
		underline === "hover" ? [HOVER_UNDERLINE_CLASS, className].filter(Boolean).join(" ") : className;

	return (
		<>
			{underline === "hover" ? hoverUnderlineStyle : null}
			<a
				{...other}
				className={combinedClassName || undefined}
				style={{
					...effectiveStyles,
					...stateStyles,
					...style,
				}}
			>
				{children}
			</a>
		</>
	);
}

Link.displayName = "Link";
