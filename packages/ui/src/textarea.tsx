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
	useRef,
	useState,
} from "react";
import { cn } from "./lib/utils";
import { IconButton } from "./icon-button";

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaStatus = "default" | "error" | "warning";

const sizeMap: Record<TextAreaSize, { minHeight: number; paddingClass: string }> = {
	sm: { minHeight: 80, paddingClass: "px-2 py-1" },
	md: { minHeight: 100, paddingClass: "px-3 py-2" },
	lg: { minHeight: 120, paddingClass: "px-3 py-2" },
};

interface TextAreaContextValue {
	allowClear: boolean;
	size: TextAreaSize;
	status: TextAreaStatus;
	disabled?: boolean;
	dims: { minHeight: number; paddingClass: string };
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
	const dims = sizeMap[size];
	const ctx: TextAreaContextValue = {
		allowClear,
		size,
		status,
		disabled,
		dims,
	};
	const borderByStatus =
		status === "error"
			? "border-destructive"
			: status === "warning"
				? "border-amber-500"
				: "border-border";
	return (
		<TextAreaContext.Provider value={ctx}>
			<span
				className={cn(
					"inline-flex w-full min-w-0 rounded-md border bg-background transition-[border-color,box-shadow] duration-150 ease-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
					dims.minHeight === 80 && "min-h-[80px]",
					dims.minHeight === 100 && "min-h-[100px]",
					dims.minHeight === 120 && "min-h-[120px]",
					borderByStatus,
					className,
				)}
				style={style}
			>
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
	className?: string;
}

function ClearIcon(): JSX.Element {
	return (
		<svg
			aria-hidden
			className="block"
			fill="none"
			height="18"
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
	);
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
	function TextAreaInput(props, ref) {
		const {
			resize = "vertical",
			style: styleProp,
			className: inputClassName,
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
		const minHeightPx = dims.minHeight - 2;

		return (
			<span className="relative inline-flex w-full min-w-0">
				<textarea
					ref={setRef}
					aria-invalid={status === "error" ? true : undefined}
					disabled={disabled}
					value={isControlled ? value : undefined}
					defaultValue={isControlled ? undefined : defaultValue}
					onChange={handleChange}
					className={cn(
						"w-full min-w-0 border-0 bg-transparent text-sm text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
						dims.paddingClass,
						allowClear && hasContent && "pr-10",
						inputClassName,
					)}
					style={{
						minHeight: minHeightPx,
						resize,
						...styleProp,
					}}
					{...other}
				/>
				{hasContent ? (
					<IconButton
						aria-label="Limpar"
						icon={<ClearIcon />}
						onClick={onClear}
						className="absolute top-1 right-1 h-8 w-8 min-h-8 min-w-8 p-0"
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
