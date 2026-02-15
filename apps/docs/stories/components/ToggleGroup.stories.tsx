import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@surface/ui/toggle-group";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof ToggleGroup> = {
	title: "Components/Atoms/ToggleGroup",
	component: ToggleGroup,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Grupo de botões de seleção única. API por composição: ToggleGroup (root) + ToggleGroupItem. Variantes: outline (borda), default (fundo muted). type=\"single\", value e onValueChange para controlar o valor.",
			},
		},
	},
	argTypes: {
		type: {
			description: "Tipo de seleção (apenas single).",
			control: false,
			table: { type: { summary: '"single"' } },
		},
		value: {
			description: "Valor do item selecionado (controlado).",
			control: "select",
			options: ["month", "day"],
			table: { type: { summary: "string" } },
		},
		variant: {
			description: "Estilo do grupo: outline (borda) ou default (fundo).",
			control: "radio",
			options: ["outline", "default"],
			table: { type: { summary: '"outline" | "default"' } },
		},
	},
	args: {
		value: "month",
		variant: "outline",
	},
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

/** Dois itens, variante outline (borda). Uso típico para "Por mês" / "Por dia". Controles ligados aos args. */
export const Outline: Story = {
	render: function OutlineRender(args) {
		const [value, setValue] = useState<string>(args.value ?? "month");

		// Sincroniza estado quando o control "value" é alterado no painel
		useEffect(() => {
			setValue(args.value ?? "month");
		}, [args.value]);

		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				variant={args.variant ?? "outline"}
			>
				<ToggleGroupItem value="month">Por mês</ToggleGroupItem>
				<ToggleGroupItem value="day">Por dia</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

/** Variante default: fundo muted, item selecionado em destaque. */
export const DefaultVariant: Story = {
	render: function DefaultVariantRender() {
		const [value, setValue] = useState<string>("left");
		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				variant="default"
			>
				<ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
				<ToggleGroupItem value="center">Centro</ToggleGroupItem>
				<ToggleGroupItem value="right">Direita</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

/** Três itens, variante outline. */
export const ThreeItems: Story = {
	render: function ThreeItemsRender() {
		const [value, setValue] = useState<string>("week");
		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				variant="outline"
			>
				<ToggleGroupItem value="day">Dia</ToggleGroupItem>
				<ToggleGroupItem value="week">Semana</ToggleGroupItem>
				<ToggleGroupItem value="month">Mês</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

/** Um item desativado (disabled). */
export const WithDisabledItem: Story = {
	render: function WithDisabledItemRender() {
		const [value, setValue] = useState<string>("a");
		return (
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={setValue}
				variant="outline"
			>
				<ToggleGroupItem value="a">Opção A</ToggleGroupItem>
				<ToggleGroupItem value="b" disabled>
					Opção B (desativada)
				</ToggleGroupItem>
				<ToggleGroupItem value="c">Opção C</ToggleGroupItem>
			</ToggleGroup>
		);
	},
};

function ToggleGroupCalendarDemo() {
	const [view, setView] = useState<string>("week");
	return (
		<ToggleGroup
			type="single"
			value={view}
			onValueChange={setView}
			variant="outline"
		>
			<ToggleGroupItem value="day">Dia</ToggleGroupItem>
			<ToggleGroupItem value="week">Semana</ToggleGroupItem>
			<ToggleGroupItem value="month">Mês</ToggleGroupItem>
		</ToggleGroup>
	);
}

function ToggleGroupAlignDemo() {
	const [align, setAlign] = useState<string>("left");
	return (
		<ToggleGroup
			type="single"
			value={align}
			onValueChange={setAlign}
			variant="outline"
		>
			<ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
			<ToggleGroupItem value="center">Centro</ToggleGroupItem>
			<ToggleGroupItem value="right">Direita</ToggleGroupItem>
		</ToggleGroup>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="ToggleGroup (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>ToggleGroup</strong> é um grupo de botões de seleção
								única. Um único item fica ativo por vez. Variantes: outline
								(borda) e default (fundo muted). API por composição: ToggleGroup
								(root) + ToggleGroupItem.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>type</code> — &quot;single&quot; (seleção única).
								</li>
								<li>
									<code>value</code> / <code>onValueChange</code> — valor
									controlado.
								</li>
								<li>
									<code>variant</code> — outline, default.
								</li>
								<li>
									<code>ToggleGroupItem</code> — value, disabled, children.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Em vistas de calendário (Dia / Semana / Mês), alinhamento de
								texto (Esquerda / Centro / Direita), filtros de período e
								qualquer escolha entre opções mutuamente exclusivas num formato
								compacto.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="ToggleGroup: vista de calendário e alinhamento">
					<p className="mb-4 text-sm text-muted-foreground">
						Vista de calendário (Dia, Semana, Mês) e selector de alinhamento
						(Esquerda, Centro, Direita) com variante outline.
					</p>
					<div className="flex flex-col gap-8">
						<div>
							<p className="mb-2 text-sm font-medium">Vista</p>
							<ToggleGroupCalendarDemo />
						</div>
						<div>
							<p className="mb-2 text-sm font-medium">Alinhamento</p>
							<ToggleGroupAlignDemo />
						</div>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
