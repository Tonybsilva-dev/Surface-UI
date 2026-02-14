import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn } from "./lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
	size?: SpinnerSize;
	variant?: "primary" | "default";
	spinning?: boolean;
	tip?: ReactNode;
	delay?: number;
}

const sizeClasses: Record<SpinnerSize, string> = {
	sm: "size-5",
	md: "size-7",
	lg: "size-9",
};

const SPINNER_DELAY_DEFAULT_MS = 200;

export function Spinner(props: SpinnerProps): JSX.Element | null {
	const {
		size = "md",
		variant = "primary",
		spinning = true,
		tip,
		delay = SPINNER_DELAY_DEFAULT_MS,
		className,
		...other
	} = props;

	const [showAfterDelay, setShowAfterDelay] = useState(delay <= 0);
	useEffect(() => {
		if (delay <= 0) {
			setShowAfterDelay(true);
			return undefined;
		}
		const t = setTimeout(() => setShowAfterDelay(true), delay);
		return () => clearTimeout(t);
	}, [delay]);

	const sideMap = { sm: 20, md: 28, lg: 36 };
	const side = sideMap[size];
	const center = side / 2;
	const hasTip = tip !== undefined;

	if (!showAfterDelay) {
		return null;
	}

	return (
		<span
			{...other}
			className={cn(
				"inline-flex flex-col items-center gap-2",
				className,
			)}
		>
			<span className="sr-only">Carregando</span>
			<span className={cn("inline-block", sizeClasses[size])}>
				<svg
					aria-hidden
					className={spinning ? "animate-spin" : undefined}
					height={side}
					width={side}
					viewBox={`0 0 ${side} ${side}`}
				>
					<title>Carregando</title>
					<g transform={`translate(${center}, ${center})`}>
						<circle
							cx={0}
							cy={0}
							fill="none"
							r={(side - 4) / 2}
							stroke="currentColor"
							strokeDasharray={`${side * 2} ${side * 1.5}`}
							strokeLinecap="round"
							strokeWidth={2}
							className={variant === "primary" ? "text-primary" : "text-border"}
						/>
					</g>
				</svg>
			</span>
			{hasTip ? (
				<span className="text-sm leading-normal text-muted-foreground">
					{tip}
				</span>
			) : null}
		</span>
	);
}

Spinner.displayName = "Spinner";
