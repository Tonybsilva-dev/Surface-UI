import type {
	ChangeEvent,
	CSSProperties,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";
import { IconButton } from "./icon-button";

export type TextInputSize = "sm" | "md" | "lg";
export type TextInputStatus = "default" | "error" | "warning";

const INPUT_CSS_ID = "surface-text-input-styles";

function ensureTextInputStyles(): void {
	if (typeof document === "undefined" || document.getElementById(INPUT_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = INPUT_CSS_ID;
	style.textContent = `
.surface-text-input-wrap{transition:border-color ${motionTokens.duration.short2}, box-shadow ${motionTokens.duration.short2}}
.surface-text-input-wrap:focus-within{outline:none;box-shadow:var(--surface-input-focus-ring)!important}
@media(prefers-reduced-motion:reduce){.surface-text-input-wrap{transition:none}}
`;
	document.head.appendChild(style);
}

const sizeMap: Record<
	TextInputSize,
	{ height: number; paddingInline: string; paddingBlock: string }
> = {
	sm: {
		height: 24,
		paddingInline: spacingTokens[2],
		paddingBlock: spacingTokens[0],
	},
	md: {
		height: 32,
		paddingInline: spacingTokens[3],
		paddingBlock: spacingTokens[1],
	},
	lg: {
		height: 40,
		paddingInline: spacingTokens[3],
		paddingBlock: spacingTokens[2],
	},
};

export interface TextInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Tamanho: sm (24px), md (32px), lg (40px). Como Input do Ant Design. */
	size?: TextInputSize;
	/** Estado de validação: error (borda vermelha), warning (borda amarela/laranja). */
	status?: TextInputStatus;
	/** Conteúdo antes do input (prefix). */
	addonBefore?: ReactNode;
	/** Conteúdo depois do input (suffix). */
	addonAfter?: ReactNode;
	/** Se true, mostra botão de limpar quando há valor (allowClear). */
	allowClear?: boolean;
	/** Estilos no wrapper. */
	style?: CSSProperties;
}

const bodyMedium = typographyTokens.body.medium;
const focusRing = "0 0 0 2px rgba(22, 119, 255, 0.2)";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(props, ref) {
		const {
			size = "md",
			status = "default",
			disabled,
			addonBefore,
			addonAfter,
			allowClear = false,
			className,
			style,
			value,
			onChange,
			...other
		} = props;

		const inputRef = useRef<HTMLInputElement | null>(null);
		const setRef = (el: HTMLInputElement | null) => {
			inputRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) ref.current = el;
		};

		const isControlled = value !== undefined;
		const [uncontrolledValue, setUncontrolledValue] = useState("");

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) setUncontrolledValue(e.target.value);
			onChange?.(e);
		};

		const displayValue = isControlled ? value : undefined;
		const hasContent =
			allowClear &&
			(isControlled ? String(value).length > 0 : uncontrolledValue.length > 0);

		useLayoutEffect(() => {
			ensureTextInputStyles();
		}, []);

		const dims = sizeMap[size];

		const borderColorByStatus: Record<TextInputStatus, string> = {
			default: lightColorScheme.outline,
			error: lightColorScheme.error,
			warning: "rgb(250, 173, 20)",
		};
		const borderColor = borderColorByStatus[status];

		const fixedHeightPx = dims.height;
		const wrapperStyles: CSSProperties = {
			display: "inline-flex",
			alignItems: "stretch",
			width: "100%",
			minWidth: 0,
			height: fixedHeightPx,
			minHeight: fixedHeightPx,
			boxSizing: "border-box",
			borderRadius: componentShapeTokens.textField,
			border: `1px solid ${borderColor}`,
			backgroundColor: lightColorScheme.surface,
			["--surface-input-focus-ring" as string]: focusRing,
			transition: `border-color ${motionTokens.duration.short2} ease-out, box-shadow ${motionTokens.duration.short2} ease-out`,
		};

		const inputStyles: CSSProperties = {
			flex: 1,
			minWidth: 0,
			height: "100%",
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
		};

		const addonStyles: CSSProperties = {
			display: "inline-flex",
			alignItems: "center",
			flexShrink: 0,
			height: "100%",
			boxSizing: "border-box",
			paddingInline: spacingTokens[2],
			fontFamily: bodyMedium.fontFamily,
			fontSize: bodyMedium.fontSize,
			color: lightColorScheme.onSurfaceVariant,
			backgroundColor: lightColorScheme.surfaceVariant,
			borderRadius: 0,
		};

		const hasAddonBefore = addonBefore !== null && addonBefore !== "";
		const hasAddonAfter = addonAfter !== null && addonAfter !== "";
		const combinedClassName = ["surface-text-input-wrap", className]
			.filter(Boolean)
			.join(" ");

		const finalWrapperStyle: CSSProperties = {
			...wrapperStyles,
			...style,
			height: fixedHeightPx,
			minHeight: fixedHeightPx,
		};

		return (
			<span className={combinedClassName} style={finalWrapperStyle}>
				{hasAddonBefore ? (
					<span
						aria-hidden
						style={{ ...addonStyles, borderRight: `1px solid ${borderColor}` }}
					>
						{addonBefore}
					</span>
				) : null}
				<input
					aria-invalid={status === "error" ? true : undefined}
					disabled={disabled}
					onChange={handleChange}
					ref={setRef}
					style={inputStyles}
					type="text"
					value={displayValue}
					{...other}
				/>
				{hasContent ? (
					<IconButton
						aria-label="Limpar"
						icon={
							<svg
								aria-hidden
								fill="none"
								height="18"
								style={{ display: "block" }}
								viewBox="0 0 16 16"
								width="18"
							>
								<title>Fechar</title>
								<path
									d="M12 4L4 12M4 4l8 8"
									stroke="currentColor"
									strokeLinecap="round"
									strokeWidth="2"
								/>
							</svg>
						}
						onClick={() => {
							const el = inputRef.current;
							if (el) {
								if (isControlled) {
									onChange?.({
										target: { value: "" } as HTMLInputElement,
										currentTarget: el,
									} as ChangeEvent<HTMLInputElement>);
								} else {
									el.value = "";
									setUncontrolledValue("");
									onChange?.({
										target: el,
										currentTarget: el,
									} as ChangeEvent<HTMLInputElement>);
								}
							}
						}}
						style={{
							flexShrink: 0,
							width: fixedHeightPx + 24,
							height: fixedHeightPx,
							minWidth: fixedHeightPx + 24,
							minHeight: fixedHeightPx,
							border: "none",
							borderRadius: 0,
							borderLeft: `1px solid ${lightColorScheme.outlineVariant}`,
							paddingInline: spacingTokens[3],
						}}
						tabIndex={-1}
						variant="ghost"
					/>
				) : null}
				{hasAddonAfter && !hasContent ? (
					<span
						aria-hidden
						style={{ ...addonStyles, borderLeft: `1px solid ${borderColor}` }}
					>
						{addonAfter}
					</span>
				) : null}
			</span>
		);
	},
);

TextInput.displayName = "TextInput";
