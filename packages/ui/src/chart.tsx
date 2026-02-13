import type { CSSProperties, ReactElement, ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import { ResponsiveContainer, Tooltip, Legend, type LegendProps } from "recharts";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	shapeTokens,
	elevationTokens,
} from "./foundation";

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

const bodySmall = typographyTokens.body.small;

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
				className={className}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					minHeight: 200,
					fontSize: bodySmall.fontSize,
					fontFamily: bodySmall.fontFamily,
					color: lightColorScheme.onSurface,
					...style,
				}}
			>
				<ChartStyle chartId={chartId} config={config} />
				<ResponsiveContainer width="100%" height="100%" minHeight={200}>
					{children}
				</ResponsiveContainer>
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

	const tooltipStyles: CSSProperties = {
		display: "grid",
		gap: spacingTokens[1],
		minWidth: 128,
		padding: `${spacingTokens[1]} ${spacingTokens[2]}`,
		borderRadius: shapeTokens.medium,
		border: `1px solid ${lightColorScheme.outlineVariant}`,
		backgroundColor: lightColorScheme.surface,
		boxShadow: elevationTokens.level2.boxShadow,
		fontFamily: bodySmall.fontFamily,
		fontSize: bodySmall.fontSize,
		lineHeight: bodySmall.lineHeight,
		color: lightColorScheme.onSurface,
		...style,
	};

	const labelContent =
		!hideLabel && payload.length > 0 && (label != null || labelFormatter) ? (
			labelFormatter && payload[0] ? (
				<div style={{ fontWeight: 600 }}>{labelFormatter(label, payload)}</div>
			) : (
				<div style={{ fontWeight: 600 }}>{String(label ?? "")}</div>
			)
		) : null;

	const nestLabel = payload.length === 1 && indicator !== "dot";

	return (
		<div className={className} style={tooltipStyles}>
			{!nestLabel ? labelContent : null}
			<div style={{ display: "grid", gap: spacingTokens[1] }}>
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
						const itemLabel = itemConfig?.label ?? (item as { name?: string }).name;
						const value = (item as { value?: unknown }).value;

						return (
							<div
								key={(item as { dataKey?: string }).dataKey ?? index}
								style={{
									display: "flex",
									alignItems: indicator === "dot" ? "center" : "stretch",
									gap: spacingTokens[2],
								}}
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
												style={{
													width: indicator === "dot" ? 10 : indicator === "line" ? 4 : 0,
													height: indicator === "dot" ? 10 : "auto",
													minHeight: indicator === "dashed" ? 2 : undefined,
													borderRadius: 2,
													backgroundColor: color ?? lightColorScheme.outline,
													border:
														indicator === "dashed"
															? `1.5px dashed ${color ?? lightColorScheme.outline}`
															: "none",
													flexShrink: 0,
												}}
											/>
										)}
										<div
											style={{
												display: "flex",
												flex: 1,
												justifyContent: "space-between",
												alignItems: nestLabel ? "flex-end" : "center",
												gap: spacingTokens[2],
											}}
										>
											<div style={{ minWidth: 0 }}>
												{nestLabel ? labelContent : null}
												<span
													style={{
														color: lightColorScheme.onSurfaceVariant,
														overflow: "hidden",
														textOverflow: "ellipsis",
														whiteSpace: "nowrap",
													}}
												>
													{itemLabel}
												</span>
											</div>
											{value !== undefined && (
												<span
													style={{
														fontWeight: 500,
														fontVariantNumeric: "tabular-nums",
														flexShrink: 0,
													}}
												>
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
			className={className}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: spacingTokens[2],
				paddingTop: verticalAlign === "top" ? 0 : spacingTokens[2],
				paddingBottom: verticalAlign === "bottom" ? 0 : spacingTokens[2],
				...style,
			}}
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
							style={{
								display: "flex",
								alignItems: "center",
								gap: spacingTokens[1],
							}}
						>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<div
									style={{
										width: 8,
										height: 8,
										borderRadius: 2,
										backgroundColor: color ?? lightColorScheme.outline,
										flexShrink: 0,
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
