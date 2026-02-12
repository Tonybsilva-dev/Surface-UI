import type { Meta, StoryObj } from "@storybook/react";
import {
  glossaryEntries,
  glossaryByCategory,
  glossaryCategoryLabels,
  stateLayerTokens,
  lightColorScheme,
  shapeTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "./shared";

const meta: Meta = {
  title: "Foundation/Glossary",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Glossário: termos e definições das foundations. Esquerda: definições. Direita: referência visual quando aplicável.",
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

export const Overview: StoryObj = {
  render: () => {
    const byCat = glossaryByCategory();
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title="Glossary">
          <TwoColumn
            left={
              <StoryCard title="Sobre o glossário">
                <p style={{ margin: "0 0 12px" }}>
                  Termos e definições usados nas foundations do design system.
                </p>
                <p style={{ margin: 0 }}>
                  Use as abas ao lado para ver as definições por categoria e exemplos visuais de referência.
                </p>
              </StoryCard>
            }
            right={
              <StoryCard title="Categorias">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(Object.keys(byCat) as Array<keyof typeof byCat>).map((cat) => (
                    <div
                      key={cat}
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 8,
                        fontSize: 13,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{glossaryCategoryLabels[cat]}</span>
                      <span style={{ color: typo.muted, fontSize: 12 }}>{byCat[cat].length} termos</span>
                    </div>
                  ))}
                </div>
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const TokensAndSurfaces: StoryObj = {
  render: () => {
    const entries = glossaryByCategory().tokens;
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title={glossaryCategoryLabels.tokens}>
          <TwoColumn
            left={
              <StoryCard title="Definições">
                <dl style={{ margin: 0 }}>
                  {entries.map((e) => (
                    <div key={e.term} style={{ marginBottom: 16 }}>
                      <dt style={{ fontWeight: 600, marginBottom: 4 }}>{e.term}</dt>
                      <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{e.definition}</dd>
                    </div>
                  ))}
                </dl>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>State layer</div>
                    <div
                      style={{
                        width: 120,
                        height: 44,
                        borderRadius: shapeTokens.full,
                        backgroundColor: lightColorScheme.primary,
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
                          opacity: stateLayerTokens.focus,
                          borderRadius: shapeTokens.full,
                          pointerEvents: "none",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1, color: lightColorScheme.onPrimary, fontWeight: 500, fontSize: 14 }}>
                        Button
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Surface / Container</div>
                    <div
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: lightColorScheme.surfaceVariant,
                        color: lightColorScheme.onSurfaceVariant,
                        fontSize: 12,
                      }}
                    >
                      surfaceVariant
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: lightColorScheme.primaryContainer,
                        color: lightColorScheme.onPrimaryContainer,
                        fontSize: 12,
                      }}
                    >
                      primaryContainer
                    </div>
                  </div>
                </div>
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const Layout: StoryObj = {
  render: () => {
    const entries = glossaryByCategory().layout;
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title={glossaryCategoryLabels.layout}>
          <TwoColumn
            left={
              <StoryCard title="Definições">
                <dl style={{ margin: 0 }}>
                  {entries.map((e) => (
                    <div key={e.term} style={{ marginBottom: 16 }}>
                      <dt style={{ fontWeight: 600, marginBottom: 4 }}>{e.term}</dt>
                      <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{e.definition}</dd>
                    </div>
                  ))}
                </dl>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Pane (navigation + body)</div>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid #e0e0e0",
                    borderRadius: 12,
                    overflow: "hidden",
                    maxWidth: 280,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      backgroundColor: "#f0f0f0",
                      padding: 8,
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Nav
                  </div>
                  <div style={{ flex: 1, padding: 8, backgroundColor: "#fafafa" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 4 }}>Body</div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <div style={{ flex: 1, height: 40, backgroundColor: "#e8def8", borderRadius: 6 }} />
                      <div style={{ width: 60, height: 40, backgroundColor: "#e7e0ec", borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>flexible · fixed</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginTop: 12, marginBottom: 6 }}>
                  Window size classes
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["compact", "medium", "expanded"].map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 8,
                        backgroundColor: "#f0f0f0",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const Interaction: StoryObj = {
  render: () => {
    const entries = glossaryByCategory().interaction;
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title={glossaryCategoryLabels.interaction}>
          <TwoColumn
            left={
              <StoryCard title="Definições">
                <dl style={{ margin: 0 }}>
                  {entries.map((e) => (
                    <div key={e.term} style={{ marginBottom: 16 }}>
                      <dt style={{ fontWeight: 600, marginBottom: 4 }}>{e.term}</dt>
                      <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{e.definition}</dd>
                    </div>
                  ))}
                </dl>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Focus ring</div>
                    <button
                      type="button"
                      style={{
                        padding: "8px 16px",
                        borderRadius: 9999,
                        border: "none",
                        backgroundColor: lightColorScheme.primary,
                        color: lightColorScheme.onPrimary,
                        outline: "2px solid #6750a4",
                        outlineOffset: 2,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      Focado
                    </button>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Touch target (48×48dp)</div>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: "#e8def8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                      title="48×48dp mínimo"
                    >
                      ⊕
                    </div>
                  </div>
                </div>
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const ComponentsAndGeneral: StoryObj = {
  render: () => {
    const components = glossaryByCategory().components;
    const general = glossaryByCategory().general;
    const entries = [...components, ...general];
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title="Componentes & geral">
          <TwoColumn
            left={
              <StoryCard title="Definições">
                <dl style={{ margin: 0 }}>
                  {entries.map((e) => (
                    <div key={e.term} style={{ marginBottom: 16 }}>
                      <dt style={{ fontWeight: 600, marginBottom: 4 }}>{e.term}</dt>
                      <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{e.definition}</dd>
                    </div>
                  ))}
                </dl>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Component + Role</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        style={{
                          padding: "8px 16px",
                          borderRadius: 9999,
                          border: "none",
                          backgroundColor: lightColorScheme.primary,
                          color: lightColorScheme.onPrimary,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Primary
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: "8px 16px",
                          borderRadius: 9999,
                          border: `1px solid ${lightColorScheme.outline}`,
                          backgroundColor: lightColorScheme.surface,
                          color: lightColorScheme.onSurface,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Secondary
                      </button>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Hierarchy</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a" }}>Título principal</div>
                      <div style={{ fontSize: 14, color: "#555" }}>Subtítulo ou corpo</div>
                      <div style={{ fontSize: 12, color: "#888" }}>Label ou caption</div>
                    </div>
                  </div>
                </div>
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const AllTerms: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Todos os termos (lista)">
        <StoryCard>
          <dl style={{ margin: 0, columns: 2, columnGap: 32 }}>
            {glossaryEntries.map((e) => (
              <div key={e.term} style={{ marginBottom: 12, breakInside: "avoid" }}>
                <dt style={{ fontWeight: 600, marginBottom: 2, fontSize: 13 }}>{e.term}</dt>
                <dd style={{ margin: 0, color: typo.muted, fontSize: 12 }}>{e.definition}</dd>
              </div>
            ))}
          </dl>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
