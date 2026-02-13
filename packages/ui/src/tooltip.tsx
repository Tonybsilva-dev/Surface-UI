import type { CSSProperties, ReactNode } from "react";
import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	motionTokens,
} from "./foundation";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
	/** Conteúdo do tooltip (texto ou ReactNode). */
	title: ReactNode;
	/** Elemento que dispara o tooltip ao hover/focus. */
	children: ReactNode;
	/** Posição preferida do tooltip. */
	placement?: TooltipPlacement;
	/** Estilos no wrapper do trigger. */
	style?: CSSProperties;
	className?: string;
}

const bodySmall = typographyTokens.body.small;

export function Tooltip(props: TooltipProps): JSX.Element {
	const { title, children, placement = "top", style, className } = props;
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const [positioned, setPositioned] = useState(false);
	const wrapperRef = useRef<HTMLSpanElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

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
		onMouseEnter: () => setVisible(true),
		onMouseLeave: () => setVisible(false),
		onFocus: () => setVisible(true),
		onBlur: () => setVisible(false),
	};

	const tooltipStyles: CSSProperties = {
		position: "fixed",
		top: coords.top,
		left: coords.left,
		visibility: visible && !positioned ? "hidden" : "visible",
		opacity: visible && positioned ? 1 : 0,
		zIndex: 9999,
		padding: spacingTokens[2],
		paddingBlock: spacingTokens[1],
		maxWidth: 280,
		fontFamily: bodySmall.fontFamily,
		fontSize: bodySmall.fontSize,
		lineHeight: bodySmall.lineHeight,
		color: lightColorScheme.inverseOnSurface,
		backgroundColor: lightColorScheme.inverseSurface,
		borderRadius: componentShapeTokens.textField,
		boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
		pointerEvents: "none",
		transition: `opacity ${motionTokens.duration.short2} ${motionTokens.easing.standard}`,
	};

	const tooltipNode = (
		<div
			ref={tooltipRef}
			role="tooltip"
			aria-hidden={!visible}
			style={tooltipStyles}
		>
			{title}
		</div>
	);

	return (
		<>
			<span
				ref={wrapperRef}
				className={className}
				style={{ display: "inline-flex", ...style }}
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

Tooltip.displayName = "Tooltip";
