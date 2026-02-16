import type { ReactNode } from "react";
import { useState } from "react";
import { Pin, Info } from "lucide-react";
import { Text } from "@surface/ui/text";
import { Badge } from "@surface/ui/badge";
import { IconButton } from "@surface/ui/icon-button";

export type SemanticDomRow = {
	id: string;
	label: string;
	description: string;
	expandWhenHovered?: ReactNode;
};

export interface SemanticDomSectionProps {
	rows: SemanticDomRow[];
	renderExample: (wrap: (id: string, children: ReactNode, markClass?: string) => ReactNode) => ReactNode;
	versionBadge?: string;
	minHeight?: number;
}

/** Layout Semantic DOM: exemplo à esquerda (2fr), painel [elements] à direita (1fr). Hover bidireccional. */
export function SemanticDomSection({
	rows,
	renderExample,
	versionBadge = "5.18.0",
	minHeight = 300,
}: SemanticDomSectionProps): React.ReactElement {
	const [hovered, setHovered] = useState<string | null>(null);

	const highlightClass = (slot: string) =>
		hovered === slot
			? "outline-2 outline outline-primary outline-offset-1 rounded-sm"
			: "outline-2 outline outline-transparent outline-offset-1 rounded-sm hover:outline-primary/50";

	const wrap = (id: string, children: ReactNode, markClass?: string) => (
		/* biome-ignore lint/a11y/noStaticElementInteractions: demo Semantic DOM — hover para destacar zona no exemplo */
		<span
			role="presentation"
			className={`inline-block transition-[outline-color] ${markClass ?? ""} ${highlightClass(id)} [&]:block`}
			onMouseEnter={() => setHovered(id)}
			onMouseLeave={() => setHovered(null)}
		>
			{children}
		</span>
	);

	return (
		<div
			className="semantic-dom-grid grid gap-6 items-stretch"
			style={{ gridTemplateColumns: "2fr 1fr", minHeight }}
		>
			<style>{`@media (max-width: 768px) { .semantic-dom-grid { grid-template-columns: 1fr !important; } }`}</style>
			<div className="flex min-w-0 items-center justify-center rounded-md border border-border bg-card overflow-hidden p-4" style={{ minHeight }}>
				{renderExample(wrap)}
			</div>
			<div className="min-w-0 flex flex-col">
				<ul className="list-none m-0 p-0 flex flex-col gap-2">
					{rows.map((row) => (
						<li key={row.id} className="m-0 p-0">
							{/* biome-ignore lint/a11y/noStaticElementInteractions: demo — hover na linha destaca zona no exemplo */}
							<div
								role="presentation"
								className={`rounded-md border flex flex-col gap-1 p-3 cursor-default transition-colors ${
									hovered === row.id ? "bg-primary/10 border-primary/20" : "border-border hover:bg-muted/30"
								}`}
								onMouseEnter={() => setHovered(row.id)}
								onMouseLeave={() => setHovered(null)}
							>
								<div className="flex items-center justify-between gap-2">
									<div className="flex items-center gap-2">
										<Text variant="titleSmall" as="span" className="font-semibold m-0">
											{row.label}
										</Text>
										<Badge variant="primary" size="sm">{versionBadge}</Badge>
									</div>
									<div className="flex items-center gap-1">
										<IconButton
											variant="ghost"
											size="sm"
											icon={<Pin className="size-4" aria-hidden />}
											aria-label="Fixar"
										/>
										<IconButton
											variant="ghost"
											size="sm"
											icon={<Info className="size-4" aria-hidden />}
											aria-label="Info"
										/>
									</div>
								</div>
								<Text variant="bodySmall" tone="muted" as="p" className="m-0 text-xs">
									{row.description}
								</Text>
								{row.expandWhenHovered != null && hovered === row.id && (
									<div className="mt-2 pt-2 border-t border-border">
										{row.expandWhenHovered}
									</div>
								)}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const twoColumnStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 32,
  alignItems: "start",
};
export function TwoColumn({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div
      style={{
        ...twoColumnStyle,
        gap: 24,
      }}
      className="interaction-two-col"
    >
      <style>{`@media (max-width: 768px) { .interaction-two-col { grid-template-columns: 1fr; } }`}</style>
      <div style={{ minWidth: 0 }}>{left}</div>
      <div style={{ minWidth: 0 }}>{right}</div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  padding: 20,
  marginBottom: 24,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#666",
  marginBottom: 12,
};

export function StoryCard({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div style={cardStyle}>
      {title ? <div style={sectionTitleStyle}>{title}</div> : null}
      {children}
    </div>
  );
}

export function StorySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>
        {title}
      </h3>
      {children}
    </section>
  );
}
