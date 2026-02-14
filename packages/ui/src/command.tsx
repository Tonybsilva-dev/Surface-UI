/**
 * Command – lista filtrável (cmdk) por composição.
 * Command + Input + List + Empty + Group + Item + Separator + Shortcut + Dialog.
 * CommandDialog abre o Command dentro de um Dialog.
 */
import type { ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "./lib/utils";
import { Dialog } from "./dialog";

const SearchIcon = () => (
	<svg
		className="size-4 shrink-0 opacity-50"
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
		<title>Buscar</title>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
);

export interface CommandProps
	extends React.ComponentProps<typeof CommandPrimitive> {
	className?: string;
}

function CommandRoot({ className, ...props }: CommandProps): JSX.Element {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(
				"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
				className,
			)}
			{...props}
		/>
	);
}

CommandRoot.displayName = "Command";

export interface CommandDialogProps
	extends Omit<React.ComponentProps<typeof Dialog.Root>, "children"> {
	title?: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	className,
	open,
	onOpenChange,
	...props
}: CommandDialogProps): JSX.Element {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
			<Dialog.Header className="sr-only">
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Description>{description}</Dialog.Description>
			</Dialog.Header>
			<Dialog.Content
				className={cn("overflow-hidden p-0", className)}
				hideCloseButton
			>
				<Command className="[&_[cmdk-group-heading]]:text-muted-foreground **[data-slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</Dialog.Content>
		</Dialog.Root>
	);
}

CommandDialog.displayName = "CommandDialog";

export interface CommandInputProps
	extends React.ComponentProps<typeof CommandPrimitive.Input> {
	className?: string;
}

export function CommandInput({
	className,
	...props
}: CommandInputProps): JSX.Element {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-9 items-center gap-2 border-b border-border px-3"
		>
			<SearchIcon />
			<CommandPrimitive.Input
				data-slot="command-input"
				className={cn(
					"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

CommandInput.displayName = "Command.Input";

export interface CommandListProps
	extends React.ComponentProps<typeof CommandPrimitive.List> {}

export function CommandList({
	className,
	...props
}: CommandListProps): JSX.Element {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn(
				"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
				className,
			)}
			{...props}
		/>
	);
}

CommandList.displayName = "Command.List";

export interface CommandEmptyProps
	extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

export function CommandEmpty({ className, ...props }: CommandEmptyProps): JSX.Element {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn("py-6 text-center text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

CommandEmpty.displayName = "Command.Empty";

export interface CommandGroupProps
	extends React.ComponentProps<typeof CommandPrimitive.Group> {
	className?: string;
}

export function CommandGroup({
	className,
	...props
}: CommandGroupProps): JSX.Element {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className,
			)}
			{...props}
		/>
	);
}

CommandGroup.displayName = "Command.Group";

export interface CommandSeparatorProps
	extends React.ComponentProps<typeof CommandPrimitive.Separator> {
	className?: string;
}

export function CommandSeparator({
	className,
	...props
}: CommandSeparatorProps): JSX.Element {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("bg-border -mx-1 h-px", className)}
			{...props}
		/>
	);
}

CommandSeparator.displayName = "Command.Separator";

export interface CommandItemProps
	extends React.ComponentProps<typeof CommandPrimitive.Item> {
	className?: string;
	/** Ícone ou elemento à esquerda (ex.: check quando selecionado no Combobox). */
	leading?: ReactNode;
}

export function CommandItem({
	className,
	leading,
	children,
	...props
}: CommandItemProps): JSX.Element {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{leading != null ? (
				<span className="flex size-4 shrink-0 items-center justify-center">
					{leading}
				</span>
			) : null}
			{children}
		</CommandPrimitive.Item>
	);
}

CommandItem.displayName = "Command.Item";

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
	className?: string;
}

export function CommandShortcut({
	className,
	...props
}: CommandShortcutProps): JSX.Element {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				className,
			)}
			{...props}
		/>
	);
}

CommandShortcut.displayName = "Command.Shortcut";

// API por composição: Command (root) + Input, List, Empty, Group, Item, Separator, Shortcut, Dialog
export const Command = Object.assign(CommandRoot, {
	Dialog: CommandDialog,
	Input: CommandInput,
	List: CommandList,
	Empty: CommandEmpty,
	Group: CommandGroup,
	Item: CommandItem,
	Separator: CommandSeparator,
	Shortcut: CommandShortcut,
	Root: CommandRoot,
});
