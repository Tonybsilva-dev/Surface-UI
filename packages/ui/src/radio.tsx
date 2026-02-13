import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, createContext, useContext, useId } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	shapeTokens,
	disabledOpacity,
	motionTokens,
} from "./foundation";

export type RadioSize = "sm" | "md";

const sizeMap: Record<RadioSize, number> = {
	sm: 16,
	md: 18,
};

const labelFont = typographyTokens.body.medium;

type RadioGroupContextValue = {
	name: string;
	value: string | number | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	size?: RadioSize;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
	/** Valor selecionado (controlado). */
	value?: string | number;
	/** Callback quando a seleção muda. */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/** Nome do grupo (para agrupar inputs). Se não passado, um id único é usado. */
	name?: string;
	/** Desabilita todos os radios do grupo. */
	disabled?: boolean;
	/** Tamanho dos radios. */
	size?: RadioSize;
	/** Conteúdo (Radio children). */
	children: ReactNode;
	/** Estilos no wrapper. */
	style?: CSSProperties;
	className?: string;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element {
	const {
		value,
		onChange,
		name: nameProp,
		disabled = false,
		size = "md",
		children,
		style,
		className,
	} = props;
	const fallbackName = useId();
	const name = nameProp ?? fallbackName;

	const contextValue: RadioGroupContextValue = {
		name,
		value,
		onChange: onChange ?? (() => {}),
		disabled,
		size,
	};

	return (
		<RadioGroupContext.Provider value={contextValue}>
			<div
				role="radiogroup"
				style={{ display: "flex", flexDirection: "column", gap: spacingTokens[2], ...style }}
				className={className}
			>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
}

RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Valor deste radio (para uso em RadioGroup). */
	value?: string | number;
	/** Conteúdo do rótulo (opcional). */
	children?: ReactNode;
	/** Tamanho do círculo: sm (16px), md (18px). Como Radio do Ant Design. */
	size?: RadioSize;
	/** Estilos no wrapper (label). */
	style?: CSSProperties;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
	const {
		children,
		size: sizeProp,
		disabled: disabledProp,
		name: nameProp,
		value,
		checked: checkedProp,
		onChange: onChangeProp,
		className,
		style,
		...other
	} = props;

	const group = useContext(RadioGroupContext);
	const name = group ? group.name : nameProp;
	const disabled = group?.disabled ?? disabledProp;
	const size = group?.size ?? sizeProp ?? "md";
	const checked = group
		? String(group.value) === String(value)
		: checkedProp;
	const onChange = group?.onChange ?? onChangeProp;

	const boxSize = sizeMap[size];

	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: spacingTokens[2],
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? disabledOpacity : 1,
	};

	const circleStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		width: boxSize,
		height: boxSize,
		borderRadius: shapeTokens.full,
		border: `2px solid ${checked ? lightColorScheme.primary : lightColorScheme.outline}`,
		backgroundColor: "transparent",
		transition: `border-color ${motionTokens.duration.short2} ease-out, background-color ${motionTokens.duration.short2} ease-out`,
	};

	const innerDotStyles: CSSProperties = {
		width: checked ? boxSize - 8 : 0,
		height: checked ? boxSize - 8 : 0,
		borderRadius: shapeTokens.full,
		backgroundColor: lightColorScheme.primary,
		transition: `width ${motionTokens.duration.short2} ease-out, height ${motionTokens.duration.short2} ease-out`,
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
				ref={ref}
				type="radio"
				name={name}
				value={value != null ? String(value) : undefined}
				disabled={disabled}
				checked={checked}
				onChange={onChange}
				aria-checked={checked}
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
			<span aria-hidden style={circleStyles}>
				<span style={innerDotStyles} />
			</span>
			{children != null ? <span style={labelTextStyles}>{children}</span> : null}
		</label>
	);
});

Radio.displayName = "Radio";
