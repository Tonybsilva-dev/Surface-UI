import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "@surface/ui/drawer";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";

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
