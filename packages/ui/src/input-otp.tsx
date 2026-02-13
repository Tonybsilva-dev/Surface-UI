import type {
	CSSProperties,
	ChangeEvent,
	KeyboardEvent,
	ReactNode,
} from "react";
import {
	createContext,
	useContext,
	useCallback,
	useRef,
	useState,
	useLayoutEffect,
} from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

const INPUT_OTP_CSS_ID = "surface-input-otp-styles";
const focusRing = "0 0 0 2px rgba(22, 119, 255, 0.2)";

function ensureInputOTPStyles(): void {
	if (typeof document === "undefined" || document.getElementById(INPUT_OTP_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = INPUT_OTP_CSS_ID;
	style.textContent = `
.surface-input-otp-wrap{transition:border-color ${motionTokens.duration.short2}, box-shadow ${motionTokens.duration.short2}}
.surface-input-otp-wrap:focus-within{outline:none;box-shadow:var(--surface-input-otp-focus-ring)!important}
@media(prefers-reduced-motion:reduce){.surface-input-otp-wrap{transition:none}}
`;
	document.head.appendChild(style);
}

interface InputOTPContextValue {
	value: string;
	setValue: (next: string) => void;
	maxLength: number;
	disabled?: boolean;
	slotRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

const InputOTPContext = createContext<InputOTPContextValue | null>(null);

export interface InputOTPRootProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	maxLength?: number;
	disabled?: boolean;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputOTPRoot(props: InputOTPRootProps): JSX.Element {
	const {
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		maxLength = 6,
		disabled,
		children,
		style,
		className,
	} = props;
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolledValue;
	const slotRefs = useRef<(HTMLInputElement | null)[]>([]);

	const setValue = useCallback(
		(next: string) => {
			const clipped = next.slice(0, maxLength).replace(/\D/g, "");
			if (isControlled) {
				onValueChange?.(clipped);
			} else {
				setUncontrolledValue(clipped);
				onValueChange?.(clipped);
			}
		},
		[maxLength, isControlled, onValueChange],
	);

	useLayoutEffect(() => {
		ensureInputOTPStyles();
	}, []);

	const ctx: InputOTPContextValue = {
		value,
		setValue,
		maxLength,
		disabled,
		slotRefs,
	};

	const wrapStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: 0,
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${lightColorScheme.outline}`,
		backgroundColor: lightColorScheme.surface,
		padding: spacingTokens[1],
		["--surface-input-otp-focus-ring" as string]: focusRing,
		transition: `border-color ${motionTokens.duration.short2}, box-shadow ${motionTokens.duration.short2}`,
		opacity: disabled ? disabledOpacity : undefined,
		pointerEvents: disabled ? "none" : undefined,
	};

	return (
		<InputOTPContext.Provider value={ctx}>
			<div
				className={["surface-input-otp-wrap", className].filter(Boolean).join(" ")}
				style={{ ...wrapStyles, ...style }}
			>
				{children}
			</div>
		</InputOTPContext.Provider>
	);
}

InputOTPRoot.displayName = "InputOTP.Root";

export interface InputOTPGroupProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputOTPGroup(props: InputOTPGroupProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div
			className={className}
			style={{
				display: "flex",
				alignItems: "center",
				gap: spacingTokens[1],
				...style,
			}}
		>
			{children}
		</div>
	);
}

InputOTPGroup.displayName = "InputOTP.Group";

const bodyMedium = typographyTokens.body.medium;
const slotWidth = "2.5rem";
const slotHeight = 40;

export interface InputOTPSlotProps {
	index: number;
	style?: CSSProperties;
	className?: string;
}

export function InputOTPSlot(props: InputOTPSlotProps): JSX.Element | null {
	const { index, style, className } = props;
	const ctx = useContext(InputOTPContext);
	if (!ctx) return <input readOnly aria-hidden style={{ width: slotWidth }} />;
	const { value, setValue, maxLength, disabled, slotRefs } = ctx;
	if (index < 0 || index >= maxLength) return null;

	const char = value[index] ?? "";
	const inputRef = (el: HTMLInputElement | null) => {
		slotRefs.current[index] = el;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		if (raw.length > 1) {
			const digits = raw.replace(/\D/g, "").slice(0, maxLength);
			const next = value.split("");
			for (let i = 0; i < digits.length && index + i < maxLength; i++) {
				next[index + i] = digits[i];
			}
			setValue(next.join(""));
			const nextIdx = Math.min(index + digits.length, maxLength - 1);
			slotRefs.current[nextIdx]?.focus();
			return;
		}
		const digit = raw.replace(/\D/g, "")[0] ?? "";
		const next = value.split("");
		next[index] = digit;
		setValue(next.join(""));
		if (digit && index < maxLength - 1) {
			slotRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !char && index > 0) {
			slotRefs.current[index - 1]?.focus();
		}
	};

	const slotStyles: CSSProperties = {
		width: slotWidth,
		height: slotHeight,
		boxSizing: "border-box",
		padding: 0,
		border: "none",
		backgroundColor: "transparent",
		fontFamily: bodyMedium.fontFamily,
		fontSize: bodyMedium.fontSize,
		textAlign: "center",
		color: lightColorScheme.onSurface,
		outline: "none",
	};

	return (
		<input
			ref={inputRef}
			type="text"
			inputMode="numeric"
			autoComplete="one-time-code"
			maxLength={maxLength}
			aria-label={`Dígito ${index + 1} de ${maxLength}`}
			value={char}
			disabled={disabled}
			className={className}
			style={{ ...slotStyles, ...style }}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
}

InputOTPSlot.displayName = "InputOTP.Slot";

export interface InputOTPSeparatorProps {
	children?: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputOTPSeparator(props: InputOTPSeparatorProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<span
			className={className}
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: bodyMedium.fontFamily,
				fontSize: bodyMedium.fontSize,
				color: lightColorScheme.onSurfaceVariant,
				...style,
			}}
			aria-hidden
		>
			{children ?? "−"}
		</span>
	);
}

InputOTPSeparator.displayName = "InputOTP.Separator";

export const InputOTP = {
	Root: InputOTPRoot,
	Group: InputOTPGroup,
	Slot: InputOTPSlot,
	Separator: InputOTPSeparator,
};
