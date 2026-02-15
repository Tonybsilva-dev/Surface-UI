/**
 * Pagination – controles de paginação (server-side ou client-side).
 * APIs: align, size, disabled, hideOnSinglePage, showSizeChanger, showTotal,
 * showQuickJumper, classNames (Semantic DOM). Composição: Pagination.Info, .Prev,
 * .Next, .PageSize, .Pages, .QuickJumper.
 */
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, forwardRef, useContext, useState } from "react";
import { cn } from "./lib/utils";
import { Button } from "./button";
import { Select } from "./select";

export type PaginationAlign = "start" | "center" | "end";
export type PaginationSize = "sm" | "md" | "lg";

/** ClassNames por estrutura semântica (Semantic DOM). */
export interface PaginationClassNames {
	root?: string;
	info?: string;
	prev?: string;
	next?: string;
	pageSize?: string;
	/** Container dos botões de página (Prev + números + Next). */
	pages?: string;
	/** Cada botão de número de página. */
	item?: string;
	quickJumper?: string;
}

/** showTotal: false esconde; true usa texto padrão; função customiza o conteúdo. */
export type PaginationShowTotal =
	| boolean
	| ((total: number, range: [number, number]) => ReactNode);

export interface PaginationContextValue {
	page: number;
	pageSize: number;
	total: number;
	pageCount: number;
	start: number;
	end: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	pageSizeOptions: number[];
	align: PaginationAlign;
	size: PaginationSize;
	disabled: boolean;
	showSizeChanger: boolean;
	showTotal: PaginationShowTotal;
	showQuickJumper: boolean;
	classNames: PaginationClassNames;
}

const PaginationContext = createContext<PaginationContextValue | null>(null);

function usePagination(): PaginationContextValue {
	const ctx = useContext(PaginationContext);
	if (!ctx) throw new Error("Pagination subcomponents must be used within Pagination");
	return ctx;
}

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
	/** Página atual (1-based). */
	page: number;
	/** Itens por página. */
	pageSize: number;
	/** Total de itens. */
	total: number;
	/** Callback ao mudar de página. */
	onPageChange: (page: number) => void;
	/** Callback ao mudar tamanho da página. */
	onPageSizeChange: (pageSize: number) => void;
	/** Opções para o seletor de tamanho (ex.: [10, 20, 50]). */
	pageSizeOptions?: number[];
	/** Alinhamento do conteúdo (start, center, end). */
	align?: PaginationAlign;
	/** Tamanho dos botões e do seletor (sm, md, lg). */
	size?: PaginationSize;
	/** Desativa toda a paginação. */
	disabled?: boolean;
	/** Esconder quando há apenas uma página. */
	hideOnSinglePage?: boolean;
	/** Mostrar seletor "Itens por página". */
	showSizeChanger?: boolean;
	/** Mostrar total/intervalo: false esconde, true padrão, função customiza. */
	showTotal?: PaginationShowTotal;
	/** Mostrar "Ir para página" (quick jumper). */
	showQuickJumper?: boolean;
	/** Classes por estrutura semântica (root, info, prev, next, pageSize, pages, item, quickJumper). */
	classNames?: PaginationClassNames;
	/** Conteúdo customizado (Info, Prev, Next, PageSize, Pages, QuickJumper) ou vazio para layout padrão. */
	children?: ReactNode;
}

const alignClasses: Record<PaginationAlign, string> = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
};

const buttonSizeMap: Record<PaginationSize, "sm" | "default" | "lg"> = {
	sm: "sm",
	md: "default",
	lg: "lg",
};

const selectSizeMap: Record<PaginationSize, "sm" | "default"> = {
	sm: "sm",
	md: "default",
	lg: "default",
};

const PaginationRoot = forwardRef<HTMLDivElement, PaginationProps>(
	function PaginationRoot(
		{
			page,
			pageSize,
			total,
			onPageChange,
			onPageSizeChange,
			pageSizeOptions = [10, 20, 50],
			align = "start",
			size = "md",
			disabled = false,
			hideOnSinglePage = false,
			showSizeChanger = true,
			showTotal = true,
			showQuickJumper = false,
			classNames = {},
			children,
			className,
			...other
		},
		ref,
	) {
		const pageCount = total > 0 ? Math.ceil(total / pageSize) : 1;
		const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
		const end = Math.min(page * pageSize, total);

		const ctx: PaginationContextValue = {
			page,
			pageSize,
			total,
			pageCount,
			start,
			end,
			onPageChange,
			onPageSizeChange,
			pageSizeOptions,
			align,
			size,
			disabled,
			showSizeChanger,
			showTotal,
			showQuickJumper,
			classNames,
		};

		if (hideOnSinglePage && pageCount <= 1) {
			return null;
		}

		return (
			<PaginationContext.Provider value={ctx}>
				{/* biome-ignore lint/a11y/useSemanticElements: div+role for DTS build compatibility */}
				<div
					ref={ref}
					role="navigation"
					aria-label="Paginação"
					className={cn(
						"flex flex-wrap items-center gap-2",
						alignClasses[align],
						classNames.root,
						className,
					)}
					{...other}
				>
					{children ?? (
						<>
							{showTotal !== false && <PaginationInfo />}
							<div className={cn("flex items-center gap-2", classNames.pages)}>
								<PaginationPrev />
								<PaginationPages />
								<PaginationNext />
							</div>
							{showSizeChanger && <PaginationPageSize />}
							{showQuickJumper && <PaginationQuickJumper />}
						</>
					)}
				</div>
			</PaginationContext.Provider>
		);
	},
);

PaginationRoot.displayName = "Pagination";

export interface PaginationInfoProps extends HTMLAttributes<HTMLSpanElement> {
	children?: ReactNode;
}

export const PaginationInfo = forwardRef<HTMLSpanElement, PaginationInfoProps>(
	function PaginationInfo({ className, children, ...other }, ref) {
		const { start, end, total, showTotal, classNames } = usePagination();
		const content =
			children ??
			(typeof showTotal === "function"
				? showTotal(total, [start, end])
				: showTotal === true
					? total === 0
						? "0 itens"
						: `${start}–${end} de ${total}`
					: null);

		if (content == null) return null;

		return (
			<span
				ref={ref}
				className={cn("text-muted-foreground text-sm", classNames.info, className)}
				{...other}
			>
				{content}
			</span>
		);
	},
);

PaginationInfo.displayName = "Pagination.Info";

/** Gera os números de página a mostrar (com ellipsis). */
function getPageNumbers(
	current: number,
	pageCount: number,
	maxVisible: number,
): (number | "ellipsis")[] {
	if (pageCount <= maxVisible) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}
	const pages: (number | "ellipsis")[] = [];
	const half = Math.floor(maxVisible / 2);
	if (current <= half) {
		for (let i = 1; i <= maxVisible; i++) pages.push(i);
		pages.push("ellipsis", pageCount);
	} else if (current >= pageCount - half) {
		pages.push(1, "ellipsis");
		for (let i = pageCount - maxVisible + 1; i <= pageCount; i++) pages.push(i);
	} else {
		pages.push(1, "ellipsis", current - 1, current, current + 1, "ellipsis", pageCount);
	}
	return pages;
}

export interface PaginationPagesProps {
	/** Número máximo de botões de página visíveis (excl. ellipsis). */
	maxVisible?: number;
}

export function PaginationPages({ maxVisible = 5 }: PaginationPagesProps): JSX.Element {
	const { page, pageCount, onPageChange, disabled, size, classNames } =
		usePagination();
	const buttonSize = buttonSizeMap[size];
	const items = getPageNumbers(page, pageCount, maxVisible);

	return (
		<>
			{items.map((item, i) =>
				item === "ellipsis" ? (
					<span
						key={`ellipsis-${String(items[i - 1])}-${String(items[i + 1])}`}
						className="text-muted-foreground flex h-9 min-w-9 items-center justify-center px-2 text-sm"
						aria-hidden
					>
						…
					</span>
				) : (
					<Button
						key={`page-${item}`}
						type="button"
						variant={page === item ? "default" : "outline"}
						size={buttonSize}
						disabled={disabled}
						aria-label={`Página ${item}`}
						aria-current={page === item ? "page" : undefined}
						className={cn(
							"min-w-9",
							classNames.item,
						)}
						onClick={() => onPageChange(item)}
					>
						{item}
					</Button>
				),
			)}
		</>
	);
}

PaginationPages.displayName = "Pagination.Pages";

export interface PaginationPrevProps extends HTMLAttributes<HTMLButtonElement> {
	labelPrev?: string;
}

export const PaginationPrev = forwardRef<HTMLButtonElement, PaginationPrevProps>(
	function PaginationPrev(
		{ className, labelPrev = "Anterior", children, ...other },
		ref,
	) {
		const { page, onPageChange, disabled, size, classNames } = usePagination();
		const isDisabled = disabled || page <= 1;
		const buttonSize = buttonSizeMap[size];

		return (
			<Button
				ref={ref}
				type="button"
				variant="outline"
				size={buttonSize}
				disabled={isDisabled}
				aria-label={labelPrev}
				className={cn(classNames.prev, className)}
				onClick={() => onPageChange(page - 1)}
				{...other}
			>
				{children ?? "‹"}
			</Button>
		);
	},
);

PaginationPrev.displayName = "Pagination.Prev";

export interface PaginationNextProps extends HTMLAttributes<HTMLButtonElement> {
	labelNext?: string;
}

export const PaginationNext = forwardRef<HTMLButtonElement, PaginationNextProps>(
	function PaginationNext(
		{ className, labelNext = "Próximo", children, ...other },
		ref,
	) {
		const { page, pageCount, onPageChange, disabled, size, classNames } =
			usePagination();
		const isDisabled = disabled || page >= pageCount || pageCount <= 0;
		const buttonSize = buttonSizeMap[size];

		return (
			<Button
				ref={ref}
				type="button"
				variant="outline"
				size={buttonSize}
				disabled={isDisabled}
				aria-label={labelNext}
				className={cn(classNames.next, className)}
				onClick={() => onPageChange(page + 1)}
				{...other}
			>
				{children ?? "›"}
			</Button>
		);
	},
);

PaginationNext.displayName = "Pagination.Next";

export interface PaginationPageSizeProps {
	/** Rótulo do seletor (ex.: "Itens por página"). */
	label?: string;
	className?: string;
}

export function PaginationPageSize({
	label = "Itens por página",
	className,
}: PaginationPageSizeProps): JSX.Element {
	const {
		pageSize,
		onPageSizeChange,
		pageSizeOptions,
		disabled,
		size,
		classNames,
	} = usePagination();
	const selectSize = selectSizeMap[size];
	const value = String(pageSize);

	const triggerHeight = size === "sm" ? "h-8" : size === "lg" ? "h-11" : "h-10";

	return (
		<div className={cn("flex items-center gap-2", classNames.pageSize, className)}>
			<span className="text-muted-foreground whitespace-nowrap text-sm">
				{label}
			</span>
			<Select.Root
				value={value}
				onValueChange={(v) => onPageSizeChange(Number(v))}
				size={selectSize}
				disabled={disabled}
			>
				<Select.Trigger className={cn("min-w-[80px]", triggerHeight)}>
					<Select.Value />
				</Select.Trigger>
				<Select.Content>
					{pageSizeOptions.map((s) => (
						<Select.Item key={s} value={String(s)}>
							{s}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		</div>
	);
}

PaginationPageSize.displayName = "Pagination.PageSize";

export interface PaginationQuickJumperProps {
	/** Rótulo antes do input (ex.: "Ir para"). */
	labelGoTo?: string;
	/** Rótulo após o input (ex.: "Página"). */
	labelPage?: string;
	className?: string;
}

export function PaginationQuickJumper({
	labelGoTo = "Ir para",
	labelPage = "Página",
	className,
}: PaginationQuickJumperProps): JSX.Element {
	const { pageCount, onPageChange, disabled, classNames } = usePagination();
	const [inputValue, setInputValue] = useState("");

	const handleGo = () => {
		const num = Number(inputValue);
		if (Number.isInteger(num) && num >= 1 && num <= pageCount) {
			onPageChange(num);
			setInputValue("");
		}
	};

	return (
		<div
			className={cn(
				"flex items-center gap-2 text-sm",
				classNames.quickJumper,
				className,
			)}
		>
			<span className="text-muted-foreground whitespace-nowrap">{labelGoTo}</span>
			<input
				type="number"
				min={1}
				max={pageCount}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleGo()}
				disabled={disabled}
				className="border-input bg-background text-foreground h-9 w-14 rounded-md border px-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-[var(--disabled-opacity)]"
				aria-label={`${labelGoTo} ${labelPage}`}
			/>
			<span className="text-muted-foreground whitespace-nowrap">{labelPage}</span>
			<Button
				type="button"
				variant="outline"
				size="sm"
				disabled={disabled}
				onClick={handleGo}
				aria-label="Ir"
			>
				Ir
			</Button>
		</div>
	);
}

PaginationQuickJumper.displayName = "Pagination.QuickJumper";

export interface PaginationComponent {
	(props: PaginationProps): JSX.Element | null;
	Info: typeof PaginationInfo;
	Prev: typeof PaginationPrev;
	Next: typeof PaginationNext;
	PageSize: typeof PaginationPageSize;
	Pages: typeof PaginationPages;
	QuickJumper: typeof PaginationQuickJumper;
}

export { PaginationRoot };
export const Pagination = PaginationRoot as unknown as PaginationComponent;
Pagination.Info = PaginationInfo;
Pagination.Prev = PaginationPrev;
Pagination.Next = PaginationNext;
Pagination.PageSize = PaginationPageSize;
Pagination.Pages = PaginationPages;
Pagination.QuickJumper = PaginationQuickJumper;
