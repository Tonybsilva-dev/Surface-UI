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

interface DropdownMenuContextValue {
	open: boolean;
	setOpen: (v: boolean) => void;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export interface DropdownMenuRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

export function DropdownMenuRoot(props: DropdownMenuRootProps): JSX.Element {
	const { open: controlledOpen, onOpenChange, children } = props;
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = (v: boolean) => {
		if (!isControlled) setUncontrolledOpen(v);
		onOpenChange?.(v);
	};
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const ctx: DropdownMenuContextValue = { open, setOpen, triggerRef };

	return (
		<DropdownMenuContext.Provider value={ctx}>
			<div style={{ position: "relative", display: "inline-block" }}>
				{children}
			</div>
		</DropdownMenuContext.Provider>
	);
}

DropdownMenuRoot.displayName = "DropdownMenu.Root";

export interface DropdownMenuTriggerProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(DropdownMenuContext);
	if (!ctx) return <>{children}</>;
	const { open, setOpen, triggerRef } = ctx;

	const triggerStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		padding: `${spacingTokens[2]} ${spacingTokens[3]}`,
		fontFamily: typographyTokens.label.large.fontFamily,
		fontSize: typographyTokens.label.large.fontSize,
		color: lightColorScheme.onSurface,
		backgroundColor: lightColorScheme.surface,
		border: `1px solid ${lightColorScheme.outline}`,
		borderRadius: componentShapeTokens.button,
		cursor: "pointer",
		minHeight: 40,
	};

	return (
		<button
			ref={triggerRef as React.Ref<HTMLButtonElement>}
			type="button"
			className={className}
			style={{ ...triggerStyles, ...style }}
			onClick={() => setOpen(!open)}
			aria-expanded={open}
			aria-haspopup="menu"
		>
			{children}
		</button>
	);
}

DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

export interface DropdownMenuContentProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
	sideOffset?: number;
}

export function DropdownMenuContent(
	props: DropdownMenuContentProps,
): JSX.Element | null {
	const { children, style, sideOffset = 4, className } = props;
	const ctx = useContext(DropdownMenuContext);
	const [position, setPosition] = useState({ top: 0, left: 0, minWidth: 0 });

	useLayoutEffect(() => {
		if (!ctx?.open || !ctx.triggerRef.current) return;
		const rect = ctx.triggerRef.current.getBoundingClientRect();
		setPosition({
			top: rect.bottom + sideOffset,
			left: rect.left,
			minWidth: Math.max(rect.width, 128),
		});
	}, [ctx?.open, ctx?.triggerRef, sideOffset]);

	useEffect(() => {
		if (!ctx?.open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") ctx.setOpen(false);
		};
		const onClickOutside = (e: MouseEvent) => {
			const el = ctx.triggerRef.current;
			if (el && !el.contains(e.target as Node)) {
				const content = document.querySelector(
					"[data-surface-dropdown-menu-content]",
				);
				if (content && !content.contains(e.target as Node)) ctx.setOpen(false);
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

	if (!ctx) return null;
	const { open } = ctx;

	const contentStyles: CSSProperties = {
		position: "fixed",
		top: position.top,
		left: position.left,
		minWidth: position.minWidth,
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
			data-surface-dropdown-menu-content
			role="menu"
			className={className}
			style={{ ...contentStyles, ...style }}
		>
			{children}
		</div>
	);

	const body = typeof document !== "undefined" ? document.body : null;
	if (!open || !body) return null;
	return createPortal(node, body);
}

DropdownMenuContent.displayName = "DropdownMenu.Content";

export interface DropdownMenuItemProps {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	/** Variante visual: default ou destructive. */
	variant?: "default" | "destructive";
	style?: CSSProperties;
	className?: string;
}

export function DropdownMenuItem(props: DropdownMenuItemProps): JSX.Element {
	const {
		children,
		onClick,
		disabled,
		variant = "default",
		style,
		className,
	} = props;
	const ctx = useContext(DropdownMenuContext);
	if (!ctx) return <div {...(props as unknown as Record<string, unknown>)} />;

	const color =
		variant === "destructive"
			? lightColorScheme.error
			: lightColorScheme.onSurface;

	const itemStyles: CSSProperties = {
		display: "flex",
		alignItems: "center",
		gap: spacingTokens[2],
		width: "100%",
		padding: `${spacingTokens[2]} ${spacingTokens[3]}`,
		borderRadius: shapeTokens.extraSmall,
		fontFamily: typographyTokens.body.medium.fontFamily,
		fontSize: typographyTokens.body.medium.fontSize,
		color,
		backgroundColor: "transparent",
		border: "none",
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
		textAlign: "left",
	};

	return (
		<button
			type="button"
			role="menuitem"
			className={className}
			style={{ ...itemStyles, ...style }}
			disabled={disabled}
			onClick={() => {
				if (!disabled) {
					onClick?.();
					ctx.setOpen(false);
				}
			}}
		>
			{children}
		</button>
	);
}

DropdownMenuItem.displayName = "DropdownMenu.Item";

export interface DropdownMenuLabelProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DropdownMenuLabel(props: DropdownMenuLabelProps): JSX.Element {
	const { children, style, className } = props;
	const font = typographyTokens.label.medium;
	return (
		<div
			role="presentation"
			className={className}
			style={{
				padding: `${spacingTokens[2]} ${spacingTokens[3]}`,
				fontFamily: font.fontFamily,
				fontSize: font.fontSize,
				fontWeight: font.fontWeight,
				color: lightColorScheme.onSurfaceVariant,
				...style,
			}}
		>
			{children}
		</div>
	);
}

DropdownMenuLabel.displayName = "DropdownMenu.Label";

export interface DropdownMenuSeparatorProps {
	style?: CSSProperties;
	className?: string;
}

export function DropdownMenuSeparator(
	props: DropdownMenuSeparatorProps,
): JSX.Element {
	const { style, className } = props;
	return (
		<hr
			className={className}
			style={{
				height: 1,
				margin: `${spacingTokens[1]} 0`,
				border: "none",
				backgroundColor: lightColorScheme.outlineVariant,
				...style,
			}}
			aria-hidden
		/>
	);
}

DropdownMenuSeparator.displayName = "DropdownMenu.Separator";

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem,
	Label: DropdownMenuLabel,
	Separator: DropdownMenuSeparator,
};
