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
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	elevationTokens,
} from "./foundation";

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

const overlayStyles: CSSProperties = {
	position: "fixed",
	inset: 0,
	zIndex: 9998,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const contentStyles: CSSProperties = {
	position: "fixed",
	left: "50%",
	top: "50%",
	zIndex: 9999,
	transform: "translate(-50%, -50%)",
	width: "100%",
	maxWidth: 512,
	backgroundColor: lightColorScheme.surface,
	boxShadow: elevationTokens.level4.boxShadow,
	borderRadius: componentShapeTokens.dialog ?? componentShapeTokens.card,
	border: `1px solid ${lightColorScheme.outlineVariant}`,
	display: "flex",
	flexDirection: "column",
	maxHeight: "calc(100vh - 32px)",
	overflow: "hidden",
};

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
				style={{
					...overlayStyles,
					border: "none",
					padding: 0,
					cursor: "default",
					display: "block",
				}}
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
				className={className}
				style={{ ...contentStyles, ...style }}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				{children}
				{!hideCloseButton ? (
					<DialogClose
						style={{
							position: "absolute",
							right: spacingTokens[5],
							top: spacingTokens[4],
							width: 32,
							height: 32,
							minWidth: 32,
							minHeight: 32,
							padding: 0,
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							border: "none",
							borderRadius: componentShapeTokens.button,
							backgroundColor: "transparent",
							color: lightColorScheme.onSurfaceVariant,
							cursor: "pointer",
							fontSize: 18,
						}}
					/>
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
	const font = typographyTokens.title.medium;
	return (
		<div
			className={className}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: spacingTokens[1],
				padding: spacingTokens[5],
				borderBottom: `1px solid ${lightColorScheme.outlineVariant}`,
				fontFamily: font.fontFamily,
				fontSize: font.fontSize,
				fontWeight: font.fontWeight,
				lineHeight: font.lineHeight,
				color: lightColorScheme.onSurface,
				...style,
			}}
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
			className={className}
			style={{
				padding: spacingTokens[5],
				overflowY: "auto",
				flex: 1,
				minHeight: 0,
				...style,
			}}
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
			className={className}
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: spacingTokens[2],
				justifyContent: "flex-end",
				padding: spacingTokens[2],
				borderTop: `1px solid ${lightColorScheme.outlineVariant}`,
				...style,
			}}
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
	const font = typographyTokens.title.medium;
	return (
		<h2
			id={ctx?.titleId}
			className={className}
			style={{
				margin: 0,
				fontFamily: font.fontFamily,
				fontSize: font.fontSize,
				fontWeight: font.fontWeight,
				lineHeight: font.lineHeight,
				color: lightColorScheme.onSurface,
				...style,
			}}
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
	const font = typographyTokens.body.medium;
	return (
		<p
			id={ctx?.descriptionId}
			className={className}
			style={{
				margin: 0,
				marginTop: spacingTokens[1],
				fontFamily: font.fontFamily,
				fontSize: font.fontSize,
				lineHeight: font.lineHeight,
				color: lightColorScheme.onSurfaceVariant,
				...style,
			}}
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
