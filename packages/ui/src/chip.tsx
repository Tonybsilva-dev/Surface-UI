import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
} from "./foundation";

export type ChipVariant = "default" | "primary" | "success" | "warning" | "error";
export type ChipSize = "sm" | "md";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	/** Conteúdo do chip (texto ou elemento). */
	children: ReactNode;
	/** Variante de cor. */
	variant?: ChipVariant;
	/** Tamanho: sm, md. */
	size?: ChipSize;
	/** Se true, destaca como selecionado (borda/background mais forte). */
	selected?: boolean;
	/** Callback ao clicar no ícone de remover. Se não definido, o ícone não é exibido. */
	onRemove?: () => void;
	/** Estilos inline. */
	style?: CSSProperties;
}

function getVariantStyles(
	variant: ChipVariant,
	selected: boolean
): { bg: string; color: string; borderColor: string } {
	const base = {
		default: {
			bg: lightColorScheme.surfaceVariant,
			color: lightColorScheme.onSurfaceVariant,
			borderColor: lightColorScheme.outline,
		},
		primary: {
			bg: selected ? lightColorScheme.primaryContainer : lightColorScheme.surfaceVariant,
			color: lightColorScheme.onPrimaryContainer,
			borderColor: selected ? lightColorScheme.primary : lightColorScheme.outline,
		},
		success: {
			bg: "#f6ffed",
			color: "#52c41a",
			borderColor: "#b7eb8f",
		},
		warning: {
			bg: "#fffbe6",
			color: "#faad14",
			borderColor: "#ffe58f",
		},
		error: {
			bg: lightColorScheme.errorContainer,
			color: lightColorScheme.onErrorContainer,
			borderColor: lightColorScheme.error,
		},
	};
	return base[variant];
}

const sizeStyles: Record<ChipSize, { height: number; padding: string; fontSize: string }> = {
	sm: {
		height: 24,
		padding: `0 ${spacingTokens[2]}`,
		fontSize: typographyTokens.label.small.fontSize,
	},
	md: {
		height: 32,
		padding: `0 ${spacingTokens[3]}`,
		fontSize: typographyTokens.label.medium.fontSize,
	},
};

export function Chip(props: ChipProps): JSX.Element {
	const {
		children,
		variant = "default",
		size = "md",
		selected = false,
		onRemove,
		style,
		...other
	} = props;

	const colors = getVariantStyles(variant, selected);
	const sizes = sizeStyles[size];

	const baseStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: spacingTokens[1],
		height: sizes.height,
		padding: sizes.padding,
		fontFamily: typographyTokens.fontFamily.default,
		fontSize: sizes.fontSize,
		fontWeight: typographyTokens.label.medium.fontWeight,
		lineHeight: 1,
		color: colors.color,
		backgroundColor: colors.bg,
		border: `1px solid ${colors.borderColor}`,
		borderRadius: componentShapeTokens.chip,
		boxSizing: "border-box",
	};

	const stateStyles: CSSProperties = {};

	return (
		<span
			{...other}
			style={{
				...baseStyles,
				...stateStyles,
				...style,
			}}
		>
			<span style={{ flexShrink: 0 }}>{children}</span>
			{onRemove != null ? (
				<button
					type="button"
					aria-label="Remover"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					style={{
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						width: 16,
						height: 16,
						padding: 0,
						margin: 0,
						border: "none",
						background: "none",
						color: "inherit",
						cursor: "pointer",
						borderRadius: "9999px",
					}}
				>
					<svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden>
						<title>Fechar</title>
						<path
							d="M1 1l8 8M9 1L1 9"
							stroke="currentColor"
							strokeWidth={1.5}
							strokeLinecap="round"
						/>
					</svg>
				</button>
			) : null}
		</span>
	);
}

Chip.displayName = "Chip";
