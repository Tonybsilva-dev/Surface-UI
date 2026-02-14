/**
 * Popover – componente por composição.
 * Root (open, onOpenChange) + Trigger (asChild) + Content (portal posicionado).
 */
import type { CSSProperties, ReactNode } from "react";
import {
	createContext,
	useContext,
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
	isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./lib/utils";

const POPOVER_CONTENT_DATA_ATTR = "data-surface-popover-content";

interface PopoverContextValue {
	open: boolean;
	setOpen: (v: boolean) => void;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export interface PopoverRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Modal: focus trap e comportamento de overlay. */
	modal?: boolean;
	children: ReactNode;
}

export function PopoverRoot(props: PopoverRootProps): JSX.Element {
	const { open: controlledOpen, onOpenChange, children } = props;
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = (v: boolean) => {
		if (!isControlled) setUncontrolledOpen(v);
		onOpenChange?.(v);
	};
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const ctx: PopoverContextValue = { open, setOpen, triggerRef };

	return (
		<PopoverContext.Provider value={ctx}>
			<div className="relative inline-block">{children}</div>
		</PopoverContext.Provider>
	);
}

PopoverRoot.displayName = "Popover.Root";

export interface PopoverTriggerProps {
	children: ReactNode;
	asChild?: boolean;
	className?: string;
	style?: CSSProperties;
}

export const PopoverTrigger = function PopoverTrigger(
	props: PopoverTriggerProps,
): JSX.Element {
	const { children, asChild = false, className, style } = props;
	const ctx = useContext(PopoverContext);
	if (!ctx) return <>{children}</>;
	const { open, setOpen, triggerRef } = ctx;

	const handleClick = () => setOpen(!open);

	if (asChild && isValidElement(children)) {
		return (
			<Slot
				ref={triggerRef as React.Ref<HTMLButtonElement>}
				className={className}
				style={style}
				onClick={handleClick}
				aria-expanded={open}
			>
				{children}
			</Slot>
		);
	}

	return (
		<button
			ref={triggerRef as React.Ref<HTMLButtonElement>}
			type="button"
			className={cn(
				"inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm",
				className,
			)}
			style={style}
			onClick={handleClick}
			aria-expanded={open}
		>
			{children}
		</button>
	);
};

PopoverTrigger.displayName = "Popover.Trigger";

export interface PopoverContentProps {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	sideOffset?: number;
	/** Largura mínima (px). Se não definido, usa a largura do trigger. */
	minWidth?: number;
	/** Evitar focus automático ao abrir (ex.: para combobox com input interno). */
	onOpenAutoFocus?: (e: Event) => void;
}

export function PopoverContent(props: PopoverContentProps): JSX.Element | null {
	const {
		children,
		className,
		style,
		sideOffset = 4,
		minWidth: minWidthProp,
		onOpenAutoFocus,
	} = props;
	const ctx = useContext(PopoverContext);
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
		minWidth: 0,
	});

	useLayoutEffect(() => {
		if (!ctx?.open || !ctx.triggerRef.current) return;
		const rect = ctx.triggerRef.current.getBoundingClientRect();
		setPosition({
			top: rect.bottom + sideOffset,
			left: rect.left,
			minWidth: minWidthProp ?? Math.max(rect.width, 128),
		});
	}, [ctx?.open, ctx?.triggerRef, sideOffset, minWidthProp]);

	useEffect(() => {
		if (!ctx?.open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") ctx.setOpen(false);
		};
		const onClickOutside = (e: MouseEvent) => {
			const el = ctx.triggerRef.current;
			if (el && !el.contains(e.target as Node)) {
				const content = document.querySelector(`[${POPOVER_CONTENT_DATA_ATTR}]`);
				if (content && !content.contains(e.target as Node)) ctx.setOpen(false);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		const t = setTimeout(
			() => document.addEventListener("click", onClickOutside),
			0,
		);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("click", onClickOutside);
			clearTimeout(t);
		};
	}, [ctx?.open, ctx?.setOpen, ctx?.triggerRef]);

	useEffect(() => {
		if (!ctx?.open || !onOpenAutoFocus) return;
		const syntheticEvent = {
			preventDefault: () => {},
		} as unknown as Event;
		onOpenAutoFocus(syntheticEvent);
	}, [ctx?.open, onOpenAutoFocus]);

	if (!ctx) return null;
	if (!ctx.open) return null;

	const body = typeof document !== "undefined" ? document.body : null;
	if (!body) return null;

	const node = (
		<div
			data-surface-popover-content
			role="dialog"
			aria-modal={ctx.open}
			className={cn(
				"fixed z-[9999] rounded-md border border-border bg-card shadow-[var(--shadow-2)]",
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

	return createPortal(node, body);
}

PopoverContent.displayName = "Popover.Content";

export const Popover = {
	Root: PopoverRoot,
	Trigger: PopoverTrigger,
	Content: PopoverContent,
};
