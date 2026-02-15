import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "@surface/ui/pagination";
import type { PaginationAlign, PaginationSize } from "@surface/ui/pagination";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Pagination> = {
	title: "Components/Molecules/Pagination",
	component: Pagination,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Controles de paginação. APIs: align, size, disabled, hideOnSinglePage, showSizeChanger, showTotal, showQuickJumper, classNames (Semantic DOM). Subcomponentes: Info, Prev, Next, Pages, PageSize, QuickJumper.",
			},
		},
	},
	argTypes: {
		page: { control: "number", table: { type: { summary: "number" } } },
		pageSize: { control: "number", table: { type: { summary: "number" } } },
		total: { control: "number", table: { type: { summary: "number" } } },
		align: {
			control: "select",
			options: ["start", "center", "end"] as PaginationAlign[],
			table: { type: { summary: "PaginationAlign" } },
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"] as PaginationSize[],
			table: { type: { summary: "PaginationSize" } },
		},
		showSizeChanger: { control: "boolean", table: { type: { summary: "boolean" } } },
		showQuickJumper: { control: "boolean", table: { type: { summary: "boolean" } } },
		showTotal: { control: "boolean", table: { type: { summary: "boolean | function" } } },
		hideOnSinglePage: { control: "boolean", table: { type: { summary: "boolean" } } },
		disabled: { control: "boolean", table: { type: { summary: "boolean" } } },
	},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

/** Layout padrão: info + Prev + números de página + Next + PageSize. */
export const Default: Story = {
	render: function DefaultPagination(args) {
		const [page, setPage] = useState(args.page ?? 1);
		const [pageSize, setPageSize] = useState(args.pageSize ?? 10);
		const total = args.total ?? 50;

		return (
			<div className="w-full max-w-3xl">
				<Pagination
					{...args}
					page={page}
					pageSize={pageSize}
					total={total}
					onPageChange={setPage}
					onPageSizeChange={(size) => {
						setPageSize(size);
						setPage(1);
					}}
					pageSizeOptions={[10, 20, 50]}
				/>
			</div>
		);
	},
	args: {
		page: 1,
		pageSize: 10,
		total: 50,
		align: "start",
		size: "md",
		showSizeChanger: true,
		showQuickJumper: false,
		showTotal: true,
	},
};

/** Alinhamento: start, center, end. */
export const Align: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		return (
			<div className="space-y-8 w-full max-w-2xl">
				<div>
					<p className="text-muted-foreground mb-2 text-sm">align=start</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						align="start"
					/>
				</div>
				<div>
					<p className="text-muted-foreground mb-2 text-sm">align=center</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						align="center"
					/>
				</div>
				<div>
					<p className="text-muted-foreground mb-2 text-sm">align=end</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						align="end"
					/>
				</div>
			</div>
		);
	},
};

/** Tamanhos: sm, md, lg. */
export const Size: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		return (
			<div className="space-y-8 w-full max-w-2xl">
				<div>
					<p className="text-muted-foreground mb-2 text-sm">size=sm</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						size="sm"
					/>
				</div>
				<div>
					<p className="text-muted-foreground mb-2 text-sm">size=lg</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						size="lg"
					/>
				</div>
			</div>
		);
	},
};

/** Com Quick Jumper (Ir para página) e showTotal customizado. */
export const QuickJumperAndShowTotal: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const total = 50;
		return (
			<div className="w-full max-w-3xl">
				<Pagination
					page={page}
					pageSize={pageSize}
					total={total}
					onPageChange={setPage}
					onPageSizeChange={(size) => {
						setPageSize(size);
						setPage(1);
					}}
					showQuickJumper
					showTotal={(totalCount, [start, end]) =>
						`Total ${totalCount} itens (${start}–${end})`
					}
				/>
			</div>
		);
	},
};

/** hideOnSinglePage: esconder quando só há uma página. */
export const HideOnSinglePage: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		return (
			<div className="space-y-6 w-full max-w-2xl">
				<div>
					<p className="text-muted-foreground mb-2 text-sm">total=8, pageSize=10 → 1 página (escondido)</p>
					<Pagination
						page={page}
						pageSize={10}
						total={8}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						hideOnSinglePage
					/>
					<span className="text-muted-foreground text-sm">(nada renderizado acima)</span>
				</div>
				<div>
					<p className="text-muted-foreground mb-2 text-sm">total=50 → visível</p>
					<Pagination
						page={page}
						pageSize={10}
						total={50}
						onPageChange={setPage}
						onPageSizeChange={() => {}}
						hideOnSinglePage
					/>
				</div>
			</div>
		);
	},
};

/** showSizeChanger=false e showTotal=false. */
export const Minimal: Story = {
	render: () => {
		const [page, setPage] = useState(2);
		return (
			<div className="w-full max-w-xl">
				<Pagination
					page={page}
					pageSize={10}
					total={50}
					onPageChange={setPage}
					onPageSizeChange={() => {}}
					showSizeChanger={false}
					showTotal={false}
				/>
			</div>
		);
	},
};

/** disabled: toda a paginação desativada. */
export const Disabled: Story = {
	render: () => (
		<div className="w-full max-w-2xl">
			<Pagination
				page={2}
				pageSize={10}
				total={50}
				onPageChange={() => {}}
				onPageSizeChange={() => {}}
				disabled
			/>
		</div>
	),
};

/** Composição manual: só Info + Prev + Next (sem PageSize nem números). */
export const Composition: Story = {
	render: () => {
		const [page, setPage] = useState(2);
		const total = 100;
		const pageSize = 10;

		return (
			<div className="w-full max-w-md">
				<Pagination
					page={page}
					pageSize={pageSize}
					total={total}
					onPageChange={setPage}
					onPageSizeChange={() => {}}
				>
					<Pagination.Info />
					<div className="flex gap-2">
						<Pagination.Prev />
						<Pagination.Next />
					</div>
				</Pagination>
			</div>
		);
	},
};

/** Total zero: "0 itens" e botões desativados. */
export const Empty: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);

		return (
			<div className="w-full max-w-2xl">
				<Pagination
					page={page}
					pageSize={pageSize}
					total={0}
					onPageChange={setPage}
					onPageSizeChange={setPageSize}
				/>
			</div>
		);
	},
};

/** classNames (Semantic DOM): customizar classes por estrutura. */
export const CustomClassNames: Story = {
	render: () => {
		const [page, setPage] = useState(1);
		return (
			<div className="w-full max-w-2xl">
				<Pagination
					page={page}
					pageSize={10}
					total={50}
					onPageChange={setPage}
					onPageSizeChange={() => {}}
					classNames={{
						root: "rounded-lg border border-border bg-muted/30 p-4",
						item: "rounded-md",
						info: "font-medium",
					}}
				/>
			</div>
		);
	},
};

function OverviewPaginationExample() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const total = 50;
	return (
		<div className="w-full max-w-3xl">
			<Pagination
				align="start"
				page={page}
				pageSize={pageSize}
				pageSizeOptions={[10, 20, 50]}
				showQuickJumper
				showSizeChanger
				showTotal
				size="md"
				total={total}
				onPageChange={setPage}
				onPageSizeChange={(size) => {
					setPageSize(size);
					setPage(1);
				}}
			/>
		</div>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Pagination (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								A <strong>Pagination</strong> é uma molécula que fornece
								controlos de paginação (navegação por página, itens por página e
								opcionalmente quick jumper). Suporta alinhamento, tamanho e
								classNames por estrutura semântica (Semantic DOM).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								Layout padrão: <strong>Info</strong> (total/intervalo) +{" "}
								<strong>Prev</strong> + <strong>Pages</strong> (números) +{" "}
								<strong>Next</strong> + <strong>PageSize</strong> (seletor) +{" "}
								<strong>QuickJumper</strong> (se ativo). Todas as partes são
								renderizadas internamente pelo componente Pagination; o consumidor
								passa apenas as props.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>page</code> — página atual (1-based).
								</li>
								<li>
									<code>pageSize</code> — itens por página.
								</li>
								<li>
									<code>total</code> — total de itens.
								</li>
								<li>
									<code>onPageChange</code> / <code>onPageSizeChange</code> —
									callbacks ao mudar página ou tamanho.
								</li>
								<li>
									<code>pageSizeOptions</code> — opções do seletor (ex.: [10, 20,
									50]).
								</li>
								<li>
									<code>align</code> — start, center, end.
								</li>
								<li>
									<code>size</code> — sm, md, lg.
								</li>
								<li>
									<code>disabled</code>, <code>hideOnSinglePage</code>,{" "}
									<code>showSizeChanger</code>, <code>showTotal</code> (boolean
									ou função), <code>showQuickJumper</code>.
								</li>
								<li>
									<code>classNames</code> — root, info, prev, next, pageSize,
									pages, item, quickJumper.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								No organismo <strong>DataTable</strong>, a Pagination é exibida
								abaixo da tabela quando a prop <code>pagination</code> é passada
								(page, pageSize, total, onPageChange, onPageSizeChange), permitindo
								navegar entre páginas e alterar o tamanho da página.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Componentes utilizados</h3>
							<p className="mb-2">
								A Pagination utiliza internamente <strong>Button</strong> (Prev,
								Next, números de página) e <strong>Select</strong> (seletor de
								itens por página).
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Pagination com showTotal, showSizeChanger, showQuickJumper e pageSizeOptions">
					<p className="mb-4 text-sm text-muted-foreground">
						Exemplo interativo com todas as opções ativas: total, seletor de
						tamanho, quick jumper e alinhamento.
					</p>
					<OverviewPaginationExample />
				</StoryCard>
			</StorySection>
		</div>
	),
};
