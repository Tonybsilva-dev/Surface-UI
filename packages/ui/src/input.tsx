import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import { forwardRef, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";

export type InputSize = "sm" | "middle" | "large";
export type InputStatus = "default" | "error" | "warning";

const sizeClasses: Record<InputSize, string> = {
	sm: "h-8 text-sm",
	middle: "h-9 text-base",
	large: "h-10 text-base",
};

export interface InputProps extends Omit<ComponentProps<"input">, "size" | "prefix" | "suffix"> {
	/** Prefixo (ícone ou conteúdo à esquerda). */
	prefix?: ReactNode;
	/** Sufixo (ícone ou conteúdo à direita). Conflita com allowClear quando ambos preenchem a zona direita. */
	suffix?: ReactNode;
	/** Mostrar botão de limpar quando há valor. */
	allowClear?: boolean;
	/** Callback ao clicar em limpar. */
	onClear?: () => void;
	/** Mostrar contagem de caracteres (requer ou value/defaultValue para contar). */
	showCount?: boolean;
	/** Número máximo de caracteres (nativo + usado na contagem). */
	maxLength?: number;
	/** Tamanho do input: sm, middle, large. */
	size?: InputSize;
	/** Estado de validação visual. */
	status?: InputStatus;
	/** Classes por slot semântico (root, prefix, input, suffix, count). */
	classNames?: Partial<{
		root: string;
		prefix: string;
		input: string;
		suffix: string;
		count: string;
	}>;
	/** Callback quando Enter é pressionado. */
	onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		className,
		prefix,
		suffix,
		allowClear = false,
		onClear,
		showCount = false,
		maxLength,
		size = "middle",
		status = "default",
		classNames,
		value,
		defaultValue,
		onChange,
		onKeyDown,
		onPressEnter,
		disabled,
		type = "text",
		...props
	},
	ref,
) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const setRef = (el: HTMLInputElement | null) => {
		inputRef.current = el;
		if (typeof ref === "function") ref(el);
		else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
	};

	const isControlled = value !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = useState(
		(typeof defaultValue === "string" ? defaultValue : "") ?? "",
	);
	const currentValue = isControlled ? (typeof value === "string" ? value : "") : uncontrolledValue;
	const hasValue = currentValue.length > 0;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) setUncontrolledValue(e.target.value);
		onChange?.(e);
	};

	const handleClear = () => {
		const el = inputRef.current;
		if (!el) return;
		if (isControlled) {
			const synthetic = {
				target: { ...el, value: "" },
				currentTarget: el,
			} as ChangeEvent<HTMLInputElement>;
			onChange?.(synthetic);
		} else {
			el.value = "";
			setUncontrolledValue("");
		}
		onClear?.();
		el.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") onPressEnter?.(e);
		onKeyDown?.(e);
	};

	const borderByStatus =
		status === "error"
			? "border-destructive focus-visible:ring-destructive/20"
			: status === "warning"
				? "border-amber-500 focus-visible:ring-amber-500/20"
				: "border-input focus-visible:ring-ring/50";

	const baseInputClasses = cn(
		"flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-sm transition-[color,box-shadow] outline-none",
		"placeholder:text-muted-foreground",
		"selection:bg-primary selection:text-primary-foreground",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
		"focus-visible:ring-[3px]",
		"aria-invalid:border-destructive",
		sizeClasses[size],
		borderByStatus,
		classNames?.input,
		className,
	);

	const hasAddons = prefix != null || suffix != null || allowClear || showCount;

	if (!hasAddons) {
		return (
			<input
				ref={ref}
				type={type}
				data-slot="input"
				className={baseInputClasses}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				maxLength={maxLength}
				{...props}
			/>
		);
	}

	const effectiveSuffix =
		suffix ?? (allowClear && hasValue ? (
			<button
				type="button"
				aria-label="Limpar"
				onClick={handleClear}
				className={cn(
					"text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center justify-center rounded p-0.5 transition-colors",
					classNames?.suffix,
				)}
			>
				<X className="size-4" aria-hidden />
			</button>
		) : null);

	const countNode = showCount ? (
		<span
			data-slot="count"
			className={cn(
				"text-muted-foreground shrink-0 pr-3 text-xs tabular-nums",
				classNames?.count,
			)}
		>
			{currentValue.length}
			{maxLength != null ? ` / ${maxLength}` : ""}
		</span>
	) : null;

	return (
		<span
			data-slot="root"
			className={cn(
				"relative flex w-full min-w-0 items-center gap-2 rounded-md border border-input bg-background transition-[border-color,box-shadow] duration-150 focus-within:outline-none focus-within:ring-[3px]",
				sizeClasses[size],
				borderByStatus,
				disabled && "pointer-events-none opacity-50",
				classNames?.root,
			)}
		>
			{prefix != null ? (
				<span
					data-slot="prefix"
					className={cn("text-muted-foreground flex shrink-0 items-center justify-center pl-3 [&_svg]:size-4", classNames?.prefix)}
				>
					{prefix}
				</span>
			) : null}
			<input
				ref={setRef}
				type={type}
				data-slot="input"
				className={cn(
					"min-w-0 flex-1 border-0 bg-transparent py-1 outline-none focus:ring-0 focus-visible:ring-0",
					prefix != null ? "pl-0" : "pl-3",
					effectiveSuffix != null || countNode ? "pr-2" : "pr-3",
					classNames?.input,
				)}
				value={value}
				defaultValue={defaultValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				maxLength={maxLength}
				{...props}
			/>
			{effectiveSuffix != null ? (
				<span
					data-slot="suffix"
					className={cn("text-muted-foreground flex shrink-0 items-center justify-center pr-2 [&_svg]:size-4", classNames?.suffix)}
				>
					{effectiveSuffix}
				</span>
			) : null}
			{countNode}
		</span>
	);
});

Input.displayName = "Input";

export { Input };
