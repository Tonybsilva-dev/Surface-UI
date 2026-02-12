import type { Meta, StoryObj } from "@storybook/react";
import {
  typographyOverview,
  typographyFonts,
  typographyTypeScale,
  typographyApplyingType,
  typographyEditorialTreatments,
  typographyTokens,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typography: overview, fonts, type scale, applying type e tratamentos editoriais. Esquerda: conceitos. Direita: exemplos visuais e tokens.",
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

type ScaleKey = "display" | "headline" | "title" | "body" | "label";
type SizeKey = "large" | "medium" | "small";

const scaleOrder: ScaleKey[] = ["display", "headline", "title", "body", "label"];
const sizeOrder: SizeKey[] = ["large", "medium", "small"];

export const Overview: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Typography (overview)">
        <TwoColumn
          left={
            <StoryCard title={typographyOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{typographyOverview.description}</p>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                {typographyOverview.principles.map((p) => (
                  <li key={p} style={{ marginBottom: 8 }}>
                    {p}
                  </li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Type scale (visão geral)">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ margin: 0, fontSize: 12, color: typo.muted }}>
                  A type scale organiza Display, Headline, Title, Body e Label em tamanhos large/medium/small.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: typographyTokens.display.large.fontSize, lineHeight: typographyTokens.display.large.lineHeight }}>
                    Display large
                  </div>
                  <div style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: typographyTokens.headline.medium.fontSize, lineHeight: typographyTokens.headline.medium.lineHeight }}>
                    Headline medium
                  </div>
                  <div style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: typographyTokens.title.medium.fontSize, lineHeight: typographyTokens.title.medium.lineHeight }}>
                    Title medium
                  </div>
                  <div style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: typographyTokens.body.medium.fontSize, lineHeight: typographyTokens.body.medium.lineHeight }}>
                    Body medium
                  </div>
                  <div style={{ fontFamily: typographyTokens.fontFamily.default, fontSize: typographyTokens.label.medium.fontSize, lineHeight: typographyTokens.label.medium.lineHeight }}>
                    Label medium
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

export const Fonts: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Fonts">
        <TwoColumn
          left={
            <StoryCard title="Famílias recomendadas">
              <p style={{ margin: "0 0 12px" }}>{typographyFonts.description}</p>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                {typographyFonts.families.map((f) => (
                  <li key={f} style={{ marginBottom: 6 }}>
                    {f}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: typo.muted }}>
                {typographyFonts.fallbackNote}
              </p>
            </StoryCard>
          }
          right={
            <StoryCard title="Tokens de fonte">
              <div style={{ fontSize: 12 }}>
                <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, color: typo.muted }}>
                  typographyTokens.fontFamily
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    <code>default</code>: {typographyTokens.fontFamily.default}
                  </li>
                  <li>
                    <code>brand</code>: {typographyTokens.fontFamily.brand}
                  </li>
                  <li>
                    <code>mono</code>: {typographyTokens.fontFamily.mono}
                  </li>
                </ul>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const TypeScaleTokens: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Type scale tokens">
        <TwoColumn
          left={
            <StoryCard title="Papéis da escala">
              <p style={{ margin: "0 0 12px" }}>{typographyTypeScale.description}</p>
              <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
                {typographyTypeScale.roles.map((r) => (
                  <li key={r} style={{ marginBottom: 6 }}>
                    {r}
                  </li>
                ))}
              </ul>
              <p style={{ margin: 0, fontSize: 13, color: typo.muted }}>
                {typographyTypeScale.tokensNote}
              </p>
            </StoryCard>
          }
          right={
            <StoryCard title="Amostra de tokens">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", minWidth: 420 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "4px 0" }}>Role</th>
                      <th style={{ textAlign: "left", padding: "4px 0" }}>Size</th>
                      <th style={{ textAlign: "left", padding: "4px 0" }}>Font size</th>
                      <th style={{ textAlign: "left", padding: "4px 0" }}>Line height</th>
                      <th style={{ textAlign: "left", padding: "4px 0" }}>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaleOrder.map((role) =>
                      sizeOrder.map((size) => {
                        const token = typographyTokens[role][size];
                        return (
                          <tr key={`${role}-${size}`} style={{ borderBottom: "1px solid #f0f0f0" }}>
                            <td style={{ padding: "4px 0" }}>{role}</td>
                            <td style={{ padding: "4px 0" }}>{size}</td>
                            <td style={{ padding: "4px 0", fontFamily: "monospace" }}>{token.fontSize}</td>
                            <td style={{ padding: "4px 0", fontFamily: "monospace" }}>{token.lineHeight}</td>
                            <td style={{ padding: "4px 0" }}>{token.fontWeight}</td>
                          </tr>
                        );
                      }),
                    )}
                  </tbody>
                </table>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const ApplyingType: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Applying type">
        <TwoColumn
          left={
            <StoryCard title="Mapeando para UI">
              <p style={{ margin: "0 0 12px" }}>{typographyApplyingType.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {typographyApplyingType.applying.map((a) => (
                  <li key={a} style={{ marginBottom: 6 }}>
                    {a}
                  </li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplos de uso">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>App bar</div>
                  <div
                    style={{
                      fontFamily: typographyTokens.headline.small.fontFamily,
                      fontSize: typographyTokens.headline.small.fontSize,
                      lineHeight: typographyTokens.headline.small.lineHeight,
                    }}
                  >
                    Título da tela
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>Card</div>
                  <div
                    style={{
                      fontFamily: typographyTokens.title.medium.fontFamily,
                      fontSize: typographyTokens.title.medium.fontSize,
                      lineHeight: typographyTokens.title.medium.lineHeight,
                      marginBottom: 4,
                    }}
                  >
                    Título do card
                  </div>
                  <div
                    style={{
                      fontFamily: typographyTokens.body.medium.fontFamily,
                      fontSize: typographyTokens.body.medium.fontSize,
                      lineHeight: typographyTokens.body.medium.lineHeight,
                      color: typo.muted,
                    }}
                  >
                    Texto de suporte explicando o conteúdo do card.
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>Botão</div>
                  <button
                    type="button"
                    style={{
                      border: "none",
                      borderRadius: 999,
                      padding: "8px 18px",
                      backgroundColor: "#6750a4",
                      color: "#fff",
                      cursor: "pointer",
                      fontFamily: typographyTokens.label.large.fontFamily,
                      fontSize: typographyTokens.label.large.fontSize,
                      lineHeight: typographyTokens.label.large.lineHeight,
                      fontWeight: typographyTokens.label.large.fontWeight,
                    }}
                  >
                    Label large
                  </button>
                </div>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const EditorialTreatments: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Editorial treatments">
        <TwoColumn
          left={
            <StoryCard title="Tratamentos editoriais">
              <p style={{ margin: "0 0 12px" }}>{typographyEditorialTreatments.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {typographyEditorialTreatments.guidelines.map((g) => (
                  <li key={g} style={{ marginBottom: 6 }}>
                    {g}
                  </li>
                ))}
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplo editorial">
              <article>
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontFamily: typographyTokens.display.small.fontFamily,
                    fontSize: typographyTokens.display.small.fontSize,
                    lineHeight: typographyTokens.display.small.lineHeight,
                  }}
                >
                  Headline editorial expressiva
                </h4>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontFamily: typographyTokens.body.large.fontFamily,
                    fontSize: typographyTokens.body.large.fontSize,
                    lineHeight: typographyTokens.body.large.lineHeight,
                    color: typo.muted,
                  }}
                >
                  Use a escala de tipografia para criar ritmo de leitura confortável, alternando pesos e tamanhos de forma
                  consistente.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: typographyTokens.body.medium.fontFamily,
                    fontSize: typographyTokens.body.medium.fontSize,
                    lineHeight: typographyTokens.body.medium.lineHeight,
                    color: typo.muted,
                  }}
                >
                  Limite o número de estilos diferentes e preserve contraste adequado entre texto e fundo.
                </p>
              </article>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

