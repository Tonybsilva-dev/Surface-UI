import type { Meta, StoryObj } from "@storybook/react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
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

const meta: Meta<typeof ChartContainer> = {
	title: "Components/Atoms/Chart",
	component: ChartContainer,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Container para gráficos Recharts com tokens da foundation. ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent.",
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
		<div style={{ width: "100%", maxWidth: 400, height: 280 }}>
			<ChartContainer config={barConfig}>
				<BarChart data={barData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
					<XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="value" fill="var(--chart-value, #1677ff)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ChartContainer>
		</div>
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
		<div style={{ width: "100%", maxWidth: 400, height: 280 }}>
			<ChartContainer config={areaConfig}>
				<AreaChart data={areaData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
					<XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
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
		</div>
	),
};
