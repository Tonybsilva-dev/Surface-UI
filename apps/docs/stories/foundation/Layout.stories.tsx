import type { Meta, StoryObj } from "@storybook/react";
import {
  layoutOverview,
  layoutSpacingAndParts,
  layoutDensityGuidelines,
  hardwareLayoutGuidelines,
  bidirectionalityGuidelines,
  layoutRegions,
  paneTypes,
  windowWidthClasses,
  canonicalLayouts,
  adaptiveNavigationPatterns,
  spacingTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "./shared";

const meta: Meta = {
  title: "Foundation/Layout",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Layout M3: overview, spacing, partes do layout, densidade, hardware/RTL e aplicação com window size classes e canonical layouts.",
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
      <StorySection title="Layout overview">
        <TwoColumn
          left={
            <StoryCard title="Princípios">
              <p style={{ margin: "0 0 12px" }}>{layoutOverview.goal}</p>
              <p style={{ margin: 0 }}>{layoutOverview.grid}</p>
            </StoryCard>
          }
          right={
            <StoryCard title="Regiões: Navigation + Body">
              <div
                style={{
                  display: "flex",
                  border: "1px solid #e0e0e0",
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
          }
        />
      </StorySection>
    </div>
  ),
};

export const SpacingAndParts: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Spacing & parts of layout">
        <TwoColumn
          left={
            <StoryCard title="Boas práticas">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{layoutSpacingAndParts.spacingScale}</li>
                <li>{layoutSpacingAndParts.guttersAndMargins}</li>
                <li>{layoutSpacingAndParts.navigationRegion}</li>
                <li>{layoutSpacingAndParts.bodyRegion}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Escala de spacing (tokens)">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 8 }}>
                {(["1", "2", "3", "4", "6", "8", "12", "16"] as const).map((key) => (
                  <div
                    key={key}
                    style={{
                      backgroundColor: "#6750a4",
                      width: spacingTokens[key],
                      minWidth: 16,
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
              <p style={{ fontSize: 12, color: typo.muted, marginTop: 12 }}>
                1 = 4px, 2 = 8px, 4 = 16px, 8 = 32px, etc. Use sempre tokens para padding/margens.
              </p>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const DensityAndHardware: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Density & hardware considerations">
        <TwoColumn
          left={
            <>
              <StoryCard title="Density">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>{layoutDensityGuidelines.comfortable}</li>
                  <li>{layoutDensityGuidelines.compact}</li>
                  <li>{layoutDensityGuidelines.consistency}</li>
                </ul>
              </StoryCard>
              <StoryCard title="Hardware & input">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>{hardwareLayoutGuidelines.touchTargets}</li>
                  <li>{hardwareLayoutGuidelines.keyboardAndMouse}</li>
                  <li>{hardwareLayoutGuidelines.postures}</li>
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Exemplo: densidade em lista">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 4 }}>
                    Comfortable
                  </div>
                  <div
                    style={{
                      borderRadius: 12,
                      border: "1px solid #eee",
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={`comfort-${i}`}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 8,
                          backgroundColor: i === 2 ? "#e8def8" : "#fafafa",
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 4 }}>
                    Compact
                  </div>
                  <div
                    style={{
                      borderRadius: 12,
                      border: "1px solid #eee",
                      padding: 8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={`compact-${i}`}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 6,
                          backgroundColor: i === 2 ? "#e8def8" : "#fafafa",
                        }}
                      >
                        Item {i}
                      </div>
                    ))}
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

export const Bidirectionality: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Bidirectionality (LTR/RTL)">
        <TwoColumn
          left={
            <StoryCard title="Guidelines RTL">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{bidirectionalityGuidelines.mirroring}</li>
                <li>{bidirectionalityGuidelines.alignment}</li>
                <li>{bidirectionalityGuidelines.icons}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplo visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 4 }}>
                    LTR
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #eee",
                    }}
                  >
                    <span>App title</span>
                    <span>⟵ Back</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#888", marginBottom: 4 }}>
                    RTL (espelhado)
                  </div>
                  <div
                    style={{
                      direction: "rtl",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: "1px solid #eee",
                    }}
                  >
                    <span>عنوان التطبيق</span>
                    <span>⟶ Back</span>
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

export const ApplyingLayout: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Applying layout (window size classes & canonical layouts)">
        <TwoColumn
          left={
            <>
              <StoryCard title="Window size classes">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {Object.values(windowWidthClasses).map((cls) => (
                    <li key={cls.label}>
                      <strong>{cls.label}:</strong> {cls.description}
                    </li>
                  ))}
                </ul>
              </StoryCard>
              <StoryCard title="Adaptive navigation">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {Object.entries(adaptiveNavigationPatterns).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value.navigation} – {value.panesVisible} pane(s)
                    </li>
                  ))}
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Canonical layouts">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {Object.values(canonicalLayouts).map((layout) => (
                  <div
                    key={layout}
                    style={{
                      width: 160,
                      borderRadius: 12,
                      border: "1px solid #e0e0e0",
                      padding: 8,
                      fontSize: 11,
                    }}
                  >
                    <div
                      style={{
                        height: 80,
                        borderRadius: 8,
                        backgroundColor: "#f5f5f5",
                        display: "grid",
                        gridTemplateColumns:
                          layout === canonicalLayouts.listDetail
                            ? "1fr 2fr"
                            : layout === canonicalLayouts.supportingPane
                            ? "2fr 1fr"
                            : "1fr",
                        gap: 4,
                        padding: 4,
                      }}
                    >
                      {layout === canonicalLayouts.feed && (
                        <>
                          <div style={{ backgroundColor: "#e8def8", borderRadius: 4 }} />
                          <div style={{ backgroundColor: "#e8def8", borderRadius: 4 }} />
                          <div style={{ backgroundColor: "#e8def8", borderRadius: 4 }} />
                        </>
                      )}
                      {layout === canonicalLayouts.listDetail && (
                        <>
                          <div style={{ backgroundColor: "#e8def8", borderRadius: 4 }} />
                          <div style={{ backgroundColor: "#e7e0ec", borderRadius: 4 }} />
                        </>
                      )}
                      {layout === canonicalLayouts.supportingPane && (
                        <>
                          <div style={{ backgroundColor: "#e7e0ec", borderRadius: 4 }} />
                          <div style={{ backgroundColor: "#e8def8", borderRadius: 4 }} />
                        </>
                      )}
                    </div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{layout}</div>
                  </div>
                ))}
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

