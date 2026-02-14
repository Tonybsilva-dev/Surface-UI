/**
 * Combobox – seleção com busca, por composição.
 * Combobox.Root + Trigger + Content; dentro do Content: Command (Input, List, Empty, Group, Item).
 * Também exporta Combobox com API simples (options, value, onValueChange) para uso direto.
 */
import type { ReactNode } from "react";
import React, {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
	useMemo,
	forwardRef,
} from "react";
import { cn } from "./lib/utils";
import { Popover } from "./popover";
import { Command } from "./command";
import { Button } from "./button";

// Ícones inline (sem dependência de lucide)
const ChevronsUpDownIcon = () => (
	<svg
		className="ml-2 h-4 w-4 shrink-0 opacity-50"
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
	>
		<title>Expandir lista</title>
		<path d="m7 15 5 5 5-5" />
		<path d="m7 9 5-5 5 5" />
	</svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
	<svg
		className={cn("h-4 w-4", className)}
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
	>
		<title>Selecionado</title>
		<path d="M20 6 9 17l-5-5" />
	</svg>
);

export interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface ComboboxContextValue {
	value: string | undefined;
	onValueChange: (v: string) => void;
	open: boolean;
	setOpen: (v: boolean) => void;
	search: string;
	setSearch: (v: string) => void;
	options: ComboboxOption[];
	triggerRef: React.RefObject<HTMLButtonElement | null>;
	disabled?: boolean;
	isLoading?: boolean;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export interface ComboboxRootProps {
	value?: string;
	onValueChange?: (value: string) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	disabled?: boolean;
	isLoading?: boolean;
	/** Opções (usado pelo Combobox com API simples; em composição pode ser vazio). */
	options?: ComboboxOption[];
	children: ReactNode;
}

export function ComboboxRoot(props: ComboboxRootProps): JSX.Element {
	const {
		value,
		onValueChange,
		open: controlledOpen,
		onOpenChange,
		disabled,
		isLoading,
		options = [],
		children,
	} = props;
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const [search, setSearch] = useState("");
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const isControlledOpen = controlledOpen !== undefined;
	const open = isControlledOpen ? controlledOpen : uncontrolledOpen;
	const setOpen = (v: boolean) => {
		if (!isControlledOpen) setUncontrolledOpen(v);
		onOpenChange?.(v);
		if (!v) setSearch("");
	};

	const ctx: ComboboxContextValue = {
		value,
		onValueChange: onValueChange ?? (() => {}),
		open,
		setOpen,
		search,
		setSearch,
		options,
		triggerRef,
		disabled,
		isLoading,
	};

	return (
		<ComboboxContext.Provider value={ctx}>
			<Popover.Root open={open} onOpenChange={setOpen} modal>
				{children}
			</Popover.Root>
		</ComboboxContext.Provider>
	);
}

ComboboxRoot.displayName = "Combobox.Root";

export interface ComboboxTriggerProps {
	children?: ReactNode;
	placeholder?: string;
	loadingMessage?: string;
	triggerClassName?: string;
	triggerWidth?: string;
	"aria-label"?: string;
}

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
	function ComboboxTrigger(
		{
			children,
			placeholder = "Selecione...",
			loadingMessage = "Carregando...",
			triggerClassName,
			triggerWidth = "w-full",
			"aria-label": ariaLabel,
		},
		ref,
	) {
		const ctx = useContext(ComboboxContext);
		const selectedOption = useMemo(
			() => ctx?.options.find((o) => o.value === ctx.value),
			[ctx?.options, ctx?.value],
		);

		if (!ctx) return <>{children}</>;

		const mergedRef = (el: HTMLButtonElement | null) => {
			(ctx.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
			if (typeof ref === "function") ref(el);
			else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
		};
		const trigger = (
			<Popover.Trigger asChild>
				<Button
					ref={mergedRef}
					variant="outline"
					role="combobox"
					aria-expanded={ctx.open}
					aria-label={ariaLabel ?? placeholder}
					disabled={ctx.disabled || ctx.isLoading}
					className={cn(
						triggerWidth,
						"justify-between",
						!selectedOption && "text-muted-foreground",
						triggerClassName,
					)}
				>
					{ctx.isLoading ? (
						<span className="text-muted-foreground">{loadingMessage}</span>
					) : selectedOption ? (
						selectedOption.label
					) : (
						<span className="text-muted-foreground">{placeholder}</span>
					)}
					<ChevronsUpDownIcon />
				</Button>
			</Popover.Trigger>
		);

		return children ?? trigger;
	},
);

ComboboxTrigger.displayName = "Combobox.Trigger";

export interface ComboboxContentProps {
	children?: ReactNode;
	searchPlaceholder?: string;
	emptyMessage?: string;
	popoverClassName?: string;
	popoverWidth?: number;
}

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
	const {
		children,
		searchPlaceholder = "Buscar...",
		emptyMessage = "Nenhum resultado encontrado.",
		popoverClassName,
		popoverWidth,
	} = props;
	const ctx = useContext(ComboboxContext);
	const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (!ctx || popoverWidth != null) return;
		const measure = () => {
			if (ctx.triggerRef.current)
				setContentWidth(ctx.triggerRef.current.offsetWidth);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [ctx, popoverWidth]);

	const filtered = useMemo(() => {
		if (!ctx) return [];
		if (!ctx.search.trim()) return ctx.options;
		const q = ctx.search.toLowerCase();
		return ctx.options.filter((o) =>
			o.label.toLowerCase().includes(q),
		);
	}, [ctx?.options, ctx?.search, ctx]);

	const contentStyle =
		popoverWidth != null
			? { width: popoverWidth }
			: contentWidth != null
				? { width: contentWidth }
				: undefined;

	if (!ctx) return <>{children}</>;

	// Composição: se o consumidor passou children, renderiza dentro do Popover
	if (children != null && React.Children.count(children) > 0) {
		return (
			<Popover.Content
				className={cn("p-0", popoverClassName)}
				style={contentStyle}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				{children}
			</Popover.Content>
		);
	}

	return (
		<Popover.Content
			className={cn("p-0", popoverClassName)}
			style={contentStyle}
			onOpenAutoFocus={(e) => e.preventDefault()}
		>
			<Command.Root
				className="flex flex-col overflow-hidden"
				value={ctx.search}
				onValueChange={ctx.setSearch}
			>
				<Command.Input
					placeholder={searchPlaceholder}
					className="h-9 shrink-0 border-0 border-b border-border rounded-none"
				/>
				<Command.List className="max-h-[300px]">
					{ctx.isLoading ? (
						<Command.Empty>Carregando...</Command.Empty>
					) : filtered.length === 0 ? (
						<Command.Empty>{emptyMessage}</Command.Empty>
					) : (
						<Command.Group>
							{filtered.map((option) => (
								<Command.Item
									key={option.value}
									value={option.label}
									disabled={option.disabled}
									onSelect={() => {
										const next = ctx.value === option.value ? "" : option.value;
										ctx.onValueChange(next);
										ctx.setOpen(false);
									}}
									leading={
										<CheckIcon
											className={
												ctx.value === option.value ? "opacity-100" : "opacity-0"
											}
										/>
									}
								>
									{option.label}
								</Command.Item>
							))}
						</Command.Group>
					)}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	);
}

ComboboxContent.displayName = "Combobox.Content";

// ——— API simples (options + value/onValueChange) ———

export interface ComboboxProps {
	options: ComboboxOption[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	disabled?: boolean;
	isLoading?: boolean;
	loadingMessage?: string;
	popoverWidth?: number;
	triggerWidth?: string;
	triggerClassName?: string;
	popoverClassName?: string;
	"aria-label"?: string;
}

/**
 * Combobox com API simples: passa options, value e onValueChange.
 * Internamente usa Combobox.Root + Trigger + Content por composição.
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
	function Combobox(
		{
			options,
			value,
			onValueChange,
			placeholder = "Selecione...",
			searchPlaceholder = "Buscar...",
			emptyMessage = "Nenhum resultado encontrado.",
			disabled = false,
			isLoading = false,
			loadingMessage = "Carregando...",
			popoverWidth,
			triggerWidth = "w-full",
			triggerClassName,
			popoverClassName,
			"aria-label": ariaLabel,
		},
		ref,
	) {
		return (
			<ComboboxRoot
				value={value}
				onValueChange={onValueChange}
				options={options}
				disabled={disabled}
				isLoading={isLoading}
			>
				<ComboboxTrigger
					ref={ref}
					placeholder={placeholder}
					loadingMessage={loadingMessage}
					triggerWidth={triggerWidth}
					triggerClassName={triggerClassName}
					aria-label={ariaLabel}
				/>
				<ComboboxContent
					searchPlaceholder={searchPlaceholder}
					emptyMessage={emptyMessage}
					popoverClassName={popoverClassName}
					popoverWidth={popoverWidth}
				/>
			</ComboboxRoot>
		);
	},
);

Combobox.displayName = "Combobox";

// Anexar subcomponentes para uso por composição
(Combobox as unknown as { Root: typeof ComboboxRoot }).Root = ComboboxRoot;
(Combobox as unknown as { Trigger: typeof ComboboxTrigger }).Trigger = ComboboxTrigger;
(Combobox as unknown as { Content: typeof ComboboxContent }).Content = ComboboxContent;
