import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext } from "react";
import { cn } from "./lib/utils";

type TabsContextValue = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsRootProps {
	value: string;
	onChange: (value: string) => void;
	children: ReactNode;
	disabled?: boolean;
	style?: CSSProperties;
	className?: string;
}

export function TabsRoot(props: TabsRootProps): JSX.Element {
	const { value, onChange, children, disabled = false, style, className } = props;
	return (
		<TabsContext.Provider value={{ value, onChange, disabled }}>
			<div className={className} style={style}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

TabsRoot.displayName = "Tabs.Root";

export interface TabsListProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TabsList(props: TabsListProps): JSX.Element {
	const { children, style, className } = props;
	return (
		<div
			className={cn("flex flex-wrap gap-0 border-b border-border", className)}
			role="tablist"
			style={style}
		>
			{children}
		</div>
	);
}

TabsList.displayName = "Tabs.List";

export interface TabsTriggerProps {
	value: string;
	children: ReactNode;
	disabled?: boolean;
	style?: CSSProperties;
	className?: string;
}

export function TabsTrigger(props: TabsTriggerProps): JSX.Element {
	const { value, children, disabled = false, style, className } = props;
	const ctx = useContext(TabsContext);
	const isActive = ctx?.value === value;
	const isDisabled = disabled ?? ctx?.disabled ?? false;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			aria-disabled={isDisabled}
			disabled={isDisabled}
			className={cn(
				"inline-flex items-center justify-center py-2 px-4 text-sm font-medium leading-none bg-transparent border-0 rounded-none border-b-2 transition-colors duration-100",
				isActive ? "text-primary border-primary" : "text-muted-foreground border-transparent",
				isDisabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
				className,
			)}
			style={style}
			onClick={() => ctx?.onChange(value)}
		>
			{children}
		</button>
	);
}

TabsTrigger.displayName = "Tabs.Trigger";

export interface TabsContentProps {
	value: string;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function TabsContent(props: TabsContentProps): JSX.Element {
	const { value, children, style, className } = props;
	const ctx = useContext(TabsContext);
	const isActive = ctx?.value === value;

	if (!isActive) return <></>;

	return (
		<div role="tabpanel" aria-hidden={!isActive} className={className} style={style}>
			{children}
		</div>
	);
}

TabsContent.displayName = "Tabs.Content";

function TabsRootWithList(props: TabsRootProps): JSX.Element {
	const { children, ...rootProps } = props;
	return (
		<TabsRoot {...rootProps}>
			<TabsList>{children}</TabsList>
		</TabsRoot>
	);
}

export const Tabs = Object.assign(TabsRootWithList, {
	Root: TabsRoot,
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});

export const Tab = TabsTrigger;
