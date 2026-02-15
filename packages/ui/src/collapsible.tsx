import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "./lib/utils";

type CollapsibleRootProps = React.ComponentProps<typeof CollapsiblePrimitive.Root> & {
	/** Mostrar borda à volta do bloco. @default true */
	bordered?: boolean;
};

function CollapsibleRoot({ bordered = true, className, ...props }: CollapsibleRootProps): JSX.Element {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			className={cn(
				"rounded-md",
				bordered ? "border border-border bg-background" : "border-0",
				className,
			)}
			{...props}
		/>
	);
}

function CollapsibleTrigger(
	props: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>,
): JSX.Element {
	return (
		<CollapsiblePrimitive.CollapsibleTrigger
			data-slot="collapsible-trigger"
			className={cn(
				"flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors duration-[var(--duration-short)] ease-[var(--ease-standard)] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] [&[data-state=open]>svg]:rotate-180",
				props.className,
			)}
			{...props}
		/>
	);
}

function CollapsibleContent(
	props: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>,
): JSX.Element {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			data-slot="collapsible-content"
			className={cn(
				"overflow-hidden transition-[height] duration-[var(--duration-medium)] ease-[var(--ease-standard)]",
				props.className,
			)}
			{...props}
		/>
	);
}

export const Collapsible = CollapsibleRoot;
export { CollapsibleTrigger, CollapsibleContent };
