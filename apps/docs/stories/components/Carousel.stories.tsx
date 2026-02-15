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
					"Carrossel com setas (Embla). Carousel + CarouselContent + CarouselItem + CarouselPrevious + CarouselNext. opts expõe a API do Embla (align, loop, duration, draggable).",
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
			description: "Duração da animação ao navegar (API). Valores ~20–60.",
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
				<Carousel opts={opts} setApi={setApi}>
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
					<div className="mt-4 flex justify-center gap-2">
						{slides.map((slide, i) => (
							<button
								key={slide.title}
								type="button"
								aria-label={`Ir para slide ${i + 1}`}
								onClick={() => api?.scrollTo(i)}
								className={`h-2 w-2 rounded-full transition-colors ${
									i === selectedIndex ? "bg-primary" : "bg-muted-foreground/40"
								}`}
							/>
						))}
					</div>
				) : null}
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
								vertical) com setas de navegação. Baseado em Embla. Usa o Button
								do design system para Previous/Next e tokens de motion.
								Acessível (role=region, aria-roledescription=carousel, slides com
								role=group).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estrutura / Como se usa</h3>
							<p>
								<strong>Carousel</strong> (opts, orientation, setApi) +{" "}
								<strong>CarouselContent</strong> +{" "}
								<strong>CarouselItem</strong> (por slide) +{" "}
								<strong>CarouselPrevious</strong> + <strong>CarouselNext</strong>
								. opts passa opções ao Embla (align, loop, etc.).
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
		</div>
	),
};
