import type { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { lightColorScheme, shapeTokens } from "./foundation";

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> {
	/** Texto alternativo (obrigatório para a11y). Use "" se a imagem for decorativa. */
	alt: string;
	/** Conteúdo ou URL exibido quando a imagem falha ao carregar. */
	fallback?: ReactNode | string;
	/** object-fit: cover, contain, etc. */
	objectFit?: "cover" | "contain" | "fill" | "none";
	/** Border radius (token ou valor CSS). */
	radius?: string | number;
	/** Estilos no wrapper. */
	style?: CSSProperties;
}

export function Image(props: ImageProps): JSX.Element {
	const {
		src,
		alt,
		fallback,
		objectFit = "cover",
		radius = shapeTokens.medium,
		style,
		onLoad,
		onError,
		...other
	} = props;

	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
		setLoaded(true);
		setError(false);
		onLoad?.(e);
	};

	const handleError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
		setError(true);
		onError?.(e);
	};

	const wrapperStyles: CSSProperties = {
		display: "inline-block",
		overflow: "hidden",
		borderRadius: typeof radius === "number" ? `${radius}px` : radius,
		backgroundColor: lightColorScheme.surfaceContainerHighest,
		...style,
	};

	if (error && fallback !== undefined) {
		return (
			<span style={wrapperStyles}>
				{typeof fallback === "string" ? (
					<img
						src={fallback}
						alt=""
						aria-hidden
						style={{
							display: "block",
							width: "100%",
							height: "100%",
							objectFit,
						}}
					/>
				) : (
					<span
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: 80,
							color: lightColorScheme.onSurfaceVariant,
							fontSize: 14,
						}}
					>
						{fallback}
					</span>
				)}
			</span>
		);
	}

	return (
		<span style={wrapperStyles}>
			{!loaded && src ? (
				<span
					style={{
						display: "block",
						width: "100%",
						height: "100%",
						minHeight: 80,
						backgroundColor: lightColorScheme.surfaceContainerHighest,
					}}
					aria-hidden
				/>
			) : null}
			<img
				src={src}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				style={{
					display: "block",
					width: "100%",
					height: "100%",
					objectFit,
					opacity: loaded && !error ? 1 : 0,
					transition: "opacity 0.2s ease-out",
				}}
				{...other}
			/>
		</span>
	);
}

Image.displayName = "Image";
