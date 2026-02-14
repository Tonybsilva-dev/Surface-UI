import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
	/** Conteúdo do tooltip (texto ou ReactNode). */
	title?: ReactNode;
	/** Elemento que dispara o tooltip ao hover/focus (modo simples). Em modo composição, use Tooltip.Trigger e Tooltip.Content. */
	children: ReactNode;
	/** Posição preferida do tooltip. */
	placement?: TooltipPlacement;
	/** Estilos no wrapper do trigger. */
	style?: CSSProperties;
	className?: string;
}

const TOOLTIP_CLASSES =
	"fixed z-[9999] max-w-[280px] py-1 px-2 text-xs leading-normal text-primary-foreground bg-primary rounded-md shadow-[var(--shadow-2)] pointer-events-none transition-opacity duration-150 ease-out";

interface TooltipContextValue {
	visible: boolean;
	setVisible: (v: boolean) => void;
	coords: { top: number; left: number };
	positioned: boolean;
	placement: TooltipPlacement;
	wrapperRef: React.RefObject<HTMLSpanElement | null>;
	tooltipRef: React.RefObject<HTMLDivElement | null>;
	triggerProps: {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		onFocus: () => void;
		onBlur: () => void;
	};
	tooltipStyles: (coords: { top: number; left: number }) => CSSProperties;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

export interface TooltipTriggerProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TooltipTrigger(props: TooltipTriggerProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(TooltipContext);
	if (!ctx) return <>{children}</>;
	const { wrapperRef, triggerProps } = ctx;
	return (
		<span
			ref={wrapperRef as React.RefObject<HTMLSpanElement>}
			className={cn("inline-flex", className)}
			style={style}
			{...triggerProps}
		>
			{children}
		</span>
	);
}

TooltipTrigger.displayName = "Tooltip.Trigger";

export interface TooltipContentProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TooltipContent(props: TooltipContentProps): JSX.Element {
	const { children, style, className } = props;
	const ctx = useContext(TooltipContext);
	if (!ctx) return <>{children}</>;
	const { visible, coords, tooltipRef, tooltipStyles } = ctx;
	const positionStyle = tooltipStyles(coords);
	const tooltipNode = (
		<div
			ref={tooltipRef as React.RefObject<HTMLDivElement>}
			role="tooltip"
			aria-hidden={!visible}
			className={cn(TOOLTIP_CLASSES, className)}
			style={{ ...positionStyle, ...style }}
		>
			{children}
		</div>
	);
	return (
		<>
			{visible &&
				typeof document !== "undefined" &&
				createPortal(tooltipNode, document.body)}
		</>
	);
}

TooltipContent.displayName = "Tooltip.Content";

function getTooltipPositionStyles(
	coords: { top: number; left: number },
	visible: boolean,
	positioned: boolean,
): CSSProperties {
	return {
		top: coords.top,
		left: coords.left,
		visibility: visible && !positioned ? "hidden" : "visible",
		opacity: visible && positioned ? 1 : 0,
	};
}

export function Tooltip(props: TooltipProps): JSX.Element {
	const { title, children, placement = "top", style, className } = props;

	const wrapperRef = useRef<HTMLSpanElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const [positioned, setPositioned] = useState(false);

	useLayoutEffect(() => {
		if (!visible) {
			setPositioned(false);
			return;
		}
		const wrapper = wrapperRef.current;
		const tooltipEl = tooltipRef.current;
		if (!wrapper || !tooltipEl) return;

		const updatePosition = (): void => {
			const wrapperEl = wrapperRef.current;
			const tipEl = tooltipRef.current;
			if (!wrapperEl || !tipEl) return;
			const rect = wrapperEl.getBoundingClientRect();
			const tipRect = tipEl.getBoundingClientRect();
			const gap = 8;
			let top = 0;
			let left = rect.left + rect.width / 2 - tipRect.width / 2;
			switch (placement) {
				case "top":
					top = rect.top - tipRect.height - gap;
					break;
				case "bottom":
					top = rect.bottom + gap;
					break;
				case "left":
					left = rect.left - tipRect.width - gap;
					top = rect.top + rect.height / 2 - tipRect.height / 2;
					break;
				case "right":
					left = rect.right + gap;
					top = rect.top + rect.height / 2 - tipRect.height / 2;
					break;
				default:
					top = rect.top - tipRect.height - gap;
			}
			setCoords({ top, left });
			setPositioned(true);
		};

		const raf = requestAnimationFrame(() => {
			updatePosition();
		});
		return () => cancelAnimationFrame(raf);
	}, [visible, placement]);

	const triggerProps = {
		onMouseEnter: (): void => setVisible(true),
		onMouseLeave: (): void => setVisible(false),
		onFocus: (): void => setVisible(true),
		onBlur: (): void => setVisible(false),
	};

	const tooltipStylesFn = (c: { top: number; left: number }): CSSProperties =>
		getTooltipPositionStyles(c, visible, positioned);

	if (title !== undefined && title !== null) {
		const positionStyles = getTooltipPositionStyles(
			{ top: coords.top, left: coords.left },
			visible,
			positioned,
		);
		const tooltipNode = (
			<div
				ref={tooltipRef as React.RefObject<HTMLDivElement>}
				role="tooltip"
				aria-hidden={!visible}
				className={TOOLTIP_CLASSES}
				style={positionStyles}
			>
				{title}
			</div>
		);
		return (
			<>
				<span
					ref={wrapperRef}
					className={cn("inline-flex", className)}
					style={style}
					{...triggerProps}
				>
					{children}
				</span>
				{visible &&
					typeof document !== "undefined" &&
					createPortal(tooltipNode, document.body)}
			</>
		);
	}

	const contextValue: TooltipContextValue = {
		visible,
		setVisible,
		coords,
		positioned,
		placement,
		wrapperRef,
		tooltipRef,
		triggerProps,
		tooltipStyles: tooltipStylesFn,
	};

	return (
		<TooltipContext.Provider value={contextValue}>
			{children}
		</TooltipContext.Provider>
	);
}

Tooltip.displayName = "Tooltip";

export type TooltipCompound = typeof Tooltip & {
	Trigger: typeof TooltipTrigger;
	Content: typeof TooltipContent;
};

(Tooltip as TooltipCompound).Trigger = TooltipTrigger;
(Tooltip as TooltipCompound).Content = TooltipContent;
