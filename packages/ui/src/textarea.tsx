import type {
	ChangeEvent,
	CSSProperties,
	ReactNode,
	TextareaHTMLAttributes,
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
	allowClear: boolean;
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
	/** Se true, mostra botão de limpar quando há valor. */
	allowClear?: boolean;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TextAreaRoot(props: TextAreaRootProps): JSX.Element {
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
		allowClear,
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

function ClearIcon(): JSX.Element {
	return (
		<svg
			aria-hidden
			fill="none"
			height="18"
			viewBox="0 0 16 16"
			width="18"
			style={{ display: "block" }}
		>
			<title>Fechar</title>
			<path
				d="M12 4L4 12M4 4l8 8"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
	function TextAreaInput(props, ref) {
		const {
			resize = "vertical",
			style: styleProp,
			value,
			defaultValue,
			onChange,
			...other
		} = props;
		const ctx = useContext(TextAreaContext);
		const textareaRef = useRef<HTMLTextAreaElement | null>(null);
		const setRef = (el: HTMLTextAreaElement | null): void => {
			textareaRef.current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
		};

		const isControlled = value !== undefined;
		const [uncontrolledValue, setUncontrolledValue] = useState(
			(typeof defaultValue === "string" ? defaultValue : "") || "",
		);

		const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
			if (!isControlled) setUncontrolledValue(e.target.value);
			onChange?.(e);
		};

		const hasContent =
			ctx?.allowClear &&
			(isControlled
				? typeof value === "string" && value.length > 0
				: uncontrolledValue.length > 0);

		const onClear = (): void => {
			const el = textareaRef.current;
			if (!el) return;
			if (isControlled) {
				onChange?.({
					target: { value: "" } as HTMLTextAreaElement,
					currentTarget: el,
				} as ChangeEvent<HTMLTextAreaElement>);
			} else {
				el.value = "";
				setUncontrolledValue("");
				onChange?.({
					target: el,
					currentTarget: el,
				} as ChangeEvent<HTMLTextAreaElement>);
			}
		};

		if (!ctx) {
			return <textarea ref={ref} {...props} />;
		}

		const { dims, status, disabled, allowClear } = ctx;
		const inputStyles: CSSProperties = {
			width: "100%",
			minWidth: 0,
			minHeight: dims.minHeight - 2,
			boxSizing: "border-box",
			paddingInline: dims.paddingInline,
			paddingBlock: dims.paddingBlock,
			paddingRight: allowClear && hasContent ? "2.5rem" : dims.paddingInline,
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
			<span
				style={{
					display: "inline-flex",
					width: "100%",
					minWidth: 0,
					position: "relative",
				}}
			>
				<textarea
					ref={setRef}
					aria-invalid={status === "error" ? true : undefined}
					disabled={disabled}
					value={isControlled ? value : undefined}
					defaultValue={isControlled ? undefined : defaultValue}
					onChange={handleChange}
					style={inputStyles}
					{...other}
				/>
				{hasContent ? (
					<IconButton
						aria-label="Limpar"
						icon={<ClearIcon />}
						onClick={onClear}
						style={{
							position: "absolute",
							top: spacingTokens[1],
							right: spacingTokens[1],
							width: 32,
							height: 32,
							minWidth: 32,
							minHeight: 32,
							padding: 0,
						}}
						tabIndex={-1}
						variant="ghost"
					/>
				) : null}
			</span>
		);
	},
);

TextAreaInput.displayName = "TextArea.Input";

export interface TextAreaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	size?: TextAreaSize;
	status?: TextAreaStatus;
	/** Se true, mostra botão de limpar quando há valor. */
	allowClear?: boolean;
	style?: CSSProperties;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function TextArea(props, ref) {
		const {
			size = "md",
			status = "default",
			disabled,
			allowClear = false,
			className,
			style,
			...other
		} = props;
		return (
			<TextAreaRoot
				allowClear={allowClear}
				disabled={disabled}
				size={size}
				status={status}
				style={style}
				className={className}
			>
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
