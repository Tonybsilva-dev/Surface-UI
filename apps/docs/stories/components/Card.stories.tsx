import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@surface/ui/card";
import type { CardVariant } from "@surface/ui/card";
import { Button } from "@surface/ui/button";
import { Badge } from "@surface/ui/badge";
import { Text } from "@surface/ui/text";
import { Avatar } from "@surface/ui/avatar";
import { Divider } from "@surface/ui/divider";
import { Progress } from "@surface/ui/progress";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const wrapperClass = "p-8 max-w-[360px]";

const meta: Meta<typeof Card> = {
	title: "Components/Atoms/Card",
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
		<div className="p-8">
			<StorySection title="Card (overview)">
				<TwoColumn
					left={
						<StoryCard title="Guidelines">
							<p style={{ margin: "0 0 12px", fontSize: 14 }}>
								Containment: agrupa conteúdo. elevated (sombra), outlined
								(borda), filled (fundo). componentShapeTokens.card,
								elevationTokens, spacingTokens. Use Card.Header, Card.Content e
								Card.Footer para composição. Combine com Text, Button, Badge,
								Avatar, Divider e Progress para layouts ricos.
							</p>
						</StoryCard>
					}
					right={
						<StoryCard title="Exemplo">
							<Card variant="elevated">
								<Card.Header>
									<Card.Title>
										<Text variant="titleSmall">Título</Text>
									</Card.Title>
									<Card.Description>
										<Text variant="bodySmall" tone="muted">
											Descrição ou conteúdo secundário.
										</Text>
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<Text variant="bodySmall" tone="muted" as="p">
										Conteúdo principal.
									</Text>
								</Card.Content>
								<Card.Footer>
									<Button variant="outline" size="sm">
										Acção 1
									</Button>
									<Button size="sm">Acção 2</Button>
								</Card.Footer>
							</Card>
						</StoryCard>
					}
				/>
			</StorySection>
		</div>
	),
};
