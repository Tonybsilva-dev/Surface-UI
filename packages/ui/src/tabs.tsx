import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	motionTokens,
} from "./foundation";

type TabsContextValue = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsRootProps {
	/** Valor do tab ativo (chave). */
	value: string;
	/** Callback quando o tab muda. */
	onChange: (value: string) => void;
	/** Conteúdo (Tabs.List + Tabs.Trigger e/ou Tabs.Content). */
	children: ReactNode;
	/** Desabilita todos os tabs. */
	disabled?: boolean;
	/** Estilos no container do Root. */
	style?: CSSProperties;
	className?: string;
}

export function TabsRoot(props: TabsRootProps): JSX.Element {
	const { value, onChange, children, disabled = false, style, className } = props;
	return (
		<TabsContext.Provider value={{ value, onChange, disabled }}>
			<div className={className} style={{ ...style }}>
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
	const listStyles: CSSProperties = {
		display: "flex",
		flexWrap: "wrap",
		gap: 0,
		borderBottom: `1px solid ${lightColorScheme.outlineVariant}`,
	};
	return (
		<div className={className} role="tablist" style={{ ...listStyles, ...style }}>
			{children}
		</div>
	);
}

TabsList.displayName = "Tabs.List";

export interface TabsTriggerProps {
	/** Chave deste tab (valor comparado com Tabs.Root value). */
	value: string;
	/** Rótulo do tab. */
	children: ReactNode;
	/** Desabilita este tab. */
	disabled?: boolean;
	style?: CSSProperties;
	className?: string;
}

export function TabsTrigger(props: TabsTriggerProps): JSX.Element {
	const { value, children, disabled = false, style, className } = props;
	const ctx = useContext(TabsContext);
	const isActive = ctx?.value === value;
	const isDisabled = disabled ?? ctx?.disabled ?? false;

	const labelFont = typographyTokens.label.large;

	const buttonStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		paddingBlock: spacingTokens[2],
		paddingInline: spacingTokens[4],
		fontFamily: labelFont.fontFamily,
		fontSize: labelFont.fontSize,
		fontWeight: labelFont.fontWeight,
		lineHeight: labelFont.lineHeight,
		color: isActive ? lightColorScheme.primary : lightColorScheme.onSurfaceVariant,
		backgroundColor: "transparent",
		border: "none",
		borderRadius: 0,
		borderBottom: isActive
			? `2px solid ${lightColorScheme.primary}`
			: "2px solid transparent",
		cursor: isDisabled ? "not-allowed" : "pointer",
		opacity: isDisabled ? 0.38 : 1,
		transition: `color ${motionTokens.duration.short2}, border-color ${motionTokens.duration.short2}`,
	};

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			aria-disabled={isDisabled}
			disabled={isDisabled}
			className={className}
			style={{ ...buttonStyles, ...style }}
			onClick={() => ctx?.onChange(value)}
		>
			{children}
		</button>
	);
}

TabsTrigger.displayName = "Tabs.Trigger";

export interface TabsContentProps {
	/** Chave do painel (mostrado quando Tabs.Root value === value). */
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
		<div
			role="tabpanel"
			aria-hidden={!isActive}
			className={className}
			style={{ ...style }}
		>
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

/** Alias para Tabs.Trigger. Use Tabs.Trigger para nova API. */
export const Tab = TabsTrigger;
