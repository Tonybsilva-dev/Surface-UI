import type {
	ChangeEvent,
	CSSProperties,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import {
	createContext,
	forwardRef,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
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

const borderColorByStatus: Record<TextInputStatus, string> = {
	default: lightColorScheme.outline,
	error: lightColorScheme.error,
	warning: "rgb(250, 173, 20)",
};

interface TextInputContextValue {
	size: TextInputSize;
	status: TextInputStatus;
	disabled?: boolean;
	allowClear: boolean;
	borderColor: string;
	dims: { height: number; paddingInline: string; paddingBlock: string };
}

const TextInputContext = createContext<TextInputContextValue | null>(null);

export interface TextInputRootProps {
	size?: TextInputSize;
	status?: TextInputStatus;
	disabled?: boolean;
	allowClear?: boolean;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TextInputRoot(props: TextInputRootProps): JSX.Element {
	const {
		size = "md",
		status = "default",
		disabled,
		allowClear = false,
		children,
		className,
		style,
	} = props;
	useLayoutEffect(() => {
		ensureTextInputStyles();
	}, []);
	const dims = sizeMap[size];
	const borderColor = borderColorByStatus[status];
	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "stretch",
		width: "100%",
		minWidth: 0,
		height: dims.height,
		minHeight: dims.height,
		boxSizing: "border-box",
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${borderColor}`,
		backgroundColor: lightColorScheme.surface,
		["--surface-input-focus-ring" as string]: focusRing,
		transition: `border-color ${motionTokens.duration.short2} ease-out, box-shadow ${motionTokens.duration.short2} ease-out`,
	};
	const combinedClassName = ["surface-text-input-wrap", className]
		.filter(Boolean)
		.join(" ");
	const ctx: TextInputContextValue = {
		size,
		status,
		disabled,
		allowClear,
		borderColor,
		dims,
	};
	return (
		<TextInputContext.Provider value={ctx}>
			<span className={combinedClassName} style={{ ...wrapperStyles, ...style }}>
				{children}
			</span>
		</TextInputContext.Provider>
	);
}

TextInputRoot.displayName = "TextInput.Root";

export interface TextInputLeadingProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function TextInputLeading(props: TextInputLeadingProps): JSX.Element {
	const { children, style } = props;
	const ctx = useContext(TextInputContext);
	if (!ctx) return <>{children}</>;
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
		borderRight: `1px solid ${ctx.borderColor}`,
	};
	return (
		<span aria-hidden style={{ ...addonStyles, ...style }}>
			{children}
		</span>
	);
}

TextInputLeading.displayName = "TextInput.Leading";

export interface TextInputTrailingProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function TextInputTrailing(props: TextInputTrailingProps): JSX.Element {
	const { children, style } = props;
	const ctx = useContext(TextInputContext);
	if (!ctx) return <>{children}</>;
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
		borderLeft: `1px solid ${ctx.borderColor}`,
	};
	return (
		<span aria-hidden style={{ ...addonStyles, ...style }}>
			{children}
		</span>
	);
}

TextInputTrailing.displayName = "TextInput.Trailing";

export interface TextInputInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	style?: CSSProperties;
}

export const TextInputInput = forwardRef<HTMLInputElement, TextInputInputProps>(
	function TextInputInput(props, ref) {
		const { value, onChange, style: styleProp, ...other } = props;
		const ctx = useContext(TextInputContext);
		const inputRef = useRef<HTMLInputElement | null>(null);
		const setRef = (el: HTMLInputElement | null): void => {
			inputRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) ref.current = el;
		};
		const isControlled = value !== undefined;
		const [uncontrolledValue, setUncontrolledValue] = useState("");
		const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
			if (!isControlled) setUncontrolledValue(e.target.value);
			onChange?.(e);
		};
		const displayValue = isControlled ? value : undefined;
		const hasContent =
			ctx?.allowClear &&
			(isControlled
				? typeof value === "string" && value.length > 0
				: uncontrolledValue.length > 0);
		const onClear = (): void => {
			const el = inputRef.current;
			if (!el) return;
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
		};
		if (!ctx) {
			return <input ref={ref} type="text" {...other} />;
		}
		const { dims, status, disabled } = ctx;
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
			...styleProp,
		};
		return (
			<span
				style={{
					display: "inline-flex",
					alignItems: "stretch",
					flex: 1,
					minWidth: 0,
				}}
			>
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
						onClick={onClear}
						style={{
							flexShrink: 0,
							width: dims.height + 24,
							height: dims.height,
							minWidth: dims.height + 24,
							minHeight: dims.height,
							border: "none",
							borderRadius: 0,
							borderLeft: `1px solid ${lightColorScheme.outlineVariant}`,
							paddingInline: spacingTokens[3],
						}}
						tabIndex={-1}
						variant="ghost"
					/>
				) : null}
			</span>
		);
	},
);

TextInputInput.displayName = "TextInput.Input";

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
		const setRef = (el: HTMLInputElement | null): void => {
			inputRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) ref.current = el;
		};

		const isControlled = value !== undefined;
		const [uncontrolledValue, setUncontrolledValue] = useState("");

		const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
			if (!isControlled) setUncontrolledValue(e.target.value);
			onChange?.(e);
		};

		const displayValue = isControlled ? value : undefined;
		const hasContent =
			allowClear &&
			(isControlled
				? typeof value === "string" && value.length > 0
				: uncontrolledValue.length > 0);

		useLayoutEffect(() => {
			ensureTextInputStyles();
		}, []);

		const dims = sizeMap[size];
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

export type TextInputCompound = typeof TextInput & {
	Root: typeof TextInputRoot;
	Leading: typeof TextInputLeading;
	Input: typeof TextInputInput;
	Trailing: typeof TextInputTrailing;
};

(Object.assign as (t: typeof TextInput, u: Partial<TextInputCompound>) => void)(
	TextInput,
	{
		Root: TextInputRoot,
		Leading: TextInputLeading,
		Input: TextInputInput,
		Trailing: TextInputTrailing,
	},
);
