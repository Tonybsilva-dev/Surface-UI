import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	componentShapeTokens,
	disabledOpacity,
} from "./foundation";

export type IconButtonVariant = "primary" | "secondary" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Ícone exibido (SVG ou elemento). Área de toque é o botão inteiro. */
	icon: ReactNode;
	/**
	 * Label acessível (obrigatório). Não é visível; usado por leitores de tela.
	 */
	"aria-label": string;
	/** Variante visual. */
	variant?: IconButtonVariant;
	/** Tamanho: determina área clicável (sm 32px, md 40px, lg 48px). */
	size?: IconButtonSize;
	/** Estilos inline. */
	style?: CSSProperties;
}

const sizeMap: Record<IconButtonSize, number> = {
	sm: 32,
	md: 40,
	lg: 48,
};

const iconSizeMap: Record<IconButtonSize, number> = {
	sm: 18,
	md: 22,
	lg: 24,
};

export function IconButton(props: IconButtonProps): JSX.Element {
	const {
		icon,
		variant = "primary",
		size = "md",
		disabled,
		style,
		...other
	} = props;

	const side = sizeMap[size];
	const iconSize = iconSizeMap[size];

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
		width: side,
		height: side,
		minWidth: side,
		minHeight: side,
		padding: 0,
		borderRadius: componentShapeTokens.button,
		border: `1px solid ${borderColor}`,
		backgroundColor: background,
		color,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		outline: "none",
		transition:
			"background-color 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out",
	};

	return (
		<button
			type="button"
			{...other}
			disabled={disabled}
			style={{ ...baseStyles, ...style }}
		>
			<span
				aria-hidden
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: iconSize,
					height: iconSize,
					color,
				}}
			>
				{icon}
			</span>
		</button>
	);
}

IconButton.displayName = "IconButton";
