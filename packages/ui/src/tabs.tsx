import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	motionTokens,
} from "./foundation";

export interface TabProps {
	/** Chave deste tab (valor comparado com Tabs value). */
	value: string;
	/** Rótulo do tab. */
	children: ReactNode;
	/** Desabilita o tab. */
	disabled?: boolean;
}

type TabsContextValue = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tab(props: TabProps): JSX.Element {
	const { value, children, disabled = false } = props;
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
			style={buttonStyles}
			onClick={() => ctx?.onChange(value)}
		>
			{children}
		</button>
	);
}

Tab.displayName = "Tab";

export interface TabsProps {
	/** Valor do tab ativo (chave). */
	value: string;
	/** Callback quando o tab muda. */
	onChange: (value: string) => void;
	/** Conteúdo (Tab children). */
	children: ReactNode;
	/** Desabilita todos os tabs. */
	disabled?: boolean;
	/** Estilos no container. */
	style?: CSSProperties;
	className?: string;
}

export function Tabs(props: TabsProps): JSX.Element {
	const { value, onChange, children, disabled = false, style, className } = props;

	const containerStyles: CSSProperties = {
		display: "flex",
		flexWrap: "wrap",
		gap: 0,
		borderBottom: `1px solid ${lightColorScheme.outlineVariant}`,
	};

	return (
		<TabsContext.Provider value={{ value, onChange, disabled }}>
			<div
				role="tablist"
				className={className}
				style={{ ...containerStyles, ...style }}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

Tabs.displayName = "Tabs";
