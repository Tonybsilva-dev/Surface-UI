import type { Meta, StoryObj } from "@storybook/react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { List } from "@surface/ui/list";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";
import { Avatar } from "@surface/ui/avatar";
import { Icon } from "@surface/ui/icon";
import { StoryCard, StorySection, SemanticDomSection } from "../foundation/shared";

const meta: Meta<typeof List> = {
	title: "Components/Molecules/List",
	component: List,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Lista de itens por composição. List + header/footer, List.Item, List.Item.Meta (avatar, title, description), extra e actions. Suporta bordered, split, itemLayout (horizontal | vertical), loading.",
			},
		},
	},
	argTypes: {
		bordered: {
			description: "Borda à volta da lista.",
			control: "boolean",
			table: { type: { summary: "boolean" } },
		},
		split: {
			description: "Divisor entre itens.",
			control: "boolean",
			table: { type: { summary: "boolean" } },
		},
		itemLayout: {
			description: "Layout: horizontal (meta e extra lado a lado) ou vertical.",
			control: "select",
			options: ["horizontal", "vertical"],
			table: { type: { summary: "horizontal | vertical" } },
		},
		size: {
			description: "Tamanho dos itens.",
			control: "select",
			options: ["default", "small", "large"],
			table: { type: { summary: "default | small | large" } },
		},
		loading: {
			description: "Estado de carregamento (esqueletos).",
			control: "boolean",
			table: { type: { summary: "boolean" } },
		},
	},
	args: {
		bordered: true,
		split: true,
		itemLayout: "horizontal",
		size: "default",
		loading: false,
	},
};

export default meta;

type Story = StoryObj<typeof List>;

/** Lista simples com três itens. */
export const Default: Story = {
	render: (args) => (
		<div className="w-full max-w-md">
			<List {...args}>
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar initials="JD" size="md" />}
						title="João Silva"
						description="Designer · Lisboa"
					/>
				</List.Item>
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar initials="MS" size="md" />}
						title="Maria Santos"
						description="Desenvolvedora · Porto"
					/>
				</List.Item>
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar initials="AP" size="md" />}
						title="António Pereira"
						description="Product owner · Coimbra"
					/>
				</List.Item>
			</List>
		</div>
	),
};

/** Com header, footer, vários itens, extra e actions. Controles: split, itemLayout. */
export const WithHeaderFooterAndActions: Story = {
	render: (args) => (
		<div className="w-full max-w-xl">
			<List
				{...args}
				header={<Text variant="titleSmall">Equipa</Text>}
				footer={
					<Text variant="bodySmall" tone="muted">
						Mostrando 3 membros
					</Text>
				}
			>
				<List.Item
					extra={
						<img
							src="https://placehold.co/120x80?text=Preview"
							alt=""
							className="h-20 w-24 rounded-md object-cover"
						/>
					}
					actions={[
						<Button key="1" variant="ghost" size="sm" className="h-8 gap-1">
							<Icon><Star className="size-4" aria-hidden /></Icon>
							156
						</Button>,
						<Button key="2" variant="ghost" size="sm" className="h-8 gap-1">
							<Icon><ThumbsUp className="size-4" aria-hidden /></Icon>
							156
						</Button>,
						<Button key="3" variant="ghost" size="sm" className="h-8 gap-1">
							<Icon><MessageCircle className="size-4" aria-hidden /></Icon>
							2
						</Button>,
					]}
				>
					<List.Item.Meta
						avatar={<Avatar initials="DS" size="lg" />}
						title="Design system part 0"
						description="Linguagem de design para aplicações. Inclui princípios, padrões e recursos (Sketch, Axure) para protótipos de qualidade."
					/>
				</List.Item>
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar initials="MS" size="md" />}
						title="Maria Santos"
						description="Desenvolvedora · Porto"
					/>
				</List.Item>
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar initials="AP" size="md" />}
						title="António Pereira"
						description="Product owner · Coimbra"
					/>
				</List.Item>
			</List>
		</div>
	),
};

/** Layout vertical: meta em cima, extra e actions em baixo. Controles: split, itemLayout. */
export const ItemLayoutVertical: Story = {
	args: { itemLayout: "vertical", split: true },
	render: (args) => (
		<div className="w-full max-w-xl">
			<List {...args} header={<Text variant="titleSmall">Item vertical</Text>}>
				<List.Item
					extra={
						<img
							src="https://placehold.co/120x80?text=Imagem"
							alt=""
							className="w-full max-w-[120px] rounded-md object-cover"
						/>
					}
					actions={[
						<Button key="1" variant="outline" size="sm">Ver</Button>,
						<Button key="2" variant="ghost" size="sm">Editar</Button>,
					]}
				>
					<List.Item.Meta
						avatar={<Avatar initials="AB" size="md" />}
						title="Item em layout vertical"
						description="O meta fica em cima; extra e actions aparecem em baixo com separador."
					/>
				</List.Item>
			</List>
		</div>
	),
};

/** Estado de carregamento. */
export const Loading: Story = {
	args: { loading: true },
	render: (args) => (
		<div className="w-full max-w-md">
			<List {...args}>
				{[]}
			</List>
		</div>
	),
};

// ——— Semantic DOM (Overview): usa SemanticDomSection partilhado ———
const LIST_ACTIONS = [
	{ IconEl: Star, label: "156", name: "Star" },
	{ IconEl: ThumbsUp, label: "156", name: "ThumbsUp" },
	{ IconEl: MessageCircle, label: "2", name: "MessageCircle" },
];

const LIST_SEMANTIC_ROWS = [
	{ id: "list-item-extra", label: "extra", description: "set `extra` of List.Item" },
	{
		id: "list-item-actions",
		label: "actions",
		description: "set `actions` of List.Item",
		expandWhenHovered: (
			<>
				<Text variant="labelSmall" tone="muted" as="p" className="mb-1 m-0">
					Actions presentes na lista:
				</Text>
				<ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5 m-0">
					{LIST_ACTIONS.map((a) => (
						<li key={a.label}>
							{a.name} {a.label}
						</li>
					))}
				</ul>
			</>
		),
	},
];

function ListSemanticDomExample() {
	return (
		<SemanticDomSection
			rows={LIST_SEMANTIC_ROWS}
			renderExample={(wrap) => (
				<List
					bordered={false}
					split
					itemLayout="vertical"
					size="large"
					header={<Text variant="titleSmall">Semantic DOM</Text>}
				>
					<List.Item
						extra={wrap(
							"list-item-extra",
							<img
								src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
								alt=""
								className="max-w-[272px] w-full h-auto rounded-md object-cover"
							/>,
							"semantic-mark-extra",
						)}
						actions={[
							wrap(
								"list-item-actions",
								<span className="flex gap-2 semantic-mark-actions">
									{LIST_ACTIONS.map((a) => (
										<Button
											key={a.label}
											variant="ghost"
											size="sm"
											className="h-8 gap-1"
										>
											<Icon><a.IconEl className="size-4" aria-hidden /></Icon>
											{a.label}
										</Button>
									))}
								</span>,
								"semantic-mark-actions",
							),
						]}
					>
						<List.Item.Meta
							avatar={<Avatar initials="AD" size="lg" />}
							title="Design system part 0"
							description={
								<>
									Linguagem de design para aplicações. Princípios, padrões e recursos (Sketch, Axure) para protótipos de qualidade.
								</>
							}
						/>
					</List.Item>
				</List>
			)}
		/>
	);
}

export const Overview: Story = {
	render: () => (
		<>
			<StorySection title="List (overview)">
				<StoryCard title="Explicação de uso">
					<p className="text-sm text-muted-foreground mb-3">
						O <strong>List</strong> é um componente de lista por composição. Use{" "}
						<code>List</code> como contentor, com <code>header</code> e{" "}
						<code>footer</code> opcionais. Cada entrada é um{" "}
						<code>List.Item</code>, que pode conter:
					</p>
					<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mb-3">
						<li>
							<code>List.Item.Meta</code> — avatar, title e description (tipografia
							via átomo Text);
						</li>
						<li>
							<code>extra</code> — conteúdo à direita (ex.: imagem, badge);
						</li>
						<li>
							<code>actions</code> — array de nós (ex.: botões); em layout
							vertical ficam em baixo com separador.
						</li>
					</ul>
					<p className="text-sm text-muted-foreground">
						Propriedades do contentor: <code>bordered</code>, <code>split</code>{" "}
						(divisor entre itens), <code>itemLayout</code> (horizontal | vertical),{" "}
						<code>size</code>, <code>loading</code> (esqueletos).
					</p>
				</StoryCard>
			</StorySection>
			<StorySection title="Semantic DOM">
				<StoryCard title="Exemplo completo [elements]">
					<p className="text-sm text-muted-foreground mb-4">
						Layout com exemplo à esquerda e painel <strong>[elements]</strong> à
						direita. Passe o rato numa linha do painel ou numa zona do exemplo
						para destacar a correspondência. Ao passar por cima de{" "}
						<strong>actions</strong>, o painel mostra todas as actions presentes
						na lista.
					</p>
					<ListSemanticDomExample />
				</StoryCard>
			</StorySection>
		</>
	),
};
