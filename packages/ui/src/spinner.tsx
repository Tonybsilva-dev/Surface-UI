import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { lightColorScheme, motionTokens, typographyTokens } from "./foundation";

export type SpinnerSize = "sm" | "md" | "lg";

function parseDurationMs(token: string): number {
	const n = parseFloat(token);
	return Number.isFinite(n) ? n : 0;
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
	size?: SpinnerSize;
	variant?: "primary" | "default";
	spinning?: boolean;
	tip?: ReactNode;
	delay?: number;
	style?: CSSProperties;
}

const sizeMap: Record<SpinnerSize, number> = {
	sm: 20,
	md: 28,
	lg: 36,
};

const SPINNER_DURATION = motionTokens.duration.long4;

const SPINNER_DELAY_DEFAULT_MS = parseDurationMs(motionTokens.duration.short4);

const SPINNER_CSS_ID = "surface-spinner-styles";

function ensureSpinnerStyles(): void {
	if (typeof document === "undefined" || document.getElementById(SPINNER_CSS_ID)) return;
	const style = document.createElement("style");
	style.id = SPINNER_CSS_ID;
	style.textContent = `@keyframes surface-spinner-rotate{to{transform:rotate(360deg)}}
.surface-spinner-svg{animation:surface-spinner-rotate ${SPINNER_DURATION} linear infinite;transform-origin:center}
@media(prefers-reduced-motion:reduce){.surface-spinner-svg{animation:none}}`;
	document.head.appendChild(style);
}

export function Spinner(props: SpinnerProps): JSX.Element | null {
	const {
		size = "md",
		variant = "primary",
		spinning = true,
		tip,
		delay = SPINNER_DELAY_DEFAULT_MS,
		style,
		className,
		...other
	} = props;

	useLayoutEffect(() => {
		ensureSpinnerStyles();
	}, []);

	const [showAfterDelay, setShowAfterDelay] = useState(delay <= 0);
	useEffect(() => {
		if (delay <= 0) {
			setShowAfterDelay(true);
			return undefined;
		}
		const t = setTimeout(() => {
			setShowAfterDelay(true);
		}, delay);
		return () => {
			clearTimeout(t);
		};
	}, [delay]);

	const combinedClassName = ["surface-spinner", className]
		.filter(Boolean)
		.join(" ");

	const side = sizeMap[size];
	const center = side / 2;
	const strokeColor =
		variant === "primary" ? lightColorScheme.primary : lightColorScheme.outline;
	const hasTip = tip !== undefined;

	const baseStyles: CSSProperties = {
		display: "inline-flex",
		flexDirection: "column",
		alignItems: "center",
		gap: hasTip ? 8 : 0,
		minWidth: side,
	};

	const stateStyles: CSSProperties = {};

	if (!showAfterDelay) {
		return null;
	}

	return (
		<span
			{...other}
			className={combinedClassName}
			style={{
				...baseStyles,
				...stateStyles,
				...style,
			}}
		>
			<span
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					border: 0,
				}}
			>
				Carregando
			</span>
			<span style={{ display: "inline-block", width: side, height: side }}>
				<svg
					aria-hidden
					className={spinning ? "surface-spinner-svg" : undefined}
					height={side}
					style={{ display: "block" }}
					viewBox={`0 0 ${side} ${side}`}
					width={side}
				>
					<title>Carregando</title>
					<g transform={`translate(${center}, ${center})`}>
						<circle
							cx={0}
							cy={0}
							fill="none"
							r={(side - 4) / 2}
							stroke={strokeColor}
							strokeDasharray={`${side * 2} ${side * 1.5}`}
							strokeLinecap="round"
							strokeWidth={2}
						/>
					</g>
				</svg>
			</span>
			{hasTip ? (
				<span
					style={{
						fontFamily: typographyTokens.fontFamily.default,
						fontSize: typographyTokens.body.small.fontSize,
						lineHeight: typographyTokens.body.small.lineHeight,
						color: lightColorScheme.onSurfaceVariant,
					}}
				>
					{tip}
				</span>
			) : null}
		</span>
	);
}

Spinner.displayName = "Spinner";
