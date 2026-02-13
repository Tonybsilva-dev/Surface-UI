import type { LabelHTMLAttributes, CSSProperties, ReactNode } from "react";
import {
	lightColorScheme,
	typographyTokens,
	disabledOpacity,
} from "./foundation";

export type LabelSize = "labelSmall" | "labelMedium" | "labelLarge";

export interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "size"> {
	/** Conteúdo do rótulo. */
	children: ReactNode;
	/**
	 * Tamanho tipográfico: labelSmall, labelMedium, labelLarge.
	 * Alinhado a typographyTokens.label.* e guidelines de inputs.
	 */
	size?: LabelSize;
	/** Mostra asterisco visual para campo obrigatório (aria-required no controlo fica a cargo do consumidor). */
	required?: boolean;
	/** Aparência desativada (opacidade) quando o controlo associado está desativado. */
	disabled?: boolean;
	/** Estilos inline. */
	style?: CSSProperties;
}

const sizeToToken = {
	labelSmall: typographyTokens.label.small,
	labelMedium: typographyTokens.label.medium,
	labelLarge: typographyTokens.label.large,
} as const;

export function Label(props: LabelProps): JSX.Element {
	const {
		children,
		size = "labelMedium",
		required = false,
		disabled,
		style,
		className,
		...other
	} = props;

	const font = sizeToToken[size];

	const labelStyles: CSSProperties = {
		display: "inline-block",
		fontFamily: font.fontFamily,
		fontSize: font.fontSize,
		lineHeight: font.lineHeight,
		fontWeight: font.fontWeight,
		letterSpacing: font.letterSpacing,
		color: lightColorScheme.onSurface,
		opacity: disabled ? disabledOpacity : 1,
		cursor: disabled ? "not-allowed" : "default",
	};

	return (
		<label style={{ ...labelStyles, ...style }} className={className} {...other}>
			{children}
			{required ? (
				<span aria-hidden style={{ color: lightColorScheme.error, marginLeft: 2 }}>
					*
				</span>
			) : null}
		</label>
	);
}

Label.displayName = "Label";
