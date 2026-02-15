import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { CellContext } from "@tanstack/react-table";
import { MoreVertical, RotateCw } from "lucide-react";
import type { ColumnDef, DataTableToolbarSlots } from "@surface/ui/data-table";
import { DataTable } from "@surface/ui/data-table";
import { Badge } from "@surface/ui/badge";
import { Button } from "@surface/ui/button";
import { Text } from "@surface/ui/text";
import { DropdownMenu } from "@surface/ui/dropdown-menu";
import { IconButton } from "@surface/ui/icon-button";
import { Tabs } from "@surface/ui/tabs";
import { StoryCard, StorySection } from "../foundation/shared";

interface UserItem {
	id: string;
	name: string;
	email: string;
	role: string;
	created_at: string;
	is_active: boolean;
}

const mockUsers: UserItem[] = [
	{
		id: "1",
		name: "Maria Silva",
		email: "maria@empresa.pt",
		role: "admin",
		created_at: "2024-01-15T10:00:00Z",
		is_active: true,
	},
	{
		id: "2",
		name: "João Santos",
		email: "joao@empresa.pt",
		role: "editor",
		created_at: "2024-02-01T14:30:00Z",
		is_active: true,
	},
	{
		id: "3",
		name: "Ana Costa",
		email: "ana@empresa.pt",
		role: "viewer",
		created_at: "2024-02-10T09:15:00Z",
		is_active: false,
	},
];

function noop(): void {}

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

function DefaultNameCell({ row }: { row: { original: UserItem } }) {
	return <Text variant="bodyMedium">{row.original.name}</Text>;
}
function DefaultEmailCell({ row }: { row: { original: UserItem } }) {
	return (
		<Text variant="bodySmall" tone="muted">
			{row.original.email}
		</Text>
	);
}
function DefaultRoleCell({ row }: { row: { original: UserItem } }) {
	return (
		<Badge variant="outline" size="sm" className="capitalize">
			{row.original.role}
		</Badge>
	);
}
function DefaultStatusCell({ row }: { row: { original: UserItem } }) {
	const active = row.original.is_active;
	return (
		<Badge
			size="sm"
			variant={active ? "default" : "secondary"}
			className={
				active
					? "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
					: "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
			}
		>
			{active ? "Ativo" : "Inativo"}
		</Badge>
	);
}
function DefaultActionsCell({ row }: { row: { original: UserItem } }) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				className="data-[state=open]:bg-muted text-muted-foreground inline-flex size-8 min-h-8 items-center justify-center rounded-md"
				aria-label={`Ações para ${row.original.name}`}
			>
				<span className="sr-only">Abrir menu</span>
				<MoreVertical className="size-4" aria-hidden />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className="w-32">
				<DropdownMenu.Item onClick={() => {}}>Editar</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive" onClick={() => {}}>
					Excluir
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

function renderDefaultNameCell(info: CellContext<UserItem, unknown>) {
	return <DefaultNameCell row={info.row} />;
}
function renderDefaultEmailCell(info: CellContext<UserItem, unknown>) {
	return <DefaultEmailCell row={info.row} />;
}
function renderDefaultRoleCell(info: CellContext<UserItem, unknown>) {
	return <DefaultRoleCell row={info.row} />;
}
function renderDefaultStatusCell(info: CellContext<UserItem, unknown>) {
	return <DefaultStatusCell row={info.row} />;
}
function renderDefaultActionsCell(info: CellContext<UserItem, unknown>) {
	return <DefaultActionsCell row={info.row} />;
}

const meta: Meta<typeof DataTable<UserItem>> = {
	title: "Components/Organisms/DataTable",
	component: DataTable,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Tabela de dados com @tanstack/react-table. Layout: [toolbar] [DataTable] [Pagination]. Toolbar composable com toolbarLeft (ex.: tabs) e toolbarRight (recebe slots.columnVisibilityTrigger para refresh, Personalizar colunas, ActionButton). selectColumns reflete as colunas do tab ativo quando se usa tabs. Usa Table, Checkbox, Pagination e Popover do design system.",
			},
		},
	},
	argTypes: {
		loading: {
			control: "boolean",
			description: "Estado de carregamento (mostra spinner no corpo).",
			table: { type: { summary: "boolean" } },
		},
		tableCaption: {
			control: "text",
			description: "Legenda da tabela (acessibilidade).",
			table: { type: { summary: "string" } },
		},
		enableRowSelection: {
			control: "boolean",
			description: "Habilitar seleção de linhas (coluna com checkboxes).",
			table: { type: { summary: "boolean" } },
		},
		enableColumnVisibility: {
			control: "boolean",
			description: "Habilitar seletor de colunas visíveis.",
			table: { type: { summary: "boolean" } },
		},
		columnVisibilityTriggerLabel: {
			control: "text",
			description: "Rótulo do botão que abre o seletor de colunas.",
			table: { type: { summary: "string" } },
		},
		columnVisibilityTriggerVariant: {
			control: "radio",
			options: ["icon", "button"],
			description: "Aspecto do trigger: só ícone ou botão com texto + chevron.",
			table: { type: { summary: '"icon" | "button"' } },
		},
		data: { table: { disable: true } },
		columns: { table: { disable: true } },
		pagination: { table: { disable: true } },
		onRowSelectionChange: { table: { disable: true } },
		columnVisibility: { table: { disable: true } },
		onColumnVisibilityChange: { table: { disable: true } },
		toolbarLeft: { table: { disable: true } },
		toolbarRight: { table: { disable: true } },
		className: { table: { disable: true } },
		paginationClassName: { table: { disable: true } },
		toolbarClassName: { table: { disable: true } },
		pageSizeOptions: { table: { disable: true } },
	},
	args: {
		loading: false,
		tableCaption: "Lista de utilizadores (exemplo)",
		enableRowSelection: false,
		enableColumnVisibility: false,
		columnVisibilityTriggerLabel: "Personalizar colunas",
		columnVisibilityTriggerVariant: "button",
	},
};

export default meta;

type Story = StoryObj<typeof DataTable<UserItem>>;

/** DataTable com colunas Nome, Email, Perfil (Badge), Criado em, Status (Badge) e Ações (DropdownMenu). */
export const Default: Story = {
	render: function DefaultDataTable(args) {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const total = mockUsers.length;

		const columns: ColumnDef<UserItem>[] = useMemo(
			() => [
				{
					accessorKey: "name",
					header: "Nome",
					cell: renderDefaultNameCell,
				},
				{
					accessorKey: "email",
					header: "E-mail",
					cell: renderDefaultEmailCell,
				},
				{
					accessorKey: "role",
					header: "Perfil",
					cell: renderDefaultRoleCell,
				},
				{
					accessorKey: "created_at",
					header: "Criado em",
					cell: ({ row }) => formatDate(row.original.created_at),
				},
				{
					accessorKey: "is_active",
					header: "Status",
					cell: renderDefaultStatusCell,
				},
				{
					id: "actions",
					header: () => null,
					cell: renderDefaultActionsCell,
					enableSorting: false,
				},
			],
			[],
		);

		return (
			<div className="w-full max-w-4xl">
				<DataTable<UserItem>
					{...args}
					columns={columns}
					data={mockUsers}
					pagination={{
						page,
						pageSize,
						total,
						onPageChange: setPage,
						onPageSizeChange: (size) => {
							setPageSize(size);
							setPage(1);
						},
					}}
				/>
			</div>
		);
	},
};

/** Com seleção de linhas (coluna de checkboxes). */
export const WithRowSelection: Story = {
	render: function WithRowSelectionDataTable() {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const total = mockUsers.length;
		const [selected, setSelected] = useState<UserItem[]>([]);

		const columns: ColumnDef<UserItem>[] = useMemo(
			() => [
				{
					accessorKey: "name",
					header: "Nome",
					cell: renderDefaultNameCell,
				},
				{
					accessorKey: "email",
					header: "E-mail",
					cell: renderDefaultEmailCell,
				},
				{
					accessorKey: "role",
					header: "Perfil",
					cell: renderDefaultRoleCell,
				},
			],
			[],
		);

		return (
			<div className="w-full max-w-2xl space-y-4">
				<DataTable<UserItem>
					columns={columns}
					data={mockUsers}
					enableRowSelection
					onRowSelectionChange={setSelected}
					pagination={{
						page,
						pageSize,
						total,
						onPageChange: setPage,
						onPageSizeChange: (size) => {
							setPageSize(size);
							setPage(1);
						},
					}}
				/>
				{selected.length > 0 && (
					<Text tone="muted" variant="bodySmall">
						Selecionados: {selected.length} –{" "}
						{selected.map((u) => u.name).join(", ")}
					</Text>
				)}
			</div>
		);
	},
};

/** Toolbar completa: [Refresh, Personalizar colunas, Ver mais] acima da tabela. */
export const ToolbarComplete: Story = {
	render: function ToolbarCompleteDataTable() {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const total = mockUsers.length;
		const columns: ColumnDef<UserItem>[] = useMemo(
			() => [
				{ accessorKey: "name", header: "Nome" },
				{ accessorKey: "email", header: "E-mail" },
				{ accessorKey: "role", header: "Perfil" },
				{ accessorKey: "created_at", header: "Criado em" },
				{
					accessorKey: "is_active",
					header: "Status",
					cell: renderDefaultStatusCell,
				},
			],
			[],
		);

		const renderToolbarRight = (slots: DataTableToolbarSlots) => (
			<>
				<IconButton
					aria-label="Atualizar"
					icon={<RotateCw className="size-4" aria-hidden />}
					onClick={() => {}}
					size="sm"
					variant="outline"
				/>
				{slots.columnVisibilityTrigger}
				<Button size="sm" variant="default">
					Ver mais
				</Button>
			</>
		);

		return (
			<div className="w-full max-w-4xl">
				<DataTable<UserItem>
					columnVisibilityTriggerLabel="Personalizar colunas"
					columnVisibilityTriggerVariant="button"
					columns={columns}
					data={mockUsers}
					enableColumnVisibility
					pagination={{
						page,
						pageSize,
						total,
						onPageChange: setPage,
						onPageSizeChange: (size) => {
							setPageSize(size);
							setPage(1);
						},
					}}
					tableCaption="Utilizadores"
					toolbarRight={renderToolbarRight}
				/>
			</div>
		);
	},
};

/** Tabs à esquerda e toolbar (Refresh, Personalizar colunas, Ver mais) à direita. O selectColumns reflete as colunas do tab ativo. */
export const WithTabs: Story = {
	render: function WithTabsDataTable() {
		const [activeTab, setActiveTab] = useState("ordens");
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const [columnVisibilityByTab, setColumnVisibilityByTab] = useState<
			Record<string, Record<string, boolean>>
		>({
			ordens: {},
			taxa: {},
		});

		const columnsOrdens: ColumnDef<UserItem>[] = useMemo(
			() => [
				{ accessorKey: "name", header: "Nome" },
				{ accessorKey: "email", header: "E-mail" },
				{ accessorKey: "role", header: "Tipo" },
				{
					accessorKey: "is_active",
					header: "Status",
					cell: renderDefaultStatusCell,
				},
				{ accessorKey: "created_at", header: "Criado em" },
			],
			[],
		);
		const columnsTaxa: ColumnDef<UserItem>[] = useMemo(
			() => [
				{ accessorKey: "name", header: "Nome" },
				{ accessorKey: "role", header: "Perfil" },
				{ accessorKey: "email", header: "E-mail" },
			],
			[],
		);

		const columns = activeTab === "ordens" ? columnsOrdens : columnsTaxa;
		const columnVisibility = columnVisibilityByTab[activeTab] ?? {};
		const handleColumnVisibilityChange = (
			visibility: Record<string, boolean>,
		) => {
			setColumnVisibilityByTab((prev) => ({
				...prev,
				[activeTab]: visibility,
			}));
		};

		const renderToolbarRight = (slots: DataTableToolbarSlots) => (
			<>
				<IconButton
					aria-label="Atualizar"
					icon={<RotateCw className="size-4" aria-hidden />}
					onClick={() => {}}
					size="sm"
					variant="outline"
				/>
				{slots.columnVisibilityTrigger}
				<Button size="sm" variant="default">
					Ver mais
				</Button>
			</>
		);

		return (
			<div className="w-full max-w-4xl space-y-0">
				<DataTable<UserItem>
					columnVisibility={columnVisibility}
					columnVisibilityTriggerLabel="Personalizar colunas"
					columnVisibilityTriggerVariant="button"
					columns={columns}
					data={mockUsers}
					enableColumnVisibility
					onColumnVisibilityChange={handleColumnVisibilityChange}
					pagination={{
						page,
						pageSize,
						total: mockUsers.length,
						onPageChange: setPage,
						onPageSizeChange: (size) => {
							setPageSize(size);
							setPage(1);
						},
					}}
					tableCaption={
						activeTab === "ordens" ? "Ordens de serviço" : "Taxa de aprovação"
					}
					toolbarLeft={
						<Tabs.Root onChange={setActiveTab} value={activeTab}>
							<Tabs.List>
								<Tabs.Trigger value="ordens">Ordens de serviço</Tabs.Trigger>
								<Tabs.Trigger value="taxa">Taxa de aprovação</Tabs.Trigger>
							</Tabs.List>
						</Tabs.Root>
					}
					toolbarRight={renderToolbarRight}
				/>
			</div>
		);
	},
};

function LoadingDataTable() {
	const columns: ColumnDef<UserItem>[] = useMemo(
		() => [
			{ accessorKey: "name", header: "Nome" },
			{ accessorKey: "email", header: "E-mail" },
		],
		[],
	);
	return (
		<div className="w-full max-w-2xl">
			<DataTable<UserItem>
				columns={columns}
				data={[]}
				loading
				tableCaption="A carregar..."
			/>
		</div>
	);
}

/** Estado de carregamento (spinner no corpo). */
export const Loading: Story = {
	render: () => <LoadingDataTable />,
};

function OverviewExampleDataTable() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const total = mockUsers.length;
	const columns: ColumnDef<UserItem>[] = useMemo(
		() => [
			{ accessorKey: "name", header: "Nome", cell: renderDefaultNameCell },
			{ accessorKey: "email", header: "E-mail", cell: renderDefaultEmailCell },
			{ accessorKey: "role", header: "Perfil", cell: renderDefaultRoleCell },
			{
				accessorKey: "created_at",
				header: "Criado em",
				cell: ({ row }) => formatDate(row.original.created_at),
			},
			{
				accessorKey: "is_active",
				header: "Status",
				cell: renderDefaultStatusCell,
			},
			{
				id: "actions",
				header: () => null,
				cell: renderDefaultActionsCell,
				enableSorting: false,
			},
		],
		[],
	);
	const renderToolbarRight = (slots: DataTableToolbarSlots) => (
		<>
			<IconButton
				aria-label="Atualizar"
				icon={<RotateCw className="size-4" aria-hidden />}
				size="sm"
				variant="outline"
				onClick={noop}
			/>
			{slots.columnVisibilityTrigger}
			<Button size="sm" variant="default">
				Ver mais
			</Button>
		</>
	);
	return (
		<div className="w-full max-w-4xl">
			<DataTable<UserItem>
				columnVisibilityTriggerLabel="Personalizar colunas"
				columnVisibilityTriggerVariant="button"
				columns={columns}
				data={mockUsers}
				enableColumnVisibility
				enableRowSelection
				onRowSelectionChange={noop}
				pagination={{
					page,
					pageSize,
					total,
					onPageChange: setPage,
					onPageSizeChange: (size) => {
						setPageSize(size);
						setPage(1);
					},
				}}
				tableCaption="Lista de utilizadores (exemplo completo)"
				toolbarRight={renderToolbarRight}
			/>
		</div>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="DataTable (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>DataTable</strong> é um organismo que exibe dados em
								tabela com suporte a paginação, seleção de linhas e visibilidade
								de colunas. É construído em cima do @tanstack/react-table e
								compõe vários componentes do design system numa única interface.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura do layout</h3>
							<p>
								O layout segue a ordem:{" "}
								<strong>[Toolbar] → [DataTable] → [Pagination]</strong>. A
								toolbar é opcional e composable: à esquerda (toolbarLeft) podes
								colocar, por exemplo, Tabs; à direita (toolbarRight) recebes um
								objeto <code>slots</code> com{" "}
								<code>columnVisibilityTrigger</code> para compor botões como
								Refresh, “Personalizar colunas” e ações (ex. “Ver mais”). A
								tabela em si renderiza cabeçalhos e linhas conforme as colunas
								definidas. A paginação aparece abaixo quando passas a prop{" "}
								<code>pagination</code>.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>data</code> — array de dados (uma linha por item).
								</li>
								<li>
									<code>columns</code> — definições de colunas (ColumnDef do
									TanStack Table).
								</li>
								<li>
									<code>pagination</code> — opcional; objeto com page, pageSize,
									total, onPageChange, onPageSizeChange.
								</li>
								<li>
									<code>enableRowSelection</code> — adiciona coluna de
									checkboxes para seleção.
								</li>
								<li>
									<code>onRowSelectionChange</code> — callback com as linhas
									selecionadas.
								</li>
								<li>
									<code>enableColumnVisibility</code> — mostra o seletor de
									colunas (popover com checkboxes).
								</li>
								<li>
									<code>columnVisibility</code> /{" "}
									<code>onColumnVisibilityChange</code> — estado controlado de
									colunas visíveis.
								</li>
								<li>
									<code>columnVisibilityTriggerLabel</code> — texto do botão
									(ex. “Personalizar colunas”).
								</li>
								<li>
									<code>columnVisibilityTriggerVariant</code> —{" "}
									<code>&quot;icon&quot;</code> (só ícone) ou{" "}
									<code>&quot;button&quot;</code> (texto + chevron).
								</li>
								<li>
									<code>toolbarLeft</code> — conteúdo à esquerda da toolbar
									(ex.: Tabs).
								</li>
								<li>
									<code>toolbarRight</code> — função (slots) =&gt; ReactNode;
									compõe refresh + columnVisibilityTrigger + ações.
								</li>
								<li>
									<code>loading</code> — mostra Spinner no corpo da tabela.
								</li>
								<li>
									<code>tableCaption</code> — legenda acessível da tabela.
								</li>
								<li>
									<code>className</code>, <code>paginationClassName</code>,{" "}
									<code>toolbarClassName</code>, <code>pageSizeOptions</code>.
								</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Uso com tabs</h3>
							<p>
								Quando a tabela está dentro de tabs, passa <code>columns</code>{" "}
								e, se usares visibilidade controlada,{" "}
								<code>columnVisibility</code> e{" "}
								<code>onColumnVisibilityChange</code> por tab (ex.: estado por
								tabId). Assim o “Personalizar colunas” reflete as colunas do tab
								ativo.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">
								Componentes utilizados no organismo
							</h3>
							<p className="mb-2">
								O DataTable é formado pelos seguintes componentes do design
								system:
							</p>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<strong>Table</strong> — Table, TableHeader, TableBody,
									TableRow, TableHead, TableCell, TableCaption (estrutura da
									tabela).
								</li>
								<li>
									<strong>Checkbox</strong> — seleção de linhas e checkboxes do
									popover de colunas.
								</li>
								<li>
									<strong>Pagination</strong> — PaginationRoot para navegação e
									itens por página.
								</li>
								<li>
									<strong>Popover</strong> — Popover.Root, Trigger e Content
									para o seletor de colunas visíveis.
								</li>
								<li>
									<strong>Button</strong> — trigger “Personalizar colunas”
									(variante button) e botões de ação na toolbar.
								</li>
								<li>
									<strong>IconButton</strong> — trigger em ícone do seletor de
									colunas e botão de refresh.
								</li>
								<li>
									<strong>Spinner</strong> — estado de carregamento no corpo da
									tabela.
								</li>
								<li>
									<strong>Text</strong> — usado nas células (ex.: nome, email)
									quando definido nas columns.
								</li>
								<li>
									<strong>Badge</strong> — usado nas células (ex.: perfil,
									status) quando definido nas columns.
								</li>
								<li>
									<strong>DropdownMenu</strong> — coluna de ações (Editar,
									Excluir) definida nas columns pelo consumidor.
								</li>
							</ul>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="DataTable com toolbar, seleção, visibilidade de colunas e paginação">
					<p className="mb-4 text-sm text-muted-foreground">
						Exemplo que utiliza toolbar (Refresh + Personalizar colunas + Ver
						mais), seleção de linhas, seletor de colunas visíveis, paginação, e
						colunas com Text, Badge, data formatada, Status (Badge) e Ações
						(DropdownMenu).
					</p>
					<OverviewExampleDataTable />
				</StoryCard>
			</StorySection>
		</div>
	),
};
