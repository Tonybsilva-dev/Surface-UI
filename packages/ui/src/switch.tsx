import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import {
	lightColorScheme,
	spacingTokens,
	shapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

export type SwitchSize = "sm" | "md";

const sizeMap: Record<SwitchSize, { trackWidth: number; trackHeight: number; thumbSize: number }> = {
	sm: { trackWidth: 28, trackHeight: 16, thumbSize: 12 },
	md: { trackWidth: 44, trackHeight: 22, thumbSize: 18 },
};

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Conteúdo do rótulo (opcional). */
	children?: ReactNode;
	/** Tamanho: sm (track 28×16), md (44×22). Como Switch do Ant Design. */
	size?: SwitchSize;
	/** Estilos no wrapper (label). */
	style?: CSSProperties;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
	const { children, size = "md", disabled, checked, className, style, ...other } = props;

	const dims = sizeMap[size];
	const trackRadius = shapeTokens.full;
	const thumbRadius = shapeTokens.full;

	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: spacingTokens[2],
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
	};

	const trackStyles: CSSProperties = {
		position: "relative",
		display: "inline-block",
		width: dims.trackWidth,
		height: dims.trackHeight,
		borderRadius: trackRadius,
		backgroundColor: checked ? lightColorScheme.primary : lightColorScheme.outline,
		transition: `background-color ${motionTokens.duration.short2} ease-out`,
	};

	const thumbOffset = 2;
	const thumbPos = checked
		? dims.trackWidth - dims.thumbSize - thumbOffset
		: thumbOffset;

	const thumbStyles: CSSProperties = {
		position: "absolute",
		top: (dims.trackHeight - dims.thumbSize) / 2,
		left: thumbPos,
		width: dims.thumbSize,
		height: dims.thumbSize,
		borderRadius: thumbRadius,
		backgroundColor: lightColorScheme.surface,
		boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
		transition: `left ${motionTokens.duration.short2} ease-out`,
	};

	const labelStyles: CSSProperties = {
		fontFamily: "inherit",
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		color: lightColorScheme.onSurface,
	};

	return (
		<label style={{ ...wrapperStyles, ...style }} className={className}>
			<input
				ref={ref}
				type="checkbox"
				role="switch"
				aria-checked={checked}
				disabled={disabled}
				checked={checked}
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					border: 0,
				}}
				{...other}
			/>
			<span aria-hidden style={trackStyles}>
				<span style={thumbStyles} />
			</span>
			{children != null ? <span style={labelStyles}>{children}</span> : null}
		</label>
	);
});

Switch.displayName = "Switch";
