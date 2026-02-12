import type { Meta, StoryObj } from "@storybook/react";
import {
  typographyTokens,
  shapeTokens,
  spacingTokens,
  stateLayerTokens,
  motionTokens,
  elevationTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection } from "./shared";

const meta: Meta = {
  title: "Foundation/Design Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tokens de tipografia, shape, spacing, state, motion e elevation.",
      },
    },
  },
};

export default meta;

export const Typography: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typographyTokens.fontFamily.default }}>
      <StorySection title="Type scale">
        <StoryCard title="Display">
          <p style={{ ...typographyTokens.display.large, margin: "0 0 12px", color: "#1a1a1a" }}>
            Display Large
          </p>
          <p style={{ ...typographyTokens.display.medium, margin: "0 0 12px", color: "#1a1a1a" }}>
            Display Medium
          </p>
          <p style={{ ...typographyTokens.display.small, margin: 0, color: "#1a1a1a" }}>
            Display Small
          </p>
          <p style={{ fontSize: 11, color: "#888", marginTop: 12 }}>
            display.large / .medium / .small
          </p>
        </StoryCard>
        <StoryCard title="Headline">
          <p style={{ ...typographyTokens.headline.large, margin: "0 0 12px", color: "#1a1a1a" }}>
            Headline Large
          </p>
          <p style={{ ...typographyTokens.headline.medium, margin: "0 0 12px", color: "#1a1a1a" }}>
            Headline Medium
          </p>
          <p style={{ ...typographyTokens.headline.small, margin: 0, color: "#1a1a1a" }}>
            Headline Small
          </p>
        </StoryCard>
        <StoryCard title="Title · Body · Label">
          <p style={{ ...typographyTokens.title.large, margin: "0 0 8px", color: "#1a1a1a" }}>
            Title large
          </p>
          <p style={{ ...typographyTokens.title.medium, margin: "0 0 8px", color: "#1a1a1a" }}>
            Title medium
          </p>
          <p style={{ ...typographyTokens.body.large, margin: "0 0 8px", color: "#333" }}>
            Body large – texto de conteúdo legível e flexível para parágrafos.
          </p>
          <p style={{ ...typographyTokens.body.medium, margin: "0 0 8px", color: "#333" }}>
            Body medium.
          </p>
          <p style={{ ...typographyTokens.label.large, margin: 0, color: "#555" }}>
            Label large
          </p>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Shape: StoryObj = {
  render: () => (
    <div>
      <StorySection title="Corner radius (shape scale)">
        <StoryCard title="Tokens">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {(
              ["extraSmall", "small", "medium", "large", "extraLarge", "full"] as const
            ).map((key) => (
              <div
                key={key}
                style={{
                  width: 88,
                  height: 88,
                  backgroundColor: "#e8def8",
                  borderRadius: shapeTokens[key],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  textAlign: "center",
                  padding: 8,
                  fontWeight: 500,
                }}
              >
                {key}
                <br />
                <span style={{ fontWeight: 400, opacity: 0.8 }}>{shapeTokens[key]}</span>
              </div>
            ))}
          </div>
        </StoryCard>
        <StoryCard title="Exemplo em contexto">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: "#6750a4",
                color: "#fff",
                borderRadius: shapeTokens.full,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Button (full)
            </div>
            <div
              style={{
                padding: 16,
                backgroundColor: "#e7e0ec",
                borderRadius: shapeTokens.medium,
                maxWidth: 200,
                fontSize: 14,
              }}
            >
              Card (medium)
            </div>
            <div
              style={{
                padding: "8px 12px",
                border: "1px solid #79747e",
                borderRadius: shapeTokens.small,
                fontSize: 14,
              }}
            >
              Field (small)
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div>
      <StorySection title="Spacing scale (base 4px)">
        <StoryCard title="Escala visual">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 8 }}>
            {(["1", "2", "3", "4", "6", "8", "12", "16", "24"] as const).map((key) => (
              <div
                key={key}
                style={{
                  backgroundColor: "#6750a4",
                  width: spacingTokens[key],
                  minWidth: 12,
                  height: 36,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#fff",
                }}
              >
                {key}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
            1 = 4px, 2 = 8px, 4 = 16px, 8 = 32px, etc.
          </p>
        </StoryCard>
        <StoryCard title="Exemplo: padding com spacing tokens">
          <div
            style={{
              backgroundColor: "#e8def8",
              padding: spacingTokens[4],
              borderRadius: shapeTokens.medium,
              marginBottom: 12,
            }}
          >
            padding: spacing[4] (16px)
          </div>
          <div
            style={{
              backgroundColor: "#e8def8",
              padding: spacingTokens[6],
              borderRadius: shapeTokens.medium,
            }}
          >
            padding: spacing[6] (24px)
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Elevation: StoryObj = {
  render: () => (
    <div>
      <StorySection title="Elevation (sombras)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {([0, 1, 2, 3, 4, 5] as const).map((level) => (
            <StoryCard key={level} title={`Level ${level}`}>
              <div
                style={{
                  width: 120,
                  height: 80,
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  boxShadow: elevationTokens[`level${level}` as keyof typeof elevationTokens].boxShadow,
                  border: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "#666",
                }}
              >
                level{level}
              </div>
            </StoryCard>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const StateLayers: StoryObj = {
  render: () => (
    <div>
      <StorySection title="State layers (opacidade sobre a superfície)">
        <p style={{ marginBottom: 20, maxWidth: 560, color: "#555" }}>
          Hover, focus e pressed usam uma camada com opacidade sobre a cor do container.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
          {[
            { label: "Default", opacity: 0 },
            { label: `Hover (${stateLayerTokens.hover * 100}%)`, opacity: stateLayerTokens.hover },
            { label: `Focus (${stateLayerTokens.focus * 100}%)`, opacity: stateLayerTokens.focus },
            { label: `Pressed (${stateLayerTokens.pressed * 100}%)`, opacity: stateLayerTokens.pressed },
          ].map(({ label, opacity }) => (
            <StoryCard key={label} title={label}>
              <div
                style={{
                  width: 140,
                  height: 48,
                  backgroundColor: "#6750a4",
                  borderRadius: 9999,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#fff",
                    opacity,
                    borderRadius: 9999,
                    pointerEvents: "none",
                  }}
                />
                <span style={{ position: "relative", zIndex: 1, color: "#fff", fontWeight: 500 }}>
                  Button
                </span>
              </div>
            </StoryCard>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const Motion: StoryObj = {
  render: () => (
    <div>
      <StorySection title="Motion (duração e easing)">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 720 }}>
          <StoryCard title="Duration">
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "8px 0" }}>Token</th>
                  <th style={{ padding: "8px 0" }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["short1", motionTokens.duration.short1],
                  ["short4", motionTokens.duration.short4],
                  ["medium2", motionTokens.duration.medium2],
                  ["medium4", motionTokens.duration.medium4],
                  ["long2", motionTokens.duration.long2],
                  ["long4", motionTokens.duration.long4],
                ].map(([token, value]) => (
                  <tr key={token} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "8px 0", fontFamily: "monospace" }}>{token}</td>
                    <td style={{ padding: "8px 0", color: "#666" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </StoryCard>
          <StoryCard title="Easing">
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                  <th style={{ padding: "8px 0" }}>Token</th>
                  <th style={{ padding: "8px 0" }}>Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 0", fontFamily: "monospace" }}>standard</td>
                  <td style={{ padding: "8px 0", color: "#666", fontSize: 11 }}>
                    Transições gerais
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 0", fontFamily: "monospace" }}>emphasized</td>
                  <td style={{ padding: "8px 0", color: "#666", fontSize: 11 }}>
                    Entrada/saída de elementos
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 0", fontFamily: "monospace" }}>legacy</td>
                  <td style={{ padding: "8px 0", color: "#666", fontSize: 11 }}>
                    Compatibilidade
                  </td>
                </tr>
              </tbody>
            </table>
          </StoryCard>
        </div>
        <StoryCard title="Uso em animação">
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#6750a4",
              borderRadius: 12,
            }}
          />
          <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
            Use duration (ex.: medium4 = 400ms) e easing (ex.: emphasized) em
            transições CSS ou JS.
          </p>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
