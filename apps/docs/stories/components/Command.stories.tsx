import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Command } from "@surface/ui/command";
import { Button } from "@surface/ui/button";

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

/** Composição: Command + Input + List + Empty + Group + Itens. Controles para placeholder e empty. */
export const Composition: Story = {
	render: function CompositionRender(args) {
		return (
			<div className="w-full max-w-[320px] rounded-md border border-border">
				<Command className="rounded-lg border shadow-md">
					<Command.Input placeholder={args.placeholder} />
					<Command.List>
						<Command.Empty>{args.emptyText}</Command.Empty>
						<Command.Group heading="Sugestões">
							<Command.Item value="novo ficheiro">Novo ficheiro</Command.Item>
							<Command.Item value="nova pasta">Nova pasta</Command.Item>
							<Command.Item value="abrir">Abrir...</Command.Item>
						</Command.Group>
						<Command.Separator />
						<Command.Group heading="Recent">
							<Command.Item value="projeto-a">projeto-a</Command.Item>
							<Command.Item value="projeto-b">projeto-b</Command.Item>
							<Command.Item value="documento.pdf">documento.pdf</Command.Item>
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
