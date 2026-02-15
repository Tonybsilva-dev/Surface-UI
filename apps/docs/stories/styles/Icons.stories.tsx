import type { Meta, StoryObj } from "@storybook/react";
import { Check, Search } from "lucide-react";
import {
  iconOverview,
  iconDesigningGuidelines,
  iconApplyingGuidelines,
  iconSizeRecommendations,
  lightColorScheme,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Princípios de ícones, adaptados para Lucide ou Phosphor. Esquerda: conceitos. Direita: exemplos visuais (tamanhos, uso em botão e lista).",
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
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Icons (overview)">
        <TwoColumn
          left={
            <StoryCard title={iconOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{iconOverview.description}</p>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: typo.muted }}>{iconOverview.libraryNote}</p>
            </StoryCard>
          }
          right={
            <StoryCard title="Lucide vs Phosphor (princípios comuns)">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Mesmo conceito: stroke, grid, escala</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <Search size={24} color={lightColorScheme.primary} aria-hidden />
                    <Search size={20} color={lightColorScheme.onSurface} aria-hidden />
                    <Search size={16} color={lightColorScheme.onSurfaceVariant} aria-hidden />
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: typo.muted }}>24px · 20px · 16px (escala consistente)</p>
                </div>
                <div style={{ padding: 12, borderRadius: 8, backgroundColor: "#f5f5f5", fontSize: 12, color: typo.muted }}>
                  Use uma biblioteca por produto (Lucide ou Phosphor) e mantenha peso/tamanho consistentes.
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const Designing: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Designing icons">
        <TwoColumn
          left={
            <StoryCard title="Princípios (adaptados para Lucide/Phosphor)">
              <p style={{ margin: "0 0 12px" }}>{iconDesigningGuidelines.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {iconDesigningGuidelines.keyPoints.map((point) => (
                  <li key={point} style={{ marginBottom: 8 }}>{point}</li>
                ))}
              </ul>
              <p style={{ marginTop: 12, fontSize: 12, color: typo.muted }}>
                Lucide: <a href={iconDesigningGuidelines.lucideRef} target="_blank" rel="noopener noreferrer" style={{ color: "#6750a4" }}>guia</a>
                {" · "}
                Phosphor: <a href={iconDesigningGuidelines.phosphorRef} target="_blank" rel="noopener noreferrer" style={{ color: "#6750a4" }}>phosphoricons.com</a>
              </p>
            </StoryCard>
          }
          right={
            <StoryCard title="Consistência e grid">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Alinhamento em grid 24×24</div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc", borderRadius: 4 }}>
                      <Search size={20} aria-hidden />
                    </div>
                    <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc", borderRadius: 4 }}>
                      <Check size={20} aria-hidden />
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Ícone decorativo vs informativo</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 13 }}>Sucesso</span>
                    <Check size={18} color={lightColorScheme.primary} aria-hidden />
                    <span style={{ fontSize: 11, color: typo.muted }}>→ use aria-label ou texto visível se for a única indicação de estado</span>
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

export const Applying: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Applying icons">
        <TwoColumn
          left={
            <StoryCard title="Onde e como usar">
              <p style={{ margin: "0 0 12px" }}>{iconApplyingGuidelines.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {iconApplyingGuidelines.keyPoints.map((point) => (
                  <li key={point} style={{ marginBottom: 8 }}>{point}</li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplos visuais">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Botão com ícone + label</div>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 16px",
                      borderRadius: 9999,
                      border: "none",
                      backgroundColor: lightColorScheme.primary,
                      color: lightColorScheme.onPrimary,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <Search size={20} color={lightColorScheme.onPrimary} aria-hidden />
                    Buscar
                  </button>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Icon button (área 48×48, ícone 24px)</div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: lightColorScheme.surfaceVariant,
                      color: lightColorScheme.onSurfaceVariant,
                    }}
                    title="Fechar"
                  >
                    <Search size={24} aria-hidden />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Lista com ícone inline (16px)</div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                    {["Item um", "Item dois"].map((label) => (
                      <li key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Check size={16} color={lightColorScheme.primary} aria-hidden />
                        <span style={{ fontSize: 14 }}>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Tamanhos recomendados">
        <TwoColumn
          left={
            <StoryCard title="Escala de tamanhos">
              <dl style={{ margin: 0 }}>
                <dt style={{ fontWeight: 600, marginBottom: 4 }}>16px (small)</dt>
                <dd style={{ margin: "0 0 12px", color: typo.muted, fontSize: 13 }}>{iconSizeRecommendations.small}</dd>
                <dt style={{ fontWeight: 600, marginBottom: 4 }}>20px (medium)</dt>
                <dd style={{ margin: "0 0 12px", color: typo.muted, fontSize: 13 }}>{iconSizeRecommendations.medium}</dd>
                <dt style={{ fontWeight: 600, marginBottom: 4 }}>24px (large)</dt>
                <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{iconSizeRecommendations.large}</dd>
              </dl>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", borderRadius: 8, marginBottom: 8 }}>
                    <Search size={16} color={lightColorScheme.onSurface} aria-hidden />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>16px</span>
                  <div style={{ fontSize: 11, color: typo.muted }}>small</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", borderRadius: 8, marginBottom: 8 }}>
                    <Search size={20} color={lightColorScheme.onSurface} aria-hidden />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>20px</span>
                  <div style={{ fontSize: 11, color: typo.muted }}>medium</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ padding: 12, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", borderRadius: 8, marginBottom: 8 }}>
                    <Search size={24} color={lightColorScheme.onSurface} aria-hidden />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>24px</span>
                  <div style={{ fontSize: 11, color: typo.muted }}>large</div>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};
