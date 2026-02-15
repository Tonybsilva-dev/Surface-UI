import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	type ChartConfig,
} from "@surface/ui/chart";
import { Card } from "@surface/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@surface/ui/toggle-group";
import { StoryCard, StorySection } from "../foundation/shared";

/** Wrapper para as stories: dimensões fixas para o gráfico preencher todo o espaço. */
const ChartWrapper = ({
	children,
	height = 320,
	width = "100%",
}: {
	children: React.ReactNode;
	height?: number;
	width?: number | string;
}) => (
	<div
		style={{
			width: width ?? "100%",
			height,
			minHeight: 240,
			minWidth: 280,
		}}
	>
		{children}
	</div>
);

const meta: Meta<typeof ChartContainer> = {
	title: "Components/Organisms/Chart",
	component: ChartContainer,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Container para gráficos Recharts com tokens da foundation. ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent. O gráfico preenche todo o container quando o pai tem altura definida.",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof ChartContainer>;

const barData = [
	{ name: "Jan", value: 400 },
	{ name: "Fev", value: 300 },
	{ name: "Mar", value: 600 },
	{ name: "Abr", value: 800 },
	{ name: "Mai", value: 500 },
];

const barConfig: ChartConfig = {
	value: {
		label: "Vendas",
		color: "#1677ff",
	},
};

export const BarChartExample: Story = {
	render: () => (
		<ChartWrapper>
			<ChartContainer config={barConfig}>
				<BarChart data={barData} margin={{ top: 12, right: 12, left: 12, bottom: 12 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
					<XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="value" fill="var(--chart-value, #1677ff)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ChartContainer>
		</ChartWrapper>
	),
};

const areaData = [
	{ name: "Jan", a: 40, b: 60 },
	{ name: "Fev", a: 30, b: 70 },
	{ name: "Mar", a: 60, b: 40 },
	{ name: "Abr", a: 80, b: 20 },
	{ name: "Mai", a: 50, b: 50 },
];

const areaConfig: ChartConfig = {
	a: { label: "Série A", color: "#1677ff" },
	b: { label: "Série B", color: "#52c41a" },
};

export const AreaChartExample: Story = {
	render: () => (
		<ChartWrapper>
			<ChartContainer config={areaConfig}>
				<AreaChart data={areaData} margin={{ top: 12, right: 12, left: 12, bottom: 12 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
					<XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area
						type="monotone"
						dataKey="a"
						stroke="var(--chart-a, #1677ff)"
						fill="var(--chart-a, #1677ff)"
						fillOpacity={0.3}
						stackId="1"
					/>
					<Area
						type="monotone"
						dataKey="b"
						stroke="var(--chart-b, #52c41a)"
						fill="var(--chart-b, #52c41a)"
						fillOpacity={0.3}
						stackId="1"
					/>
				</AreaChart>
			</ChartContainer>
		</ChartWrapper>
	),
};

const lineData = [
	{ month: "Jan", vendas: 2400, metas: 2200 },
	{ month: "Fev", vendas: 1398, metas: 1800 },
	{ month: "Mar", vendas: 3800, metas: 2400 },
	{ month: "Abr", vendas: 3908, metas: 2800 },
	{ month: "Mai", vendas: 4800, metas: 3200 },
	{ month: "Jun", vendas: 3800, metas: 3000 },
];

const lineConfig: ChartConfig = {
	vendas: { label: "Vendas", color: "#1677ff" },
	metas: { label: "Metas", color: "#94a3b8" },
};

export const LineChartMultipleSeries: Story = {
	render: () => (
		<ChartWrapper height={320}>
			<ChartContainer config={lineConfig}>
				<LineChart data={lineData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
					<XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Line
						type="monotone"
						dataKey="vendas"
						stroke="var(--chart-vendas, #1677ff)"
						strokeWidth={2}
						dot={{ r: 3 }}
						connectNulls={false}
					/>
					<Line
						type="monotone"
						dataKey="metas"
						stroke="var(--chart-metas, #94a3b8)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={{ r: 3 }}
						connectNulls={false}
					/>
				</LineChart>
			</ChartContainer>
		</ChartWrapper>
	),
};

const pieData = [
	{ name: "A", value: 400, color: "#1677ff" },
	{ name: "B", value: 300, color: "#52c41a" },
	{ name: "C", value: 200, color: "#faad14" },
	{ name: "D", value: 278, color: "#ff4d4f" },
];

const pieConfig: ChartConfig = {
	A: { label: "Categoria A", color: "#1677ff" },
	B: { label: "Categoria B", color: "#52c41a" },
	C: { label: "Categoria C", color: "#faad14" },
	D: { label: "Categoria D", color: "#ff4d4f" },
};

export const PieChartExample: Story = {
	render: () => (
		<ChartWrapper height={320}>
			<ChartContainer config={pieConfig}>
				<PieChart margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Pie
						data={pieData}
						cx="50%"
						cy="50%"
						innerRadius={55}
						outerRadius={90}
						paddingAngle={2}
						dataKey="value"
					>
						{pieData.map((entry) => (
							<Cell key={entry.name} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ChartContainer>
		</ChartWrapper>
	),
};

// ——— Dados mockados para o gráfico de satisfação (sem API/hook) ———
const satisfactionByMonth = [
	{ period: "2025-01", average_score: 4.2 },
	{ period: "2025-02", average_score: 4.0 },
	{ period: "2025-03", average_score: 4.5 },
	{ period: "2025-04", average_score: 4.1 },
	{ period: "2025-05", average_score: 4.3 },
	{ period: "2025-06", average_score: 4.4 },
];

const satisfactionByDay = [
	{ period: "2025-06-01", average_score: 4.0 },
	{ period: "2025-06-02", average_score: 4.2 },
	{ period: "2025-06-03", average_score: 4.5 },
	{ period: "2025-06-04", average_score: 4.1 },
	{ period: "2025-06-05", average_score: 4.3 },
	{ period: "2025-06-06", average_score: 4.6 },
	{ period: "2025-06-07", average_score: 4.4 },
];

const satisfactionChartConfig = {
	average_score: {
		label: "Score Médio",
		color: "hsl(217 91% 60%)",
	},
} satisfies ChartConfig;

export const ChartAreaSatisfacaoClientes: Story = {
	render: function ChartAreaSatisfacaoClientesRender() {
		const [groupBy, setGroupBy] = React.useState<"day" | "month">("month");
		const chartData =
			groupBy === "month" ? satisfactionByMonth : satisfactionByDay;

		return (
			<Card className="w-full rounded-none">
				<Card.Header className="flex flex-row items-start justify-between gap-4">
					<div className="flex flex-col space-y-1.5">
						<div className="text-lg font-medium leading-none tracking-tight">
							Satisfação dos Clientes
						</div>
						<div className="text-sm text-muted-foreground">
							{groupBy === "month"
								? "Últimos 6 meses (dados mockados)"
								: "Últimos 7 dias (dados mockados)"}
						</div>
					</div>
					<ToggleGroup
						type="single"
						value={groupBy}
						onValueChange={(v) => {
							if (v === "day" || v === "month") setGroupBy(v);
						}}
						variant="outline"
					>
						<ToggleGroupItem value="month">Por mês</ToggleGroupItem>
						<ToggleGroupItem value="day">Por dia</ToggleGroupItem>
					</ToggleGroup>
				</Card.Header>
				<Card.Content className="w-full px-2 pt-4 sm:px-6 sm:pt-6">
					<ChartContainer
						config={satisfactionChartConfig}
						className="h-[250px] w-full min-h-[200px]"
					>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient
									id="fillSatisfaction"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="var(--chart-average_score)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--chart-average_score)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="period"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value: string) => {
									if (groupBy === "month") {
										const [year, month] = value.split("-");
										const date = new Date(
											parseInt(year, 10),
											parseInt(month, 10) - 1,
										);
										return date.toLocaleDateString("pt-BR", {
											month: "short",
											year: "numeric",
										});
									}
									const date = new Date(value);
									return date.toLocaleDateString("pt-BR", {
										month: "short",
										day: "numeric",
									});
								}}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								domain={[0, 5]}
								tickFormatter={(value: number) => value.toFixed(1)}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(value: string) => {
											if (groupBy === "month") {
												const [year, month] =
													value.split("-");
												const date = new Date(
													parseInt(year, 10),
													parseInt(month, 10) - 1,
												);
												return date.toLocaleDateString(
													"pt-BR",
													{
														month: "long",
														year: "numeric",
													},
												);
											}
											const date = new Date(value);
											return date.toLocaleDateString(
												"pt-BR",
												{
													day: "numeric",
													month: "long",
													year: "numeric",
												},
											);
										}}
										indicator="dot"
									/>
								}
							/>
							<Area
								dataKey="average_score"
								type="natural"
								fill="url(#fillSatisfaction)"
								stroke="var(--chart-average_score)"
							/>
						</AreaChart>
					</ChartContainer>
				</Card.Content>
			</Card>
		);
	},
};

/** Exemplo complexo reutilizado no Overview. */
function ChartOverviewExample() {
	const [groupBy, setGroupBy] = React.useState<"day" | "month">("month");
	const chartData = groupBy === "month" ? satisfactionByMonth : satisfactionByDay;
	return (
		<Card className="w-full rounded-none">
			<Card.Header className="flex flex-row items-start justify-between gap-4">
				<div className="flex flex-col space-y-1.5">
					<div className="text-lg font-medium leading-none tracking-tight">
						Satisfação dos Clientes
					</div>
					<div className="text-sm text-muted-foreground">
						{groupBy === "month" ? "Últimos 6 meses" : "Últimos 7 dias"}
					</div>
				</div>
				<ToggleGroup
					type="single"
					value={groupBy}
					onValueChange={(v) => {
						if (v === "day" || v === "month") setGroupBy(v);
					}}
					variant="outline"
				>
					<ToggleGroupItem value="month">Por mês</ToggleGroupItem>
					<ToggleGroupItem value="day">Por dia</ToggleGroupItem>
				</ToggleGroup>
			</Card.Header>
			<Card.Content className="w-full px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={satisfactionChartConfig}
					className="h-[250px] w-full min-h-[200px]"
				>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="fillSatisfactionOverview" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--chart-average_score)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--chart-average_score)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="period"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value: string) => {
								if (groupBy === "month") {
									const [y, m] = value.split("-");
									return new Date(parseInt(y, 10), parseInt(m, 10) - 1).toLocaleDateString("pt-BR", {
										month: "short",
										year: "numeric",
									});
								}
								return new Date(value).toLocaleDateString("pt-BR", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							domain={[0, 5]}
							tickFormatter={(v: number) => v.toFixed(1)}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value: string) => {
										if (groupBy === "month") {
											const [y, m] = value.split("-");
											return new Date(parseInt(y, 10), parseInt(m, 10) - 1).toLocaleDateString(
												"pt-BR",
												{ month: "long", year: "numeric" },
											);
										}
										return new Date(value).toLocaleDateString("pt-BR", {
											day: "numeric",
											month: "long",
											year: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="average_score"
							type="natural"
							fill="url(#fillSatisfactionOverview)"
							stroke="var(--chart-average_score)"
						/>
					</AreaChart>
				</ChartContainer>
			</Card.Content>
		</Card>
	);
}

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Chart (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Chart</strong> é o container para gráficos baseados em Recharts, com tokens
								da foundation (cores, sombras). Inclui <strong>ChartContainer</strong>,{" "}
								<strong>ChartTooltip</strong> / <strong>ChartTooltipContent</strong>,{" "}
								<strong>ChartLegend</strong> / <strong>ChartLegendContent</strong>. O gráfico preenche
								o espaço quando o pai tem altura definida. Use <code>config</code> para mapear
								dataKeys a labels e cores (CSS vars <code>--chart-*</code>).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props principais)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>config</code> — ChartConfig: mapeia dataKeys a label e color (gera --chart-*).</li>
								<li><code>className</code> — Para definir altura/largura do container (ex.: h-[250px]).</li>
								<li>Children: componentes Recharts (BarChart, LineChart, AreaChart, PieChart, etc.).</li>
								<li>ChartTooltipContent / ChartLegendContent — formatação e legenda alinhadas ao config.</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Dashboards, relatórios de vendas, satisfação, métricas ao longo do tempo. Combine com
								Card e ToggleGroup para painéis com filtros (ex.: por mês/dia). Veja a story
								&quot;Chart Area Satisfação Clientes&quot; para um exemplo completo.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Dashboard: satisfação com filtro por período">
					<p className="mb-4 text-sm text-muted-foreground">
						Card com título, toggle (mês/dia) e área de gráfico. Dados mockados; em produção viriam da API.
					</p>
					<ChartOverviewExample />
				</StoryCard>
			</StorySection>
		</div>
	),
};
