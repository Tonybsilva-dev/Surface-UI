import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "@surface/ui/empty";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";
import { Inbox } from "lucide-react";
import { StoryCard, StorySection } from "../foundation/shared";

const wrapperClass = "min-h-[280px] w-full max-w-md";

const meta: Meta<typeof Empty> = {
	title: "Components/Atoms/Empty",
	component: Empty,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Estado vazio por composição. Use Empty.Header, Empty.Media, Empty.Title, Empty.Description e Empty.Content. Empty.Media tem variante default ou icon.",
			},
		},
	},
	argTypes: {
		className: { control: "text", table: { type: { summary: "string" } } },
		mediaVariant: {
			description: "Variante de Empty.Media (default = sem caixa, icon = caixa bg-muted).",
			control: "select",
			options: ["default", "icon"],
			table: { type: { summary: "default | icon" }, category: "Composition" },
		},
		titleText: {
			description: "Texto do Empty.Title.",
			control: "text",
			table: { type: { summary: "string" }, category: "Composition" },
		},
		descriptionText: {
			description: "Texto do Empty.Description.",
			control: "text",
			table: { type: { summary: "string" }, category: "Composition" },
		},
		showContent: {
			description: "Mostrar Empty.Content com botão de ação.",
			control: "boolean",
			table: { type: { summary: "boolean" }, category: "Composition" },
		},
		primaryActionLabel: {
			description: "Rótulo do botão primário em Empty.Content.",
			control: "text",
			table: { type: { summary: "string" }, category: "Composition" },
		},
	},
	args: {
		mediaVariant: "icon",
		titleText: "Nenhum item",
		descriptionText:
			"Não há dados para mostrar. Adicione conteúdo ou filtre de outra forma.",
		showContent: false,
		primaryActionLabel: "Criar item",
	},
};

export default meta;

type Story = StoryObj<typeof Empty>;

/** Empty básico: ícone, título e descrição. Controles: mediaVariant, titleText, descriptionText, showContent, primaryActionLabel. */
export const Default: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Empty className={args.className}>
				<Empty.Header>
					<Empty.Media variant={args.mediaVariant}>
						<Inbox className="size-6" aria-hidden />
					</Empty.Media>
					<Empty.Title>
						<Text variant="titleMedium">{args.titleText}</Text>
					</Empty.Title>
					<Empty.Description>
						<Text variant="bodySmall" tone="muted" as="p">
							{args.descriptionText}
						</Text>
					</Empty.Description>
				</Empty.Header>
				{args.showContent ? (
					<Empty.Content>
						<Button size="sm">{args.primaryActionLabel}</Button>
					</Empty.Content>
				) : null}
			</Empty>
		</div>
	),
};

/** Empty.Media variante default (sem caixa) vs icon (caixa bg-muted). */
export const MediaVariants: Story = {
	render: () => (
		<div className={`${wrapperClass} flex flex-col gap-8`}>
			<Empty>
				<Empty.Header>
					<Empty.Media variant="default">
						<Inbox className="size-6" aria-hidden />
					</Empty.Media>
					<Empty.Title>
						<Text variant="titleMedium">Variante default</Text>
					</Empty.Title>
					<Empty.Description>
						<Text variant="bodySmall" tone="muted" as="p">
							Media sem caixa (transparente).
						</Text>
					</Empty.Description>
				</Empty.Header>
			</Empty>
			<Empty>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Inbox className="size-6" aria-hidden />
					</Empty.Media>
					<Empty.Title>
						<Text variant="titleMedium">Variante icon</Text>
					</Empty.Title>
					<Empty.Description>
						<Text variant="bodySmall" tone="muted" as="p">
							Ícone em caixa arredondada (bg-muted).
						</Text>
					</Empty.Description>
				</Empty.Header>
			</Empty>
		</div>
	),
};

/** Composição completa com Empty.Content e ações (Button). */
export const WithActions: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Empty className={args.className}>
				<Empty.Header>
					<Empty.Media variant="icon">
						<Inbox className="size-6" aria-hidden />
					</Empty.Media>
					<Empty.Title>
						<Text variant="titleMedium">Lista vazia</Text>
					</Empty.Title>
					<Empty.Description>
						<Text variant="bodySmall" tone="muted" as="p">
							Crie o primeiro item para começar.
						</Text>
					</Empty.Description>
				</Empty.Header>
				<Empty.Content>
					<Button size="sm">Criar item</Button>
				</Empty.Content>
			</Empty>
		</div>
	),
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Empty (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Empty</strong> é um átomo que representa estado vazio por
								composição (listas vazias, sem resultados, onboarding). Usa
								data-slot para testes e CSS. Combine com Text e Button para
								ações primárias ou secundárias.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								Composição: <strong>Empty</strong> (root), <strong>Empty.Header</strong>,{" "}
								<strong>Empty.Media</strong> (variant default | icon),{" "}
								<strong>Empty.Title</strong>, <strong>Empty.Description</strong>,{" "}
								<strong>Empty.Content</strong>. Monte o estado vazio com ícone ou
								ilustração, título, descrição e opcionalmente botões de ação.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>Empty</code> — aceita className e children.
								</li>
								<li>
									<code>Empty.Media</code> — variant default (transparente) ou icon
									(caixa bg-muted).
								</li>
								<li>
									Subcomponentes aceitam className e props HTML.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Empty é usado em tabelas sem dados, listas vazias, resultados de
								pesquisa vazios e fluxos de onboarding (ex.: “Crie o primeiro
								item”).
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Empty: Media default e icon, Title, Description, Content com ações">
					<p className="mb-4 text-sm text-muted-foreground">
						Dois exemplos: um com Media variant icon e uma ação; outro com Media
						default e duas ações (primária e secundária).
					</p>
					<div className="flex flex-col gap-8">
						<div className={wrapperClass}>
							<Empty>
								<Empty.Header>
									<Empty.Media variant="icon">
										<Inbox className="size-6" aria-hidden />
									</Empty.Media>
									<Empty.Title>
										<Text variant="titleMedium">Nenhum resultado</Text>
									</Empty.Title>
									<Empty.Description>
										<Text variant="bodySmall" tone="muted" as="p">
											Tente outro filtro ou adicione dados.
										</Text>
									</Empty.Description>
								</Empty.Header>
								<Empty.Content>
									<Button variant="outline" size="sm">
										Limpar filtros
									</Button>
								</Empty.Content>
							</Empty>
						</div>
						<div className={wrapperClass}>
							<Empty>
								<Empty.Header>
									<Empty.Media variant="default">
										<Inbox className="size-6" aria-hidden />
									</Empty.Media>
									<Empty.Title>
										<Text variant="titleMedium">Lista vazia</Text>
									</Empty.Title>
									<Empty.Description>
										<Text variant="bodySmall" tone="muted" as="p">
											Crie o primeiro item para começar.
										</Text>
									</Empty.Description>
								</Empty.Header>
								<Empty.Content className="flex gap-2 justify-center">
									<Button size="sm">Criar item</Button>
									<Button variant="outline" size="sm">
										Importar
									</Button>
								</Empty.Content>
							</Empty>
						</div>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
