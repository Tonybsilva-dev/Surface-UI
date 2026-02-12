import type { Meta, StoryObj } from "@storybook/react";
import {
  motionOverview,
  motionEasingAndDuration,
  motionTransitions,
  motionTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Motion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Motion: overview, easing & duration, transições. Esquerda: conceitos. Direita: exemplos visuais e tokens.",
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
      <StorySection title="Motion (overview)">
        <TwoColumn
          left={
            <StoryCard title={motionOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{motionOverview.description}</p>
              <p style={{ margin: "0 0 12px", color: typo.muted }}>{motionOverview.howItWorks}</p>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 12, color: typo.muted, marginBottom: 4 }}>Duração e easing definem o ritmo</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#f0e6ff", fontSize: 12 }}>short 50–200ms</span>
                  <span style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#e8def8", fontSize: 12 }}>medium 250–400ms</span>
                  <span style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#e0d0f0", fontSize: 12 }}>long 450–600ms</span>
                </div>
                <div style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: "#6750a4" }} />
                <div style={{ fontSize: 11, color: typo.muted }}>Use motionTokens.duration + motionTokens.easing em transições CSS/JS</div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const EasingAndDuration: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Easing and duration">
        <TwoColumn
          left={
            <StoryCard title="Aplicação">
              <p style={{ margin: "0 0 12px" }}>{motionEasingAndDuration.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {motionEasingAndDuration.applying.map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>{item}</li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Tokens (amostra)">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Duration</div>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <tbody>
                      {(["short1", "short4", "medium2", "medium4", "long2"] as const).map((key) => (
                        <tr key={key} style={{ borderBottom: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "4px 0", fontFamily: "monospace" }}>{key}</td>
                          <td style={{ padding: "4px 0", color: typo.muted }}>{motionTokens.duration[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 8 }}>Easing</div>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "4px 0", fontFamily: "monospace" }}>standard</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "4px 0", fontFamily: "monospace" }}>emphasized</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "4px 0", fontFamily: "monospace" }}>legacy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const Transitions: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Transitions">
        <TwoColumn
          left={
            <StoryCard title="Padrões e aplicação">
              <p style={{ margin: "0 0 12px" }}>{motionTransitions.description}</p>
              <div style={{ fontSize: 12, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Padrões</div>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                {motionTransitions.patterns.map((p) => (
                  <li key={p} style={{ marginBottom: 6 }}>{p}</li>
                ))}
              </ul>
              <div style={{ fontSize: 12, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Aplicação</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {motionTransitions.applying.map((a) => (
                  <li key={a} style={{ marginBottom: 6 }}>{a}</li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Referência visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Container transform</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 64, height: 48, borderRadius: 8, backgroundColor: "#e8def8", border: "1px solid #6750a4" }} />
                    <span style={{ fontSize: 12 }}>→</span>
                    <div style={{ width: 120, height: 80, borderRadius: 12, backgroundColor: "#e8def8", border: "1px solid #6750a4" }} />
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: typo.muted }}>Card que vira detalhe</p>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Shared axis</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12 }}>← Voltar</span>
                    <span style={{ width: 40, height: 2, backgroundColor: "#ccc" }} />
                    <span style={{ fontSize: 12 }}>Próximo →</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: typo.muted }}>Direção consistente na navegação</p>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 6 }}>Fade through</div>
                  <div style={{ padding: 12, borderRadius: 8, backgroundColor: "#f5f0ff", textAlign: "center", fontSize: 12, color: typo.muted }}>
                    Conteúdo A → dissolve → Conteúdo B
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
