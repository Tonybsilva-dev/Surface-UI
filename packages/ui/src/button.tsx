import type {
	ButtonHTMLAttributes,
	CSSProperties,
	ReactElement,
	ReactNode,
} from "react";
import {
	forwardRef,
	cloneElement,
	Children,
	isValidElement,
	useLayoutEffect,
} from "react";
import {
	lightColorScheme,
	spacingTokens,
	typographyTokens,
	componentShapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

export type ButtonVariant =
	| "default"
	| "primary"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type ButtonSize = "default" | "sm" | "md" | "lg" | "icon";

const BUTTON_CSS_ID = "surface-button-styles";

const focusRing = `0 0 0 2px rgba(22, 119, 255, 0.2)`;

interface VariantStyles {
	background: string;
	color: string;
	borderColor: string;
	hoverBackground: string;
	hoverBorder?: string;
}

const variantStyles: Record<ButtonVariant, VariantStyles> = {
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

function ensureButtonStyles(): void {
	if (typeof document === "undefined" || document.getElementById(BUTTON_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = BUTTON_CSS_ID;
	style.textContent = `
.surface-button{transition:background-color ${motionTokens.duration.short2} ${motionTokens.easing.standard}, border-color ${motionTokens.duration.short2} ${motionTokens.easing.standard}, box-shadow ${motionTokens.duration.short2} ${motionTokens.easing.standard}, color ${motionTokens.duration.short2} ${motionTokens.easing.standard}}
.surface-button:hover:not(:disabled){background-color:var(--surface-btn-bg-hover)!important;border-color:var(--surface-btn-border-hover, transparent)!important;color:var(--surface-btn-color-hover, inherit)!important}
.surface-button:focus,.surface-button:focus-visible{outline:none;box-shadow:var(--surface-btn-focus-ring)!important}
.surface-button[data-variant="link"]:hover:not(:disabled){text-decoration:underline;text-underline-offset:4px}
@media(prefers-reduced-motion:reduce){.surface-button{transition:none}}
`;
	document.head.appendChild(style);
}

const baseFont = typographyTokens.label.large;

function getPadding(size: ButtonSize | undefined): {
	paddingInline: string;
	paddingBlock: string;
	minHeight: number;
	minWidth?: number;
} {
	switch (size) {
		case "sm":
			return {
				paddingInline: spacingTokens[3],
				paddingBlock: spacingTokens[1],
				minHeight: 36,
			};
		case "lg":
			return {
				paddingInline: spacingTokens[6],
				paddingBlock: spacingTokens[2],
				minHeight: 44,
			};
		case "icon":
			return {
				paddingInline: spacingTokens[2],
				paddingBlock: spacingTokens[2],
				minHeight: 40,
				minWidth: 40,
			};
		case "md":
		case "default":
		default:
			return {
				paddingInline: spacingTokens[4],
				paddingBlock: spacingTokens[2],
				minHeight: 40,
			};
	}
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
	/** Quando true, renderiza o filho único recebendo as props visuais do botão (estilo, ref). Sem Radix Slot. */
	asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	props,
	ref,
) {
	const {
		children,
		variant = "default",
		size = "default",
		fullWidth,
		leadingIcon,
		trailingIcon,
		asChild = false,
		disabled,
		style,
		className,
		...other
	} = props;

	const padding = getPadding(size);
	const vs = variantStyles[variant];

	useLayoutEffect(() => {
		ensureButtonStyles();
	}, []);

	const baseStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		whiteSpace: "nowrap",
		borderRadius: componentShapeTokens.button,
		border: `1px solid ${vs.borderColor}`,
		backgroundColor: vs.background,
		color: vs.color,
		fontFamily: baseFont.fontFamily,
		fontSize: baseFont.fontSize,
		lineHeight: baseFont.lineHeight,
		fontWeight: baseFont.fontWeight,
		paddingInline: padding.paddingInline,
		paddingBlock: padding.paddingBlock,
		minHeight: padding.minHeight,
		minWidth: padding.minWidth,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		pointerEvents: disabled ? "none" : undefined,
		outline: "none",
		width: fullWidth ? "100%" : undefined,
		["--surface-btn-bg-hover" as string]: vs.hoverBackground,
		["--surface-btn-border-hover" as string]: vs.hoverBorder ?? "transparent",
		["--surface-btn-color-hover" as string]:
			variant === "link" ? lightColorScheme.primary : vs.color,
		["--surface-btn-focus-ring" as string]: focusRing,
	};

	const combinedClassName = [
		"surface-button",
		className,
		variant === "link" ? "surface-button-link" : "",
	]
		.filter(Boolean)
		.join(" ");

	const dataAttrs = { "data-variant": variant };

	if (asChild && isValidElement(children)) {
		const child = Children.only(children) as ReactElement<Record<string, unknown>>;
		const childProps = child.props;
		const childStyle =
			childProps.style && typeof childProps.style === "object"
				? (childProps.style as CSSProperties)
				: {};
		return cloneElement(child, {
			...childProps,
			...other,
			...dataAttrs,
			className: [combinedClassName, childProps.className]
				.filter(Boolean)
				.join(" "),
			ref,
			style: { ...baseStyles, ...childStyle, ...style },
		} as Record<string, unknown>);
	}

	return (
		<button
			className={combinedClassName}
			disabled={disabled}
			ref={ref}
			style={{ ...baseStyles, ...style }}
			type="button"
			{...dataAttrs}
			{...other}
		>
			{leadingIcon ? (
				<span
					aria-hidden
					style={{
						display: "inline-flex",
						alignItems: "center",
						color: vs.color,
					}}
				>
					{leadingIcon}
				</span>
			) : null}
			<span style={{ color: vs.color }}>{children}</span>
			{trailingIcon ? (
				<span
					aria-hidden
					style={{
						display: "inline-flex",
						alignItems: "center",
						color: vs.color,
					}}
				>
					{trailingIcon}
				</span>
			) : null}
		</button>
	);
});

Button.displayName = "Button";

export { Button };
