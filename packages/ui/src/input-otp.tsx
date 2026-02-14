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
} from "react";
import { cn } from "./lib/utils";

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

	const ctx: InputOTPContextValue = {
		value,
		setValue,
		maxLength,
		disabled,
		slotRefs,
	};

	return (
		<InputOTPContext.Provider value={ctx}>
			<div
				className={cn(
					"inline-flex items-center gap-0 rounded-md border border-border bg-background p-1 transition-[border-color,box-shadow] duration-150 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
					disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
					className,
				)}
				style={style}
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
		<div className={cn("flex items-center gap-1", className)} style={style}>
			{children}
		</div>
	);
}

InputOTPGroup.displayName = "InputOTP.Group";

export interface InputOTPSlotProps {
	index: number;
	style?: CSSProperties;
	className?: string;
}

export function InputOTPSlot(props: InputOTPSlotProps): JSX.Element | null {
	const { index, style, className } = props;
	const ctx = useContext(InputOTPContext);
	if (!ctx) return <input readOnly aria-hidden className="w-10" />;
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
			className={cn(
				"h-10 w-10 border-0 bg-transparent p-0 text-center text-sm text-foreground outline-none",
				className,
			)}
			style={style}
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
			className={cn("inline-flex items-center justify-center text-sm text-muted-foreground", className)}
			style={style}
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
