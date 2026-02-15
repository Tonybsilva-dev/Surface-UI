import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "@surface/ui/drawer";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

type DrawerDirection = "top" | "bottom" | "left" | "right";

const meta: Meta<typeof Drawer> = {
	title: "Components/Molecules/Drawer",
	component: Drawer,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Painel deslizante (vaul) por composição. Drawer.Root + Trigger, Content (inclui Portal e Overlay), Header, Footer, Title, Description, Close. Direções: top, bottom, left, right.",
			},
		},
	},
	argTypes: {
		direction: {
			description: "Lado do ecrã de onde o drawer desliza.",
			control: "radio",
			options: ["top", "bottom", "left", "right"] as DrawerDirection[],
			table: { type: { summary: "top | bottom | left | right" } },
		},
		title: {
			description: "Título do drawer (Drawer.Title).",
			control: "text",
			table: { type: { summary: "string" } },
		},
		description: {
			description: "Descrição opcional (Drawer.Description).",
			control: "text",
			table: { type: { summary: "string" } },
		},
	},
	args: {
		direction: "bottom",
		title: "Título do drawer",
		description: "Descrição ou instruções para o utilizador.",
	},
};

export default meta;

type Story = StoryObj<typeof Drawer>;

/** Drawer a partir de baixo com Header, Content, Footer e Close. Controles para direção, título e descrição. */
export const Default: Story = {
	render: function DefaultRender(args) {
		const [open, setOpen] = useState(false);
		return (
			<div className="p-8">
				<Button onClick={() => setOpen(true)}>Abrir drawer</Button>
				<Drawer
					open={open}
					onOpenChange={setOpen}
					direction={args.direction as DrawerDirection}
				>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>{args.title}</Drawer.Title>
							{args.description ? (
								<Drawer.Description>{args.description}</Drawer.Description>
							) : null}
						</Drawer.Header>
						<div className="p-4 pt-0">
							<Text variant="bodySmall" tone="muted" as="p">
								Conteúdo principal. Use Drawer.Header, Drawer.Title,
								Drawer.Description, Drawer.Footer e Drawer.Close para
								composição.
							</Text>
						</div>
						<Drawer.Footer>
							<Drawer.Close asChild>
								<Button variant="outline" size="sm">
									Cancelar
								</Button>
							</Drawer.Close>
							<Button size="sm">Guardar</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer>
			</div>
		);
	},
};

/** Drawer com trigger nativo (Drawer.Trigger). */
export const WithTrigger: Story = {
	render: function WithTriggerRender(args) {
		return (
			<div className="p-8">
				<Drawer direction={args.direction as DrawerDirection}>
					<Drawer.Trigger asChild>
						<Button>Abrir com Trigger</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>{args.title}</Drawer.Title>
							<Drawer.Description>{args.description}</Drawer.Description>
						</Drawer.Header>
						<div className="p-4 pt-0">
							<Text variant="bodySmall" tone="muted" as="p">
								O Drawer.Trigger abre o drawer ao clicar. Útil para menus ou
								painéis laterais.
							</Text>
						</div>
						<Drawer.Footer>
							<Drawer.Close asChild>
								<Button size="sm">Fechar</Button>
							</Drawer.Close>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer>
			</div>
		);
	},
};

/** Drawer da direita: painel lateral. */
export const FromRight: Story = {
	render: function FromRightRender() {
		const [open, setOpen] = useState(false);
		return (
			<div className="p-8">
				<Button onClick={() => setOpen(true)}>Abrir painel</Button>
				<Drawer open={open} onOpenChange={setOpen} direction="right">
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Painel lateral</Drawer.Title>
							<Drawer.Description>
								Conteúdo secundário ou navegação.
							</Drawer.Description>
						</Drawer.Header>
						<div className="p-4 pt-0">
							<Text variant="bodySmall" tone="muted" as="p">
								Direção <strong>right</strong>: ideal para filtros, carrinho ou
								menu de conta.
							</Text>
						</div>
						<Drawer.Footer>
							<Drawer.Close asChild>
								<Button size="sm">Fechar</Button>
							</Drawer.Close>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer>
			</div>
		);
	},
};

function DrawerCartDemo() {
	const [open, setOpen] = useState(false);
	const items = [
		{ name: "T-shirt básica", qty: 1, price: 24.9 },
		{ name: "Calças jeans", qty: 1, price: 59.9 },
		{ name: "Sapatilhas", qty: 2, price: 79.9 },
	];
	const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);
	return (
		<div className="p-8">
			<Button onClick={() => setOpen(true)}>Ver carrinho (3)</Button>
			<Drawer open={open} onOpenChange={setOpen} direction="right">
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Carrinho</Drawer.Title>
						<Drawer.Description>
							{items.length} artigo(s) no carrinho.
						</Drawer.Description>
					</Drawer.Header>
					<div className="p-4 pt-0 space-y-3">
						{items.map((item) => (
							<div
								key={item.name}
								className="flex justify-between text-sm"
							>
								<span>
									{item.name} × {item.qty}
								</span>
								<span>{(item.qty * item.price).toFixed(2)} €</span>
							</div>
						))}
						<div className="border-t pt-3 mt-3 flex justify-between font-medium">
							<span>Total</span>
							<span>{total.toFixed(2)} €</span>
						</div>
					</div>
					<Drawer.Footer>
						<Drawer.Close asChild>
							<Button variant="outline" size="sm">
								Fechar
							</Button>
						</Drawer.Close>
						<Button size="sm">Checkout</Button>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer>
		</div>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Drawer (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Drawer</strong> é um painel deslizante (vaul) que entra
								do topo, baixo, esquerda ou direita. Inclui Portal e Overlay.
								Composição: Root, Trigger, Content, Header, Footer, Title,
								Description, Close.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								<strong>Drawer</strong> (open, onOpenChange, direction),{" "}
								<strong>Drawer.Content</strong>, <strong>Drawer.Header</strong>,{" "}
								<strong>Drawer.Title</strong>, <strong>Drawer.Description</strong>
								, corpo (conteúdo), <strong>Drawer.Footer</strong>,{" "}
								<strong>Drawer.Close</strong>. direction: top, bottom, left,
								right.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Carrinho de compras, filtros (categoria, preço), menu de conta,
								configurações secundárias e qualquer conteúdo que não precise de
								um modal central.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Drawer: Carrinho (itens, total, Fechar/Checkout)">
					<p className="mb-4 text-sm text-muted-foreground">
						Carrinho com 3 itens, totais e botões Fechar e Checkout. O drawer
						abre da direita.
					</p>
					<DrawerCartDemo />
				</StoryCard>
			</StorySection>
		</div>
	),
};
