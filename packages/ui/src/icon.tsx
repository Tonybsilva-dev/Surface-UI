import type { CSSProperties, ReactNode } from "react";
import { lightColorScheme } from "./foundation";

export type IconSize = "sm" | "md" | "large";

export interface IconProps {
	/** Ícone (SVG ou elemento). Consumidor passa ReactNode (ex.: Lucide, Phosphor). */
	children?: ReactNode;
	/** Tamanho: sm (16px), md (20px), large (24px). Conforme iconSizeRecommendations. */
	size?: IconSize;
	/** Cor do ícone (string CSS ou token). Default: onSurface. */
	color?: string;
	/** Decorative por defeito (aria-hidden). Se informativo, use ariaLabel. */
	ariaHidden?: boolean;
	/** Quando o ícone comunica informação, use para leitores de tela (role="img" + aria-label). */
	ariaLabel?: string;
	/** Estilos inline no container. */
	style?: CSSProperties;
}

const sizeMap: Record<IconSize, number> = {
	sm: 16,
	md: 20,
	large: 24,
};

export function Icon(props: IconProps): JSX.Element {
	const {
		children,
		size = "md",
		color = lightColorScheme.onSurface,
		ariaHidden = true,
		ariaLabel,
		style,
	} = props;

	const side = sizeMap[size];

	const containerStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: side,
		height: side,
		color,
		flexShrink: 0,
	};

	const content = children;

	return (
		<span
			style={{ ...containerStyles, ...style }}
			role={ariaLabel ? "img" : undefined}
			aria-label={ariaLabel}
			aria-hidden={ariaLabel ? undefined : ariaHidden}
		>
			{content}
		</span>
	);
}

Icon.displayName = "Icon";
