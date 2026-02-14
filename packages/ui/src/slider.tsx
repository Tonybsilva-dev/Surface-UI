import type { CSSProperties, InputHTMLAttributes } from "react";
import { useLayoutEffect } from "react";

export type SliderSize = "sm" | "md";

export interface SliderProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	/** Valor controlado (número). */
	value?: number;
	/** Valor inicial não controlado. */
	defaultValue?: number;
	/** Valor mínimo. */
	min?: number;
	/** Valor máximo. */
	max?: number;
	/** Incremento (step). */
	step?: number;
	/** Callback quando o valor muda (valor numérico). */
	onValueChange?: (value: number) => void;
	/** Tamanho: sm (track mais fino), md. */
	size?: SliderSize;
	/** Estilos no wrapper. */
	style?: CSSProperties;
}

const SLIDER_CSS_ID = "surface-slider-styles";

function ensureSliderStyles(): void {
	if (typeof document === "undefined" || document.getElementById(SLIDER_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = SLIDER_CSS_ID;
	style.textContent = `
.surface-slider{appearance:none;-webkit-appearance:none;width:100%;height:24px;background:transparent;cursor:pointer}
.surface-slider::-webkit-slider-runnable-track{height:6px;border-radius:999px;background:var(--border)}
.surface-slider::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--background);border:2px solid var(--primary);box-shadow:0 1px 2px rgba(0,0,0,0.1);margin-top:-7px;transition:transform 100ms ease-out, box-shadow 100ms ease-out}
.surface-slider::-webkit-slider-thumb:hover{transform:scale(1.05)}
.surface-slider:focus{outline:none}
.surface-slider:focus::-webkit-slider-thumb{box-shadow:0 0 0 2px var(--ring)}
.surface-slider.surface-slider-sm::-webkit-slider-runnable-track{height:4px}
.surface-slider.surface-slider-sm::-webkit-slider-thumb{width:16px;height:16px;margin-top:-6px}
.surface-slider:disabled{opacity:var(--disabled-opacity);cursor:not-allowed}
.surface-slider::-moz-range-track{height:6px;border-radius:999px;background:var(--border)}
.surface-slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--background);border:2px solid var(--primary);cursor:pointer;transition:transform 100ms ease-out, box-shadow 100ms ease-out}
.surface-slider.surface-slider-sm::-moz-range-track{height:4px}
.surface-slider.surface-slider-sm::-moz-range-thumb{width:16px;height:16px}
.surface-slider:focus::-moz-range-thumb{box-shadow:0 0 0 2px var(--ring)}
@media(prefers-reduced-motion:reduce){.surface-slider::-webkit-slider-thumb,.surface-slider::-moz-range-thumb{transition:none}}
`;
	document.head.appendChild(style);
}

export function Slider(props: SliderProps): JSX.Element {
	const {
		value,
		defaultValue,
		min = 0,
		max = 100,
		step = 1,
		onValueChange,
		onChange,
		size = "md",
		disabled,
		style,
		className,
		...other
	} = props;

	useLayoutEffect(() => {
		ensureSliderStyles();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		onChange?.(e);
		const n = parseFloat(e.target.value);
		if (!Number.isNaN(n)) onValueChange?.(n);
	};

	const isControlled = value !== undefined;
	const classNames = ["surface-slider", size === "sm" ? "surface-slider-sm" : ""]
		.filter(Boolean)
		.join(" ");

	const now = isControlled ? value! : parseFloat(String(defaultValue ?? min));

	return (
		<input
			type="range"
			className={classNames}
			min={min}
			max={max}
			step={step}
			disabled={disabled}
			onChange={handleChange}
			style={{ display: "block", width: "100%", ...style }}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={now}
			{...(isControlled ? { value } : { defaultValue: defaultValue ?? min })}
			{...other}
		/>
	);
}

Slider.displayName = "Slider";
