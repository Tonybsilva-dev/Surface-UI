import type { Meta, StoryObj } from "@storybook/react";
import {
  shapeOverview,
  shapeCornerRadiusScale,
  shapeMorph,
  shapeTokens,
  componentShapeTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Shape",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shape M3: princípios, escala de corner radius, shape morph. Esquerda: conceitos. Direita: exemplos visuais e tokens.",
      },
    },
  },
};

export default meta;

const typo = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  body: 14,
  muted: "#666",
};

const tokenKeys = ["extraSmall", "small", "medium", "large", "extraLarge", "full"] as const;

export const Overview: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Shape (overview)">
        <TwoColumn
          left={
            <StoryCard title={shapeOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{shapeOverview.description}</p>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                {shapeOverview.principles.map((p) => (
                  <li key={p.slice(0, 24)} style={{ marginBottom: 8 }}>{p}</li>
                ))}
              </ul>
              <a href={shapeOverview.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6750a4" }}>
                M3 – Overview & principles →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 12, color: typo.muted, marginBottom: 4 }}>Escala de arredondamento</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 0, backgroundColor: "#e8def8" }} title="None" />
                  <div style={{ width: 48, height: 48, borderRadius: shapeTokens.extraSmall, backgroundColor: "#e8def8" }} title="Extra small" />
                  <div style={{ width: 48, height: 48, borderRadius: shapeTokens.small, backgroundColor: "#e8def8" }} title="Small" />
                  <div style={{ width: 48, height: 48, borderRadius: shapeTokens.medium, backgroundColor: "#e8def8" }} title="Medium" />
                  <div style={{ width: 48, height: 48, borderRadius: shapeTokens.large, backgroundColor: "#e8def8" }} title="Large" />
                  <div style={{ width: 48, height: 48, borderRadius: shapeTokens.full, backgroundColor: "#6750a4" }} title="Full" />
                </div>
                <div style={{ fontSize: 11, color: typo.muted }}>shapeTokens.extraSmall → full</div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const CornerRadiusScale: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Corner radius scale">
        <TwoColumn
          left={
            <StoryCard title="Escala e customização">
              <p style={{ margin: "0 0 12px" }}>{shapeCornerRadiusScale.description}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Escala (resumo)</div>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20, fontSize: 12 }}>
                {shapeCornerRadiusScale.scale.slice(0, 6).map((s) => (
                  <li key={s} style={{ marginBottom: 4 }}>{s}</li>
                ))}
                <li>… até Full</li>
              </ul>
              <p style={{ margin: "0 0 12px", fontSize: 13 }}>{shapeCornerRadiusScale.symmetry}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Customização</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {shapeCornerRadiusScale.customizing.map((c) => (
                  <li key={c.slice(0, 20)} style={{ marginBottom: 6, fontSize: 13 }}>{c}</li>
                ))}
              </ul>
              <a href={shapeCornerRadiusScale.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "#6750a4" }}>
                M3 – Corner radius scale →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Tokens e componentes">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>shapeTokens</div>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <tbody>
                      {tokenKeys.map((key) => (
                        <tr key={key} style={{ borderBottom: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "4px 0", fontFamily: "monospace" }}>{key}</td>
                          <td style={{ padding: "4px 0", color: typo.muted }}>{shapeTokens[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>componentShapeTokens</div>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <tbody>
                      {Object.entries(componentShapeTokens).map(([comp, value]) => (
                        <tr key={comp} style={{ borderBottom: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "4px 0", fontFamily: "monospace" }}>{comp}</td>
                          <td style={{ padding: "4px 0", color: typo.muted }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ padding: "8px 14px", borderRadius: componentShapeTokens.button, backgroundColor: "#6750a4", color: "#fff", fontSize: 12 }}>Button</div>
                <div style={{ padding: 12, borderRadius: componentShapeTokens.card, backgroundColor: "#f5f0ff", width: 80, height: 56 }} />
                <div style={{ padding: "6px 12px", borderRadius: componentShapeTokens.chip, backgroundColor: "#e8def8", fontSize: 12 }}>Chip</div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const ShapeMorph: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Shape morph">
        <TwoColumn
          left={
            <StoryCard title="Morphing de formas">
              <p style={{ margin: "0 0 12px" }}>{shapeMorph.description}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Quando usar</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {shapeMorph.whenToUse.map((u) => (
                  <li key={u.slice(0, 24)} style={{ marginBottom: 8 }}>{u}</li>
                ))}
              </ul>
              <a href={shapeMorph.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "#6750a4" }}>
                M3 – Shape morph →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Exemplo conceitual: FAB → extended</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ width: 56, height: 56, borderRadius: shapeTokens.medium, backgroundColor: "#6750a4", flexShrink: 0 }} title="FAB" />
                    <span style={{ fontSize: 12, color: typo.muted }}>→ morph →</span>
                    <div style={{ height: 56, paddingLeft: 20, paddingRight: 20, borderRadius: shapeTokens.medium, backgroundColor: "#6750a4", display: "flex", alignItems: "center", color: "#fff", fontSize: 12 }}>
                      Extended FAB
                    </div>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: typo.muted }}>Transição com motionTokens.duration + easing</p>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Chip expandindo</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ padding: "8px 14px", borderRadius: shapeTokens.full, backgroundColor: "#e8def8", fontSize: 12 }}>Chip</div>
                    <span style={{ fontSize: 12, color: typo.muted }}>→</span>
                    <div style={{ padding: "8px 20px", borderRadius: shapeTokens.full, backgroundColor: "#e8def8", fontSize: 12, minWidth: 120 }}>Chip expandido</div>
                  </div>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};
