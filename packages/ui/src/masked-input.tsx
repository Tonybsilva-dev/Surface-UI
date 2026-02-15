/**
 * MaskedInput – input com máscara (IMask) para telefone, CPF, CNPJ, CEP, etc.
 * Usa react-imask; valor em onAccept é unmasked por defeito para validação.
 * Presets BR: documentos, contato, moeda, data, hora. Use onAccept para valor raw (APIs).
 */
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { IMask, IMaskInput } from "react-imask";
import { cn } from "./lib/utils";

export type InputSize = "sm" | "middle" | "large";
export type InputStatus = "default" | "error" | "warning";

const sizeClasses: Record<InputSize, string> = {
	sm: "h-8 text-sm",
	middle: "h-9 text-base",
	large: "h-10 text-base",
};

const autofillClasses =
	"[&::-webkit-autofill]:shadow-[0_0_0_30px_var(--background)_inset] [&::-webkit-autofill]:[-webkit-text-fill-color:var(--foreground)]";

/** Opções IMask para preset de string (pattern); object complexo = pass-through. */
const isComplexPreset = (opts: unknown): opts is Record<string, unknown> =>
	typeof opts === "object" &&
	opts !== null &&
	(
		Array.isArray((opts as Record<string, unknown>).mask) ||
		(opts as Record<string, unknown>).dispatch !== undefined ||
		(opts as Record<string, unknown>).radix !== undefined ||
		(opts as Record<string, unknown>).pattern !== undefined
	);

/** Presets de máscara para formatos comuns (BR). */
export const MASK_PRESETS = {
	/** CPF: 000.000.000-00 */
	cpf: { mask: "000.000.000-00" },
	/** CNPJ: 00.000.000/0000-00 */
	cnpj: { mask: "00.000.000/0000-00" },
	/** RG: 00.000.000-0 (padrão comum) */
	rg: { mask: "00.000.000-0" },
	/** CEP: 00000-000 */
	cep: { mask: "00000-000" },
	/** Telefone (BR) dinâmico: (00) 0000-0000 ou (00) 00000-0000 conforme 8/9 dígitos */
	telefone: {
		mask: [
			{ mask: "(00) 0000-0000" },
			{ mask: "(00) 00000-0000" },
		],
		dispatch: (appended: string, dynamicMasked: { value: string; compiledMasks: Array<{ mask: string }> }) => {
			const digits = (dynamicMasked.value + appended).replace(/\D/g, "");
			return digits.length > 10 ? dynamicMasked.compiledMasks[1] : dynamicMasked.compiledMasks[0];
		},
	},
	/** Placa (BR, Mercosul): AAA0A00 */
	placa: { mask: "AAA0A00" },
	/** Título de Eleitor: 0000 0000 0000 */
	tituloEleitor: { mask: "0000 0000 0000" },
	/** Cartão de Crédito: 0000 0000 0000 0000 */
	cartaoCredito: { mask: "0000 0000 0000 0000" },
	/** PIS/PASEP: 000.00000.00-0 */
	pisPasep: { mask: "000.00000.00-0" },
	/** Moeda (BRL): apenas o número (1.234,56); o prefixo "R$ " é renderizado pelo componente. */
	moeda: {
		mask: Number,
		radix: ",",
		thousandsSeparator: ".",
		mapToRadix: ["."],
		scale: 2,
		min: 0,
		padFractionalZeros: true,
		normalizeZeros: true,
		lazy: false,
	},
	/** Data: DD/MM/AAAA */
	data: {
		mask: Date,
		pattern: "d{/}`m{/}`Y",
		lazy: false,
		blocks: {
			d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
			m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
			Y: { mask: IMask.MaskedRange, from: 1900, to: 2999 },
		},
		format: (date: Date | null) => {
			if (!date) return "";
			const d = date.getDate();
			const m = date.getMonth() + 1;
			const y = date.getFullYear();
			return [d, m, y].map((n) => (n < 10 ? `0${n}` : String(n))).join("/");
		},
		parse: (str: string) => {
			const parts = str.split("/").map((p) => parseInt(p, 10));
			if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
			const [day, month, year] = parts;
			return new Date(year, month - 1, day);
		},
	},
	/** Hora: HH:MM (24h) */
	hora: { mask: "00:00" },
} as const;

export type MaskPresetName = keyof typeof MASK_PRESETS;

/** Opções de máscara (object) passadas ao IMask para uso avançado. */
export type MaskOptions = { mask: string } | object;

export interface MaskedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/**
	 * Preset por nome ou opções IMask (object). Para formatos não listados use object com opções IMask.
	 */
	mask: MaskPresetName | MaskOptions;
	/** Valor controlado (valor mascarado exibido). */
	value?: string;
	/** Valor inicial não controlado. */
	defaultValue?: string;
	/**
	 * Callback com valor sem máscara (unmasked) e valor formatado.
	 * Para presets moeda/data o primeiro arg pode ser number ou Date; para os demais, string (dígitos).
	 */
	onAccept?: (unmasked: string | number | Date | null, masked: string) => void;
	/** true = onAccept recebe valor raw (dígitos/number/Date); false = valor formatado. */
	unmask?: boolean;
	size?: InputSize;
	status?: InputStatus;
}

const borderByStatus = (status: InputStatus) =>
	status === "error"
		? "border-destructive focus-visible:ring-destructive/20"
		: status === "warning"
			? "border-amber-500 focus-visible:ring-amber-500/20"
			: "border-input focus-visible:ring-ring/50";

type InputModeType = NonNullable<InputHTMLAttributes<HTMLInputElement>["inputMode"]>;

const INPUTMODE_BY_PRESET: Record<MaskPresetName, InputModeType> = {
	cpf: "numeric",
	cnpj: "numeric",
	rg: "numeric",
	cep: "numeric",
	telefone: "tel",
	placa: "text",
	tituloEleitor: "numeric",
	cartaoCredito: "numeric",
	pisPasep: "numeric",
	moeda: "decimal",
	data: "numeric",
	hora: "numeric",
};

const DEFAULT_INPUTMODE = "numeric";

function getMaskOpts(mask: MaskPresetName | MaskOptions): object {
	if (typeof mask === "string" && mask in MASK_PRESETS) {
		const opts = MASK_PRESETS[mask as MaskPresetName];
		if (isComplexPreset(opts)) return opts as object;
		const patternStr =
			typeof (opts as { mask?: string }).mask === "string" ? (opts as { mask: string }).mask : "0*";
		return {
			mask: patternStr,
			lazy: true,
			placeholderChar: "_",
			definitions: {
				A: { mask: /[A-Za-z]/, placeholderChar: "_" },
				a: { mask: /[A-Za-z]/, placeholderChar: "_" },
				"0": { mask: /[0-9]/, placeholderChar: "_" },
			},
		};
	}
	return mask as object;
}

function getInputMode(
	mask: MaskPresetName | MaskOptions,
	userInputMode?: InputModeType,
): InputModeType | undefined {
	if (userInputMode !== undefined) return userInputMode;
	if (typeof mask === "string" && mask in MASK_PRESETS)
		return INPUTMODE_BY_PRESET[mask as MaskPresetName] ?? DEFAULT_INPUTMODE;
	return undefined;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	function MaskedInput(
		{
			mask,
			value,
			defaultValue,
			onAccept,
			unmask = true,
			size = "middle",
			status = "default",
			className,
			"aria-invalid": ariaInvalid,
			inputMode: userInputMode,
			...props
		},
		ref,
	) {
		const maskOpts = getMaskOpts(mask);
		const inputMode = getInputMode(mask, userInputMode);

		const isAriaInvalid = ariaInvalid === true || ariaInvalid === "true";
		const effectiveStatus: InputStatus =
			status !== "default" ? status : isAriaInvalid ? "error" : "default";

		const inputClasses = cn(
			"flex w-full min-w-0 rounded-none! border bg-transparent px-3 py-1 shadow-sm transition-[color,box-shadow] outline-none",
			"placeholder:text-muted-foreground",
			"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
			"focus-visible:ring-[3px]",
			autofillClasses,
			sizeClasses[size],
			borderByStatus(effectiveStatus),
			className,
		);

		const isMoedaPreset = mask === "moeda";
		// No preset moeda o wrapper já mostra "R$ "; evitar duplicar no placeholder
		const moedaPlaceholder =
			isMoedaPreset && typeof props.placeholder === "string"
				? props.placeholder.replace(/^R\$\s*/i, "").trim() || "0,00"
				: undefined;

		const inputNode = (
			<IMaskInput
				inputRef={ref}
				{...(maskOpts as Record<string, unknown>)}
				value={value}
				defaultValue={defaultValue}
				unmask={unmask}
				onAccept={(unmaskedVal, maskRef) => {
					const masked = (maskRef as { value?: string } | null)?.value ?? "";
					onAccept?.(unmaskedVal ?? null, masked);
				}}
				className={isMoedaPreset ? cn(inputClasses, "border-0 rounded-none! pl-0 focus-visible:ring-0") : inputClasses}
				aria-invalid={ariaInvalid}
				inputMode={inputMode}
				{...props}
				placeholder={isMoedaPreset ? (moedaPlaceholder ?? "0,00") : props.placeholder}
			/>
		);

		if (isMoedaPreset) {
			return (
				<div
					className={cn(
						"flex w-full items-center rounded-none! border bg-transparent pr-3 py-1 pl-3 shadow-sm transition-[color,box-shadow] outline-none focus-within:ring-[3px] focus-within:ring-ring/50",
						sizeClasses[size],
						borderByStatus(effectiveStatus),
						className,
					)}
				>
					<span className="shrink-0 text-muted-foreground" aria-hidden>
						R${" "}
					</span>
					{inputNode}
				</div>
			);
		}

		return inputNode;
	},
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
