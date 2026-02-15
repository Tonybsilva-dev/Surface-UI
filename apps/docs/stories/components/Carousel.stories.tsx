import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { CarouselApi } from "@surface/ui/carousel";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselDots,
} from "@surface/ui/carousel";
import { Text } from "@surface/ui/text";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Carousel> = {
	title: "Components/Molecules/Carousel",
	component: Carousel,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Carrossel baseado em **Embla Carousel** (não React Slick). Carousel + CarouselContent + CarouselItem + CarouselPrevious + CarouselNext. Setas usam o átomo Button (sem bordas arredondadas). Use **setApi** para obter a API: scrollTo(i), scrollPrev(), scrollNext(), selectedScrollSnap(), canScrollPrev(), canScrollNext(), on/off('select'). opts expõe opções Embla (align, loop, duration, draggable, etc.).",
			},
		},
	},
	argTypes: {
		showArrows: {
			description: "Mostrar setas de navegação (CarouselPrevious / CarouselNext).",
			control: "boolean",
			table: { category: "UI", type: { summary: "boolean" } },
		},
		showDots: {
			description: "Mostrar indicadores (dots) por baixo do carrossel.",
			control: "boolean",
			table: { category: "UI", type: { summary: "boolean" } },
		},
		orientation: {
			description: "Eixo do carrossel (horizontal ou vertical).",
			control: "select",
			options: ["horizontal", "vertical"],
			table: { category: "Layout", type: { summary: "horizontal | vertical" } },
		},
		loop: {
			description: "Rolar infinitamente (loop).",
			control: "boolean",
			table: { category: "Embla opts", type: { summary: "boolean" } },
		},
		align: {
			description: "Alinhamento dos slides no viewport.",
			control: "select",
			options: ["start", "center", "end"],
			table: { category: "Embla opts", type: { summary: "start | center | end" } },
		},
		duration: {
			description: "Duração da animação ao navegar (ms). Valores ~20–60.",
			control: { type: "number", min: 10, max: 80, step: 5 },
			table: { category: "Embla opts", type: { summary: "number" } },
		},
		draggable: {
			description: "Permitir arrastar no desktop.",
			control: "boolean",
			table: { category: "Embla opts", type: { summary: "boolean" } },
		},
	},
	args: {
		showArrows: true,
		showDots: false,
		orientation: "horizontal",
		loop: true,
		align: "center",
		duration: 25,
		draggable: true,
	},
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const slides = [
	{ title: "Slide 1", body: "Conteúdo do primeiro slide. Use para imagens, cards ou texto." },
	{ title: "Slide 2", body: "Segundo slide. O carrossel suporta navegação por setas e teclado." },
	{ title: "Slide 3", body: "Terceiro slide. Tokens de motion e acessibilidade (role=region, aria-roledescription)." },
];

/** Exemplo de carousel sem bordas nos slides (para uso na Overview). */
function BorderlessExample() {
	const [api, setApi] = useState<CarouselApi | null>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (!api) return;
		setSelectedIndex(api.selectedScrollSnap());
		const handler = () => setSelectedIndex(api.selectedScrollSnap());
		api.on("select", handler);
		return () => api.off("select", handler);
	}, [api]);

	return (
		<Carousel opts={{ align: "center", loop: true, duration: 25, draggable: true }} setApi={setApi}>
			<CarouselContent className="rounded-lg overflow-hidden">
				{slides.map((slide) => (
					<CarouselItem key={slide.title}>
						<div className="rounded-lg bg-muted/80 p-6">
							<Text variant="titleSmall" className="block mb-2">
								{slide.title}
							</Text>
							<Text variant="bodySmall" tone="muted" as="p">
								{slide.body}
							</Text>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
			<CarouselDots
				slideCount={slides.length}
				selectedIndex={selectedIndex}
				onSelect={(i) => api?.scrollTo(i)}
				className="mt-4"
			/>
		</Carousel>
	);
}

/** Container centralizado para melhor visualização do carousel. */
const CarouselWrapper = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => (
	<div className={`flex min-h-[320px] w-full items-center justify-center ${className ?? ""}`}>
		<div className="flex w-full max-w-[480px] flex-col items-center">{children}</div>
	</div>
);

export const Default: Story = {
	render: function DefaultCarousel(args) {
		const [api, setApi] = useState<CarouselApi | null>(null);
		const [selectedIndex, setSelectedIndex] = useState(0);

		// Subscrever select para dots
		useEffect(() => {
			if (!api) return;
			setSelectedIndex(api.selectedScrollSnap());
			const handler = () => setSelectedIndex(api.selectedScrollSnap());
			api.on("select", handler);
			return () => api.off("select", handler);
		}, [api]);

		const opts = {
			align: args.align as "start" | "center" | "end",
			loop: args.loop,
			duration: args.duration,
			draggable: args.draggable,
		};

		return (
			<CarouselWrapper>
				<Carousel opts={opts} setApi={setApi} orientation={args.orientation as "horizontal" | "vertical"}>
					<CarouselContent>
						{slides.map((slide) => (
							<CarouselItem key={slide.title}>
								<div className="rounded-md border border-border bg-card p-6">
									<Text variant="titleSmall" className="block mb-2">
										{slide.title}
									</Text>
									<Text variant="bodySmall" tone="muted" as="p">
										{slide.body}
									</Text>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{args.showArrows ? (
						<>
							<CarouselPrevious />
							<CarouselNext />
						</>
					) : null}
				</Carousel>
				{args.showDots ? (
					<CarouselDots
						slideCount={slides.length}
						selectedIndex={selectedIndex}
						onSelect={(i) => api?.scrollTo(i)}
						className="mt-4"
					/>
				) : null}
			</CarouselWrapper>
		);
	},
};

/** Carousel sem bordas nos slides: o conteúdo preenche sem card/border. */
export const Borderless: Story = {
	render: function BorderlessCarousel() {
		const [api, setApi] = useState<CarouselApi | null>(null);
		const [selectedIndex, setSelectedIndex] = useState(0);

		useEffect(() => {
			if (!api) return;
			setSelectedIndex(api.selectedScrollSnap());
			const handler = () => setSelectedIndex(api.selectedScrollSnap());
			api.on("select", handler);
			return () => api.off("select", handler);
		}, [api]);

		return (
			<CarouselWrapper>
				<Carousel opts={{ align: "center", loop: true, duration: 25, draggable: true }} setApi={setApi}>
					<CarouselContent className="rounded-lg overflow-hidden">
						{slides.map((slide) => (
							<CarouselItem key={slide.title}>
								<div className="rounded-lg bg-muted/80 p-6">
									<Text variant="titleSmall" className="block mb-2">
										{slide.title}
									</Text>
									<Text variant="bodySmall" tone="muted" as="p">
										{slide.body}
									</Text>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
					<CarouselDots
						slideCount={slides.length}
						selectedIndex={selectedIndex}
						onSelect={(i) => api?.scrollTo(i)}
						className="mt-4"
					/>
				</Carousel>
			</CarouselWrapper>
		);
	},
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Carousel (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Carousel</strong> é um carrossel horizontal (ou
								vertical) com setas de navegação e dots opcionais. Baseado em Embla. Usa o Button
								do design system para Previous/Next. <strong>Sem bordas por defeito</strong> — as bordas vêm do conteúdo que colocas em CarouselItem (ex.: card com border).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								<strong>Carousel</strong> (opts, orientation, setApi) +{" "}
								<strong>CarouselContent</strong> +{" "}
								<strong>CarouselItem</strong> (por slide) +{" "}
								<strong>CarouselPrevious</strong> + <strong>CarouselNext</strong>
								. Opcional: <strong>CarouselDots</strong> (slideCount, selectedIndex, onSelect). opts passa opções ao Embla (align, loop, duration, draggable).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (setApi)</h3>
							<p className="mb-2">
								Com <code>setApi(api)</code> obténs a instância Embla. Métodos disponíveis:
							</p>
							<table className="w-full text-left text-sm border border-border rounded-md">
								<thead>
									<tr className="border-b border-border bg-muted/50">
										<th className="p-2 font-medium">Método</th>
										<th className="p-2 font-medium">Descrição</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-border"><td className="p-2 font-mono">scrollTo(index)</td><td className="p-2">Ir para o slide no índice (0-based).</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">scrollPrev()</td><td className="p-2">Slide anterior.</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">scrollNext()</td><td className="p-2">Próximo slide.</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">selectedScrollSnap()</td><td className="p-2">Índice do slide atual.</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">canScrollPrev()</td><td className="p-2">Se pode voltar.</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">canScrollNext()</td><td className="p-2">Se pode avançar.</td></tr>
									<tr className="border-b border-border"><td className="p-2 font-mono">on(&quot;select&quot;, fn)</td><td className="p-2">Callback quando o slide muda (para sync com CarouselDots).</td></tr>
									<tr><td className="p-2 font-mono">off(&quot;select&quot;, fn)</td><td className="p-2">Remover listener.</td></tr>
								</tbody>
							</table>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Sem bordas</h3>
							<p>
								O Carousel não aplica borda ao content nem aos items. Para slides sem bordas, não uses <code>border</code> no conteúdo de CarouselItem (ver story Borderless).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Galeria de imagens, destaque de produtos, depoimentos e
								qualquer conteúdo que precise de navegação por slides.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Carousel: três slides com setas e cards">
					<p className="mb-4 text-sm text-muted-foreground">
						Carrossel com três slides, cada um com título e texto. Setas
						laterais para navegar; suporta setas do teclado. Centralizado no container.
					</p>
					<CarouselWrapper>
						<Carousel opts={{ align: "center", loop: true, duration: 25, draggable: true }}>
							<CarouselContent>
								{slides.map((slide) => (
									<CarouselItem key={slide.title}>
										<div className="rounded-md border border-border bg-card p-6">
											<Text variant="titleSmall" className="block mb-2">
												{slide.title}
											</Text>
											<Text variant="bodySmall" tone="muted" as="p">
												{slide.body}
											</Text>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</CarouselWrapper>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo sem bordas">
				<StoryCard title="Carousel sem bordas (Borderless)">
					<p className="mb-4 text-sm text-muted-foreground">
						Mesmo carrossel com setas e dots; slides sem border (apenas fundo suave). O componente não impõe bordas.
					</p>
					<CarouselWrapper>
						<BorderlessExample />
					</CarouselWrapper>
				</StoryCard>
			</StorySection>
		</div>
	),
};
