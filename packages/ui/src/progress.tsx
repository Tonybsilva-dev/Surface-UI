import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useLayoutEffect } from "react";
import {
	lightColorScheme,
	componentShapeTokens,
	motionTokens,
	typographyTokens,
} from "./foundation";

const PROGRESS_CSS_ID = "surface-progress-styles";

function ensureProgressStyles(): void {
	if (typeof document === "undefined" || document.getElementById(PROGRESS_CSS_ID))
		return;
	const style = document.createElement("style");
	style.id = PROGRESS_CSS_ID;
	style.textContent = `@keyframes surface-progress-indeterminate{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`;
	document.head.appendChild(style);
}

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressStatus = "normal" | "success" | "exception";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	/** Percentual concluído (0–100). Omitir ou undefined = indeterminado (barra animada). */
	percent?: number;
	/** Tamanho da barra: sm (4px), md (6px), lg (8px). */
	size?: ProgressSize;
	/** Cor/estado: normal (primary), success (verde), exception (vermelho). */
	status?: ProgressStatus;
	/** Se true, mostra texto com o percentual ao lado. */
	showInfo?: boolean;
	/** Conteúdo customizado no lugar do percentual (ex.: "3/10"). */
	format?: (percent: number) => ReactNode;
	/** Estilos no wrapper. */
	style?: CSSProperties;
}

const sizeMap: Record<ProgressSize, number> = {
	sm: 4,
	md: 6,
	lg: 8,
};

const statusColor: Record<ProgressStatus, string> = {
	normal: lightColorScheme.primary,
	success: "rgb(82, 196, 26)",
	exception: lightColorScheme.error,
};

const labelFont = typographyTokens.body.small;

interface ProgressContextValue {
	size: ProgressSize;
	status: ProgressStatus;
	percent: number;
	clampedPercent: number;
	isIndeterminate: boolean;
	strokeHeight: number;
	strokeColor: string;
	format?: (percent: number) => ReactNode;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export interface ProgressRootProps extends HTMLAttributes<HTMLDivElement> {
	percent?: number;
	size?: ProgressSize;
	status?: ProgressStatus;
	format?: (percent: number) => ReactNode;
	children: ReactNode;
	style?: CSSProperties;
}

export function ProgressRoot(props: ProgressRootProps): JSX.Element {
	const {
		percent: percentProp,
		size = "md",
		status = "normal",
		format,
		children,
		className,
		style,
		...other
	} = props;

	useLayoutEffect(() => {
		ensureProgressStyles();
	}, []);

	const strokeHeight = sizeMap[size];
	const isIndeterminate = percentProp === undefined || percentProp < 0;
	const clampedPercent = isIndeterminate
		? 0
		: Math.min(100, Math.max(0, percentProp));
	const percent = percentProp ?? 0;
	const strokeColor = statusColor[status];

	const ctx: ProgressContextValue = {
		size,
		status,
		percent,
		clampedPercent,
		isIndeterminate,
		strokeHeight,
		strokeColor,
		format,
	};

	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: 8,
		width: "100%",
		minWidth: 0,
	};

	return (
		<ProgressContext.Provider value={ctx}>
			<div
				className={className}
				role="progressbar"
				aria-valuenow={isIndeterminate ? undefined : clampedPercent}
				aria-valuemin={0}
				aria-valuemax={100}
				style={{ ...wrapperStyles, ...style }}
				{...other}
			>
				{children}
			</div>
		</ProgressContext.Provider>
	);
}

ProgressRoot.displayName = "Progress.Root";

export function ProgressBar(props: HTMLAttributes<HTMLDivElement>): JSX.Element {
	const { style, ...other } = props;
	const ctx = useContext(ProgressContext);
	if (!ctx) return <div {...other} />;

	const { strokeHeight, strokeColor, clampedPercent, isIndeterminate } = ctx;

	const trackStyles: CSSProperties = {
		position: "relative",
		width: "100%",
		height: strokeHeight,
		borderRadius: componentShapeTokens.button,
		backgroundColor: lightColorScheme.surfaceVariant,
		overflow: "hidden",
		flex: 1,
		minWidth: 0,
	};

	const barStyles: CSSProperties = {
		height: strokeHeight,
		borderRadius: componentShapeTokens.button,
		backgroundColor: strokeColor,
		transition: `width ${motionTokens.duration.medium2} ${motionTokens.easing.standard}`,
	};

	return (
		<div style={{ ...trackStyles, ...style }} {...other}>
			{isIndeterminate ? (
				<div
					style={{
						...barStyles,
						width: "30%",
						animation: `surface-progress-indeterminate 1.5s ${motionTokens.easing.standard} infinite`,
					}}
				/>
			) : (
				<div style={{ ...barStyles, width: `${clampedPercent}%` }} />
			)}
		</div>
	);
}

ProgressBar.displayName = "Progress.Bar";

export interface ProgressInfoProps {
	style?: CSSProperties;
}

export function ProgressInfo(props: ProgressInfoProps): JSX.Element {
	const { style } = props;
	const ctx = useContext(ProgressContext);
	if (!ctx) return <span style={style} />;

	const { percent, clampedPercent, format } = ctx;

	const infoStyles: CSSProperties = {
		flexShrink: 0,
		fontFamily: labelFont.fontFamily,
		fontSize: labelFont.fontSize,
		lineHeight: labelFont.lineHeight,
		color: lightColorScheme.onSurfaceVariant,
		minWidth: 40,
		textAlign: "right",
		...style,
	};

	return (
		<span style={infoStyles}>
			{format ? format(percent) : `${clampedPercent}%`}
		</span>
	);
}

ProgressInfo.displayName = "Progress.Info";

export function Progress(props: ProgressProps): JSX.Element {
	const {
		percent: percentProp,
		size = "md",
		status = "normal",
		showInfo = false,
		format,
		className,
		style,
		...other
	} = props;

	useLayoutEffect(() => {
		ensureProgressStyles();
	}, []);

	const strokeHeight = sizeMap[size];
	const isIndeterminate = percentProp === undefined || percentProp < 0;
	const clampedPercent = isIndeterminate
		? 0
		: Math.min(100, Math.max(0, percentProp));
	const percent = percentProp ?? 0;
	const strokeColor = statusColor[status];

	const trackStyles: CSSProperties = {
		position: "relative",
		width: "100%",
		height: strokeHeight,
		borderRadius: componentShapeTokens.button,
		backgroundColor: lightColorScheme.surfaceVariant,
		overflow: "hidden",
	};

	const barStyles: CSSProperties = {
		height: strokeHeight,
		borderRadius: componentShapeTokens.button,
		backgroundColor: strokeColor,
		transition: `width ${motionTokens.duration.medium2} ${motionTokens.easing.standard}`,
	};

	const wrapperStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: 8,
		width: "100%",
		minWidth: 0,
	};

	const infoStyles: CSSProperties = {
		flexShrink: 0,
		fontFamily: labelFont.fontFamily,
		fontSize: labelFont.fontSize,
		lineHeight: labelFont.lineHeight,
		color: lightColorScheme.onSurfaceVariant,
		minWidth: 40,
		textAlign: "right",
	};

	return (
		<div
			className={className}
			role="progressbar"
			aria-valuenow={isIndeterminate ? undefined : clampedPercent}
			aria-valuemin={0}
			aria-valuemax={100}
			style={{ ...wrapperStyles, ...style }}
			{...other}
		>
			<div style={{ flex: 1, minWidth: 0, ...trackStyles }}>
				{isIndeterminate ? (
					<div
						style={{
							...barStyles,
							width: "30%",
							animation: `surface-progress-indeterminate 1.5s ${motionTokens.easing.standard} infinite`,
						}}
					/>
				) : (
					<div style={{ ...barStyles, width: `${clampedPercent}%` }} />
				)}
			</div>
			{showInfo ? (
				<span style={infoStyles}>
					{format ? format(percent) : `${clampedPercent}%`}
				</span>
			) : null}
		</div>
	);
}

Progress.displayName = "Progress";

export type ProgressCompound = typeof Progress & {
	Root: typeof ProgressRoot;
	Bar: typeof ProgressBar;
	Info: typeof ProgressInfo;
};

(Progress as ProgressCompound).Root = ProgressRoot;
(Progress as ProgressCompound).Bar = ProgressBar;
(Progress as ProgressCompound).Info = ProgressInfo;
