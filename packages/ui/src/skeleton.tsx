import type { CSSProperties, HTMLAttributes } from "react";
import { lightColorScheme, shapeTokens, motionTokens } from "./foundation";

export type SkeletonVariant = "rectangular" | "circular" | "text";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * Forma: rectangular (padrão), circular, text (altura de linha).
	 */
	variant?: SkeletonVariant;
	/** Largura (ex.: "100%", "60px"). */
	width?: string | number;
	/** Altura (ex.: "20px"). Em variant="text" usa altura de linha. */
	height?: string | number;
	/** Estilos inline. */
	style?: CSSProperties;
}

/** Duração do pulse: token long2 (guidelines – motion). Easing standard. */
const SKELETON_DURATION = motionTokens.duration.long2;

const skeletonStyle = (
	<style>{`@keyframes surface-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .surface-skeleton { animation: none; opacity: 0.7; }
}`}</style>
);

export function Skeleton(props: SkeletonProps): JSX.Element {
	const {
		variant = "rectangular",
		width,
		height,
		style,
		className,
		...other
	} = props;
	const combinedClassName = ["surface-skeleton", className].filter(Boolean).join(" ");

	const baseStyles: CSSProperties = {
		display: "inline-block",
		backgroundColor: lightColorScheme.surfaceVariant,
		borderRadius:
			variant === "circular"
				? "50%"
				: variant === "text"
					? shapeTokens.extraSmall
					: shapeTokens.small,
		...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
		...(height !== undefined && {
			height: typeof height === "number" ? `${height}px` : height,
		}),
		...(variant === "text" && {
			height: height ?? "1em",
		}),
		animation: `surface-skeleton-pulse ${SKELETON_DURATION} ${motionTokens.easing.standard} infinite`,
	};

	const stateStyles: CSSProperties = {};

	return (
		<>
			{skeletonStyle}
			<span
				{...other}
				aria-hidden
				className={combinedClassName}
				style={{
					...baseStyles,
					...stateStyles,
					...style,
				}}
			/>
		</>
	);
}

Skeleton.displayName = "Skeleton";
