import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import {
	createContext,
	useContext,
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

export type SelectSize = "sm" | "default";

interface SelectContextValue {
	value: string | undefined;
	onValueChange: (value: string) => void;
	open: boolean;
	setOpen: (v: boolean) => void;
	disabled: boolean | undefined;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
	size: SelectSize;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export interface SelectRootProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	size?: SelectSize;
	children: ReactNode;
}

export function SelectRoot(props: SelectRootProps): JSX.Element {
	const {
		value: controlledValue,
		defaultValue,
		onValueChange,
		disabled,
		size = "default",
		children,
	} = props;
	const [uncontrolledValue, setUncontrolled] = useState(defaultValue ?? "");
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolledValue;
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const handleValueChange = (v: string): void => {
		if (!isControlled) setUncontrolled(v);
		onValueChange?.(v);
		setOpen(false);
	};

	const ctx: SelectContextValue = {
		value,
		onValueChange: handleValueChange,
		open,
		setOpen,
		disabled,
		triggerRef,
		size,
	};

	return (
		<SelectContext.Provider value={ctx}>
			<div className="relative inline-block">{children}</div>
		</SelectContext.Provider>
	);
}

SelectRoot.displayName = "Select.Root";

export interface SelectTriggerProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function SelectTrigger(props: SelectTriggerProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <>{children}</>;
	const { open, disabled, triggerRef, size } = ctx;

	return (
		<button
			ref={triggerRef as React.Ref<HTMLButtonElement>}
			type="button"
			role="combobox"
			aria-expanded={open}
			aria-haspopup="listbox"
			disabled={disabled}
			className={cn(
				"inline-flex min-w-[120px] items-center justify-between gap-2 rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground",
				size === "sm" ? "h-8" : "h-10",
				disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
				className,
			)}
			style={style}
			onClick={() => ctx.setOpen(!open)}
		>
			{children}
			<span aria-hidden className="ml-1">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
					<title>Expandir</title>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</span>
		</button>
	);
}

SelectTrigger.displayName = "Select.Trigger";

export interface SelectValueProps {
	placeholder?: string;
	children?: ReactNode;
}

export function SelectValue(props: SelectValueProps): JSX.Element {
	const { placeholder = "Selecionar...", children } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <>{children ?? placeholder}</>;
	const { value } = ctx;
	const display = children ?? value ?? placeholder;
	return (
		<span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis">
			{display}
		</span>
	);
}

SelectValue.displayName = "Select.Value";

export interface SelectContentProps {
	children: ReactNode;
	position?: "popper" | "inline";
	style?: CSSProperties;
	className?: string;
}

export function SelectContent(props: SelectContentProps): JSX.Element | null {
	const { children, style, className } = props;
	const ctx = useContext(SelectContext);
	const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

	useLayoutEffect(() => {
		if (!ctx?.open || !ctx.triggerRef.current) return;
		const rect = ctx.triggerRef.current.getBoundingClientRect();
		setPosition({
			top: rect.bottom + 4,
			left: rect.left,
			width: Math.max(rect.width, 120),
		});
	}, [ctx?.open, ctx?.triggerRef]);

	useEffect(() => {
		if (!ctx?.open) return;
		const setOpen = ctx.setOpen;
		const triggerRef = ctx.triggerRef;
		const onKeyDown = (e: KeyboardEvent): void => {
			if (e.key === "Escape") setOpen(false);
		};
		const onClickOutside = (e: MouseEvent): void => {
			const el = triggerRef.current;
			if (el && !el.contains(e.target as Node)) {
				const content = document.querySelector("[data-surface-select-content]");
				if (content && !content.contains(e.target as Node)) setOpen(false);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		const t = setTimeout(() => document.addEventListener("click", onClickOutside), 0);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("click", onClickOutside);
			clearTimeout(t);
		};
	}, [ctx?.open, ctx?.setOpen, ctx?.triggerRef]);

	if (!ctx) return <>{children}</>;
	const { open } = ctx;

	const node = (
		<div
			data-surface-select-content
			role="listbox"
			className={cn("fixed z-[9999] max-h-[280px] overflow-y-auto rounded-none border border-border bg-card p-1 shadow-[var(--shadow-2)]", className)}
			style={{
				top: position.top,
				left: position.left,
				width: position.width,
				...style,
			}}
		>
			{children}
		</div>
	);

	const body = typeof document !== "undefined" ? document.body : null;
	if (!open || !body) return null;
	return createPortal(node, body);
}

SelectContent.displayName = "Select.Content";

export interface SelectItemProps {
	value: string;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function SelectItem(props: SelectItemProps): JSX.Element {
	const { value, children, style, className } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <div {...(props as unknown as Record<string, unknown>)} />;
	const { value: selectedValue, onValueChange } = ctx;
	const isSelected = selectedValue === value;

	const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>): void => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onValueChange(value);
		}
	};
	return (
		<div
			role="option"
			aria-selected={isSelected}
			tabIndex={0}
			className={cn(
				"flex cursor-pointer items-center gap-2 rounded-none px-3 py-2 text-sm text-foreground",
				isSelected && "bg-muted",
				className,
			)}
			style={style}
			onClick={() => onValueChange(value)}
			onKeyDown={handleKeyDown}
		>
			{children}
			{isSelected ? (
				<span aria-hidden className="ml-auto">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
						<title>Selecionado</title>
						<path d="M5 12l5 5L20 7" />
					</svg>
				</span>
			) : null}
		</div>
	);
}

SelectItem.displayName = "Select.Item";

export interface SelectLabelProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function SelectLabel(props: SelectLabelProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div className={cn("px-3 py-1 text-xs font-medium text-muted-foreground", className)} style={style}>
			{children}
		</div>
	);
}

SelectLabel.displayName = "Select.Label";

export interface SelectSeparatorProps {
	style?: CSSProperties;
	className?: string;
}

export function SelectSeparator(props: SelectSeparatorProps): JSX.Element {
	const { style, className } = props;
	return (
		<hr className={cn("my-1 h-px border-0 bg-border", className)} style={style} />
	);
}

SelectSeparator.displayName = "Select.Separator";

export const Select = {
	Root: SelectRoot,
	Trigger: SelectTrigger,
	Value: SelectValue,
	Content: SelectContent,
	Item: SelectItem,
	Label: SelectLabel,
	Separator: SelectSeparator,
};
