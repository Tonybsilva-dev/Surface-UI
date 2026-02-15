/**
 * DataTable – tabela de dados com @tanstack/react-table.
 * Recebe data, columns (ColumnDef), paginação opcional, seleção de linhas e visibilidade de colunas.
 * Toolbar composable: toolbarLeft (ex.: tabs) e toolbarRight (refresh, selectColumns, ActionButton).
 * Usa Table, Checkbox, Pagination, Popover e Button do design system.
 */
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { Updater } from "@tanstack/react-table";
import {
	type ColumnDef,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { cn } from "./lib/utils";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { PaginationRoot } from "./pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { Spinner } from "./spinner";
import { Popover } from "./popover";
import { IconButton } from "./icon-button";

export type { ColumnDef, VisibilityState };

/** Slots passados a toolbarRight para composição (ex.: refresh + columnVisibilityTrigger + action). */
export interface DataTableToolbarSlots {
	/** Elemento do seletor de colunas (Popover com checkboxes). Só presente se enableColumnVisibility e existirem colunas ocultáveis. */
	columnVisibilityTrigger: ReactNode;
}

export interface DataTablePagination {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

export interface DataTableProps<T> {
	/** Dados da tabela. */
	data: T[];
	/** Definições de colunas (TanStack ColumnDef). */
	columns: ColumnDef<T, unknown>[];
	/** Paginação server-side (opcional). */
	pagination?: DataTablePagination;
	/** Habilitar seleção de linhas (coluna com checkboxes). */
	enableRowSelection?: boolean;
	/** Callback quando a seleção de linhas mudar (linhas selecionadas). */
	onRowSelectionChange?: (rows: T[]) => void;
	/** Habilitar seletor de colunas visíveis (dropdown com checkboxes). */
	enableColumnVisibility?: boolean;
	/** Estado controlado de visibilidade de colunas (opcional). */
	columnVisibility?: VisibilityState;
	/** Callback quando a visibilidade de colunas mudar (recebe o novo estado). */
	onColumnVisibilityChange?: (visibility: VisibilityState) => void;
	/** Rótulo do botão que abre o seletor de colunas. */
	columnVisibilityTriggerLabel?: string;
	/** Aspecto do trigger do seletor de colunas: só ícone ou botão com texto + chevron. */
	columnVisibilityTriggerVariant?: "icon" | "button";
	/**
	 * Conteúdo à esquerda da toolbar (ex.: tabs). Quando definido, a toolbar é mostrada.
	 */
	toolbarLeft?: ReactNode;
	/**
	 * Conteúdo à direita da toolbar (refresh, selectColumns, ActionButton).
	 * Recebe slots.columnVisibilityTrigger para inserir o seletor de colunas.
	 * Quando definido, a toolbar é mostrada.
	 */
	toolbarRight?: (slots: DataTableToolbarSlots) => ReactNode;
	/** Estado de carregamento (mostra spinner no corpo). */
	loading?: boolean;
	/** Legenda da tabela (acessibilidade). */
	tableCaption?: string;
	/** className do container da tabela. */
	className?: string;
	/** className da barra de paginação. */
	paginationClassName?: string;
	/** className da barra de ferramentas (caption + seletor de colunas). */
	toolbarClassName?: string;
	/** Opções de itens por página para o seletor. */
	pageSizeOptions?: number[];
}

function getColumnHeaderLabel(column: { id: string; columnDef: { header?: unknown } }): string {
	const h = column.columnDef.header;
	if (typeof h === "string") return h;
	return column.id;
}

function DataTableInner<T>(props: DataTableProps<T>): JSX.Element {
	const {
		data,
		columns,
		pagination,
		enableRowSelection = false,
		onRowSelectionChange,
		enableColumnVisibility = false,
		columnVisibility: controlledColumnVisibility,
		onColumnVisibilityChange,
		columnVisibilityTriggerLabel = "Colunas",
		columnVisibilityTriggerVariant = "icon",
		toolbarLeft,
		toolbarRight,
		loading = false,
		tableCaption,
		className,
		paginationClassName,
		toolbarClassName,
		pageSizeOptions = [10, 20, 50],
	} = props;

	const [internalColumnVisibility, setInternalColumnVisibility] =
		useState<VisibilityState>({});
	const columnVisibility =
		controlledColumnVisibility ?? internalColumnVisibility;
	const handleColumnVisibilityChange = useMemo(() => {
		return (updater: Updater<VisibilityState>) => {
			const next =
				typeof updater === "function" ? updater(columnVisibility) : updater;
			if (controlledColumnVisibility === undefined) {
				setInternalColumnVisibility(next);
			}
			onColumnVisibilityChange?.(next);
		};
	}, [columnVisibility, controlledColumnVisibility, onColumnVisibilityChange]);

	const columnsWithSelection = useMemo(() => {
		if (!enableRowSelection) return columns;
		const selectColumn: ColumnDef<T, unknown> = {
			id: "select",
			header: ({ table }) => (
				<div className="flex items-center justify-center">
					<Checkbox
						checked={table.getIsAllPageRowsSelected()}
						indeterminate={
							table.getIsSomePageRowsSelected() &&
							!table.getIsAllPageRowsSelected()
						}
						onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
						aria-label="Selecionar todos"
					/>
				</div>
			),
			cell: ({ row }) => (
				<div className="flex items-center justify-center">
					<Checkbox
						checked={row.getIsSelected()}
						onChange={(e) => row.toggleSelected(e.target.checked)}
						aria-label={`Selecionar linha ${row.id}`}
					/>
				</div>
			),
			enableSorting: false,
			enableHiding: false,
		};
		return [selectColumn, ...columns];
	}, [columns, enableRowSelection]);

	const table = useReactTable({
		data,
		columns: columnsWithSelection,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: Boolean(pagination),
		pageCount: pagination
			? Math.ceil(pagination.total / pagination.pageSize) || 1
			: undefined,
		state: {
			...(pagination
				? {
						pagination: {
							pageIndex: pagination.page - 1,
							pageSize: pagination.pageSize,
						},
					}
				: {}),
			...(enableColumnVisibility ? { columnVisibility } : {}),
		},
		onColumnVisibilityChange: enableColumnVisibility
			? handleColumnVisibilityChange
			: undefined,
	});

	const rowSelectionKey = JSON.stringify(table.getState().rowSelection ?? {});
	// Sync row selection to parent when selection state changes (rowSelectionKey triggers re-run)
	// biome-ignore lint/correctness/useExhaustiveDependencies: rowSelectionKey intentionally in deps to run when selection changes
	useEffect(() => {
		if (!enableRowSelection || !onRowSelectionChange) return;
		const rows = table.getSelectedRowModel().rows.map((r) => r.original);
		onRowSelectionChange(rows);
	}, [enableRowSelection, onRowSelectionChange, table, rowSelectionKey]);

	const toggleAllColumnsVisibilityHandler =
		table.getToggleAllColumnsVisibilityHandler();
	const columnsThatCanHide = table
		.getAllLeafColumns()
		.filter((col) => col.getCanHide());

	const hasToolbar = toolbarLeft != null || toolbarRight != null;
	const showColumnVisibilityTrigger =
		enableColumnVisibility && columnsThatCanHide.length > 0;

	const columnsIcon = (
		<svg
			className="size-4"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<title>Colunas</title>
			<rect width="18" height="18" x="3" y="3" rx="2" />
			<path d="M3 9h18" />
			<path d="M3 15h18" />
			<path d="M9 3v18" />
			<path d="M15 3v18" />
		</svg>
	);
	const chevronDownIcon = (
		<svg
			className="size-4"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<title>Abrir</title>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);

	const columnVisibilityTriggerContent = showColumnVisibilityTrigger ? (
		<Popover.Root>
			<Popover.Trigger asChild>
				{columnVisibilityTriggerVariant === "button" ? (
					<Button
						className="gap-1.5"
						leadingIcon={columnsIcon}
						size="sm"
						trailingIcon={chevronDownIcon}
						variant="outline"
					>
						{columnVisibilityTriggerLabel}
					</Button>
				) : (
					<IconButton
						aria-label={columnVisibilityTriggerLabel}
						icon={columnsIcon}
						size="sm"
						variant="outline"
					/>
				)}
			</Popover.Trigger>
			<Popover.Content className="max-h-[min(60vh,320px)] overflow-y-auto p-2">
				<fieldset className="space-y-1 border-0 p-0 m-0 min-w-0">
					<legend className="sr-only">Colunas visíveis</legend>
					<div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/80">
						<Checkbox
							id="data-table-column-visibility-all"
							aria-label="Mostrar todas as colunas"
							checked={table.getIsAllColumnsVisible()}
							indeterminate={
								table.getIsSomeColumnsVisible() &&
								!table.getIsAllColumnsVisible()
							}
							onChange={toggleAllColumnsVisibilityHandler}
						/>
						<label
							htmlFor="data-table-column-visibility-all"
							className="cursor-pointer"
						>
							Mostrar todas
						</label>
					</div>
					{columnsThatCanHide.map((column) => (
						<div
							key={column.id}
							className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/80"
						>
							<Checkbox
								id={`data-table-column-visibility-${column.id}`}
								aria-label={`Alternar coluna ${getColumnHeaderLabel(column)}`}
								checked={column.getIsVisible()}
								disabled={!column.getCanHide()}
								onChange={column.getToggleVisibilityHandler()}
							/>
							<label
								htmlFor={`data-table-column-visibility-${column.id}`}
								className="cursor-pointer"
							>
								{getColumnHeaderLabel(column)}
							</label>
						</div>
									))}
				</fieldset>
			</Popover.Content>
		</Popover.Root>
	) : null;

	const toolbarSlots: DataTableToolbarSlots = {
		columnVisibilityTrigger: columnVisibilityTriggerContent,
	};

	return (
		<div className={cn("space-y-4", className)}>
			{hasToolbar ? (
				<div
					className={cn(
						"flex flex-wrap items-center justify-between gap-2",
						toolbarClassName,
					)}
				>
					<div className="flex flex-wrap items-center gap-2">
						{toolbarLeft}
					</div>
					<div className="flex flex-wrap items-center gap-2">
						{toolbarRight?.(toolbarSlots)}
					</div>
				</div>
			) : showColumnVisibilityTrigger ? (
				<div
					className={cn(
						"flex flex-wrap items-end justify-end gap-2",
						toolbarClassName,
					)}
				>
					{columnVisibilityTriggerContent}
				</div>
			) : null}
			<Table>
				{tableCaption != null && (
					<TableCaption>{tableCaption}</TableCaption>
				)}
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell
								colSpan={columnsWithSelection.length}
								className="h-24 text-center"
							>
								<Spinner size="md" />
							</TableCell>
						</TableRow>
					) : (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() ? "selected" : undefined}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			{pagination != null && (
				<PaginationRoot
					page={pagination.page}
					pageSize={pagination.pageSize}
					total={pagination.total}
					onPageChange={pagination.onPageChange}
					onPageSizeChange={pagination.onPageSizeChange}
					pageSizeOptions={pageSizeOptions}
					className={paginationClassName}
				/>
			)}
		</div>
	);
}

export function DataTable<T>(props: DataTableProps<T>): JSX.Element {
	return <DataTableInner {...props} />;
}

DataTable.displayName = "DataTable";
