import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Input } from "@surface/ui/input";
import type { InputSize, InputStatus } from "@surface/ui/input";
import { PasswordStrength } from "@surface/ui/password-strength";
import { User, Search } from "lucide-react";
import { StoryCard, StorySection } from "../foundation/shared";

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
	},
};

export default meta;

/** Args da story Default (inclui showPrefix/showSuffix que não são props do Input). */
type InputStoryArgs = ComponentProps<typeof Input> & {
	showPrefix?: boolean;
	showSuffix?: boolean;
};

type Story = StoryObj<typeof Input>;

function InputDefaultWithArgs() {
	const [args] = useArgs<InputStoryArgs>();
	const [value, setValue] = useState("");
	// #region agent log
	fetch("http://127.0.0.1:7248/ingest/3b8749ae-5c40-432a-b513-6e65887ca92d", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "Input.stories.tsx:Default render (useArgs)",
			message: "Story render args from useArgs",
			data: {
				resolved: {
					size: args?.size,
					status: args?.status,
					allowClear: args?.allowClear,
					showCount: args?.showCount,
					showPrefix: args?.showPrefix,
					showSuffix: args?.showSuffix,
				},
				runId: "post-fix",
			},
			timestamp: Date.now(),
			hypothesisId: "D_fix",
		}),
	}).catch(() => {});
	// #endregion
	const prefix = args?.showPrefix === true ? <User className="size-4" aria-hidden /> : undefined;
	const suffix = args?.showSuffix === true ? <Search className="size-4" aria-hidden /> : undefined;
	return (
		<div className="w-full max-w-sm">
			<Input
				placeholder={args?.placeholder ?? "Digite aqui…"}
				disabled={args?.disabled === true}
				size={args?.size ?? "middle"}
				status={args?.status ?? "default"}
				allowClear={args?.allowClear === true}
				showCount={args?.showCount === true}
				maxLength={args?.maxLength}
				prefix={prefix}
				suffix={suffix}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onClear={() => setValue("")}
			/>
		</div>
	);
}

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
	} as InputStoryArgs,
	render: () => <InputDefaultWithArgs />,
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
				<StoryCard title="Input com prefix, clear e contagem">
					<p className="mb-4 text-sm text-muted-foreground">
						Campo controlado com ícone de utilizador, botão limpar e contagem até 50 caracteres.
					</p>
					<div className="w-full max-w-sm">
						<Input
							placeholder="Nome de utilizador"
							prefix={<User className="size-4 text-muted-foreground" aria-hidden />}
							allowClear
							showCount
							maxLength={50}
							defaultValue=""
						/>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
