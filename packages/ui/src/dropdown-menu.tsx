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
import { cn } from "./lib/utils";

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
			<div className="relative inline-block">
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

	return (
		<button
			ref={triggerRef as React.Ref<HTMLButtonElement>}
			type="button"
			className={cn(
				"inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground cursor-pointer",
				className,
			)}
			style={style}
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

	const node = (
		<div
			data-surface-dropdown-menu-content
			role="menu"
			className={cn(
				"fixed z-[9999] max-h-[280px] overflow-y-auto rounded-md border border-border bg-card p-1 shadow-[var(--shadow-2)]",
				className,
			)}
			style={{
				top: position.top,
				left: position.left,
				minWidth: position.minWidth,
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

	return (
		<button
			type="button"
			role="menuitem"
			className={cn(
				"flex w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-3 py-2 text-left text-sm font-normal text-foreground",
				variant === "destructive" && "text-destructive",
				disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
				className,
			)}
			style={style}
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
	return (
		<div
			role="presentation"
			className={cn("px-3 py-2 text-sm font-medium text-muted-foreground", className)}
			style={style}
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
			className={cn("my-1 h-px border-0 bg-border", className)}
			style={style}
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
