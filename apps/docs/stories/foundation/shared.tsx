import type { ReactNode } from "react";

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
