import type { Meta, StoryObj } from "@storybook/react";
import {
  usabilityPrinciple,
  usabilitySignals,
  applyingExpressiveUsability,
  cognitiveLoadGuidelines,
  accessibleUsability,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "./shared";

const meta: Meta = {
  title: "Foundation/Usability",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Usabilidade no M3: clareza, previsibilidade e aplicação expressiva (cor, shape, motion) de forma acessível.",
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
      <StorySection title="Usability overview">
        <TwoColumn
          left={
            <StoryCard title="Princípios">
              <p style={{ margin: "0 0 12px" }}>{usabilityPrinciple.clarity}</p>
              <p style={{ margin: 0 }}>{usabilityPrinciple.efficiency}</p>
            </StoryCard>
          }
          right={
            <StoryCard title="Checklist rápido">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>O usuário entende rapidamente o que esta tela permite fazer?</li>
                <li>Há um call to action principal claro?</li>
                <li>Erros são comunicados com mensagem útil e (idealmente) ação de desfazer?</li>
              </ul>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const Signals: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Usability signals">
        <TwoColumn
          left={
            <StoryCard title="Sinais principais">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{usabilitySignals.legibility}</li>
                <li>{usabilitySignals.predictability}</li>
                <li>{usabilitySignals.errorRecovery}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplos visuais">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>
                    Legibilidade
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        padding: "8px 16px",
                        fontSize: 14,
                        borderRadius: 9999,
                        border: "none",
                        backgroundColor: "#1f2933",
                        color: "#fff",
                      }}
                    >
                      Bom contraste
                    </button>
                    <button
                      type="button"
                      style={{
                        padding: "8px 16px",
                        fontSize: 14,
                        borderRadius: 9999,
                        border: "1px solid #ddd",
                        backgroundColor: "#f9fafb",
                        color: "#9ca3af",
                      }}
                    >
                      Contraste fraco
                    </button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>
                    Recuperação de erro
                  </div>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #fecaca",
                      backgroundColor: "#fef2f2",
                      padding: 12,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Não foi possível salvar as alterações.</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#b91c1c" }}>
                        Verifique sua conexão e tente novamente.
                      </span>
                      <button
                        type="button"
                        style={{
                          padding: "4px 10px",
                          borderRadius: 9999,
                          border: "none",
                          backgroundColor: "#b91c1c",
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        Tentar de novo
                      </button>
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

export const ExpressiveM3: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Applying M3 (expressive + usable)">
        <TwoColumn
          left={
            <StoryCard title="Aplicando M3 de forma usável">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{applyingExpressiveUsability.color}</li>
                <li>{applyingExpressiveUsability.shape}</li>
                <li>{applyingExpressiveUsability.motion}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplo visual">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 9999,
                      border: "none",
                      backgroundColor: "#4f46e5",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    Ação primária
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: "10px 18px",
                      borderRadius: 9999,
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#fff",
                      color: "#111827",
                      fontWeight: 500,
                    }}
                  >
                    Ação secundária
                  </button>
                </div>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    background: "linear-gradient(135deg,#4f46e5,#ec4899)",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.35)",
                  }}
                />
                <p style={{ fontSize: 12, color: typo.muted, margin: 0 }}>
                  Cores e formas podem ser expressivas, mas devem manter contraste, hierarquia clara e movimentos
                  discretos.
                </p>
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const CognitiveLoad: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Cognitive load">
        <TwoColumn
          left={
            <StoryCard title="Como reduzir esforço cognitivo">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{cognitiveLoadGuidelines.chunking}</li>
                <li>{cognitiveLoadGuidelines.progressiveDisclosure}</li>
                <li>{cognitiveLoadGuidelines.familiarity}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Lista: antes vs depois">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>
                    Antes (tudo de uma vez)
                  </div>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      padding: 12,
                      fontSize: 13,
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      <li>Configurações gerais</li>
                      <li>Notificações</li>
                      <li>Segurança</li>
                      <li>Privacidade</li>
                      <li>Conectividade</li>
                      <li>Avançado</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: typo.muted, marginBottom: 4 }}>
                    Depois (agrupado)
                  </div>
                  <div
                    style={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      padding: 12,
                      fontSize: 13,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Conta & segurança</div>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        <li>Segurança</li>
                        <li>Privacidade</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Experiência</div>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        <li>Notificações</li>
                        <li>Conectividade</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Sistema</div>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        <li>Geral</li>
                        <li>Avançado</li>
                      </ul>
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

export const AccessibleUsability: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Usability & accessibility">
        <TwoColumn
          left={
            <StoryCard title="Perceivable · Operable · Understandable">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>{accessibleUsability.perceivable}</li>
                <li>{accessibleUsability.operable}</li>
                <li>{accessibleUsability.understandable}</li>
              </ul>
            </StoryCard>
          }
          right={
            <StoryCard title="Exemplo de fluxo acessível">
              <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
                <li>Usuário navega por teclado até o botão primário (focus ring visível).</li>
                <li>Ao submeter, feedback de carregamento indica que algo está acontecendo.</li>
                <li>Se ocorrer erro, mensagem clara explica o problema e como resolver.</li>
                <li>Opção de desfazer ou tentar novamente está disponível e é focável.</li>
              </ol>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

