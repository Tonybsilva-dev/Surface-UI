import type { Meta, StoryObj } from "@storybook/react";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
} from "@surface/ui/table";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const wrapperClass = "w-full max-w-2xl";

const meta: Meta<typeof Table> = {
	title: "Components/Molecules/Table",
	component: Table,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Tabela por composição (molécula: agrupa cabeçalho, corpo, linhas e células). Table (wrapper scroll), TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption.",
			},
		},
	},
	argTypes: {
		className: { control: "text", table: { type: { summary: "string" } } },
	},
};

export default meta;

type Story = StoryObj<typeof Table>;

/** Tabela simples: cabeçalho, corpo e legenda. */
export const Default: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Table {...args}>
				<TableCaption>Lista de utilizadores (exemplo)</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className="text-right">Estado</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Text variant="bodyMedium">Maria Silva</Text>
						</TableCell>
						<TableCell>
							<Text variant="bodySmall" tone="muted">
								maria@empresa.pt
							</Text>
						</TableCell>
						<TableCell className="text-right">
							<Text variant="labelSmall" tone="muted">
								Ativo
							</Text>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Text variant="bodyMedium">João Santos</Text>
						</TableCell>
						<TableCell>
							<Text variant="bodySmall" tone="muted">
								joao@empresa.pt
							</Text>
						</TableCell>
						<TableCell className="text-right">
							<Text variant="labelSmall" tone="muted">
								Ativo
							</Text>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Text variant="bodyMedium">Ana Costa</Text>
						</TableCell>
						<TableCell>
							<Text variant="bodySmall" tone="muted">
								ana@empresa.pt
							</Text>
						</TableCell>
						<TableCell className="text-right">
							<Text variant="labelSmall" tone="muted">
								Inativo
							</Text>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	),
};

/** Tabela com footer (totais ou resumo). */
export const WithFooter: Story = {
	render: (args) => (
		<div className={wrapperClass}>
			<Table {...args}>
				<TableCaption>Pedidos do mês</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead className="text-right">Quantidade</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Text variant="bodyMedium">Item A</Text>
						</TableCell>
						<TableCell className="text-right">2</TableCell>
						<TableCell className="text-right">40,00 €</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Text variant="bodyMedium">Item B</Text>
						</TableCell>
						<TableCell className="text-right">1</TableCell>
						<TableCell className="text-right">25,00 €</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={2}>
							<Text variant="labelMedium">Total</Text>
						</TableCell>
						<TableCell className="text-right">
							<Text variant="bodyMedium">65,00 €</Text>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	),
};

/** Tabela larga para demonstrar scroll horizontal (wrapper overflow-auto). */
export const Scrollable: Story = {
	render: (args) => (
		<div className="w-full max-w-md">
			<Table {...args}>
				<TableCaption>Tabela com muitas colunas (scroll horizontal)</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Col 1</TableHead>
						<TableHead>Col 2</TableHead>
						<TableHead>Col 3</TableHead>
						<TableHead>Col 4</TableHead>
						<TableHead>Col 5</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>A1</TableCell>
						<TableCell>B1</TableCell>
						<TableCell>C1</TableCell>
						<TableCell>D1</TableCell>
						<TableCell>E1</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>A2</TableCell>
						<TableCell>B2</TableCell>
						<TableCell>C2</TableCell>
						<TableCell>D2</TableCell>
						<TableCell>E2</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	),
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Table (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								A <strong>Table</strong> é uma molécula que agrupa a estrutura
								semântica de uma tabela por composição. O componente Table inclui
								um wrapper com overflow-auto para scroll horizontal. Suporta
								data-[state=selected] em linhas e [role=checkbox] para seleção.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								Composição: <strong>Table</strong> (root + wrapper scroll),{" "}
								<strong>TableHeader</strong>, <strong>TableBody</strong>,{" "}
								<strong>TableFooter</strong> (opcional), <strong>TableRow</strong>,{" "}
								<strong>TableHead</strong>, <strong>TableCell</strong>,{" "}
								<strong>TableCaption</strong>. Monte cabeçalho, corpo e opcionalmente
								rodapé com linhas e células. Combine com Text nas células para
								tipografia consistente.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>className</code> — classes CSS no elemento table (Table
									aplica ao &lt;table&gt; dentro do wrapper).
								</li>
								<li>
									TableHead, TableCell e TableRow aceitam as props HTML nativas
									(th/td/tr) e className.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								No organismo <strong>DataTable</strong>, a Table é a molécula que
								forma o corpo da tabela: o DataTable renderiza TableHeader,
								TableBody, TableRow, TableHead e TableCell conforme as colunas e
								dados, e usa TableCaption para a legenda acessível.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Componentes utilizados</h3>
							<p className="mb-2">
								A Table é construída com elementos HTML semânticos (table, thead,
								tbody, tr, th, td, caption). Nas células, o consumidor usa
								geralmente o átomo <strong>Text</strong> para tipografia
								consistente. O DataTable compõe esta molécula para exibir os
								dados.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Table: caption, header, body, footer e células com Text">
					<p className="mb-4 text-sm text-muted-foreground">
						Exemplo com TableCaption, TableHeader, TableBody, TableFooter, linhas
						e células usando Text para tipografia.
					</p>
					<div className={wrapperClass}>
						<Table>
							<TableCaption>Pedidos do mês (exemplo completo)</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Produto</TableHead>
									<TableHead>Email</TableHead>
									<TableHead className="text-right">Estado</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<Text variant="bodyMedium">Maria Silva</Text>
									</TableCell>
									<TableCell>
										<Text variant="bodySmall" tone="muted">
											maria@empresa.pt
										</Text>
									</TableCell>
									<TableCell className="text-right">
										<Text variant="labelSmall" tone="muted">
											Ativo
										</Text>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Text variant="bodyMedium">João Santos</Text>
									</TableCell>
									<TableCell>
										<Text variant="bodySmall" tone="muted">
											joao@empresa.pt
										</Text>
									</TableCell>
									<TableCell className="text-right">
										<Text variant="labelSmall" tone="muted">
											Ativo
										</Text>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Text variant="bodyMedium">Ana Costa</Text>
									</TableCell>
									<TableCell>
										<Text variant="bodySmall" tone="muted">
											ana@empresa.pt
										</Text>
									</TableCell>
									<TableCell className="text-right">
										<Text variant="labelSmall" tone="muted">
											Inativo
										</Text>
									</TableCell>
								</TableRow>
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={2}>
										<Text variant="labelMedium">Total</Text>
									</TableCell>
									<TableCell className="text-right">
										<Text variant="bodyMedium">3 utilizadores</Text>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
