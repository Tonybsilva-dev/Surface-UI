import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { cn } from "./lib/utils";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressStatus = "normal" | "success" | "exception";

const sizeMap: Record<ProgressSize, string> = {
	sm: "h-1",
	md: "h-1.5",
	lg: "h-2",
};

const statusBarClasses: Record<ProgressStatus, string> = {
	normal: "bg-primary",
	success: "bg-[#52c41a]",
	exception: "bg-destructive",
};

interface ProgressContextValue {
	size: ProgressSize;
	status: ProgressStatus;
	percent: number;
	clampedPercent: number;
	isIndeterminate: boolean;
	format?: (percent: number) => ReactNode;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export interface ProgressRootProps extends HTMLAttributes<HTMLDivElement> {
	percent?: number;
	size?: ProgressSize;
	status?: ProgressStatus;
	format?: (percent: number) => ReactNode;
	children: ReactNode;
}

export function ProgressRoot(props: ProgressRootProps): JSX.Element {
	const {
		percent: percentProp,
		size = "md",
		status = "normal",
		format,
		children,
		className,
		...other
	} = props;

	const isIndeterminate = percentProp === undefined || percentProp < 0;
	const clampedPercent = isIndeterminate
		? 0
		: Math.min(100, Math.max(0, percentProp));
	const percent = percentProp ?? 0;

	const ctx: ProgressContextValue = {
		size,
		status,
		percent,
		clampedPercent,
		isIndeterminate,
		format,
	};

	return (
		<ProgressContext.Provider value={ctx}>
			<div
				className={cn("inline-flex items-center gap-2 w-full min-w-0", className)}
				role="progressbar"
				aria-valuenow={isIndeterminate ? undefined : clampedPercent}
				aria-valuemin={0}
				aria-valuemax={100}
				{...other}
			>
				{children}
			</div>
		</ProgressContext.Provider>
	);
}

ProgressRoot.displayName = "Progress.Root";

export function ProgressBar(props: HTMLAttributes<HTMLDivElement>): JSX.Element {
	const { className, ...other } = props;
	const ctx = useContext(ProgressContext);
	if (!ctx) return <div {...other} />;

	const { size, status, clampedPercent, isIndeterminate } = ctx;

	return (
		<div
			className={cn(
				"relative w-full flex-1 min-w-0 overflow-hidden rounded-md bg-muted",
				sizeMap[size],
				className,
			)}
			{...other}
		>
			{isIndeterminate ? (
				<div
					className={cn(
						"h-full rounded-md transition-none",
						statusBarClasses[status],
					)}
					style={{
						width: "30%",
						animation: "progress-indeterminate 1.5s ease-in-out infinite",
					}}
				/>
			) : (
				<div
					className={cn(
						"h-full rounded-md transition-[width] duration-300 ease-out",
						statusBarClasses[status],
					)}
					style={{ width: `${clampedPercent}%` }}
				/>
			)}
		</div>
	);
}

ProgressBar.displayName = "Progress.Bar";

export interface ProgressInfoProps {
	className?: string;
}

export function ProgressInfo(props: ProgressInfoProps): JSX.Element {
	const { className } = props;
	const ctx = useContext(ProgressContext);
	if (!ctx) return <span className={className} />;

	const { percent, clampedPercent, format } = ctx;

	return (
		<span
			className={cn(
				"shrink-0 text-sm text-muted-foreground min-w-10 text-right",
				className,
			)}
		>
			{format ? format(percent) : `${clampedPercent}%`}
		</span>
	);
}

ProgressInfo.displayName = "Progress.Info";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	percent?: number;
	size?: ProgressSize;
	status?: ProgressStatus;
	showInfo?: boolean;
	format?: (percent: number) => ReactNode;
}

export function Progress(props: ProgressProps): JSX.Element {
	const {
		percent: percentProp,
		size = "md",
		status = "normal",
		showInfo = false,
		format,
		className,
		...other
	} = props;

	const isIndeterminate = percentProp === undefined || percentProp < 0;
	const clampedPercent = isIndeterminate
		? 0
		: Math.min(100, Math.max(0, percentProp));
	const percent = percentProp ?? 0;

	return (
		<div
			className={cn("inline-flex items-center gap-2 w-full min-w-0", className)}
			role="progressbar"
			aria-valuenow={isIndeterminate ? undefined : clampedPercent}
			aria-valuemin={0}
			aria-valuemax={100}
			{...other}
		>
			<div
				className={cn(
					"relative flex-1 min-w-0 overflow-hidden rounded-md bg-muted",
					sizeMap[size],
				)}
			>
				{isIndeterminate ? (
					<div
						className={cn("h-full rounded-md", statusBarClasses[status])}
						style={{
							width: "30%",
							animation: "progress-indeterminate 1.5s ease-in-out infinite",
						}}
					/>
				) : (
					<div
						className={cn(
							"h-full rounded-md transition-[width] duration-300 ease-out",
							statusBarClasses[status],
						)}
						style={{ width: `${clampedPercent}%` }}
					/>
				)}
			</div>
			{showInfo ? (
				<span className="shrink-0 text-sm text-muted-foreground min-w-10 text-right">
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
