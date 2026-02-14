import type { CSSProperties, ReactElement, ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import { ResponsiveContainer, Tooltip, Legend, type LegendProps } from "recharts";
import { cn } from "./lib/utils";

export type ChartConfig = Record<
	string,
	{
		label?: ReactNode;
		icon?: React.ComponentType<{ className?: string }>;
		color?: string;
		theme?: { light?: string; dark?: string };
	}
>;

interface ChartContextValue {
	config: ChartConfig;
}

const ChartContext = createContext<ChartContextValue | null>(null);

function useChart(): ChartContextValue {
	const ctx = useContext(ChartContext);
	if (!ctx) {
		throw new Error("Chart components must be used within ChartContainer");
	}
	return ctx;
}

export interface ChartContainerProps {
	/** Configuração de séries (cores, labels). Chave = dataKey. */
	config: ChartConfig;
	/** Id opcional para CSS das variáveis de cor. */
	id?: string;
	/** Um único elemento (ex.: BarChart, LineChart). */
	children: ReactElement;
	style?: CSSProperties;
	className?: string;
}

export function ChartContainer(props: ChartContainerProps): JSX.Element {
	const { config, id: idProp, children, style, className } = props;
	const generatedId = useId();
	const chartId = idProp ?? `chart-${generatedId.replace(/:/g, "")}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-surface-chart={chartId}
				className={cn(
					"relative h-full min-h-[200px] w-full text-xs text-foreground",
					className,
				)}
				style={style}
			>
				<ChartStyle chartId={chartId} config={config} />
				<div className="absolute inset-0">
					<ResponsiveContainer width="100%" height="100%" minHeight={200}>
						{children}
					</ResponsiveContainer>
				</div>
			</div>
		</ChartContext.Provider>
	);
}

ChartContainer.displayName = "Chart.Container";

function ChartStyle({
	chartId,
	config,
}: {
	chartId: string;
	config: ChartConfig;
}): JSX.Element | null {
	const entries = Object.entries(config).filter(
		([, c]) => c.color != null || c.theme != null,
	);
	if (entries.length === 0) return null;

	const css = `[data-surface-chart="${chartId}"] { ${entries
		.map(([key, c]) => {
			const color = c.color ?? c.theme?.light;
			return color ? `--chart-${key}: ${color};` : "";
		})
		.filter(Boolean)
		.join(" ")} }`;

	return (
		<style
			// biome-ignore lint/security/noDangerouslySetInnerHtml: injectando CSS de config estático
			dangerouslySetInnerHTML={{ __html: css }}
		/>
	);
}

/** Re-export do Tooltip do Recharts para uso com content customizado. */
export const ChartTooltip = Tooltip;

export interface ChartTooltipContentProps {
	active?: boolean;
	payload?: Array<Record<string, unknown>>;
	label?: unknown;
	/** Esconder linha do label. */
	hideLabel?: boolean;
	/** Esconder indicador de cor. */
	hideIndicator?: boolean;
	/** Estilo do indicador: dot, line, dashed. */
	indicator?: "dot" | "line" | "dashed";
	labelFormatter?: (value: unknown, payload: unknown[]) => ReactNode;
	formatter?: (
		value: unknown,
		name: string,
		item: unknown,
		index: number,
		payload: unknown,
	) => ReactNode;
	nameKey?: string;
	labelKey?: string;
	style?: CSSProperties;
	className?: string;
}

function getPayloadConfig(
	config: ChartConfig,
	item: unknown,
	key: string,
): ChartConfig[string] | undefined {
	if (typeof item !== "object" || item === null) return undefined;
	const dataKey = (item as { dataKey?: string }).dataKey ?? key;
	return config[dataKey] ?? config[key];
}

export function ChartTooltipContent(
	props: ChartTooltipContentProps,
): JSX.Element | null {
	const {
		active,
		payload,
		label,
		hideLabel = false,
		hideIndicator = false,
		indicator = "dot",
		labelFormatter,
		formatter,
		nameKey,
		style,
		className,
	} = props;
	const { config } = useChart();

	if (!active || !payload?.length) return null;

	const labelContent =
		!hideLabel && payload.length > 0 && (label != null || labelFormatter) ? (
			labelFormatter && payload[0] ? (
				<div className="font-semibold">{labelFormatter(label, payload)}</div>
			) : (
				<div className="font-semibold">{String(label ?? "")}</div>
			)
		) : null;

	const nestLabel = payload.length === 1 && indicator !== "dot";

	return (
		<div
			className={cn(
				"grid min-w-32 gap-1 rounded-lg border border-border bg-background p-1 px-2 text-xs shadow-[var(--shadow-2)]",
				className,
			)}
			style={style}
		>
			{!nestLabel ? labelContent : null}
			<div className="grid gap-1">
				{payload
					.filter((item) => (item as { type?: string }).type !== "none")
					.map((item, index) => {
						const key =
							nameKey ??
							(item as { name?: string }).name ??
							(item as { dataKey?: string }).dataKey ??
							"value";
						const itemConfig = getPayloadConfig(config, item, key);
						const color =
							(item as { color?: string }).color ??
							(item as { payload?: { fill?: string } }).payload?.fill ??
							itemConfig?.color;
						const fillColor = color ?? "var(--border)";
						const itemLabel = itemConfig?.label ?? (item as { name?: string }).name;
						const value = (item as { value?: unknown }).value;

						return (
							<div
								key={(item as { dataKey?: string }).dataKey ?? index}
								className={cn(
									"flex gap-2",
									indicator === "dot" ? "items-center" : "items-stretch",
								)}
							>
								{formatter &&
								value !== undefined &&
								(item as { name?: string }).name ? (
									formatter(
										value,
										(item as { name?: string }).name ?? "",
										item,
										index,
										(item as { payload?: unknown }).payload ?? item,
									)
								) : (
									<>
										{!hideIndicator && (
											<div
												className="shrink-0 rounded-sm"
												style={{
													width: indicator === "dot" ? 10 : indicator === "line" ? 4 : 0,
													height: indicator === "dot" ? 10 : "auto",
													minHeight: indicator === "dashed" ? 2 : undefined,
													backgroundColor: fillColor,
													border:
														indicator === "dashed"
															? `1.5px dashed ${fillColor}`
															: "none",
												}}
											/>
										)}
										<div
											className={cn(
												"flex flex-1 justify-between gap-2",
												nestLabel ? "items-end" : "items-center",
											)}
										>
											<div className="min-w-0">
												{nestLabel ? labelContent : null}
												<span className="truncate text-muted-foreground">
													{itemLabel}
												</span>
											</div>
											{value !== undefined && (
												<span className="shrink-0 font-medium tabular-nums">
													{typeof value === "number"
														? value.toLocaleString()
														: String(value)}
												</span>
											)}
										</div>
									</>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

ChartTooltipContent.displayName = "Chart.TooltipContent";

/** Re-export do Legend do Recharts. */
export const ChartLegend = Legend;

export interface ChartLegendContentProps
	extends Pick<LegendProps, "payload" | "verticalAlign"> {
	hideIcon?: boolean;
	nameKey?: string;
	style?: CSSProperties;
	className?: string;
}

export function ChartLegendContent(props: ChartLegendContentProps): JSX.Element | null {
	const {
		payload,
		verticalAlign = "bottom",
		hideIcon = false,
		nameKey,
		style,
		className,
	} = props;
	const { config } = useChart();

	if (!payload?.length) return null;

	return (
		<div
			className={cn(
				"flex flex-wrap items-center justify-center gap-2",
				verticalAlign === "top" ? "pt-0 pb-2" : "pt-2 pb-0",
				className,
			)}
			style={style}
		>
			{payload
				.filter((item) => (item as { type?: string }).type !== "none")
				.map((item) => {
					const key =
						nameKey ?? (item as { dataKey?: string }).dataKey ?? "value";
					const itemConfig = getPayloadConfig(config, item, key);
					const color = (item as { color?: string }).color ?? itemConfig?.color;

					return (
						<div
							key={(item as { value?: string }).value ?? key}
							className="flex items-center gap-1"
						>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<div
									className="h-2 w-2 shrink-0 rounded-sm"
									style={{
										backgroundColor: color ?? "var(--border)",
									}}
								/>
							)}
							<span>{itemConfig?.label ?? (item as { value?: string }).value}</span>
						</div>
					);
				})}
		</div>
	);
}

ChartLegendContent.displayName = "Chart.LegendContent";
