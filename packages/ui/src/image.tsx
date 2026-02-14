import type { ImgHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { cn } from "./lib/utils";

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> {
	alt: string;
	fallback?: ReactNode | string;
	objectFit?: "cover" | "contain" | "fill" | "none";
	radius?: string | number;
	className?: string;
}

const objectFitClasses = {
	cover: "object-cover",
	contain: "object-contain",
	fill: "object-fill",
	none: "object-none",
};

export function Image(props: ImageProps): JSX.Element {
	const {
		src,
		alt,
		fallback,
		objectFit = "cover",
		radius = "0.5rem",
		className,
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

	const wrapperClass = cn(
		"inline-block overflow-hidden bg-muted",
		className,
	);
	const radiusStyle =
		typeof radius === "number" ? { borderRadius: `${radius}px` } : { borderRadius: radius };

	if (error && fallback !== undefined) {
		return (
			<span className={wrapperClass} style={radiusStyle}>
				{typeof fallback === "string" ? (
					<img
						src={fallback}
						alt=""
						aria-hidden
						className={cn("block w-full h-full", objectFitClasses[objectFit])}
					/>
				) : (
					<span className="flex items-center justify-center min-h-20 text-muted-foreground text-sm">
						{fallback}
					</span>
				)}
			</span>
		);
	}

	return (
		<span className={wrapperClass} style={radiusStyle}>
			{!loaded && src ? (
				<span
					className="block w-full h-full min-h-20 bg-muted"
					aria-hidden
				/>
			) : null}
			<img
				src={src}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				className={cn(
					"block w-full h-full transition-opacity duration-200",
					objectFitClasses[objectFit],
					loaded && !error ? "opacity-100" : "opacity-0",
				)}
				{...other}
			/>
		</span>
	);
}

Image.displayName = "Image";
