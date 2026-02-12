import type { Meta, StoryObj } from "@storybook/react";
import {
  contrastRatios,
  focusRing,
  touchTarget,
  layoutRegions,
  layoutBreakpoints,
  paneTypes,
  flowGuidelines,
  navigationBarDestinations,
  componentCategoryExamples,
  writingBestPractices,
  textTruncation,
  textResizing,
  windowWidthClasses,
  canonicalLayouts,
  adaptiveNavigationPatterns,
  userNeedDimensions,
  coDesignPractices,
  inclusiveChecklist,
} from "@surface/ui/foundation";
import { StoryCard, StorySection } from "./shared";

const meta: Meta = {
  title: "Foundation/Design Foundations",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Guidelines M3: overview, acessibilidade, estrutura, flow, elementos, escrita, adaptive design, building for all.",
      },
    },
  },
};

export default meta;

export const Accessibility: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Acessibilidade & Color contrast">
        <StoryCard title="Razões de contraste mínimas (WCAG / M3)">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 100,
                  height: 60,
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Aa
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>≥ {contrastRatios.textNormal}:1 (texto normal)</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 100,
                  height: 60,
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 8,
                }}
              >
                Aa
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>≥ {contrastRatios.textLarge}:1 (texto grande)</div>
            </div>
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#555" }}>
            <li>Texto normal: ≥ {contrastRatios.textNormal}:1</li>
            <li>Texto grande: ≥ {contrastRatios.textLarge}:1</li>
            <li>Elementos gráficos/UI: ≥ {contrastRatios.graphicalObjects}:1</li>
          </ul>
        </StoryCard>
        <StoryCard title="Focus ring (visível ao foco do teclado)">
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              type="button"
              style={{
                padding: "12px 24px",
                backgroundColor: "#6750a4",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
                outline: `${focusRing.width} ${focusRing.style} #6750a4`,
                outlineOffset: focusRing.offset,
                cursor: "pointer",
              }}
            >
              Botão com focus ring
            </button>
            <span style={{ fontSize: 12, color: "#666" }}>
              Largura: {focusRing.width}, offset: {focusRing.offset}
            </span>
          </div>
        </StoryCard>
        <StoryCard title="Touch target mínimo (48×48px)">
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: touchTarget.minWidth,
                height: touchTarget.minHeight,
                backgroundColor: "#e8def8",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
              title={`Mínimo ${touchTarget.minWidth}×${touchTarget.minHeight}${touchTarget.unit}`}
            >
              🔘
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{touchTarget.minWidth}×{touchTarget.minHeight} {touchTarget.unit}</div>
              <div style={{ fontSize: 12, color: "#666" }}>Área mínima clicável para acessibilidade</div>
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Structure: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Structure (layout)">
        <StoryCard title="Regiões: Navigation + Body">
          <div
            style={{
              display: "flex",
              border: "2px solid #e0e0e0",
              borderRadius: 12,
              overflow: "hidden",
              maxWidth: 520,
            }}
          >
            <div
              style={{
                width: 72,
                backgroundColor: "#f5f5f5",
                padding: 12,
                fontSize: 11,
                fontWeight: 600,
                textAlign: "center",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {layoutRegions.navigation}
            </div>
            <div style={{ flex: 1, padding: 16, backgroundColor: "#fafafa" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 8 }}>
                {layoutRegions.body}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    flex: 1,
                    padding: 12,
                    backgroundColor: "#e8def8",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                >
                  Pane ({paneTypes.flexible})
                </div>
                <div
                  style={{
                    width: 120,
                    padding: 12,
                    backgroundColor: "#e7e0ec",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                >
                  Pane ({paneTypes.fixed})
                </div>
              </div>
            </div>
          </div>
        </StoryCard>
        <StoryCard title="Breakpoints">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "6px 12px",
                backgroundColor: "#e3f2fd",
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              compact &lt; {layoutBreakpoints.medium}{layoutBreakpoints.unit}
            </span>
            <span
              style={{
                padding: "6px 12px",
                backgroundColor: "#e8eaf6",
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              medium {layoutBreakpoints.medium}–{layoutBreakpoints.expanded}{layoutBreakpoints.unit}
            </span>
            <span
              style={{
                padding: "6px 12px",
                backgroundColor: "#f3e5f5",
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              expanded ≥ {layoutBreakpoints.expanded}{layoutBreakpoints.unit}
            </span>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Flow: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Flow (navegação)">
        <StoryCard title="Princípios">
          <ul style={{ margin: "0 0 16px", paddingLeft: 20, color: "#555" }}>
            {Object.values(flowGuidelines).map((g) => (
              <li key={g}>{g.replace(/-/g, " ")}</li>
            ))}
          </ul>
        </StoryCard>
        <StoryCard title={`Navigation bar: ${navigationBarDestinations.min}–${navigationBarDestinations.max} destinos`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "12px 16px",
              backgroundColor: "#f5f5f5",
              borderRadius: 12,
              maxWidth: 400,
            }}
          >
            {["Home", "Search", "Profile"].map((label, i) => (
              <button
                key={label}
                type="button"
                style={{
                  padding: 8,
                  border: "none",
                  background: i === 0 ? "#e8def8" : "transparent",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
            Exemplo com 3 destinos (recomendado 3–5).
          </p>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const Elements: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Elements (categorias de componentes)">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {(Object.keys(componentCategoryExamples) as Array<keyof typeof componentCategoryExamples>).map(
            (category) => (
              <StoryCard key={category} title={category.charAt(0).toUpperCase() + category.slice(1)}>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#555" }}>
                  {componentCategoryExamples[category].map((example) => (
                    <li key={example} style={{ marginBottom: 4 }}>
                      {example}
                    </li>
                  ))}
                </ul>
              </StoryCard>
            )
          )}
        </div>
      </StorySection>
    </div>
  ),
};

export const WritingBestPractices: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Writing – Best practices">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(writingBestPractices).map(([, key]) => (
            <StoryCard key={key} title={key.replace(/-/g, " ")}>
              {key === "sentence-case" && (
                <p style={{ margin: 0, color: "#555" }}>
                  Exemplo: "Título da página" em vez de "Título Da Página".
                </p>
              )}
              {key === "avoid-abbreviations" && (
                <p style={{ margin: 0, color: "#555" }}>
                  Exemplo: "por exemplo" em vez de "e.g.", "e mais" em vez de "etc."
                </p>
              )}
              {key === "explain-consequences" && (
                <p style={{ margin: 0, color: "#555" }}>
                  Descreva o resultado da ação e como desfazer, sem alarmar.
                </p>
              )}
              {key === "scannable-format" && (
                <p style={{ margin: 0, color: "#555" }}>
                  Use títulos e subheadings para conteúdo escaneável.
                </p>
              )}
              {key === "understandable-anywhere" && (
                <p style={{ margin: 0, color: "#555" }}>
                  Texto claro para qualquer pessoa, em qualquer contexto.
                </p>
              )}
            </StoryCard>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const TextTruncation: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Writing – Text truncation">
        <StoryCard title="Uma linha (ellipsis)">
          <div
            style={{
              maxWidth: 320,
              ...textTruncation.singleLine,
              border: "1px solid #e0e0e0",
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          >
            Este texto longo será truncado com reticências no final quando não couber em uma única linha na interface.
          </div>
        </StoryCard>
        <StoryCard title="Line clamp (2 linhas)">
          <div
            style={{
              maxWidth: 320,
              ...textTruncation.lineClamp(2),
              border: "1px solid #e0e0e0",
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          >
            Este bloco limita a duas linhas. Qualquer conteúdo que passar será cortado e pode ser indicado com reticências conforme a implementação no componente.
          </div>
        </StoryCard>
        <StoryCard title="Line clamp (3 linhas)">
          <div
            style={{
              maxWidth: 320,
              ...textTruncation.lineClamp(3),
              border: "1px solid #e0e0e0",
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#fafafa",
            }}
          >
            Com três linhas você pode mostrar um pouco mais de conteúdo antes de truncar. Útil para listas ou cards com descrições curtas que não podem ocupar todo o espaço.
          </div>
        </StoryCard>
        <p style={{ fontSize: 12, color: "#666" }}>
          maxLines: {textTruncation.maxLines.one}, {textTruncation.maxLines.two}, {textTruncation.maxLines.three}
        </p>
      </StorySection>
    </div>
  ),
};

export const TextResizing: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Writing – Text resizing (WCAG 1.4.4)">
        <StoryCard title="Requisitos">
          <ul style={{ margin: "0 0 16px", paddingLeft: 20, color: "#555" }}>
            <li>Escala máxima: <strong>{textResizing.maxScalePercent}%</strong></li>
            <li>Unidades preferidas: <strong>{textResizing.preferredUnits.join(", ")}</strong></li>
            <li>Requisitos: {textResizing.requirements.join(", ")}</li>
          </ul>
        </StoryCard>
        <StoryCard title="Exemplo com rem (escala com preferências do usuário)">
          <p style={{ fontSize: "1rem", margin: "0 0 8px" }}>
            Texto em 1rem escala com as configurações do navegador.
          </p>
          <p style={{ fontSize: "0.875rem", margin: 0, color: "#555" }}>
            Body em 0.875rem. Use rem/em para permitir zoom de texto até 200%.
          </p>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const AdaptiveDesign: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Adaptive design">
        <StoryCard title="Window size classes (largura)">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {(
              ["compact", "medium", "expanded"] as Array<
                keyof typeof windowWidthClasses
              >
            ).map((key) => (
              <span
                key={key}
                style={{
                  padding: "6px 12px",
                  borderRadius: 9999,
                  backgroundColor:
                    key === "compact"
                      ? "#e3f2fd"
                      : key === "medium"
                      ? "#e8eaf6"
                      : "#f3e5f5",
                  fontSize: 13,
                }}
              >
                {windowWidthClasses[key].label}
              </span>
            ))}
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#555" }}>
            <li>{windowWidthClasses.compact.description}</li>
            <li>{windowWidthClasses.medium.description}</li>
            <li>{windowWidthClasses.expanded.description}</li>
          </ul>
        </StoryCard>
        <StoryCard title="Layouts canônicos">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div
              style={{
                flex: "1 1 200px",
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                padding: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                  color: "#666",
                }}
              >
                {canonicalLayouts.listDetail}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  height: 80,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#e8def8",
                    borderRadius: 8,
                  }}
                />
                <div
                  style={{
                    flex: 2,
                    backgroundColor: "#e7e0ec",
                    borderRadius: 8,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                flex: "1 1 200px",
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                padding: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                  color: "#666",
                }}
              >
                {canonicalLayouts.supportingPane}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  height: 80,
                }}
              >
                <div
                  style={{
                    flex: 2,
                    backgroundColor: "#e8def8",
                    borderRadius: 8,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#f3e5f5",
                    borderRadius: 8,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                flex: "1 1 200px",
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                padding: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                  color: "#666",
                }}
              >
                {canonicalLayouts.feed}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 4,
                  height: 80,
                }}
              >
                {["a", "b", "c", "d", "e", "f"].map((id) => (
                  <div
                    key={`feed-card-${id}`}
                    style={{
                      backgroundColor: "#e8def8",
                      borderRadius: 6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </StoryCard>
        <StoryCard title="Navegação adaptativa (exemplo)">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                {adaptiveNavigationPatterns.compact.navigation}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "10px 12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 12,
                  maxWidth: 260,
                }}
              >
                {["Home", "Search", "Profile"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                {adaptiveNavigationPatterns.expanded.navigation}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    width: 56,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 12,
                    padding: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {["H", "S", "P"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9999,
                        border: "none",
                        backgroundColor: "#e8def8",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    width: 180,
                    borderRadius: 12,
                    backgroundColor: "#fafafa",
                  }}
                />
              </div>
            </div>
          </div>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

export const BuildingForAll: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "system-ui", fontSize: 14 }}>
      <StorySection title="Building for all">
        <StoryCard title="User needs (dimensões)">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {Object.entries(userNeedDimensions).map(([dimension, values]) => (
              <div
                key={dimension}
                style={{
                  flex: "1 1 200px",
                  borderRadius: 12,
                  border: "1px solid #e0e0e0",
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                    color: "#666",
                  }}
                >
                  {dimension}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    fontSize: 12,
                    color: "#555",
                  }}
                >
                  {values.map((tag) => (
                    <li key={tag}>{tag.replace(/-/g, " ")}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </StoryCard>
        <StoryCard title="Co-design (práticas)">
          <ul style={{ margin: 0, paddingLeft: 20, color: "#555" }}>
            {Object.values(coDesignPractices).map((text) => (
              <li key={text} style={{ marginBottom: 4 }}>
                {text}
              </li>
            ))}
          </ul>
        </StoryCard>
        <StoryCard title="Checklist de inclusão (por componente)">
          <ul style={{ margin: 0, paddingLeft: 20, color: "#555" }}>
            {Object.entries(inclusiveChecklist).map(([key, text]) => (
              <li key={key} style={{ marginBottom: 4 }}>
                <strong>{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</strong>{" "}
                {text}
              </li>
            ))}
          </ul>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
