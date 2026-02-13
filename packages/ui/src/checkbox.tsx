import type { InputHTMLAttributes, CSSProperties, ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	shapeTokens,
	disabledOpacity,
} from "./foundation";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Conteúdo do rótulo (opcional). */
	children?: ReactNode;
	/**
	 * Tamanho do quadro: sm (18px), md (20px).
	 * Alinhado às guidelines de selection controls.
	 */
	size?: CheckboxSize;
	/** Estado indeterminado (ex.: “selecionar todos”). */
	indeterminate?: boolean;
	/** Estilos inline no wrapper (label). */
	style?: CSSProperties;
}

const sizeMap: Record<CheckboxSize, number> = {
	sm: 18,
	md: 20,
};

const labelFont = typographyTokens.body.medium;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	props,
	ref
) {
	const {
		children,
		size = "md",
		indeterminate = false,
		disabled,
		checked,
		style,
		className,
		...other
	} = props;

	const inputRef = useRef<HTMLInputElement | null>(null);
	const setRef = (el: HTMLInputElement | null) => {
		inputRef.current = el;
		if (typeof ref === "function") ref(el);
		else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
	};
	useEffect(() => {
		if (inputRef.current) inputRef.current.indeterminate = indeterminate;
	}, [indeterminate]);

	const boxSize = sizeMap[size];
	const isChecked = checked === true || indeterminate;

	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: spacingTokens[2],
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
	};

	const boxStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		width: boxSize,
		height: boxSize,
		borderRadius: shapeTokens.extraSmall,
		border: `2px solid ${isChecked ? lightColorScheme.primary : lightColorScheme.outline}`,
		backgroundColor: isChecked ? lightColorScheme.primary : "transparent",
		transition:
			"background-color 150ms ease-out, border-color 150ms ease-out",
	};

	const labelTextStyles: CSSProperties = {
		fontFamily: labelFont.fontFamily,
		fontSize: labelFont.fontSize,
		lineHeight: labelFont.lineHeight,
		fontWeight: labelFont.fontWeight,
		color: lightColorScheme.onSurface,
	};

	return (
		<label style={{ ...wrapperStyles, ...style }} className={className}>
			<input
				type="checkbox"
				ref={setRef}
				{...other}
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
				aria-checked={indeterminate ? "mixed" : checked}
			/>
			<span aria-hidden style={boxStyles}>
				{isChecked ? (
					indeterminate ? (
						<span
							style={{
								width: 10,
								height: 2,
								backgroundColor: lightColorScheme.onPrimary,
								borderRadius: 1,
							}}
						/>
					) : (
						<svg
							width={12}
							height={10}
							viewBox="0 0 12 10"
							fill="none"
							aria-hidden
							style={{ flexShrink: 0 }}
						>
							<title>Marcado</title>
							<path
								d="M1 5.5L4.5 9L11 1"
								stroke={lightColorScheme.onPrimary}
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)
				) : null}
			</span>
			{children != null ? (
				<span style={labelTextStyles}>{children}</span>
			) : null}
		</label>
	);
});

Checkbox.displayName = "Checkbox";
