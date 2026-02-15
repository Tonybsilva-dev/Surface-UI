import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Command } from "@surface/ui/command";
import { Button } from "@surface/ui/button";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Command> = {
	title: "Components/Molecules/Command",
	component: Command,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Lista filtrável (cmdk) por composição: Command (root) + Input + List + Empty + Group + Item + Separator + Shortcut. Command.Dialog abre o Command dentro de um Dialog (palette).",
			},
		},
	},
	argTypes: {
		placeholder: {
			description: "Placeholder do campo de busca (Command.Input).",
			control: "text",
			table: { type: { summary: "string" }, category: "Input" },
		},
		emptyText: {
			description: "Texto exibido quando não há resultados (Command.Empty).",
			control: "text",
			table: { type: { summary: "string" }, category: "Empty" },
		},
		dialogTitle: {
			description: "Título do Dialog (Command.Dialog).",
			control: "text",
			table: { type: { summary: "string" }, category: "Dialog" },
		},
		dialogDescription: {
			description: "Descrição do Dialog (Command.Dialog).",
			control: "text",
			table: { type: { summary: "string" }, category: "Dialog" },
		},
	},
	args: {
		placeholder: "Buscar comando...",
		emptyText: "Nenhum resultado encontrado.",
		dialogTitle: "Command Palette",
		dialogDescription: "Pesquise um comando para executar...",
	},
};

export default meta;

type Story = StoryObj<typeof Command>;

/** Composição: Command + Input + List + Empty + Group + Itens. Placeholder e itens com shortcuts reais. */
export const Composition: Story = {
	render: function CompositionRender(args) {
		return (
			<div className="w-full max-w-[360px] rounded-md border border-border">
				<Command className="rounded-lg border shadow-md">
					<Command.Input placeholder="Buscar comando ou página…" />
					<Command.List>
						<Command.Empty>{args.emptyText}</Command.Empty>
						<Command.Group heading="Ações">
							<Command.Item value="novo ficheiro">
								Novo ficheiro
								<Command.Shortcut>⌘N</Command.Shortcut>
							</Command.Item>
							<Command.Item value="guardar">
								Guardar
								<Command.Shortcut>⌘S</Command.Shortcut>
							</Command.Item>
							<Command.Item value="imprimir">
								Imprimir
								<Command.Shortcut>⌘P</Command.Shortcut>
							</Command.Item>
							<Command.Item value="abrir">
								Abrir…
								<Command.Shortcut>⌘O</Command.Shortcut>
							</Command.Item>
						</Command.Group>
						<Command.Separator />
						<Command.Group heading="Navegação">
							<Command.Item value="dashboard">Dashboard</Command.Item>
							<Command.Item value="definicoes">Definições</Command.Item>
							<Command.Item value="perfil">Perfil</Command.Item>
						</Command.Group>
					</Command.List>
				</Command>
			</div>
		);
	},
};

/** Command dentro de um Dialog (palette). Botão abre o dialog; controles para título e descrição. */
export const Dialog: Story = {
	render: function DialogRender(args) {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Abrir Command Palette</Button>
				<Command.Dialog
					open={open}
					onOpenChange={setOpen}
					title={args.dialogTitle}
					description={args.dialogDescription}
				>
					<Command.Input placeholder={args.placeholder} />
					<Command.List>
						<Command.Empty>{args.emptyText}</Command.Empty>
						<Command.Group heading="Ações">
							<Command.Item value="save">
								Guardar
								<Command.Shortcut>⌘S</Command.Shortcut>
							</Command.Item>
							<Command.Item value="undo">
								Desfazer
								<Command.Shortcut>⌘Z</Command.Shortcut>
							</Command.Item>
							<Command.Item value="redo">
								Refazer
								<Command.Shortcut>⇧⌘Z</Command.Shortcut>
							</Command.Item>
						</Command.Group>
					</Command.List>
				</Command.Dialog>
			</>
		);
	},
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Command (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Command</strong> é uma lista filtrável (estilo cmdk) por
								composição: Command (root) + Input + List + Empty + Group + Item
								+ Separator + Shortcut. <strong>Command.Dialog</strong> abre o
								Command dentro de um Dialog (command palette).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								Command.Input (busca), Command.List (container), Command.Empty
								(sem resultados), Command.Group (heading), Command.Item (value +
								children), Command.Shortcut (tecla), Command.Separator.
								Command.Dialog para palette em overlay.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Command palette para atalhos e navegação (Guardar, Novo ficheiro,
								Dashboard, Definições). Útil em aplicações com muitas ações ou
								páginas.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Command: palette com Ações e Navegação">
					<p className="mb-4 text-sm text-muted-foreground">
						Palette com grupos reais: Ações (Novo ficheiro, Guardar, Imprimir,
						Abrir) com shortcuts e Navegação (Dashboard, Definições, Perfil).
					</p>
					<div className="w-full max-w-[360px] rounded-md border border-border">
						<Command className="rounded-lg border shadow-md">
							<Command.Input placeholder="Buscar comando ou página…" />
							<Command.List>
								<Command.Empty>Nenhum resultado encontrado.</Command.Empty>
								<Command.Group heading="Ações">
									<Command.Item value="novo ficheiro">
										Novo ficheiro
										<Command.Shortcut>⌘N</Command.Shortcut>
									</Command.Item>
									<Command.Item value="guardar">
										Guardar
										<Command.Shortcut>⌘S</Command.Shortcut>
									</Command.Item>
									<Command.Item value="imprimir">
										Imprimir
										<Command.Shortcut>⌘P</Command.Shortcut>
									</Command.Item>
									<Command.Item value="abrir">
										Abrir…
										<Command.Shortcut>⌘O</Command.Shortcut>
									</Command.Item>
								</Command.Group>
								<Command.Separator />
								<Command.Group heading="Navegação">
									<Command.Item value="dashboard">Dashboard</Command.Item>
									<Command.Item value="definicoes">Definições</Command.Item>
									<Command.Item value="perfil">Perfil</Command.Item>
								</Command.Group>
							</Command.List>
						</Command>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
