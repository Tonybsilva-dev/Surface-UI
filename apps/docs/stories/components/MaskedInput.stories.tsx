import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
	MaskedInput,
	MASK_PRESETS,
	type MaskPresetName,
} from "@surface/ui/masked-input";
import { Label } from "@surface/ui/label";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof MaskedInput> = {
	title: "Components/Atoms/MaskedInput",
	component: MaskedInput,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Input com máscara (IMask) para formatação e validação. Presets BR: CPF, CNPJ, CEP, telefone (dinâmico), RG, placa, título de eleitor, cartão, PIS/PASEP, moeda, data, hora. Use onAccept para valor sem máscara (unmasked) em formulários e APIs.",
			},
		},
	},
	argTypes: {
		mask: {
			description: "Preset ou opções IMask (object).",
			control: "select",
			options: Object.keys(MASK_PRESETS) as MaskPresetName[],
			table: { type: { summary: "MaskPresetName | MaskOptions" }, category: "Máscara" },
		},
		unmask: {
			description: "true = onAccept recebe valor raw (dígitos/number/Date) para validação.",
			control: "boolean",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		size: {
			control: "select",
			options: ["sm", "middle", "large"],
		},
		status: {
			control: "select",
			options: ["default", "error", "warning"],
		},
	},
	args: {
		mask: "telefone",
		unmask: true,
		placeholder: "(00) 00000-0000",
		size: "middle",
		status: "default",
	},
};

export default meta;

type Story = StoryObj<typeof MaskedInput>;

export const Default: Story = {
	render: function DefaultRender(args) {
		const [unmasked, setUnmasked] = useState<string | number | Date | null>("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<Label htmlFor="masked-default">Campo mascarado</Label>
				<MaskedInput
					key={args.mask}
					id="masked-default"
					mask={args.mask}
					unmask={args.unmask}
					placeholder={args.placeholder}
					size={args.size}
					status={args.status}
					disabled={args.disabled}
					onAccept={(u) => setUnmasked(u)}
					aria-label="Campo mascarado"
				/>
				{unmasked != null && unmasked !== "" ? (
					<p className="text-sm text-muted-foreground">Valor (unmasked): {String(unmasked)}</p>
				) : null}
			</div>
		);
	},
};

export const CPF: Story = {
	args: { mask: "cpf", placeholder: "000.000.000-00" },
	render: function CPFRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>CPF</span>
				<MaskedInput
					mask="cpf"
					placeholder="000.000.000-00"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="CPF"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const CNPJ: Story = {
	args: { mask: "cnpj", placeholder: "00.000.000/0000-00" },
	render: function CNPJRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>CNPJ</span>
				<MaskedInput
					mask="cnpj"
					placeholder="00.000.000/0000-00"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="CNPJ"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const RG: Story = {
	args: { mask: "rg", placeholder: "00.000.000-0" },
	render: function RGRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>RG</span>
				<MaskedInput
					mask="rg"
					placeholder="00.000.000-0"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="RG"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const CEP: Story = {
	args: { mask: "cep", placeholder: "00000-000" },
	render: function CEPRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>CEP</span>
				<MaskedInput
					mask="cep"
					placeholder="00000-000"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="CEP"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const Telefone: Story = {
	args: { mask: "telefone", placeholder: "(00) 00000-0000" },
	render: function TelefoneRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Telefone (dinâmico: fixo ou celular)</span>
				<MaskedInput
					mask="telefone"
					placeholder="(00) 00000-0000"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="Telefone"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const Placa: Story = {
	args: { mask: "placa", placeholder: "AAA0A00" },
	render: function PlacaRender() {
		const [value, setValue] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Placa (Mercosul)</span>
				<MaskedInput
					mask="placa"
					placeholder="AAA0A00"
					onAccept={(_unmasked, masked) => setValue(masked)}
					aria-label="Placa do veículo"
				/>
				{value ? (
					<p className="text-sm text-muted-foreground">Formatado: {value}</p>
				) : null}
			</div>
		);
	},
};

export const TituloEleitor: Story = {
	args: { mask: "tituloEleitor", placeholder: "0000 0000 0000" },
	render: function TituloEleitorRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Título de Eleitor</span>
				<MaskedInput
					mask="tituloEleitor"
					placeholder="0000 0000 0000"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="Título de Eleitor"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const CartaoCredito: Story = {
	args: { mask: "cartaoCredito", placeholder: "0000 0000 0000 0000" },
	render: function CartaoCreditoRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Cartão de Crédito</span>
				<MaskedInput
					mask="cartaoCredito"
					placeholder="0000 0000 0000 0000"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="Número do cartão"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const PISPASEP: Story = {
	args: { mask: "pisPasep", placeholder: "000.00000.00-0" },
	render: function PISPASEPRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>PIS/PASEP</span>
				<MaskedInput
					mask="pisPasep"
					placeholder="000.00000.00-0"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="PIS/PASEP"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Dígitos: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

export const Moeda: Story = {
	args: { mask: "moeda", placeholder: "0,00" },
	render: function MoedaRender() {
		const [value, setValue] = useState<string | number | null>(null);
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Moeda (R$)</span>
				<MaskedInput
					mask="moeda"
					placeholder="0,00"
					onAccept={(u) => setValue(u as string | number | null)}
					aria-label="Valor em reais"
				/>
				{value != null && value !== "" ? (
					<p className="text-sm text-muted-foreground">Valor (raw): {String(value)}</p>
				) : null}
			</div>
		);
	},
};

export const Data: Story = {
	args: { mask: "data", placeholder: "DD/MM/AAAA" },
	render: function DataRender() {
		const [value, setValue] = useState<string | Date | null>(null);
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Data</span>
				<MaskedInput
					mask="data"
					placeholder="DD/MM/AAAA"
					onAccept={(u) => setValue(u as string | Date | null)}
					aria-label="Data"
				/>
				{value != null ? (
					<p className="text-sm text-muted-foreground">
						Valor: {value instanceof Date ? value.toISOString().slice(0, 10) : String(value)}
					</p>
				) : null}
			</div>
		);
	},
};

export const Hora: Story = {
	args: { mask: "hora", placeholder: "00:00" },
	render: function HoraRender() {
		const [unmasked, setUnmasked] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Hora (24h)</span>
				<MaskedInput
					mask="hora"
					placeholder="00:00"
					onAccept={(u) => setUnmasked(String(u ?? ""))}
					aria-label="Hora"
				/>
				{unmasked ? (
					<p className="text-sm text-muted-foreground">Valor: {unmasked}</p>
				) : null}
			</div>
		);
	},
};

/** Formatos não cobertos por preset: passar opções IMask em mask (ex.: placa antiga). */
export const Avancado: Story = {
	render: function AvancadoRender() {
		const [value, setValue] = useState("");
		return (
			<div className="w-full max-w-xs space-y-2">
				<span className="block text-sm font-medium" aria-hidden>Placa (formato antigo, mask como object)</span>
				<MaskedInput
					mask={{
						mask: "AAA-0000",
						lazy: true,
						placeholderChar: "_",
						definitions: {
							A: { mask: /[A-Za-z]/, placeholderChar: "_" },
							"0": { mask: /[0-9]/, placeholderChar: "_" },
						},
					}}
					placeholder="AAA-0000"
					onAccept={(_, masked) => setValue(masked)}
					aria-label="Placa (formato antigo)"
				/>
				{value ? (
					<p className="text-sm text-muted-foreground">Valor: {value}</p>
				) : null}
			</div>
		);
	},
};

function FormularioCadastroDemo() {
	const [cpf, setCpf] = useState("");
	const [cnpj, setCnpj] = useState("");
	const [cep, setCep] = useState("");
	const [telefone, setTelefone] = useState("");

	return (
		<div className="w-full max-w-md space-y-5 rounded-lg border border-border bg-card p-6">
			<h3 className="text-sm font-semibold text-foreground">Dados (mascarados)</h3>
			<div className="space-y-4">
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>CPF</span>
					<MaskedInput
						mask="cpf"
						placeholder="000.000.000-00"
						value={cpf}
						onAccept={(_, masked) => setCpf(masked)}
						aria-label="CPF"
						className="w-full"
					/>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>CNPJ</span>
					<MaskedInput
						mask="cnpj"
						placeholder="00.000.000/0000-00"
						value={cnpj}
						onAccept={(_, masked) => setCnpj(masked)}
						aria-label="CNPJ"
						className="w-full"
					/>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>CEP</span>
					<MaskedInput
						mask="cep"
						placeholder="00000-000"
						value={cep}
						onAccept={(_, masked) => setCep(masked)}
						aria-label="CEP"
						className="w-full"
					/>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>Telefone</span>
					<MaskedInput
						mask="telefone"
						placeholder="(00) 00000-0000"
						value={telefone}
						onAccept={(_, masked) => setTelefone(masked)}
						aria-label="Telefone"
						className="w-full"
					/>
				</div>
			</div>
			<div className="border-t border-border pt-4 text-sm text-muted-foreground">
				CPF: {cpf || "—"} · CNPJ: {cnpj || "—"} · CEP: {cep || "—"} · Tel: {telefone || "—"}
			</div>
		</div>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="MaskedInput (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								<strong>MaskedInput</strong> usa a biblioteca IMask (react-imask) para formatar o
								teclado em tempo real. Os presets seguem formatos brasileiros. O valor sem máscara
								(raw) é obtido em <code>onAccept</code> para validação e envio ao servidor/APIs.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Presets (MASK_PRESETS)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>cpf</code> — 000.000.000-00</li>
								<li><code>cnpj</code> — 00.000.000/0000-00</li>
								<li><code>rg</code> — 00.000.000-0</li>
								<li><code>cep</code> — 00000-000</li>
								<li><code>telefone</code> — (00) 0000-0000 ou (00) 00000-0000 (dinâmico)</li>
								<li><code>placa</code> — AAA0A00 (Mercosul)</li>
								<li><code>tituloEleitor</code> — 0000 0000 0000</li>
								<li><code>cartaoCredito</code> — 0000 0000 0000 0000</li>
								<li><code>pisPasep</code> — 000.00000.00-0</li>
								<li><code>moeda</code> — R$ 1.234,56 (BRL)</li>
								<li><code>data</code> — DD/MM/AAAA</li>
								<li><code>hora</code> — HH:MM (24h)</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Formatos não listados</h3>
							<p>
								Para formatos que não têm preset (ex.: placa antiga AAA-0000, Chave Pix com validação
								condicional), use <code>mask</code> com um object de opções IMask. Exemplo na story Avançado.
								Chave Pix pode ser implementada com validação e máscara condicional ou campos separados.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props principais)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>mask</code> — Nome do preset ou object de opções IMask.</li>
								<li><code>value</code> / <code>defaultValue</code> — Valor controlado ou inicial (formatado).</li>
								<li><code>onAccept(unmasked, masked)</code> — Callback: valor raw (dígitos/number/Date) e valor formatado.</li>
								<li><code>unmask</code> — true (default) = primeiro arg de onAccept é raw.</li>
								<li><code>size</code>, <code>status</code> — Como no Input; compatível com Form (aria-invalid).</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">UX e acessibilidade</h3>
							<p>
								O componente define <code>inputMode</code> por preset (numeric, tel, decimal) para abrir o teclado
								adequado no mobile. Use <code>aria-label</code> em cada campo. O IMask normaliza colagem com
								formatação (ex.: colar CPF com pontos); use o valor unmasked em onAccept para persistência.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Formulários de cadastro (pessoa, empresa), endereço (CEP), contacto (telefone), valores (moeda),
								datas e documentos. Use o valor unmasked para validação e persistência; exiba o valor mascarado no input.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo: formulário com vários formatos">
				<StoryCard title="CPF, CNPJ, CEP e Telefone">
					<p className="mb-4 text-sm text-muted-foreground">
						Campos mascarados no mesmo formulário. O estado é controlado pelo valor formatado (value + onAccept com masked).
					</p>
					<FormularioCadastroDemo />
				</StoryCard>
			</StorySection>
		</div>
	),
};
