import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import { useLayoutEffect } from "react";
import {
	lightColorScheme,
	componentShapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

export type IconButtonVariant =
	| "default"
	| "primary"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type IconButtonSize = "default" | "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Ícone exibido (SVG ou elemento). Área de toque é o botão inteiro. */
	icon: ReactNode;
	/**
	 * Label acessível (obrigatório). Não é visível; usado por leitores de tela.
	 */
	"aria-label": string;
	/** Variante visual (alinhada ao Button). */
	variant?: IconButtonVariant;
	/** Tamanho: sm 32px, default/md 40px, lg 48px. */
	size?: IconButtonSize;
	/** Estilos inline. */
	style?: CSSProperties;
}

interface VariantStyles {
	background: string;
	borderColor: string;
	color: string;
	hoverBackground: string;
	hoverBorder?: string;
}

const variantStyles: Record<IconButtonVariant, VariantStyles> = {
	default: {
		background: lightColorScheme.primary,
		color: lightColorScheme.onPrimary,
		borderColor: "transparent",
		hoverBackground: "rgb(38, 132, 255)",
	},
	primary: {
		background: lightColorScheme.primary,
		color: lightColorScheme.onPrimary,
		borderColor: "transparent",
		hoverBackground: "rgb(38, 132, 255)",
	},
	destructive: {
		background: lightColorScheme.error,
		color: lightColorScheme.onError,
		borderColor: "transparent",
		hoverBackground: "rgb(230, 62, 64)",
	},
	outline: {
		background: lightColorScheme.surface,
		color: lightColorScheme.onSurface,
		borderColor: lightColorScheme.outline,
		hoverBackground: lightColorScheme.surfaceVariant,
		hoverBorder: lightColorScheme.outline,
	},
	secondary: {
		background: lightColorScheme.secondaryContainer,
		color: lightColorScheme.onSecondaryContainer,
		borderColor: "transparent",
		hoverBackground: "rgb(232, 232, 233)",
	},
	ghost: {
		background: "transparent",
		color: lightColorScheme.onSurface,
		borderColor: "transparent",
		hoverBackground: lightColorScheme.surfaceVariant,
	},
	link: {
		background: "transparent",
		color: lightColorScheme.primary,
		borderColor: "transparent",
		hoverBackground: "transparent",
	},
};

const ICON_BUTTON_CSS_ID = "surface-icon-button-styles";
const focusRing = "0 0 0 2px rgba(22, 119, 255, 0.2)";

function ensureIconButtonStyles(): void {
	if (
		typeof document === "undefined" ||
		document.getElementById(ICON_BUTTON_CSS_ID)
	)
		return;
	const style = document.createElement("style");
	style.id = ICON_BUTTON_CSS_ID;
	style.textContent = `
.surface-icon-button{transition:background-color ${motionTokens.duration.short2} ${motionTokens.easing.standard}, border-color ${motionTokens.duration.short2} ${motionTokens.easing.standard}, box-shadow ${motionTokens.duration.short2} ${motionTokens.easing.standard}, color ${motionTokens.duration.short2} ${motionTokens.easing.standard}}
.surface-icon-button:hover:not(:disabled){background-color:var(--surface-ib-bg-hover)!important;border-color:var(--surface-ib-border-hover, transparent)!important;color:var(--surface-ib-color-hover, inherit)!important}
.surface-icon-button:focus,.surface-icon-button:focus-visible{outline:none;box-shadow:var(--surface-ib-focus-ring)!important}
@media(prefers-reduced-motion:reduce){.surface-icon-button{transition:none}}
`;
	document.head.appendChild(style);
}

const sizeMap: Record<IconButtonSize, number> = {
	sm: 32,
	default: 40,
	md: 40,
	lg: 48,
};

const iconSizeMap: Record<IconButtonSize, number> = {
	sm: 18,
	default: 22,
	md: 22,
	lg: 24,
};

export function IconButton(props: IconButtonProps): JSX.Element {
	const {
		icon,
		variant = "default",
		size = "default",
		disabled,
		style,
		className,
		...other
	} = props;

	useLayoutEffect(() => {
		ensureIconButtonStyles();
	}, []);

	const side = sizeMap[size];
	const iconSize = iconSizeMap[size];
	const vs = variantStyles[variant];

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
		border: `1px solid ${vs.borderColor}`,
		backgroundColor: vs.background,
		color: vs.color,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		pointerEvents: disabled ? "none" : undefined,
		outline: "none",
		["--surface-ib-bg-hover" as string]: vs.hoverBackground,
		["--surface-ib-border-hover" as string]: vs.hoverBorder ?? "transparent",
		["--surface-ib-color-hover" as string]: vs.color,
		["--surface-ib-focus-ring" as string]: focusRing,
	};

	const combinedClassName = ["surface-icon-button", className]
		.filter(Boolean)
		.join(" ");

	return (
		<button
			type="button"
			className={combinedClassName}
			disabled={disabled}
			style={{ ...baseStyles, ...style }}
			{...other}
		>
			<span
				aria-hidden
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: iconSize,
					height: iconSize,
					color: "currentColor",
				}}
			>
				{icon}
			</span>
		</button>
	);
}

IconButton.displayName = "IconButton";
