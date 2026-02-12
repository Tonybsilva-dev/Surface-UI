import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  colorSystemOverview,
  colorSystemHowItWorks,
  colorRolesSummary,
  colorSchemeTabs,
  colorAdvancedTabs,
  colorResources,
  lightColorScheme,
  darkColorScheme,
  type ColorScheme,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Color",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Sistema de cores M3: overview, roles, color schemes (tabs) e advanced (tabs). Esquerda: conceitos. Direita: exemplos visuais.",
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

const colorGroups: { label: string; keys: (keyof ColorScheme)[] }[] = [
  { label: "Primary", keys: ["primary", "onPrimary", "primaryContainer", "onPrimaryContainer"] },
  { label: "Secondary", keys: ["secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer"] },
  { label: "Error", keys: ["error", "onError", "errorContainer", "onErrorContainer"] },
  { label: "Surface", keys: ["surface", "onSurface", "surfaceVariant", "onSurfaceVariant", "outline"] },
];

function ColorSwatch({ name, value, compact }: { name: string; value: string; compact?: boolean }) {
  return (
    <div style={{ marginBottom: compact ? 8 : 12 }}>
      <div
        style={{
          width: "100%",
          minHeight: compact ? 40 : 52,
          borderRadius: 8,
          backgroundColor: value,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 4,
        }}
      />
      <div style={{ fontSize: compact ? 11 : 12, fontFamily: "monospace", color: "#555" }}>{name}</div>
      {!compact && <div style={{ fontSize: 11, color: "#888" }}>{value}</div>}
    </div>
  );
}

function Tabs<T extends string>({
  tabs,
  active,
  onSelect,
  children,
}: {
  tabs: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap", borderBottom: "1px solid #e5e7eb" }}>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderBottom: active === id ? "2px solid #6750a4" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: active === id ? 600 : 500,
              color: active === id ? "#6750a4" : typo.muted,
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Color (Styles)">
        <TwoColumn
          left={
            <StoryCard title={colorSystemOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{colorSystemOverview.description}</p>
              <a href={colorSystemOverview.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6750a4" }}>
                M3 – Color system overview →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual: roles no sistema">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(["primary", "secondary", "tertiary", "error", "surfaceVariant"] as const).map((key) => (
                    <div key={key} style={{ flex: "1 1 80px", minWidth: 0 }}>
                      <div
                        style={{
                          height: 48,
                          borderRadius: 8,
                          backgroundColor: lightColorScheme[key],
                          border: "1px solid rgba(0,0,0,0.06)",
                          marginBottom: 4,
                        }}
                      />
                      <span style={{ fontSize: 11, color: typo.muted }}>{key}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: typo.muted }}>
                  Cada role tem variantes (container, on-variant) para superfícies e conteúdo legível.
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const HowTheSystemWorks: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="How the system works">
        <TwoColumn
          left={
            <StoryCard title="Conceitos">
              <p style={{ margin: "0 0 16px" }}>{colorSystemHowItWorks.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {colorSystemHowItWorks.keyPoints.map((point) => (
                  <li key={point} style={{ marginBottom: 8 }}>{point}</li>
                ))}
              </ul>
              <a href={colorSystemHowItWorks.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "#6750a4" }}>
                M3 – How the system works →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplo: container + on-container">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Primary</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 100px" }}>
                      <div style={{ height: 44, borderRadius: 8, backgroundColor: lightColorScheme.primary, marginBottom: 4 }} />
                      <span style={{ fontSize: 11 }}>primary</span>
                    </div>
                    <div style={{ flex: "1 1 100px" }}>
                      <div style={{ height: 44, borderRadius: 8, backgroundColor: lightColorScheme.primaryContainer, marginBottom: 4 }} />
                      <span style={{ fontSize: 11 }}>primaryContainer</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, padding: 10, borderRadius: 8, backgroundColor: lightColorScheme.primaryContainer, color: lightColorScheme.onPrimaryContainer, fontSize: 13 }}>
                    Texto usa onPrimaryContainer sobre primaryContainer.
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Light vs Dark</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ padding: 8, borderRadius: 8, backgroundColor: lightColorScheme.surface, border: "1px solid #eee" }}>
                        <div style={{ width: "100%", height: 32, borderRadius: 6, backgroundColor: lightColorScheme.primary, marginBottom: 6 }} />
                        <span style={{ fontSize: 11 }}>Light</span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ padding: 8, borderRadius: 8, backgroundColor: darkColorScheme.surface, border: "1px solid #333" }}>
                        <div style={{ width: "100%", height: 32, borderRadius: 6, backgroundColor: darkColorScheme.primary, marginBottom: 6 }} />
                        <span style={{ fontSize: 11, color: darkColorScheme.onSurface }}>Dark</span>
                      </div>
                    </div>
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

export const Roles: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Color roles">
        <TwoColumn
          left={
            <StoryCard title="Resumo dos roles">
              <dl style={{ margin: "0 0 16px" }}>
                {Object.entries(colorRolesSummary).map(([key, value]) => {
                  if (key === "link") return null;
                  return (
                    <div key={key} style={{ marginBottom: 10 }}>
                      <dt style={{ fontWeight: 600, textTransform: "capitalize", marginBottom: 2 }}>{key}</dt>
                      <dd style={{ margin: 0, color: typo.muted, fontSize: 13 }}>{value}</dd>
                    </div>
                  );
                })}
              </dl>
              <a href={colorRolesSummary.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6750a4" }}>
                M3 – Color roles →
              </a>
            </StoryCard>
          }
          right={
            <>
              <StoryCard title="Swatches por grupo">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {colorGroups.map((group) => (
                    <div key={group.label}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>{group.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {group.keys.map((key) => {
                          const value = lightColorScheme[key];
                          if (!value) return null;
                          return <ColorSwatch key={key} name={key} value={value} compact />;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </StoryCard>
              <StoryCard title="Em contexto">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                  <div style={{ padding: 12, borderRadius: 8, backgroundColor: lightColorScheme.errorContainer, color: lightColorScheme.onErrorContainer, fontSize: 13 }}>
                    Mensagem de erro (errorContainer)
                  </div>
                </div>
              </StoryCard>
            </>
          }
        />
      </StorySection>
    </div>
  ),
};

const schemeTabIds = ["choosing", "static", "dynamic"] as const;
type SchemeTabId = (typeof schemeTabIds)[number];

export const ColorSchemes: StoryObj = {
  render: function ColorSchemesStory() {
    const [active, setActive] = useState<SchemeTabId>("choosing");
    const tabs = schemeTabIds.map((id) => ({ id, label: colorSchemeTabs[id].label }));
    const content = colorSchemeTabs[active];
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title="Color schemes">
          <TwoColumn
            left={
              <StoryCard title="Conteúdo">
                <Tabs tabs={tabs} active={active} onSelect={setActive}>
                  <p style={{ margin: "0 0 12px" }}>{content.description}</p>
                  <a href={content.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6750a4" }}>
                    M3 – {content.label} →
                  </a>
                </Tabs>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                {active === "choosing" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ padding: 16, borderRadius: 12, border: "2px solid #e5e7eb", textAlign: "center" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Static</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
                        {([lightColorScheme.primary, lightColorScheme.secondary, lightColorScheme.tertiary] as const).map((c) => (
                          <div key={c} style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: c }} />
                        ))}
                      </div>
                      <p style={{ margin: "8px 0 0", fontSize: 11, color: typo.muted }}>Cores fixas da marca</p>
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, border: "2px solid #6750a4", textAlign: "center" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Dynamic</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
{["#7D5260", "#D0BCFF", "#CCC2DC"].map((c) => (
                        <div key={c} style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: c }} />
                      ))}
                      </div>
                      <p style={{ margin: "8px 0 0", fontSize: 11, color: typo.muted }}>Extraído de imagem / tema</p>
                    </div>
                  </div>
                )}
                {active === "static" && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Baseline M3 (light)</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(["primary", "primaryContainer", "secondary", "surfaceVariant", "error"] as const).map((key) => (
                        <div key={key}>
                          <div style={{ width: 56, height: 56, borderRadius: 8, backgroundColor: lightColorScheme[key], border: "1px solid rgba(0,0,0,0.06)" }} />
                          <span style={{ fontSize: 10, display: "block", marginTop: 4 }}>{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {active === "dynamic" && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Fonte da cor (ex.: imagem)</div>
                    <div style={{ width: "100%", height: 80, borderRadius: 12, background: "linear-gradient(135deg, #6750a4 0%, #7d5260 50%, #d0bcff 100%)", marginBottom: 12 }} />
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["#6750a4", "#7D5260", "#D0BCFF", "#CCC2DC"].map((c) => (
                        <div key={c} style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: c }} />
                      ))}
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: 11, color: typo.muted }}>Tons extraídos → roles do esquema</p>
                  </div>
                )}
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

const advancedTabIds = ["overview", "apply", "define", "adjust"] as const;
type AdvancedTabId = (typeof advancedTabIds)[number];

export const Advanced: StoryObj = {
  render: function AdvancedStory() {
    const [active, setActive] = useState<AdvancedTabId>("overview");
    const tabs = advancedTabIds.map((id) => ({ id, label: colorAdvancedTabs[id].label }));
    const content = colorAdvancedTabs[active];
    return (
      <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
        <StorySection title="Advanced">
          <TwoColumn
            left={
              <StoryCard title="Conteúdo">
                <Tabs tabs={tabs} active={active} onSelect={setActive}>
                  <p style={{ margin: "0 0 12px" }}>{content.description}</p>
                  <a href={content.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#6750a4" }}>
                    M3 – {content.label} →
                  </a>
                </Tabs>
              </StoryCard>
            }
            right={
              <StoryCard title="Referência visual">
                {active === "overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(["primary", "secondary", "error", "surfaceVariant"] as const).map((key) => (
                        <div key={key}>
                          <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: lightColorScheme[key] }} />
                          <span style={{ fontSize: 10 }}>{key}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 12, color: typo.muted, margin: 0 }}>Aplicar · Definir novas · Ajustar tons</p>
                  </div>
                )}
                {active === "apply" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted }}>Roles → componentes</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ padding: "10px 16px", borderRadius: 9999, backgroundColor: lightColorScheme.primary, color: lightColorScheme.onPrimary, fontSize: 13, fontWeight: 500 }}>
                        Botão
                      </div>
                      <div style={{ padding: 12, borderRadius: 12, backgroundColor: lightColorScheme.surfaceVariant, color: lightColorScheme.onSurfaceVariant, fontSize: 12, maxWidth: 140 }}>
                        Card (surfaceVariant)
                      </div>
                    </div>
                  </div>
                )}
                {active === "define" && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Roles padrão + custom</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <div><div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: lightColorScheme.primary }} /><span style={{ fontSize: 10 }}>primary</span></div>
                      <div><div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: lightColorScheme.error }} /><span style={{ fontSize: 10 }}>error</span></div>
                      <div><div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: "rgb(34, 139, 34)" }} /><span style={{ fontSize: 10 }}>success (novo)</span></div>
                    </div>
                  </div>
                )}
                {active === "adjust" && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Ajuste de tom (ex.: primary)</div>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                      <div>
                        <div style={{ width: 60, height: 48, borderRadius: 8, backgroundColor: "rgb(103, 80, 164)", marginBottom: 4 }} />
                        <span style={{ fontSize: 11 }}>Original</span>
                      </div>
                      <div>
                        <div style={{ width: 60, height: 48, borderRadius: 8, backgroundColor: "rgb(126, 99, 195)", marginBottom: 4 }} />
                        <span style={{ fontSize: 11 }}>Clareado</span>
                      </div>
                      <div>
                        <div style={{ width: 60, height: 48, borderRadius: 8, backgroundColor: "rgb(78, 62, 125)", marginBottom: 4 }} />
                        <span style={{ fontSize: 11 }}>Escurecido</span>
                      </div>
                    </div>
                  </div>
                )}
              </StoryCard>
            }
          />
        </StorySection>
      </div>
    );
  },
};

export const Resources: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title={colorResources.title}>
        <TwoColumn
          left={
            <StoryCard>
              <p style={{ margin: "0 0 12px" }}>{colorResources.description}</p>
              <a href={colorResources.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "#6750a4", fontWeight: 500 }}>
                M3 – Color resources →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Tipos de recurso">
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
                <li style={{ marginBottom: 8 }}>Ferramentas de geração de paleta</li>
                <li style={{ marginBottom: 8 }}>Validação de contraste (WCAG)</li>
                <li style={{ marginBottom: 8 }}>Export para Figma e código</li>
                <li style={{ marginBottom: 8 }}>Referências e documentação</li>
              </ul>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};
