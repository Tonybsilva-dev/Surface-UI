import type { CSSProperties, ReactNode } from "react";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useId,
	useRef,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

interface DialogContextValue {
	open: boolean;
	setOpen: (v: boolean) => void;
	contentId: string;
	titleId: string;
	descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export interface DialogRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

export function DialogRoot(props: DialogRootProps): JSX.Element {
	const { open: controlledOpen, onOpenChange, children } = props;
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;
	const setOpen = (v: boolean) => {
		if (!isControlled) setUncontrolledOpen(v);
		onOpenChange?.(v);
	};

	const contentId = useId().replace(/:/g, "");
	const titleId = useId().replace(/:/g, "");
	const descriptionId = useId().replace(/:/g, "");

	const ctx: DialogContextValue = {
		open,
		setOpen,
		contentId,
		titleId,
		descriptionId,
	};

	return (
		<DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>
	);
}

DialogRoot.displayName = "Dialog.Root";

export interface DialogTriggerProps {
	children: ReactNode;
	asChild?: boolean;
	style?: CSSProperties;
	className?: string;
}

export function DialogTrigger(props: DialogTriggerProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(DialogContext);
	if (!ctx) return <>{children}</>;
	const { setOpen } = ctx;

	return (
		<button
			type="button"
			className={className}
			style={style}
			onClick={() => setOpen(true)}
		>
			{children}
		</button>
	);
}

DialogTrigger.displayName = "Dialog.Trigger";

export interface DialogContentProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
	/** Se true, não mostra o botão X de fechar. */
	hideCloseButton?: boolean;
}

export function DialogContent(props: DialogContentProps): JSX.Element {
	const { children, style, className, hideCloseButton = false } = props;
	const ctx = useContext(DialogContext);
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ctx?.open) return;
		const setOpen = ctx.setOpen;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [ctx?.open, ctx?.setOpen]);

	if (!ctx) return <></>;
	const { open, setOpen, contentId, titleId, descriptionId } = ctx;

	if (!open || typeof document === "undefined") return <></>;
	const body = document.body;
	if (!body) return <></>;

	const overlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) setOpen(false);
	};

	const overlayKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") setOpen(false);
	};

	const node = (
		<>
			<button
				type="button"
				aria-label="Fechar"
				className="fixed inset-0 z-[9998] block border-0 p-0 cursor-default bg-black/50"
				onClick={overlayClick}
				onKeyDown={overlayKeyDown}
			/>
			<div
				ref={contentRef}
				role="dialog"
				aria-modal
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				id={contentId}
				className={cn(
					"fixed left-1/2 top-1/2 z-[9999] w-full max-w-[512px] -translate-x-1/2 -translate-y-1/2 flex flex-col max-h-[calc(100vh-32px)] overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-4)]",
					className,
				)}
				style={style}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				{children}
				{!hideCloseButton ? (
					<DialogClose className="absolute right-5 top-4 inline-flex h-8 w-8 min-h-8 min-w-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-lg text-muted-foreground cursor-pointer" />
				) : null}
			</div>
		</>
	);

	return createPortal(node, body);
}

DialogContent.displayName = "Dialog.Content";

export interface DialogCloseProps {
	children?: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogClose(props: DialogCloseProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(DialogContext);
	if (!ctx) return <></>;

	return (
		<button
			type="button"
			className={className}
			style={style}
			onClick={() => ctx.setOpen(false)}
			aria-label="Fechar"
		>
			{children ?? "×"}
		</button>
	);
}

DialogClose.displayName = "Dialog.Close";

export interface DialogHeaderProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogHeader(props: DialogHeaderProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div
			className={cn(
				"flex flex-col gap-1 border-b border-border p-5 text-lg font-medium leading-snug text-foreground",
				className,
			)}
			style={style}
		>
			{children}
		</div>
	);
}

DialogHeader.displayName = "Dialog.Header";

export interface DialogBodyProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogBody(props: DialogBodyProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div
			className={cn("min-h-0 flex-1 overflow-y-auto p-5", className)}
			style={style}
		>
			{children}
		</div>
	);
}

DialogBody.displayName = "Dialog.Body";

export interface DialogFooterProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogFooter(props: DialogFooterProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div
			className={cn(
				"flex flex-wrap justify-end gap-2 border-t border-border p-2",
				className,
			)}
			style={style}
		>
			{children}
		</div>
	);
}

DialogFooter.displayName = "Dialog.Footer";

export interface DialogTitleProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogTitle(props: DialogTitleProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(DialogContext);
	return (
		<h2
			id={ctx?.titleId}
			className={cn("m-0 text-lg font-medium leading-snug text-foreground", className)}
			style={style}
		>
			{children}
		</h2>
	);
}

DialogTitle.displayName = "Dialog.Title";

export interface DialogDescriptionProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function DialogDescription(props: DialogDescriptionProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(DialogContext);
	return (
		<p
			id={ctx?.descriptionId}
			className={cn("m-0 mt-1 text-base leading-normal text-muted-foreground", className)}
			style={style}
		>
			{children}
		</p>
	);
}

DialogDescription.displayName = "Dialog.Description";

export const Dialog = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Content: DialogContent,
	Close: DialogClose,
	Header: DialogHeader,
	Body: DialogBody,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription,
};
