import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { lightColorScheme, spacingTokens } from "./foundation";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "fullWidth" | "inset";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Orientação da linha: horizontal (padrão) ou vertical.
	 */
	orientation?: DividerOrientation;
	/**
	 * fullWidth: linha de ponta a ponta. inset: margem nas laterais (horizontal) ou topo/base (vertical).
	 */
	variant?: DividerVariant;
	/**
	 * Conteúdo opcional no centro (ex.: texto). Quando definido, a linha é quebrada em dois segmentos.
	 */
	children?: ReactNode;
	/** Estilos inline. */
	style?: CSSProperties;
}

const lineColor = lightColorScheme.outline;

export function Divider(props: DividerProps): JSX.Element {
	const {
		orientation = "horizontal",
		variant = "fullWidth",
		children,
		style,
		"aria-orientation": _ariaOrientation,
		...other
	} = props;

	const isHorizontal = orientation === "horizontal";
	const hasLabel = children != null;

	const insetMargin = variant === "inset" ? spacingTokens[4] : "0"; // 16px

	const containerStyles: CSSProperties = isHorizontal
		? {
				display: "flex",
				alignItems: "center",
				width: "100%",
				flexShrink: 0,
		  }
		: {
				display: "inline-flex",
				flexDirection: "column",
				alignSelf: "stretch",
				flexShrink: 0,
		  };

	const lineStyles: CSSProperties = isHorizontal
		? {
				flex: hasLabel ? undefined : 1,
				height: 1,
				minWidth: hasLabel ? undefined : 0,
				backgroundColor: lineColor,
				marginLeft: hasLabel ? undefined : insetMargin,
				marginRight: hasLabel ? undefined : insetMargin,
		  }
		: {
				width: 1,
				flex: hasLabel ? undefined : 1,
				minHeight: hasLabel ? undefined : 0,
				backgroundColor: lineColor,
				marginTop: hasLabel ? undefined : insetMargin,
				marginBottom: hasLabel ? undefined : insetMargin,
		  };

	const labelStyles: CSSProperties = isHorizontal
		? { paddingLeft: spacingTokens[2], paddingRight: spacingTokens[2], flexShrink: 0 }
		: { paddingTop: spacingTokens[2], paddingBottom: spacingTokens[2], flexShrink: 0 };

	// Horizontal sem rótulo: usa <hr> nativo. Demais casos: div com linha(s) e opcional rótulo.
	if (isHorizontal && !hasLabel) {
		return (
			<hr
				{...other}
				style={{
					width: "100%",
					border: "none",
					borderTop: `1px solid ${lineColor}`,
					marginLeft: insetMargin,
					marginRight: insetMargin,
					...style,
				}}
			/>
		);
	}

	// Com rótulo ou vertical: container é layout (presentation). Linha(s) são decorativas.
	return (
		<div role="presentation" {...other} style={{ ...containerStyles, ...style }}>
			<div style={lineStyles} />
			{hasLabel ? <span style={labelStyles}>{children}</span> : null}
			{hasLabel ? <div style={lineStyles} /> : null}
		</div>
	);
}

Divider.displayName = "Divider";
