import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@surface/ui/card";
import type { CardVariant } from "@surface/ui/card";
import { Button } from "@surface/ui/button";
import { Badge } from "@surface/ui/badge";
import { Text } from "@surface/ui/text";
import { Avatar } from "@surface/ui/avatar";
import { Divider } from "@surface/ui/divider";
import { Progress } from "@surface/ui/progress";
import { StoryCard, StorySection } from "../foundation/shared";

const wrapperClass = "p-8 max-w-[360px]";

const meta: Meta<typeof Card> = {
	title: "Components/Molecules/Card",
	component: Card,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Container de conteúdo. Variantes: elevated (sombra), outlined (borda), filled (fundo). Tokens: elevation, shape, spacing.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["elevated", "outlined", "filled"] as CardVariant[],
			table: { type: { summary: "CardVariant" }, defaultValue: { summary: "elevated" } },
		},
	},
	args: {
		variant: "elevated",
	},
};

export default meta;

type Story = StoryObj<typeof Card>;

/** Card básico com conteúdo simples. */
export const Default: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Card {...args}>
				<Card.Content className="pt-6">
					<Text variant="bodyMedium" tone="muted">
						Conteúdo do card. Use para agrupar texto, listas ou ações.
					</Text>
				</Card.Content>
			</Card>
		</div>
	),
	args: { variant: "elevated" },
};

/** Comparação das três variantes visuais. */
export const Variants: Story = {
	render: () => (
		<div className={`${wrapperClass} flex flex-col gap-6`}>
			<Card variant="elevated">
				<Card.Header>
					<Card.Title>
						<Text variant="titleSmall">Elevated</Text>
					</Card.Title>
					<Card.Description>
						<Text variant="bodySmall" tone="muted">
							Sombra suave (elevation level1).
						</Text>
					</Card.Description>
				</Card.Header>
			</Card>
			<Card variant="outlined">
				<Card.Header>
					<Card.Title>
						<Text variant="titleSmall">Outlined</Text>
					</Card.Title>
					<Card.Description>
						<Text variant="bodySmall" tone="muted">
							Apenas borda.
						</Text>
					</Card.Description>
				</Card.Header>
			</Card>
			<Card variant="filled">
				<Card.Header>
					<Card.Title>
						<Text variant="titleSmall">Filled</Text>
					</Card.Title>
					<Card.Description>
						<Text variant="bodySmall" tone="muted">
							Fundo surfaceVariant.
						</Text>
					</Card.Description>
				</Card.Header>
			</Card>
		</div>
	),
};

/** Composição com Header, Content, Footer e botões do design system. */
export const Composition: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Card {...args}>
				<Card.Header>
					<Card.Title>
						<Text variant="titleSmall">Título do card</Text>
					</Card.Title>
					<Card.Description>
						<Text variant="bodySmall" tone="muted">
							Conteúdo principal com Card.Header, Card.Content e Card.Footer.
						</Text>
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Text variant="bodyMedium" tone="muted" as="p">
						Descrição ou conteúdo secundário. Use os átomos Text, Button e Badge
						para manter consistência.
					</Text>
				</Card.Content>
				<Card.Footer>
					<Button variant="outline" size="sm">
						Cancelar
					</Button>
					<Button size="sm">Confirmar</Button>
				</Card.Footer>
			</Card>
		</div>
	),
	args: { variant: "elevated" },
};

/** Card de perfil/utilizador: Avatar, Text, Badge e ações. */
export const ProfileCard: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Card {...args}>
				<Card.Header className="flex flex-row items-start gap-4">
					<Avatar initials="Maria Silva" size="lg" />
					<div className="min-w-0 flex-1 space-y-1">
						<Card.Title>
							<Text variant="titleMedium">Maria Silva</Text>
						</Card.Title>
						<Card.Description>
							<Text variant="bodySmall" tone="muted">
								Designer · maria@empresa.pt
							</Text>
						</Card.Description>
						<div className="pt-1">
							<Badge variant="secondary" size="sm">
								Pro
							</Badge>
						</div>
					</div>
				</Card.Header>
				<Card.Content>
					<Text variant="bodySmall" tone="muted" as="p">
						Perfil construído com Avatar, Text, Badge e Card por composição.
					</Text>
				</Card.Content>
				<Card.Footer>
					<Button variant="ghost" size="sm">
						Mensagem
					</Button>
					<Button size="sm">Ver perfil</Button>
				</Card.Footer>
			</Card>
		</div>
	),
	args: { variant: "elevated" },
};

/** Card de tarefa/progresso: Text, Progress, Badge de estado e Card.Action. */
export const TaskCard: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Card {...args}>
				<Card.Header className="flex flex-row items-center justify-between gap-2">
					<Card.Title>
						<Text variant="titleSmall">Implementar login</Text>
					</Card.Title>
					<Card.Action>
						<Badge variant="warning" size="sm">
							Em progresso
						</Badge>
					</Card.Action>
				</Card.Header>
				<Card.Content className="space-y-3">
					<Text variant="bodySmall" tone="muted" as="p">
						Integração com Better Auth e página de sign-in.
					</Text>
					<div className="space-y-1">
						<div className="flex justify-between">
							<Text variant="labelSmall" tone="muted">
								Progresso
							</Text>
							<Text variant="labelSmall" tone="muted">
								65%
							</Text>
						</div>
						<Progress percent={65} size="sm" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button variant="ghost" size="sm">
						Pausar
					</Button>
					<Button size="sm">Continuar</Button>
				</Card.Footer>
			</Card>
		</div>
	),
	args: { variant: "outlined" },
};

/** Card com secções separadas por Divider e múltiplos Badges. */
export const WithDividerAndBadges: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Card {...args}>
				<Card.Header>
					<Card.Title>
						<Text variant="titleSmall">Resumo do projeto</Text>
					</Card.Title>
					<Card.Description>
						<Text variant="bodySmall" tone="muted">
							React, TypeScript, Tailwind
						</Text>
					</Card.Description>
				</Card.Header>
				<Card.Content className="space-y-3">
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline">React</Badge>
						<Badge variant="outline">TypeScript</Badge>
						<Badge variant="outline">Tailwind</Badge>
					</div>
					<Divider />
					<Text variant="bodySmall" tone="muted" as="p">
						Stack e estado do projeto. Divider separa blocos; Badges para tags.
					</Text>
				</Card.Content>
				<Card.Footer>
					<Button variant="outline" size="sm">
						Editar
					</Button>
					<Button size="sm">Publicar</Button>
				</Card.Footer>
			</Card>
		</div>
	),
	args: { variant: "elevated" },
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Card (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Card</strong> é um átomo de contenção que agrupa
								conteúdo em blocos visuais. Suporta variantes elevated (sombra +
								borda), outlined (borda) e filled (fundo surfaceVariant). Usa
								tokens de elevação, shape e spacing.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								Composição: <strong>Card</strong> (root), <strong>Card.Header</strong>,{" "}
								<strong>Card.Title</strong>, <strong>Card.Description</strong>,{" "}
								<strong>Card.Content</strong>, <strong>Card.Footer</strong>,{" "}
								<strong>Card.Action</strong>. Monte o layout com estes subcomponentes
								conforme necessário.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>variant</code> — elevated, outlined, filled.
								</li>
								<li>
									<code>className</code> — classes no root. Subcomponentes aceitam
									className e props HTML.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Componentes utilizados</h3>
							<p className="mb-2">
								Combine o Card com <strong>Text</strong>, <strong>Button</strong>,{" "}
								<strong>Badge</strong>, <strong>Avatar</strong>, <strong>Divider</strong> e{" "}
								<strong>Progress</strong> para layouts ricos (perfis, listagens,
								dashboards).
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Card: exemplo complexo com Avatar, Badge, Divider, Progress e múltiplas ações">
					<p className="mb-4 text-sm text-muted-foreground">
						Card elevated com Header (Avatar + título + descrição + Badge), Content
						(parágrafo), Divider, Progress e Footer com vários botões.
					</p>
					<div className="flex flex-wrap gap-6">
						<Card variant="elevated" className="max-w-[360px]">
							<Card.Header>
								<div className="flex items-start gap-3">
									<Avatar
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
										alt="Avatar"
										size="md"
									/>
									<div className="flex-1 min-w-0">
										<Card.Title>
											<Text variant="titleSmall">Maria Silva</Text>
										</Card.Title>
										<Card.Description>
											<Text variant="bodySmall" tone="muted">
												Admin · maria@empresa.pt
											</Text>
										</Card.Description>
										<Badge variant="secondary" size="sm" className="mt-1">
											Ativo
										</Badge>
									</div>
								</div>
							</Card.Header>
							<Card.Content>
								<Text variant="bodySmall" tone="muted" as="p">
									Descrição ou conteúdo principal do card. Pode incluir listas,
									parágrafos ou outros átomos do design system.
								</Text>
								<Divider className="my-3" />
								<Text variant="labelSmall" tone="muted" className="block mb-1">
									Progresso
								</Text>
								<Progress value={65} className="h-2" />
							</Card.Content>
							<Card.Footer className="flex flex-wrap gap-2">
								<Button variant="outline" size="sm">
									Editar
								</Button>
								<Button variant="secondary" size="sm">
									Ver perfil
								</Button>
								<Button size="sm">Guardar</Button>
							</Card.Footer>
						</Card>
						<Card variant="outlined" className="max-w-[360px]">
							<Card.Header>
								<Card.Title>
									<Text variant="titleSmall">Outlined</Text>
								</Card.Title>
								<Card.Description>
									<Text variant="bodySmall" tone="muted">
										Variante apenas com borda, sem sombra.
									</Text>
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Text variant="bodySmall" tone="muted" as="p">
									Conteúdo secundário. Combine com Badge, Divider e Progress.
								</Text>
							</Card.Content>
							<Card.Footer>
								<Button variant="outline" size="sm">
									Acção
								</Button>
							</Card.Footer>
						</Card>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
