import type {
	CSSProperties,
	ReactNode,
	TextareaHTMLAttributes,
} from "react";
import { createContext, forwardRef, useContext, useLayoutEffect } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaStatus = "default" | "error" | "warning";

const TEXTAREA_CSS_ID = "surface-textarea-styles";

function ensureTextAreaStyles(): void {
	if (typeof document === "undefined" || document.getElementById(TEXTAREA_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = TEXTAREA_CSS_ID;
	style.textContent = `
.surface-textarea-wrap{transition:border-color ${motionTokens.duration.short2}, box-shadow ${motionTokens.duration.short2}}
.surface-textarea-wrap:focus-within{outline:none;box-shadow:var(--surface-textarea-focus-ring)!important}
@media(prefers-reduced-motion:reduce){.surface-textarea-wrap{transition:none}}
`;
	document.head.appendChild(style);
}

const sizeMap: Record<
	TextAreaSize,
	{ minHeight: number; paddingInline: string; paddingBlock: string }
> = {
	sm: {
		minHeight: 80,
		paddingInline: spacingTokens[2],
		paddingBlock: spacingTokens[1],
	},
	md: {
		minHeight: 100,
		paddingInline: spacingTokens[3],
		paddingBlock: spacingTokens[2],
	},
	lg: {
		minHeight: 120,
		paddingInline: spacingTokens[3],
		paddingBlock: spacingTokens[2],
	},
};

const borderColorByStatus: Record<TextAreaStatus, string> = {
	default: lightColorScheme.outline,
	error: lightColorScheme.error,
	warning: "rgb(250, 173, 20)",
};

const bodyMedium = typographyTokens.body.medium;
const focusRing = "0 0 0 2px rgba(22, 119, 255, 0.2)";

interface TextAreaContextValue {
	size: TextAreaSize;
	status: TextAreaStatus;
	disabled?: boolean;
	borderColor: string;
	dims: { minHeight: number; paddingInline: string; paddingBlock: string };
}

const TextAreaContext = createContext<TextAreaContextValue | null>(null);

export interface TextAreaRootProps {
	size?: TextAreaSize;
	status?: TextAreaStatus;
	disabled?: boolean;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TextAreaRoot(props: TextAreaRootProps): JSX.Element {
	const {
		size = "md",
		status = "default",
		disabled,
		children,
		className,
		style,
	} = props;
	useLayoutEffect(() => {
		ensureTextAreaStyles();
	}, []);
	const dims = sizeMap[size];
	const borderColor = borderColorByStatus[status];
	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		width: "100%",
		minWidth: 0,
		minHeight: dims.minHeight,
		boxSizing: "border-box",
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${borderColor}`,
		backgroundColor: lightColorScheme.surface,
		["--surface-textarea-focus-ring" as string]: focusRing,
		transition: `border-color ${motionTokens.duration.short2} ease-out, box-shadow ${motionTokens.duration.short2} ease-out`,
	};
	const combinedClassName = ["surface-textarea-wrap", className]
		.filter(Boolean)
		.join(" ");
	const ctx: TextAreaContextValue = {
		size,
		status,
		disabled,
		borderColor,
		dims,
	};
	return (
		<TextAreaContext.Provider value={ctx}>
			<span className={combinedClassName} style={{ ...wrapperStyles, ...style }}>
				{children}
			</span>
		</TextAreaContext.Provider>
	);
}

TextAreaRoot.displayName = "TextArea.Root";

export interface TextAreaInputProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	/** resize: none | vertical | both. */
	resize?: "none" | "vertical" | "both";
	style?: CSSProperties;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
	function TextAreaInput(props, ref) {
		const { resize = "vertical", style: styleProp, ...other } = props;
		const ctx = useContext(TextAreaContext);
		if (!ctx) {
			return <textarea ref={ref} {...other} />;
		}
		const { dims, status, disabled } = ctx;
		const inputStyles: CSSProperties = {
			width: "100%",
			minWidth: 0,
			minHeight: dims.minHeight - 2,
			boxSizing: "border-box",
			paddingInline: dims.paddingInline,
			paddingBlock: dims.paddingBlock,
			border: "none",
			outline: "none",
			background: "transparent",
			fontFamily: bodyMedium.fontFamily,
			fontSize: bodyMedium.fontSize,
			lineHeight: bodyMedium.lineHeight,
			fontWeight: bodyMedium.fontWeight,
			color: lightColorScheme.onSurface,
			opacity: disabled ? disabledOpacity : 1,
			cursor: disabled ? "not-allowed" : "text",
			resize,
			...styleProp,
		};
		return (
			<textarea
				ref={ref}
				aria-invalid={status === "error" ? true : undefined}
				disabled={disabled}
				style={inputStyles}
				{...other}
			/>
		);
	},
);

TextAreaInput.displayName = "TextArea.Input";

export interface TextAreaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	size?: TextAreaSize;
	status?: TextAreaStatus;
	style?: CSSProperties;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function TextArea(props, ref) {
		const {
			size = "md",
			status = "default",
			disabled,
			className,
			style,
			...other
		} = props;
		return (
			<TextAreaRoot size={size} status={status} disabled={disabled} style={style} className={className}>
				<TextAreaInput ref={ref} {...other} />
			</TextAreaRoot>
		);
	},
);

TextArea.displayName = "TextArea";

(TextArea as typeof TextArea & { Root: typeof TextAreaRoot; Input: typeof TextAreaInput }).Root =
	TextAreaRoot;
(TextArea as typeof TextArea & { Root: typeof TextAreaRoot; Input: typeof TextAreaInput }).Input =
	TextAreaInput;
