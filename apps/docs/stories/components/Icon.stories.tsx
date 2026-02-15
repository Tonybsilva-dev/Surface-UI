import type { Meta, StoryObj } from "@storybook/react";
import * as LucideIcons from "lucide-react";
import { Icon } from "@surface/ui/icon";
import type { IconSize } from "@surface/ui/icon";
import { lightColorScheme } from "@surface/ui/foundation";
import { StoryCard, StorySection } from "../foundation/shared";

/** Subset de ícones Lucide para seleção nas stories. */
const ICON_OPTIONS = [
	"Clock",
	"Search",
	"User",
	"Settings",
	"Heart",
	"Star",
	"ChevronDown",
	"Check",
	"X",
	"Mail",
	"Calendar",
	"Home",
	"ArrowRight",
	"Inbox",
	"MoreVertical",
] as const;

type IconName = (typeof ICON_OPTIONS)[number];

const iconMap: Record<IconName, React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>> = {
	Clock: LucideIcons.Clock,
	Search: LucideIcons.Search,
	User: LucideIcons.User,
	Settings: LucideIcons.Settings,
	Heart: LucideIcons.Heart,
	Star: LucideIcons.Star,
	ChevronDown: LucideIcons.ChevronDown,
	Check: LucideIcons.Check,
	X: LucideIcons.X,
	Mail: LucideIcons.Mail,
	Calendar: LucideIcons.Calendar,
	Home: LucideIcons.Home,
	ArrowRight: LucideIcons.ArrowRight,
	Inbox: LucideIcons.Inbox,
	MoreVertical: LucideIcons.MoreVertical,
};

function iconSizePx(size: IconSize): number {
	return size === "sm" ? 16 : size === "large" ? 24 : 20;
}

const meta: Meta<typeof Icon> = {
	title: "Components/Atoms/Icon",
	component: Icon,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Átomo presentacional para exibir um ícone (SVG/ReactNode) com tamanho e cor padronizados. Tamanhos conforme iconSizeRecommendations (16/20/24px). Ícones decorativos: aria-hidden; informativos: ariaLabel. Utiliza Lucide React para os ícones.",
			},
		},
	},
	argTypes: {
		icon: {
			description: "Ícone Lucide a exibir no container.",
			control: "select",
			options: [...ICON_OPTIONS],
			table: { type: { summary: "string" }, category: "Conteúdo", defaultValue: { summary: "Clock" } },
		},
		size: {
			description: "sm 16px, md 20px, large 24px.",
			control: "select",
			options: ["sm", "md", "large"] as IconSize[],
			table: { type: { summary: "IconSize" }, defaultValue: { summary: "md" } },
		},
		ariaHidden: {
			description: "true para ícones decorativos.",
			control: "boolean",
			table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
		},
		ariaLabel: {
			description: "Texto para leitores de tela quando o ícone é informativo.",
			control: "text",
			table: { type: { summary: "string" } },
		},
	},
	args: {
		icon: "Clock",
		size: "md",
		ariaHidden: true,
	},
};

export default meta;

type IconStoryArgs = React.ComponentProps<typeof Icon> & { icon?: IconName };

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	render: (args) => {
		const iconName = (args as IconStoryArgs).icon ?? "Clock";
		const LucideIcon = iconMap[iconName];
		const sizePx = iconSizePx(args.size);
		return (
			<div className="flex items-center justify-center rounded-md border border-border bg-muted/30 p-6 min-h-[120px]">
				<Icon size={args.size} ariaHidden={args.ariaHidden} ariaLabel={args.ariaLabel} color={args.color}>
					<LucideIcon size={sizePx} aria-hidden />
				</Icon>
			</div>
		);
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<Icon size="sm">
				<LucideIcons.Clock size={16} aria-hidden />
			</Icon>
			<Icon size="md">
				<LucideIcons.Clock size={20} aria-hidden />
			</Icon>
			<Icon size="large">
				<LucideIcons.Clock size={24} aria-hidden />
			</Icon>
		</div>
	),
};

export const Color: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icon color={lightColorScheme.onSurface} size="large">
				<LucideIcons.Clock size={24} aria-hidden />
			</Icon>
			<Icon color={lightColorScheme.primary} size="large">
				<LucideIcons.Clock size={24} aria-hidden />
			</Icon>
			<Icon color={lightColorScheme.error} size="large">
				<LucideIcons.Clock size={24} aria-hidden />
			</Icon>
		</div>
	),
};

export const Accessibility: Story = {
	render: () => (
		<div className="flex flex-col gap-3 text-sm">
			<p className="m-0">
				Decorativo (aria-hidden):{" "}
				<Icon ariaHidden>
					<LucideIcons.Clock size={20} aria-hidden />
				</Icon>
			</p>
			<p className="m-0">
				Informativo (aria-label):{" "}
				<Icon ariaHidden={false} ariaLabel="Relógio">
					<LucideIcons.Clock size={20} aria-hidden />
				</Icon>
			</p>
		</div>
	),
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Icon (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Icon</strong> é o átomo presentacional para exibir um ícone (SVG ou ReactNode)
								com tamanho e cor padronizados. O design system utiliza <strong>Lucide React</strong> para
								os ícones. Tamanhos conforme iconSizeRecommendations: 16px (sm, inline com texto),
								20px (md, botões e chips), 24px (large, app bar, icon buttons). Ícones decorativos
								devem usar <code>aria-hidden</code>; ícones informativos devem expor <code>ariaLabel</code>.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props principais)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>size</code> — sm | md | large (16 / 20 / 24px).</li>
								<li><code>color</code> — Cor do ícone (token ou valor CSS).</li>
								<li><code>ariaHidden</code> — true para ícones decorativos.</li>
								<li><code>ariaLabel</code> — Texto para leitores de tela quando o ícone é informativo.</li>
								<li>Conteúdo: ReactNode (ex.: componente Lucide) com dimensão alinhada ao <code>size</code>.</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Botões (IconButton), inputs (prefix/suffix), navegação, estados (sucesso, erro),
								empty states e listas. Use sempre o mesmo <code>size</code> no wrapper Icon e no SVG/ReactNode interno.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Ícones Lucide com tamanhos e cores">
					<p className="mb-4 text-sm text-muted-foreground">
						Use o controlo &quot;icon&quot; na story Default para escolher o ícone a visualizar. Aqui, exemplos em sm, md e large com cor primária.
					</p>
					<div className="flex flex-wrap items-center gap-6">
						<Icon size="sm">
							<LucideIcons.Clock size={16} aria-hidden />
						</Icon>
						<Icon size="md" color={lightColorScheme.primary}>
							<LucideIcons.Search size={20} aria-hidden />
						</Icon>
						<Icon size="large">
							<LucideIcons.Star size={24} aria-hidden />
						</Icon>
					</div>
				</StoryCard>
			</StorySection>
		</div>
	),
};
