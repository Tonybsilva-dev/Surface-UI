import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import {
	Combobox,
	type ComboboxOption,
} from "@surface/ui/combobox";

const meta: Meta<typeof Combobox> = {
	title: "Components/Molecules/Combobox",
	component: Combobox,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Seleção com busca (combobox). Por composição: Combobox.Root + Trigger + Content; ou API simples com options, value e onValueChange.",
			},
		},
	},
	argTypes: {
		placeholder: {
			description: "Texto do trigger quando nenhum valor está selecionado.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		searchPlaceholder: {
			description: "Placeholder do campo de busca dentro do popover.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		emptyMessage: {
			description: "Mensagem exibida quando não há resultados na busca.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		disabled: {
			description: "Desativa o combobox.",
			control: "boolean",
			table: { type: { summary: "boolean" } },
		},
		isLoading: {
			description: "Exibe estado de carregamento no trigger e na lista.",
			control: "boolean",
			table: { type: { summary: "boolean" } },
		},
		loadingMessage: {
			description: "Texto exibido quando isLoading é true.",
			control: "text",
			table: { type: { summary: "string" } },
		},
		triggerWidth: {
			description: "Classe de largura do trigger (ex.: w-full, w-64).",
			control: "text",
			table: { type: { summary: "string" } },
		},
		"aria-label": {
			description: "Label para acessibilidade.",
			control: "text",
			table: { type: { summary: "string" } },
		},
	},
	args: {
		placeholder: "Selecione uma fruta",
		searchPlaceholder: "Buscar...",
		emptyMessage: "Nenhuma fruta encontrada.",
		disabled: false,
		isLoading: false,
		loadingMessage: "Carregando...",
		triggerWidth: "w-full",
		"aria-label": "Escolher fruta",
	},
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const fruitOptions: ComboboxOption[] = [
	{ value: "apple", label: "Maçã" },
	{ value: "banana", label: "Banana" },
	{ value: "orange", label: "Laranja" },
	{ value: "mango", label: "Manga" },
	{ value: "grape", label: "Uva" },
	{ value: "melon", label: "Melão" },
];

/** API simples com controles ligados aos args. */
export const Default: Story = {
	render: function DefaultRender(args) {
		const [value, setValue] = useState("");

		useEffect(() => {
			// Permite reset pelo control se no futuro houver control para value
			if (args.value !== undefined) setValue(args.value);
		}, [args.value]);

		return (
			<div className="w-full max-w-[320px]">
				<Combobox
					options={fruitOptions}
					value={value}
					onValueChange={setValue}
					placeholder={args.placeholder}
					searchPlaceholder={args.searchPlaceholder}
					emptyMessage={args.emptyMessage}
					disabled={args.disabled}
					isLoading={args.isLoading}
					loadingMessage={args.loadingMessage}
					triggerWidth={args.triggerWidth}
					aria-label={args["aria-label"]}
				/>
			</div>
		);
	},
};

/** Desabilitado. */
export const Disabled: Story = {
	args: { disabled: true },
	render: function DisabledRender(args) {
		const [value, setValue] = useState("apple");
		return (
			<div className="w-full max-w-[320px]">
				<Combobox
					options={fruitOptions}
					value={value}
					onValueChange={setValue}
					placeholder={args.placeholder}
					disabled={args.disabled}
				/>
			</div>
		);
	},
};

/** Estado de loading. */
export const Loading: Story = {
	args: { isLoading: true, loadingMessage: "A carregar..." },
	render: function LoadingRender(args) {
		const [value, setValue] = useState("");
		return (
			<div className="w-full max-w-[320px]">
				<Combobox
					options={fruitOptions}
					value={value}
					onValueChange={setValue}
					placeholder={args.placeholder}
					isLoading={args.isLoading}
					loadingMessage={args.loadingMessage}
				/>
			</div>
		);
	},
};
