import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { Input } from "@surface/ui/input";
import type { InputSize, InputStatus } from "@surface/ui/input";
import { Label } from "@surface/ui/label";
import { PasswordStrength } from "@surface/ui/password-strength";
import { User, Search, X } from "lucide-react";
import { StoryCard, StorySection, SemanticDomSection } from "../foundation/shared";

/** Exemplo Semantic DOM com cada parte envolvida em wrap para hover destacar todas. Inclui hint visível. */
function InputSemanticExample({ wrap }: { wrap: (id: string, children: ReactNode) => ReactNode }) {
	const [value, setValue] = useState("");
	const rootClasses =
		"relative flex w-full min-w-0 items-center gap-2 rounded-none! border border-input bg-background h-9 text-base transition-[border-color,box-shadow] duration-150 focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/50";
	const prefixClasses = "text-muted-foreground flex shrink-0 items-center justify-center pl-3 [&_svg]:size-4";
	const inputClasses =
		"min-w-0 flex-1 border-0 bg-transparent py-1 pl-0 pr-2 outline-none focus:ring-0 text-base rounded-none!";
	const suffixClasses = "text-muted-foreground flex shrink-0 items-center justify-center pr-2 [&_svg]:size-4";

	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			{wrap("input-label", <Label htmlFor="input-sem-demo">Nome</Label>)}
			{wrap("input-root", (
				<span className={rootClasses}>
					{wrap("input-prefix", (
						<span className={prefixClasses}>
							<User className="size-4 text-muted-foreground" aria-hidden />
						</span>
					))}
					{wrap("input-input", (
						<input
							id="input-sem-demo"
							type="text"
							placeholder="Digite"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className={inputClasses}
							maxLength={20}
							aria-label="Nome"
						/>
					))}
					{wrap("input-suffix", (
						<span className={suffixClasses}>
							{wrap("input-clear", (
								<button
									type="button"
									aria-label="Limpar"
									className="inline-flex shrink-0 items-center justify-center rounded-none! p-0.5 text-muted-foreground hover:text-foreground transition-colors"
									onClick={() => setValue("")}
								>
									<X aria-hidden className="size-4" />
								</button>
							))}
							<span className="shrink-0 pr-3 text-xs text-muted-foreground tabular-nums">
								{value.length} / 20
							</span>
						</span>
					))}
				</span>
			))}
			{wrap("input-hint", <span className="text-muted-foreground text-xs">Mín. 3 caracteres.</span>)}
		</div>
	);
}

const meta: Meta<typeof Input> = {
	title: "Components/Atoms/Input",
	component: Input,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Campo de texto com suporte a prefix, suffix, allowClear, showCount, size e status. Estrutura semântica: root, prefix, input, suffix, count. Compatível com formulários e acessibilidade.",
			},
		},
	},
	argTypes: {
		placeholder: {
			description: "Texto placeholder.",
			control: "text",
			table: { type: { summary: "string" }, category: "Conteúdo" },
		},
		disabled: {
			description: "Desativa o input.",
			control: "boolean",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "false" }, category: "Estado" },
		},
		size: {
			description: "Tamanho: sm, middle, large.",
			control: "select",
			options: ["sm", "middle", "large"] as InputSize[],
			table: { type: { summary: "InputSize" }, defaultValue: { summary: "middle" }, category: "Aparência" },
		},
		status: {
			description: "Estado de validação visual (error, warning).",
			control: "select",
			options: ["default", "error", "warning"] as InputStatus[],
			table: { type: { summary: "InputStatus" }, category: "Aparência" },
		},
		allowClear: {
			description: "Mostrar botão de limpar quando há valor.",
			control: "boolean",
			table: { type: { summary: "boolean" }, category: "Comportamento" },
		},
		showCount: {
			description: "Mostrar contagem de caracteres.",
			control: "boolean",
			table: { type: { summary: "boolean" }, category: "Comportamento" },
		},
		maxLength: {
			description: "Número máximo de caracteres (nativo + contagem).",
			control: { type: "number", min: 1, max: 500 },
			table: { type: { summary: "number" }, category: "Conteúdo" },
		},
		showPrefix: {
			description: "Mostrar ícone de prefixo (exemplo: User).",
			control: "boolean",
			table: { type: { summary: "boolean" }, category: "Slots" },
		},
		showSuffix: {
			description: "Mostrar ícone de sufixo (exemplo: Search). Ignorado se allowClear e há valor.",
			control: "boolean",
			table: { type: { summary: "boolean" }, category: "Slots" },
		},
		hint: {
			description: "Texto de ajuda exibido abaixo do campo.",
			control: "text",
			table: { type: { summary: "string" }, category: "Conteúdo" },
		},
	},
	args: {
		placeholder: "Digite aqui…",
		disabled: false,
		size: "middle",
		status: "default",
		allowClear: false,
		showCount: false,
		maxLength: undefined,
		showPrefix: false,
		showSuffix: false,
		hint: "Texto de ajuda opcional (editável nos controles)",
	},
};

export default meta;

/** Args da story Default (inclui showPrefix/showSuffix e hint para controles). */
type InputStoryArgs = ComponentProps<typeof Input> & {
	showPrefix?: boolean;
	showSuffix?: boolean;
};

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: "Digite aqui…",
		disabled: false,
		size: "middle",
		status: "default",
		allowClear: false,
		showCount: false,
		maxLength: undefined,
		showPrefix: false,
		showSuffix: false,
		hint: "Texto de ajuda opcional (editável nos controles)",
	} as InputStoryArgs,
	render: function InputDefaultRender(args: InputStoryArgs) {
		const [value, setValue] = useState("");
		const [latestArgs] = useArgs();
		const resolvedArgs = { ...args, ...latestArgs } as InputStoryArgs;
		const prefix = resolvedArgs.showPrefix === true ? <User className="size-4" aria-hidden /> : undefined;
		const suffix = resolvedArgs.showSuffix === true ? <Search className="size-4" aria-hidden /> : undefined;
		const hint =
			typeof resolvedArgs.hint === "string" && resolvedArgs.hint.length > 0 ? resolvedArgs.hint : undefined;
		return (
			<div className="w-full max-w-sm">
				<Input
					placeholder={resolvedArgs.placeholder ?? "Digite aqui…"}
					disabled={resolvedArgs.disabled === true}
					size={resolvedArgs.size ?? "middle"}
					status={resolvedArgs.status ?? "default"}
					allowClear={resolvedArgs.allowClear === true}
					showCount={resolvedArgs.showCount === true}
					maxLength={resolvedArgs.maxLength}
					hint={hint}
					prefix={prefix}
					suffix={suffix}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onClear={() => setValue("")}
				/>
			</div>
		);
	},
};

export const WithPrefixAndSuffix: Story = {
	render: () => (
		<div className="w-full max-w-sm space-y-4">
			<Input
				placeholder="Nome de utilizador"
				prefix={<User className="size-4 text-muted-foreground" aria-hidden />}
			/>
			<Input
				placeholder="Pesquisar…"
				suffix={<Search className="size-4 text-muted-foreground" aria-hidden />}
			/>
		</div>
	),
};

export const WithClearAndCount: Story = {
	render: function WithClearAndCountRender() {
		const [value, setValue] = useState("Texto de exemplo");
		return (
			<div className="w-full max-w-sm">
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onClear={() => setValue("")}
					allowClear
					showCount
					maxLength={100}
					placeholder="Com allowClear e showCount"
				/>
			</div>
		);
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="w-full max-w-sm space-y-4">
			<Input size="sm" placeholder="Pequeno (sm)" />
			<Input size="middle" placeholder="Médio (middle)" />
			<Input size="large" placeholder="Grande (large)" />
		</div>
	),
};

export const Status: Story = {
	render: () => (
		<div className="w-full max-w-sm space-y-4">
			<Input status="default" placeholder="Estado normal" />
			<Input status="error" placeholder="Estado de erro" defaultValue="Valor inválido" />
			<Input status="warning" placeholder="Estado de aviso" defaultValue="Revisar valor" />
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="w-full max-w-sm">
			<Input disabled placeholder="Campo desativado" defaultValue="Só leitura" />
		</div>
	),
};

/** Input genérico type="password" com PasswordStrength: o mesmo Input usado em formulários de senha. */
export const WithPasswordStrength: Story = {
	render: function WithPasswordStrengthRender() {
		const [password, setPassword] = useState("");
		return (
			<div className="w-full max-w-sm space-y-2">
				<label className="text-sm font-medium" htmlFor="password-demo">
					Senha
				</label>
				<Input
					id="password-demo"
					type="password"
					placeholder="Introduza a senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					allowClear
					aria-label="Campo de senha"
				/>
				<PasswordStrength password={password} />
			</div>
		);
	},
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Input (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Input</strong> é o campo de texto base do design system. Suporta
								prefix e suffix (ícones ou conteúdo), botão de limpar (allowClear), contagem
								de caracteres (showCount), tamanhos (sm, middle, large) e estados de validação
								(status: error, warning). A estrutura semântica inclui: root, prefix, input,
								suffix e count, permitindo personalização via classNames.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props principais)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>prefix</code> / <code>suffix</code> — ReactNode para conteúdo à esquerda/direita.</li>
								<li><code>allowClear</code> — Mostra botão de limpar quando há valor; use <code>onClear</code> para callback.</li>
								<li><code>showCount</code> — Exibe contagem de caracteres (com <code>maxLength</code> opcional).</li>
								<li><code>size</code> — sm | middle | large.</li>
								<li><code>status</code> — default | error | warning (estado de validação).</li>
								<li><code>disabled</code> — Desativa o input.</li>
								<li><code>onPressEnter</code> — Callback quando Enter é pressionado.</li>
								<li><code>classNames</code> — Objeto com root, prefix, input, suffix, count para estilização por slot.</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Formulários de login, pesquisa, perfis e qualquer campo de texto. O componente
								<strong> PasswordStrength</strong> pode ser usado em conjunto com um Input
								type="password" para mostrar a força da senha em tempo real.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Input com label, prefix, clear e contagem">
					<p className="mb-4 text-sm text-muted-foreground">
						Campo com label acessível, ícone de utilizador, botão limpar e contagem até 50 caracteres.
					</p>
					<div className="w-full max-w-sm space-y-2">
						<Label htmlFor="input-overview-username">Nome de utilizador</Label>
						<Input
							id="input-overview-username"
							placeholder="Digite o nome"
							prefix={<User className="size-4 text-muted-foreground" aria-hidden />}
							allowClear
							showCount
							maxLength={50}
							defaultValue=""
						/>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Semantic DOM">
				<StoryCard title="Exemplo completo [elements]">
					<p className="mb-4 text-sm text-muted-foreground">
						Passe o rato numa linha do painel ou numa zona do exemplo para destacar.
					</p>
					<SemanticDomSection
						rows={[
							{ id: "input-root", label: "root", description: "Input — container" },
							{ id: "input-label", label: "label", description: "Label associado" },
							{ id: "input-prefix", label: "prefix", description: "Conteúdo à esquerda" },
							{ id: "input-input", label: "input", description: "Campo de texto" },
							{ id: "input-suffix", label: "suffix", description: "Conteúdo à direita" },
							{ id: "input-clear", label: "clearButton", description: "Botão limpar" },
							{ id: "input-hint", label: "hint", description: "Texto de ajuda" },
						]}
						renderExample={(wrap) => <InputSemanticExample wrap={wrap} />}
					/>
				</StoryCard>
			</StorySection>
		</div>
	),
};
