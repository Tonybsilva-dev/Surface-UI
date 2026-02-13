import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import { useLayoutEffect } from "react";
import {
	lightColorScheme,
	spacingTokens,
	typographyTokens,
	componentShapeTokens,
	disabledOpacity,
} from "./foundation";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BUTTON_CSS_ID = "surface-button-styles";

const hoverColors: Record<ButtonVariant, string> = {
	primary: "rgb(38, 132, 255)",
	secondary: lightColorScheme.surfaceVariant,
	ghost: lightColorScheme.surfaceVariant,
};

const focusRing = `0 0 0 2px rgba(22, 119, 255, 0.2)`;

function ensureButtonStyles(): void {
	if (typeof document === "undefined" || document.getElementById(BUTTON_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = BUTTON_CSS_ID;
	style.textContent = `
.surface-button{transition:background-color 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out}
.surface-button:hover:not(:disabled){background-color:var(--surface-btn-bg-hover)!important;border-color:var(--surface-btn-border-hover, transparent)!important}
.surface-button:focus,.surface-button:focus-visible{outline:none;box-shadow:var(--surface-btn-focus-ring)!important}
@media(prefers-reduced-motion:reduce){.surface-button{transition:none}}
`;
	document.head.appendChild(style);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	leadingIcon?: React.ReactNode;
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
		className,
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

	useLayoutEffect(() => {
		ensureButtonStyles();
	}, []);

	const hoverBg = hoverColors[variant];
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
		["--surface-btn-bg-hover" as string]: hoverBg,
		["--surface-btn-border-hover" as string]:
			variant === "secondary" ? lightColorScheme.outline : "transparent",
		["--surface-btn-focus-ring" as string]: focusRing,
	};

	const stateStyles: CSSProperties = {};

	const combinedClassName = ["surface-button", className].filter(Boolean).join(" ");

	return (
		<button
			className={combinedClassName}
			disabled={disabled}
			style={{
				...baseStyles,
				...stateStyles,
				...style,
			}}
			type="button"
			{...other}
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
