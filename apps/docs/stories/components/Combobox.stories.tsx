import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import {
	Combobox,
	type ComboboxOption,
} from "@surface/ui/combobox";
import { StoryCard, StorySection } from "../foundation/shared";

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
	{ value: "strawberry", label: "Morango" },
	{ value: "pineapple", label: "Ananás" },
	{ value: "peach", label: "Pêssego" },
	{ value: "cherry", label: "Cereja" },
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

const countryOptions: ComboboxOption[] = [
	{ value: "pt", label: "Portugal" },
	{ value: "es", label: "Espanha" },
	{ value: "fr", label: "França" },
	{ value: "de", label: "Alemanha" },
	{ value: "it", label: "Itália" },
	{ value: "uk", label: "Reino Unido" },
	{ value: "nl", label: "Países Baixos" },
	{ value: "be", label: "Bélgica" },
	{ value: "ch", label: "Suíça" },
	{ value: "at", label: "Áustria" },
];

const currencyOptions: ComboboxOption[] = [
	{ value: "eur", label: "Euro (EUR)" },
	{ value: "gbp", label: "Libra (GBP)" },
	{ value: "usd", label: "Dólar (USD)" },
	{ value: "chf", label: "Franco suíço (CHF)" },
	{ value: "jpy", label: "Iene (JPY)" },
	{ value: "brl", label: "Real (BRL)" },
];

const categoryOptions: ComboboxOption[] = [
	{ value: "electronics", label: "Eletrónica" },
	{ value: "clothing", label: "Vestuário" },
	{ value: "food", label: "Alimentação" },
	{ value: "books", label: "Livros" },
	{ value: "home", label: "Casa e jardim" },
	{ value: "sports", label: "Desporto" },
	{ value: "health", label: "Saúde" },
	{ value: "toys", label: "Brinquedos" },
];

/** Formulário com vários comboboxes: país, moeda e categoria. */
export const MultipleFields: Story = {
	render: function MultipleFieldsRender() {
		const [country, setCountry] = useState("");
		const [currency, setCurrency] = useState("");
		const [category, setCategory] = useState("");
		return (
			<div className="w-full max-w-md space-y-5 rounded-lg border border-border bg-card p-6">
				<h3 className="text-sm font-semibold text-foreground">Configuração</h3>
				<div className="space-y-4">
					<div>
						<span className="mb-1.5 block text-sm font-medium" aria-hidden>País</span>
						<Combobox
							options={countryOptions}
							value={country}
							onValueChange={setCountry}
							placeholder="Selecione o país"
							searchPlaceholder="Buscar país..."
							emptyMessage="Nenhum país encontrado."
							aria-label="Escolher país"
							triggerWidth="w-full"
						/>
					</div>
					<div>
						<span className="mb-1.5 block text-sm font-medium" aria-hidden>Moeda</span>
						<Combobox
							options={currencyOptions}
							value={currency}
							onValueChange={setCurrency}
							placeholder="Selecione a moeda"
							searchPlaceholder="Buscar moeda..."
							emptyMessage="Nenhuma moeda encontrada."
							aria-label="Escolher moeda"
							triggerWidth="w-full"
						/>
					</div>
					<div>
						<span className="mb-1.5 block text-sm font-medium" aria-hidden>Categoria</span>
						<Combobox
							options={categoryOptions}
							value={category}
							onValueChange={setCategory}
							placeholder="Selecione a categoria"
							searchPlaceholder="Buscar categoria..."
							emptyMessage="Nenhuma categoria encontrada."
							aria-label="Escolher categoria"
							triggerWidth="w-full"
						/>
					</div>
				</div>
				<div className="border-t border-border pt-4 text-sm text-muted-foreground">
					Valores: País={country || "—"} | Moeda={currency || "—"} | Categoria={category || "—"}
				</div>
			</div>
		);
	},
};

function ComboboxCountryDemo() {
	const [value, setValue] = useState("");
	return (
		<div className="w-full max-w-[320px]">
			<span className="mb-1 block text-sm font-medium" aria-hidden>País</span>
			<Combobox
				options={countryOptions}
				value={value}
				onValueChange={setValue}
				placeholder="Selecione um país"
				searchPlaceholder="Buscar país..."
				emptyMessage="Nenhum país encontrado."
				aria-label="Escolher país"
			/>
		</div>
	);
}

function OverviewFormDemo() {
	const [country, setCountry] = useState("");
	const [currency, setCurrency] = useState("");
	const [category, setCategory] = useState("");
	return (
		<div className="w-full max-w-md space-y-5 rounded-lg border border-border bg-card p-6">
			<div className="space-y-4">
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>País</span>
					<Combobox
						options={countryOptions}
						value={country}
						onValueChange={setCountry}
						placeholder="Selecione o país"
						searchPlaceholder="Buscar país..."
						emptyMessage="Nenhum país encontrado."
						aria-label="Escolher país"
						triggerWidth="w-full"
					/>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>Moeda</span>
					<Combobox
						options={currencyOptions}
						value={currency}
						onValueChange={setCurrency}
						placeholder="Selecione a moeda"
						searchPlaceholder="Buscar moeda..."
						emptyMessage="Nenhuma moeda encontrada."
						aria-label="Escolher moeda"
						triggerWidth="w-full"
					/>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium" aria-hidden>Categoria</span>
					<Combobox
						options={categoryOptions}
						value={category}
						onValueChange={setCategory}
						placeholder="Selecione a categoria"
						searchPlaceholder="Buscar categoria..."
						emptyMessage="Nenhuma categoria encontrada."
						aria-label="Escolher categoria"
						triggerWidth="w-full"
					/>
				</div>
			</div>
			<div className="border-t border-border pt-4 text-sm text-muted-foreground">
				Seleção actual: País={country || "—"} · Moeda={currency || "—"} · Categoria={category || "—"}
			</div>
		</div>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Combobox (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Combobox</strong> é um controlo de seleção com busca: o utilizador
								filtra opções digitando no popover e escolhe um item. Existem duas formas de uso:
								<strong> API simples</strong> (passar <code>options</code>, <code>value</code> e{" "}
								<code>onValueChange</code>) ou <strong>composição</strong> com{" "}
								<code>Combobox.Root</code>, <code>Combobox.Trigger</code> e{" "}
								<code>Combobox.Content</code> para personalizar trigger, lista e mensagens.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API simples (props principais)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>options</code> — array de &#123; value, label, disabled? &#125;.</li>
								<li><code>value</code> / <code>onValueChange</code> — valor controlado (string).</li>
								<li><code>placeholder</code> — texto no trigger quando nada selecionado.</li>
								<li><code>searchPlaceholder</code> — placeholder do campo de busca no popover.</li>
								<li><code>emptyMessage</code> — mensagem quando a busca não devolve resultados.</li>
								<li><code>disabled</code>, <code>isLoading</code>, <code>loadingMessage</code>.</li>
								<li><code>triggerWidth</code>, <code>triggerClassName</code>, <code>popoverClassName</code>, <code>popoverWidth</code>.</li>
								<li><code>aria-label</code> — label para acessibilidade (recomendado).</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Composição (Combobox.Root + Trigger + Content)</h3>
							<p>
								Para layouts ou conteúdos custom (ex.: itens com descrição, grupos, ícones),
								use <code>Combobox.Root</code> com <code>value</code>/<code>onValueChange</code> e
								opcionalmente <code>options</code>, depois <code>Combobox.Trigger</code> e{" "}
								<code>Combobox.Content</code>. Dentro do Content usa-se o componente{" "}
								<strong>Command</strong> (Input, List, Empty, Group, Item) para montar a lista e a busca.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Comportamento e acessibilidade</h3>
							<p>
								A busca filtra por correspondência no <code>label</code>; Escape fecha o popover e
								limpa a busca. O trigger expõe <code>role="combobox"</code> e o popover lista
								as opções com navegação por teclado (setas, Enter para selecionar). Use sempre{" "}
								<code>aria-label</code> no trigger quando não houver label visível associado.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Formulários com muitas opções (país, moeda, categoria, projeto, cliente),
								filtros em listagens e dashboards. Ideal quando a lista é longa e a busca
								reduz o esforço do utilizador; para poucas opções fixas prefira o Select.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo: um único combobox">
				<StoryCard title="Seleção de país com busca">
					<p className="mb-4 text-sm text-muted-foreground">
						Um combobox com lista de países. O utilizador pode escrever para filtrar (ex.: &quot;por&quot; → Portugal).
					</p>
					<ComboboxCountryDemo />
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo: formulário com vários comboboxes">
				<StoryCard title="País, moeda e categoria">
					<p className="mb-4 text-sm text-muted-foreground">
						Formulário com três comboboxes independentes. Cada um mantém o seu estado;
						os valores selecionados são mostrados em baixo para demonstrar o controlo.
					</p>
					<OverviewFormDemo />
				</StoryCard>
			</StorySection>
		</div>
	),
};
