import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@surface/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Collapsible> = {
	title: "Components/Molecules/Collapsible",
	component: Collapsible,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Secção expansível/retrátil (Radix Collapsible). Usa tokens de borda, motion e focus. Collapsible + CollapsibleTrigger + CollapsibleContent. Controles: defaultOpen, disabled, bordered, headerLabel, bodyText, showArrow.",
			},
		},
	},
	argTypes: {
		defaultOpen: {
			description: "Se true, o painel começa aberto.",
			control: "boolean",
			table: { category: "Estado", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		disabled: {
			description: "Desativa o colapsável (trigger não responde).",
			control: "boolean",
			table: { category: "Estado", type: { summary: "boolean" }, defaultValue: { summary: "false" } },
		},
		bordered: {
			description: "Mostrar borda à volta do bloco.",
			control: "boolean",
			table: { category: "Aparência", type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		headerLabel: {
			description: "Título do painel (texto do trigger).",
			control: "text",
			table: { category: "Conteúdo", type: { summary: "string" } },
		},
		bodyText: {
			description: "Conteúdo do corpo do painel.",
			control: "text",
			table: { category: "Conteúdo", type: { summary: "string" } },
		},
		showArrow: {
			description: "Mostrar ícone de seta no trigger (expandir/recolher).",
			control: "boolean",
			table: { category: "Aparência", type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		className: {
			description: "Classes CSS do root.",
			control: "text",
			table: { category: "Root", type: { summary: "string" } },
		},
	},
	args: {
		defaultOpen: false,
		disabled: false,
		bordered: true,
		headerLabel: "Ver mais detalhes",
		bodyText:
			"Conteúdo que aparece ao expandir. Pode incluir texto, listas ou formulários. A transição usa duration-medium e ease-standard das foundations.",
		showArrow: true,
		className: "",
	},
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
	render: (args) => (
		<Collapsible
			defaultOpen={args.defaultOpen}
			bordered={args.bordered}
			className={`w-full max-w-[360px] ${args.className ?? ""}`.trim()}
		>
			<CollapsibleTrigger disabled={args.disabled}>
				<Text variant="bodyMedium">{args.headerLabel}</Text>
				{args.showArrow ? (
					<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
				) : null}
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="px-3 pb-3 pt-0">
					<Text variant="bodySmall" tone="muted" as="p">
						{args.bodyText}
					</Text>
				</div>
			</CollapsibleContent>
		</Collapsible>
	),
};

export const OpenByDefault: Story = {
	render: () => (
		<Collapsible defaultOpen className="w-full max-w-[360px]">
			<CollapsibleTrigger>
				<Text variant="bodyMedium">Secção aberta por defeito</Text>
				<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="px-3 pb-3 pt-0">
					<Text variant="bodySmall" tone="muted" as="p">
						Este bloco começa expandido. Útil para FAQ ou definições onde a
						primeira secção deve estar visível.
					</Text>
				</div>
			</CollapsibleContent>
		</Collapsible>
	),
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Collapsible (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Collapsible</strong> é uma secção que expande e recolhe
								ao clicar no trigger. Baseado em Radix Collapsible. Usa tokens de
								borda (border), motion (duration-short, duration-medium,
								ease-standard) e focus (ring, ring-offset).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								<strong>Collapsible</strong> (root, open, onOpenChange,
								defaultOpen) + <strong>CollapsibleTrigger</strong> (botão que
								alterna) + <strong>CollapsibleContent</strong> (conteúdo que
								aparece/desaparece). Adicione um ícone (ex.: ChevronDown) ao
								trigger e rode-o quando aberto com [&[data-state=open]{'>'}svg]:rotate-180.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								FAQ, definições avançadas, filtros expandíveis e qualquer
								conteúdo que se queira mostrar/ocultar sem sair da página.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Collapsible: FAQ com duas perguntas">
					<p className="mb-4 text-sm text-muted-foreground">
						Duas secções expansíveis com pergunta no trigger e resposta no
						content.
					</p>
					<div className="flex flex-col gap-2 max-w-[400px]">
						<Collapsible>
							<CollapsibleTrigger>
								<Text variant="bodyMedium">Como altero a minha palavra-passe?</Text>
								<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
							</CollapsibleTrigger>
							<CollapsibleContent>
								<div className="px-3 pb-3 pt-0">
									<Text variant="bodySmall" tone="muted" as="p">
										Em Definições → Segurança pode definir uma nova
										palavra-passe. Será enviado um email de confirmação.
									</Text>
								</div>
							</CollapsibleContent>
						</Collapsible>
						<Collapsible>
							<CollapsibleTrigger>
								<Text variant="bodyMedium">Posso desativar notificações?</Text>
								<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
							</CollapsibleTrigger>
							<CollapsibleContent>
								<div className="px-3 pb-3 pt-0">
									<Text variant="bodySmall" tone="muted" as="p">
										Sim. Em Definições → Notificações pode escolher por canal
										(email, push) e desativar por completo.
									</Text>
								</div>
							</CollapsibleContent>
						</Collapsible>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
