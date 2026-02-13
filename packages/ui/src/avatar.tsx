import type { CSSProperties, HTMLAttributes } from "react";
import { lightColorScheme, typographyTokens } from "./foundation";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	/** URL da imagem. Se não definido, exibe iniciais. */
	src?: string;
	/** Texto alternativo da imagem (acessibilidade). */
	alt?: string;
	/** Iniciais exibidas quando não há src (ex.: "AB"). */
	initials?: string;
	/** Tamanho: sm (32px), md (40px), lg (48px). */
	size?: AvatarSize;
	/** Estilos inline. */
	style?: CSSProperties;
}

const sizeMap: Record<AvatarSize, number> = {
	sm: 32,
	md: 40,
	lg: 48,
};

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

export function Avatar(props: AvatarProps): JSX.Element {
	const {
		src,
		alt = "",
		initials: initialsProp,
		size = "md",
		style,
		...other
	} = props;

	const side = sizeMap[size];
	const initials = initialsProp != null ? getInitials(initialsProp) : null;

	const baseStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: side,
		height: side,
		minWidth: side,
		minHeight: side,
		borderRadius: "50%",
		overflow: "hidden",
		backgroundColor: lightColorScheme.surfaceVariant,
		color: lightColorScheme.onSurfaceVariant,
		fontFamily: typographyTokens.fontFamily.default,
		fontSize: side * 0.4,
		fontWeight: typographyTokens.title.medium.fontWeight,
		lineHeight: 1,
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
			{src != null ? (
				<img
					src={src}
					alt={alt}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			) : initials != null ? (
				<span style={{ userSelect: "none" }}>{initials}</span>
			) : (
				<span aria-hidden style={{ fontSize: side * 0.35 }}>?</span>
			)}
		</span>
	);
}

Avatar.displayName = "Avatar";
