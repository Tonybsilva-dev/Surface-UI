import type { CSSProperties, ReactNode } from "react";
import {
	createContext,
	useContext,
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
} from "react";
import { createPortal } from "react-dom";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	shapeTokens,
	disabledOpacity,
} from "./foundation";

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
			<div style={{ position: "relative", display: "inline-block" }}>{children}</div>
		</SelectContext.Provider>
	);
}

SelectRoot.displayName = "Select.Root";

const triggerHeight = { sm: 32, default: 40 } as const;

export interface SelectTriggerProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function SelectTrigger(props: SelectTriggerProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <>{children}</>;
	const { open, setOpen, disabled, triggerRef, size } = ctx;
	const height = triggerHeight[size];

	const triggerStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spacingTokens[2],
		height,
		paddingInline: spacingTokens[3],
		paddingBlock: spacingTokens[2],
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${lightColorScheme.outline}`,
		backgroundColor: lightColorScheme.surface,
		fontFamily: typographyTokens.body.medium.fontFamily,
		fontSize: typographyTokens.body.medium.fontSize,
		color: lightColorScheme.onSurface,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		minWidth: 120,
	};

	return (
		<button
			ref={triggerRef as React.Ref<HTMLButtonElement>}
			type="button"
			role="combobox"
			aria-expanded={open}
			aria-haspopup="listbox"
			disabled={disabled}
			className={className}
			style={{ ...triggerStyles, ...style }}
			onClick={() => ctx.setOpen(!open)}
		>
			{children}
			<span aria-hidden style={{ marginLeft: 4 }}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
		<span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>
			{display}
		</span>
	);
}

SelectValue.displayName = "Select.Value";

export interface SelectContentProps {
	children: ReactNode;
	position?: "popper" | "inline";
	style?: CSSProperties;
}

export function SelectContent(props: SelectContentProps): JSX.Element | null {
	const { children, style } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <>{children}</>;
	const { open, setOpen, triggerRef } = ctx;

	const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

	useLayoutEffect(() => {
		if (!open || !triggerRef.current) return;
		const rect = triggerRef.current.getBoundingClientRect();
		setPosition({
			top: rect.bottom + 4,
			left: rect.left,
			width: Math.max(rect.width, 120),
		});
	}, [open, triggerRef]);

	useEffect(() => {
		if (!open) return;
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
		setTimeout(() => document.addEventListener("click", onClickOutside), 0);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("click", onClickOutside);
		};
	}, [open, setOpen, triggerRef]);

	const contentStyles: CSSProperties = {
		position: "fixed",
		top: position.top,
		left: position.left,
		width: position.width,
		maxHeight: 280,
		overflowY: "auto",
		zIndex: 9999,
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${lightColorScheme.outline}`,
		backgroundColor: lightColorScheme.surface,
		boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
		padding: spacingTokens[1],
	};

	const node = (
		<div
			data-surface-select-content
			role="listbox"
			style={{ ...contentStyles, ...style }}
		>
			{children}
		</div>
	);

	const body = typeof document !== "undefined" ? document.body : null;
	if (!open || !body) return null;
	return createPortal(node, body!);
}

SelectContent.displayName = "Select.Content";

export interface SelectItemProps {
	value: string;
	children: ReactNode;
	style?: CSSProperties;
}

export function SelectItem(props: SelectItemProps): JSX.Element {
	const { value, children, style } = props;
	const ctx = useContext(SelectContext);
	if (!ctx) return <div {...(props as unknown as Record<string, unknown>)} />;
	const { value: selectedValue, onValueChange } = ctx;
	const isSelected = selectedValue === value;

	const itemStyles: CSSProperties = {
		display: "flex",
		alignItems: "center",
		gap: spacingTokens[2],
		padding: `${spacingTokens[2]} ${spacingTokens[3]}`,
		borderRadius: shapeTokens.extraSmall,
		fontFamily: typographyTokens.body.medium.fontFamily,
		fontSize: typographyTokens.body.medium.fontSize,
		color: lightColorScheme.onSurface,
		cursor: "pointer",
		backgroundColor: isSelected ? lightColorScheme.surfaceContainerHighest : "transparent",
	};

	return (
		<div
			role="option"
			aria-selected={isSelected}
			style={{ ...itemStyles, ...style }}
			onClick={() => onValueChange(value)}
		>
			{children}
			{isSelected ? (
				<span aria-hidden style={{ marginLeft: "auto" }}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
}

export function SelectLabel(props: SelectLabelProps): JSX.Element {
	const { children, style } = props;
	const labelStyles: CSSProperties = {
		padding: `${spacingTokens[1]} ${spacingTokens[3]}`,
		fontFamily: typographyTokens.label.small.fontFamily,
		fontSize: typographyTokens.label.small.fontSize,
		color: lightColorScheme.onSurfaceVariant,
	};
	return <div style={{ ...labelStyles, ...style }}>{children}</div>;
}

SelectLabel.displayName = "Select.Label";

export interface SelectSeparatorProps {
	style?: CSSProperties;
}

export function SelectSeparator(props: SelectSeparatorProps): JSX.Element {
	const { style } = props;
	return (
		<div
			role="separator"
			style={{
				height: 1,
				margin: `${spacingTokens[1]} 0`,
				backgroundColor: lightColorScheme.outlineVariant,
				...style,
			}}
		/>
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
