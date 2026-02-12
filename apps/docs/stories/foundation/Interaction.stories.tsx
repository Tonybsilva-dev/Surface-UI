import type { Meta, StoryObj } from "@storybook/react";
import {
  interactionPrinciple,
  gestureGuidelines,
  inputGuidelines,
  selectionGuidelines,
  statesOverview,
  stateLayersGuidelines,
  applyingStatesGuidelines,
  stateLayerTokens,
  disabledOpacity,
  lightColorScheme,
  shapeTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "./shared";

const meta: Meta = {
  title: "Foundation/Interaction",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Interação: gestos, inputs, seleção, estados (overview, state layers, applying states). Esquerda: exemplos práticos. Direita: exemplos visuais.",
      },
    },
  },
};

export default meta;

const palette = lightColorScheme;
const typo = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  body: 14,
  bodyColor: palette.onSurface,
  muted: palette.onSurfaceVariant,
  label: { fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const },
};

export const Principle: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, maxWidth: 720 }}>
      <StorySection title="Interaction">
        <div
          style={{
            padding: "24px 20px",
            background: palette.primaryContainer,
            color: palette.onPrimaryContainer,
            borderRadius: 16,
          }}
        >
          <p style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
            {interactionPrinciple}
          </p>
        </div>
      </StorySection>
    </div>
  ),
};

export const Gestures: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Gestures">
        <TwoColumn
          left={
            <>
              <StoryCard title="Exemplos práticos">
                <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
                  {Object.entries(gestureGuidelines).map(([gesture, text]) => (
                    <li key={gesture} style={{ marginBottom: 12 }}>
                      <strong style={{ textTransform: "capitalize" }}>{gesture.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                      {text}
                    </li>
                  ))}
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(["tap", "longPress", "swipe", "drag", "pinch"] as const).map((g) => (
                  <div
                    key={g}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      backgroundColor: palette.surfaceVariant,
                      borderRadius: shapeTokens.small,
                      color: palette.onSurfaceVariant,
                    }}
                  >
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: shapeTokens.small,
                        backgroundColor: palette.primaryContainer,
                        color: palette.onPrimaryContainer,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {g === "longPress" ? "Long" : g.slice(0, 2)}
                    </span>
                    <span style={{ fontWeight: 500 }}>{g.replace(/([A-Z])/g, " $1").trim()}</span>
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

export const Inputs: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Inputs">
        <TwoColumn
          left={
            <>
              <StoryCard title="Guidelines">
                <p style={{ margin: "0 0 12px", color: typo.bodyColor }}>{inputGuidelines.overview}</p>
                <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
                  <li>{inputGuidelines.text}</li>
                  <li>{inputGuidelines.selectionControls}</li>
                  <li>{inputGuidelines.slider}</li>
                  <li>{inputGuidelines.feedback}</li>
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Exemplos visuais">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label htmlFor="interaction-demo-text" style={{ ...typo.label, color: typo.muted, display: "block", marginBottom: 6 }}>
                    Text field
                  </label>
                  <input
                    id="interaction-demo-text"
                    type="text"
                    placeholder="Placeholder"
                    readOnly
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: `1px solid ${palette.outline}`,
                      borderRadius: shapeTokens.small,
                      fontSize: 14,
                      backgroundColor: palette.surface,
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `2px solid ${palette.primary}`,
                        backgroundColor: palette.primaryContainer,
                      }}
                    />
                    <span style={{ fontSize: 13 }}>Checkbox</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: palette.primary,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          right: 2,
                          top: 2,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: palette.onPrimary,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 13 }}>Switch on</span>
                  </div>
                </div>
                <div>
                  <span style={{ ...typo.label, color: typo.muted, display: "block", marginBottom: 6 }}>
                    Slider
                  </span>
                  <div
                    style={{
                      height: 4,
                      backgroundColor: palette.surfaceVariant,
                      borderRadius: 2,
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "40%",
                        height: "100%",
                        backgroundColor: palette.primary,
                        borderRadius: 2,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "40%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: palette.primary,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
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

export const Selection: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Selection">
        <TwoColumn
          left={
            <>
              <StoryCard title="Padrões">
                <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
                  {Object.entries(selectionGuidelines).map(([key, text]) => (
                    <li key={key} style={{ marginBottom: 10 }}>
                      <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {text}
                    </li>
                  ))}
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Exemplos visuais">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ ...typo.label, color: typo.muted, marginBottom: 4 }}>Single (radio)</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Opção A", "Opção B", "Opção C"].map((label, i) => (
                    <div
                      key={label}
                      style={{
                        padding: "8px 12px",
                        borderRadius: shapeTokens.small,
                        backgroundColor: i === 1 ? palette.primaryContainer : palette.surfaceVariant,
                        color: i === 1 ? palette.onPrimaryContainer : palette.onSurfaceVariant,
                        fontSize: 13,
                        fontWeight: i === 1 ? 600 : 400,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div style={{ ...typo.label, color: typo.muted, marginBottom: 4, marginTop: 8 }}>Multiple (checkboxes)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Item 1", "Item 2", "Item 3"].map((label, i) => (
                    <div
                      key={label}
                      style={{
                        padding: "8px 12px",
                        borderRadius: shapeTokens.small,
                        backgroundColor: i !== 1 ? palette.primaryContainer : palette.surfaceVariant,
                        color: i !== 1 ? palette.onPrimaryContainer : palette.onSurfaceVariant,
                        fontSize: 13,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const StatesOverview: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="States (overview)">
        <TwoColumn
          left={
            <>
              <StoryCard title="Conceito">
                <p style={{ margin: "0 0 12px", color: typo.bodyColor }}>{statesOverview.purpose}</p>
                <p style={{ margin: 0, color: typo.bodyColor }}>{statesOverview.consistency}</p>
              </StoryCard>
              <StoryCard title="Tipos de estado">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {statesOverview.types.map((t) => (
                    <li key={t} style={{ marginBottom: 4 }}>{t}</li>
                  ))}
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {statesOverview.types.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: t === "disabled" ? palette.surfaceVariant : palette.primaryContainer,
                      color: t === "disabled" ? palette.onSurfaceVariant : palette.onPrimaryContainer,
                      borderRadius: shapeTokens.medium,
                      fontSize: 12,
                      fontWeight: 500,
                      opacity: t === "disabled" ? disabledOpacity : 1,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

function StateLayerDemo({ label, opacity }: { label: string; opacity: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 120,
          height: 44,
          backgroundColor: palette.primary,
          borderRadius: shapeTokens.full,
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
            backgroundColor: palette.onPrimary,
            opacity,
            borderRadius: shapeTokens.full,
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative", zIndex: 1, color: palette.onPrimary, fontWeight: 500, fontSize: 14 }}>
          Button
        </span>
      </div>
      <span style={{ fontSize: 11, color: typo.muted }}>{label}</span>
    </div>
  );
}

export const StateLayers: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="State layers">
        <TwoColumn
          left={
            <>
              <StoryCard title="O que são">
                <p style={{ margin: "0 0 12px", color: typo.bodyColor }}>{stateLayersGuidelines.description}</p>
                <p style={{ margin: "0 0 12px", color: typo.bodyColor }}>{stateLayersGuidelines.color}</p>
                <p style={{ margin: 0, color: typo.bodyColor }}>{stateLayersGuidelines.notReplacement}</p>
              </StoryCard>
              <StoryCard title="Tokens de opacidade">
                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px 0" }}>hover</td>
                      <td style={{ padding: "8px 0", color: typo.muted }}>{(stateLayerTokens.hover * 100).toFixed(0)}%</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px 0" }}>focus</td>
                      <td style={{ padding: "8px 0", color: typo.muted }}>{(stateLayerTokens.focus * 100).toFixed(0)}%</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px 0" }}>pressed</td>
                      <td style={{ padding: "8px 0", color: typo.muted }}>{(stateLayerTokens.pressed * 100).toFixed(0)}%</td>
                    </tr>
                    {stateLayerTokens.dragged != null && (
                      <tr>
                        <td style={{ padding: "8px 0" }}>dragged</td>
                        <td style={{ padding: "8px 0", color: typo.muted }}>{(stateLayerTokens.dragged * 100).toFixed(0)}%</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Exemplos visuais">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
                <StateLayerDemo label="Default" opacity={0} />
                <StateLayerDemo label={`Hover (${(stateLayerTokens.hover * 100).toFixed(0)}%)`} opacity={stateLayerTokens.hover} />
                <StateLayerDemo label={`Focus (${(stateLayerTokens.focus * 100).toFixed(0)}%)`} opacity={stateLayerTokens.focus} />
                <StateLayerDemo label={`Pressed (${(stateLayerTokens.pressed * 100).toFixed(0)}%)`} opacity={stateLayerTokens.pressed} />
                {stateLayerTokens.dragged != null && (
                  <StateLayerDemo label={`Dragged (${(stateLayerTokens.dragged * 100).toFixed(0)}%)`} opacity={stateLayerTokens.dragged} />
                )}
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const ApplyingStates: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Applying states">
        <TwoColumn
          left={
            <>
              <StoryCard title="Como aplicar">
                <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
                  {Object.entries(applyingStatesGuidelines).map(([state, text]) => (
                    <li key={state} style={{ marginBottom: 10 }}>
                      <strong>{state}:</strong> {text}
                    </li>
                  ))}
                </ul>
              </StoryCard>
            </>
          }
          right={
            <StoryCard title="Exemplo: botão em estados">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <span style={{ ...typo.label, color: typo.muted, width: "100%" }}>Hover + Focus + Pressed</span>
                  <div
                    style={{
                      padding: "10px 20px",
                      borderRadius: shapeTokens.full,
                      backgroundColor: palette.primary,
                      color: palette.onPrimary,
                      fontWeight: 500,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#fff",
                        opacity: stateLayerTokens.hover,
                        borderRadius: shapeTokens.full,
                        pointerEvents: "none",
                      }}
                    />
                    <span style={{ position: "relative", zIndex: 1 }}>Primary</span>
                  </div>
                  <div
                    style={{
                      padding: "10px 20px",
                      borderRadius: shapeTokens.full,
                      backgroundColor: palette.primary,
                      color: palette.onPrimary,
                      fontWeight: 500,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#fff",
                        opacity: stateLayerTokens.pressed,
                        borderRadius: shapeTokens.full,
                        pointerEvents: "none",
                      }}
                    />
                    <span style={{ position: "relative", zIndex: 1 }}>Pressed</span>
                  </div>
                </div>
                <div>
                  <span style={{ ...typo.label, color: typo.muted, display: "block", marginBottom: 8 }}>Disabled</span>
                  <div
                    style={{
                      padding: "10px 20px",
                      borderRadius: shapeTokens.full,
                      backgroundColor: palette.primary,
                      color: palette.onPrimary,
                      fontWeight: 500,
                      opacity: disabledOpacity,
                      display: "inline-block",
                    }}
                  >
                    Disabled
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
