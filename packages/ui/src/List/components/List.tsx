/**
 * List – lista de itens por composição.
 * List + List.Header, List.Footer, List.Item, List.Item.Meta (avatar, title, description).
 * Suporta bordered, split, itemLayout (horizontal | vertical), loading.
 */
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createContext, forwardRef, useContext } from "react";
import { cn } from "../../lib/utils";
import { Text } from "../../Text/index";
import { Skeleton } from "../../Skeleton/index";

const ListContext = createContext<{
	itemLayout: ListItemLayout;
	size: ListSize;
} | null>(null);

export type ListSize = "default" | "small" | "large";
export type ListItemLayout = "horizontal" | "vertical";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
	/** Borda à volta da lista. */
	bordered?: boolean;
	/** Divisor entre itens. */
	split?: boolean;
	/** Layout do item: horizontal (meta e extra lado a lado) ou vertical (meta em cima, extra e actions em baixo). */
	itemLayout?: ListItemLayout;
	/** Tamanho dos itens. */
	size?: ListSize;
	/** Conteúdo do cabeçalho da lista. */
	header?: ReactNode;
	/** Conteúdo do rodapé da lista. */
	footer?: ReactNode;
	/** Mostrar estado de carregamento (esqueletos nos itens). */
	loading?: boolean;
	children: ReactNode;
}

const sizeClasses: Record<ListSize, string> = {
	default: "py-3",
	small: "py-2",
	large: "py-4",
};

const ListRoot = forwardRef<HTMLUListElement, ListProps>(function ListRoot(
	{
		bordered = false,
		split = true,
		itemLayout = "horizontal",
		size = "default",
		header,
		footer,
		loading = false,
		children,
		className,
		...other
	},
	ref,
) {
	const contextValue = { itemLayout, size };
	return (
		<ListContext.Provider value={contextValue}>
			<div
				className={cn(
					bordered && "rounded-md border border-border bg-card",
					className,
				)}
			>
				{header != null && (
					<div
						className="border-b border-border px-4 py-3"
						data-slot="list-header"
					>
						{header}
					</div>
				)}
				<ul
					ref={ref}
					className={cn(
						"list-none m-0 p-0",
						split && "divide-y divide-border",
					)}
					data-item-layout={itemLayout}
					data-list-size={size}
					{...other}
				>
				{loading ? (
					<>
						{[1, 2, 3].map((i) => (
							<li
								key={`list-skeleton-${i}`}
								className={cn("flex gap-3 px-4", sizeClasses[size])}
								aria-hidden
							>
								<Skeleton className="h-10 w-10 shrink-0 rounded-full" />
								<div className="min-w-0 flex-1 space-y-2">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-3 w-full max-w-[240px]" />
								</div>
							</li>
						))}
					</>
				) : (
					children
				)}
			</ul>
			{footer != null && (
				<div
					className="border-t border-border px-4 py-3"
					data-slot="list-footer"
				>
					{footer}
				</div>
			)}
			</div>
		</ListContext.Provider>
	);
});

ListRoot.displayName = "List";

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
	/** Ações do item (ex.: botões). Se itemLayout vertical, aparecem em baixo; senão à direita. */
	actions?: ReactNode[];
	/** Conteúdo extra (ex.: imagem, badge). Se itemLayout vertical, à direita do meta; senão à direita. */
	extra?: ReactNode;
	children: ReactNode;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
	{ actions, extra, children, className, ...other },
	ref,
) {
	const ctx = useContext(ListContext);
	const layout = ctx?.itemLayout ?? "horizontal";
	const size = ctx?.size ?? "default";

	const isVertical = layout === "vertical";
	const hasActions = actions != null && actions.length > 0;

	return (
		<li
			ref={ref}
			className={cn(
				"flex px-4",
				sizeClasses[size],
				isVertical
					? "flex-col gap-2"
					: "flex-row items-start gap-3",
				className,
			)}
			data-slot="list-item"
			data-item-layout={layout}
			{...other}
		>
			<div
				className={cn(
					"min-w-0 flex gap-3",
					isVertical ? "flex-col" : "flex-1 flex-row items-start",
				)}
			>
				{children}
				{extra != null && (
					<div
						className={cn(
							"shrink-0",
							isVertical ? "order-last" : "ml-auto",
						)}
						data-slot="list-item-extra"
					>
						{extra}
					</div>
				)}
			</div>
			{hasActions && (
				<div
					className={cn(
						"flex items-center gap-2 shrink-0",
						isVertical && "border-t border-border pt-2 -mx-4 px-4",
					)}
					data-slot="list-item-actions"
				>
					{actions.map((node, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: actions são ReactNodes sem id estável
							key={i}
						>
							{node}
						</span>
					))}
				</div>
			)}
		</li>
	);
});

ListItem.displayName = "List.Item";

export interface ListItemMetaProps {
	/** Avatar do item. */
	avatar?: ReactNode;
	/** Título do item. */
	title?: ReactNode;
	/** Descrição do item. */
	description?: ReactNode;
	/** ClassName no container do meta. */
	className?: string;
	/** Estilos semânticos (para documentação/dom). */
	classNames?: { avatar?: string; title?: string; description?: string };
	styles?: { avatar?: CSSProperties; title?: CSSProperties; description?: CSSProperties };
}

export function ListItemMeta({
	avatar,
	title,
	description,
	className,
	classNames,
	styles,
}: ListItemMetaProps): JSX.Element {
	return (
		<div
			className={cn("flex min-w-0 flex-1 gap-3", className)}
			data-slot="list-item-meta"
		>
			{avatar != null && (
				<div
					className={cn("shrink-0", classNames?.avatar)}
					style={styles?.avatar}
					data-slot="list-item-meta-avatar"
				>
					{avatar}
				</div>
			)}
			<div className="min-w-0 flex-1 space-y-0.5">
				{title != null && (
					<div
						className={classNames?.title}
						style={styles?.title}
						data-slot="list-item-meta-title"
					>
						{typeof title === "string" ? (
							<Text variant="titleSmall" as="span">
								{title}
							</Text>
						) : (
							title
						)}
					</div>
				)}
				{description != null && (
					<div
						className={cn(classNames?.description, "text-muted-foreground")}
						style={styles?.description}
						data-slot="list-item-meta-description"
					>
						{typeof description === "string" ? (
							<Text variant="bodySmall" tone="muted" as="p">
								{description}
							</Text>
						) : (
							description
						)}
					</div>
				)}
			</div>
		</div>
	);
}

ListItemMeta.displayName = "List.Item.Meta";

export interface ListComponent {
	(props: ListProps): JSX.Element;
	Item: typeof ListItem;
	ItemMeta: typeof ListItemMeta;
}

(ListItem as unknown as { Meta: typeof ListItemMeta }).Meta = ListItemMeta;

export const List = ListRoot as unknown as ListComponent;
(List as ListComponent).Item = ListItem;
(List as ListComponent).ItemMeta = ListItemMeta;
