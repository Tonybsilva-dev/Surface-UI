import type { Meta, StoryObj } from "@storybook/react";
import {
  contentDesignPrinciple,
  altTextGuidelines,
  globalWritingGuidelines,
  notificationGuidelines,
  styleGuideUxWriting,
  styleGuideWordChoice,
  styleGuideGrammar,
} from "@surface/ui/foundation";
import { lightColorScheme } from "@surface/ui/foundation";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta = {
  title: "Foundation/Content Design",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Content Design M3: escrita efetiva, alt text, global writing, notificações, style guide. Demonstração com exemplos aplicados.",
      },
    },
  },
};

export default meta;

const palette = {
  ...lightColorScheme,
  successBg: "rgb(211, 237, 218)",
  successFg: "rgb(22, 82, 44)",
  avoidBg: "rgb(249, 222, 220)",
  avoidFg: "rgb(65, 14, 11)",
  preferBg: "rgb(211, 237, 218)",
  preferFg: "rgb(22, 82, 44)",
};

const typo = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  body: 14,
  bodyColor: palette.onSurface,
  muted: palette.onSurfaceVariant,
  label: 11,
  labelUppercase: { fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const },
};

const exampleBlock = (_label: string, _content: string, variant: "avoid" | "prefer") => ({
  padding: 12,
  borderRadius: 8,
  marginBottom: 8,
  backgroundColor: variant === "avoid" ? palette.avoidBg : palette.preferBg,
  color: variant === "avoid" ? palette.avoidFg : palette.preferFg,
  fontSize: typo.body,
});
const exampleLabel = (v: "avoid" | "prefer") => (v === "avoid" ? "Evite" : "Prefira");

export const Principle: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, maxWidth: 640 }}>
      <StorySection title="Content Design">
        <div
          style={{
            padding: "32px 24px",
            background: palette.primaryContainer,
            color: palette.onPrimaryContainer,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            {contentDesignPrinciple}
          </p>
        </div>
        <p style={{ marginTop: 16, marginBottom: 0, fontSize: typo.body, color: typo.muted }}>
          O conteúdo deve ser compreensível, acessível e útil para qualquer pessoa, em qualquer contexto — idioma, cultura ou capacidade.
        </p>
      </StorySection>
    </div>
  ),
};

const altTextExamples = [
  { avoid: "Imagem de gráfico", prefer: "Gráfico de vendas do primeiro trimestre de 2024", guideline: "describeFunction" },
  { avoid: "Ícone de lupa para busca", prefer: "Buscar", guideline: "beConcise" },
  { decorative: true, guideline: "decorative" },
  { avoid: "Gráfico (sem mais contexto)", prefer: "Use aria-describedby ou texto próximo para descrever eixos e tendências", guideline: "complexImages" },
];

export const AltText: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Alt text">
        <p style={{ marginBottom: 24, color: typo.muted }}>
          Texto alternativo em imagens, ícones e avatares: descreva função ou conteúdo relevante e seja conciso.
        </p>
        {Object.entries(altTextGuidelines).map(([key, line]) => (
          <StoryCard key={key} title={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}>
            <p style={{ margin: 0, color: typo.bodyColor }}>{line}</p>
          </StoryCard>
        ))}
        <h4 style={{ ...typo.labelUppercase, color: typo.muted, marginTop: 24, marginBottom: 12 }}>
          Exemplos na prática
        </h4>
        {altTextExamples.map((ex) => (
          <StoryCard key={(ex as { guideline: string }).guideline}>
            {"decorative" in ex && ex.decorative ? (
                <div>
                <div style={{ ...typo.labelUppercase, color: typo.muted, marginBottom: 8 }}>
                  {altTextGuidelines.decorative}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div style={exampleBlock("Decorative", 'alt="" ou role="presentation"', "prefer")}>
                    <span style={typo.labelUppercase}>Prefira</span>
                    <div style={{ marginTop: 4 }}><code>alt=""</code> ou <code>role="presentation"</code></div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", ...exampleBlock("Evite", (ex as { avoid: string }).avoid, "avoid") }}>
                  <span style={typo.labelUppercase}>{exampleLabel("avoid")}</span>
                  <div style={{ marginTop: 4 }}>{(ex as { avoid: string }).avoid}</div>
                </div>
                <div style={{ flex: "1 1 200px", ...exampleBlock("Prefira", (ex as { prefer: string }).prefer, "prefer") }}>
                  <span style={typo.labelUppercase}>{exampleLabel("prefer")}</span>
                  <div style={{ marginTop: 4 }}>{(ex as { prefer: string }).prefer}</div>
                </div>
              </div>
            )}
          </StoryCard>
        ))}
      </StorySection>
    </div>
  ),
};

const globalExamples = [
  { avoid: "Fazer deploy do build em prod", prefer: "Publicar versão em produção" },
  { avoid: "FAQ", prefer: "Perguntas frequentes" },
  { avoid: "Usar \"Salvar\" em um lugar e \"Guardar\" em outro para a mesma ação", prefer: "Use sempre o mesmo termo (ex.: Salvar)" },
];

export const GlobalWriting: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Global writing">
        <StoryCard title="Visão geral">
          <p style={{ margin: 0, color: typo.bodyColor }}>{globalWritingGuidelines.overview}</p>
        </StoryCard>
        <h4 style={{ ...typo.labelUppercase, color: typo.muted, marginTop: 8, marginBottom: 12 }}>
          Escolha de palavras
        </h4>
        <ul style={{ margin: "0 0 20px", paddingLeft: 20, color: typo.bodyColor }}>
          {globalWritingGuidelines.wordChoice.map((item) => (
            <li key={item} style={{ marginBottom: 6 }}>{item}</li>
          ))}
        </ul>
        <h4 style={{ ...typo.labelUppercase, color: typo.muted, marginBottom: 12 }}>
          Evite vs prefira
        </h4>
        {globalExamples.map((ex) => (
          <div key={ex.avoid} style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 220px", ...exampleBlock("Evite", ex.avoid, "avoid") }}>
              <span style={typo.labelUppercase}>Evite</span>
              <div style={{ marginTop: 4 }}>{ex.avoid}</div>
            </div>
            <div style={{ flex: "1 1 220px", ...exampleBlock("Prefira", ex.prefer, "prefer") }}>
              <span style={typo.labelUppercase}>Prefira</span>
              <div style={{ marginTop: 4 }}>{ex.prefer}</div>
            </div>
          </div>
        ))}
      </StorySection>
    </div>
  ),
};

function NotificationMock({
  type,
  title,
  message,
  action,
  variant = "surface",
}: {
  type: string;
  title?: string;
  message: string;
  action?: string;
  variant?: "surface" | "error";
}) {
  const bg = variant === "error" ? palette.errorContainer : palette.surfaceVariant;
  const fg = variant === "error" ? palette.onErrorContainer : palette.onSurfaceVariant;
  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: type === "dialog" ? 28 : 12,
        backgroundColor: bg,
        color: fg,
        fontSize: 13,
        maxWidth: type === "dialog" ? 360 : 320,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {type === "dialog" && (
        <div style={{ fontWeight: 600, marginBottom: 8, color: palette.onSurface }}>{title}</div>
      )}
      <div style={{ marginBottom: action ? 12 : 0 }}>{message}</div>
      {action && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="button"
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "none",
              background: palette.primary,
              color: palette.onPrimary,
              fontSize: 13,
              fontWeight: 500,
              cursor: "default",
            }}
          >
            {action}
          </button>
        </div>
      )}
    </div>
  );
}

export const Notifications: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Notifications">
        <p style={{ marginBottom: 20, color: typo.muted }}>
          Escolha o tipo certo e mantenha mensagem clara, acionável e com hierarquia adequada.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {notificationGuidelines.types.map((t) => (
            <div key={t}>
              <div style={{ ...typo.labelUppercase, color: typo.muted, marginBottom: 8 }}>
                {t}
              </div>
              <NotificationMock
                type={t}
                title={t === "dialog" ? "Excluir item?" : undefined}
                message={
                  t === "snackbar" || t === "toast"
                    ? "Alteração salva. Desfazer"
                    : t === "banner"
                      ? "Conecte-se à internet para continuar."
                      : "Isso não pode ser desfeito."
                }
                action={t === "dialog" ? "Excluir" : t === "snackbar" || t === "toast" ? "Desfazer" : undefined}
                variant={t === "dialog" ? "error" : "surface"}
              />
            </div>
          ))}
        </div>
        <StoryCard title="Boas práticas">
          <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
            {notificationGuidelines.practices.map((p) => (
              <li key={p} style={{ marginBottom: 8 }}>{p}</li>
            ))}
          </ul>
        </StoryCard>
      </StorySection>
    </div>
  ),
};

const sentenceCaseExamples = [
  { avoid: "Configurações Da Conta", prefer: "Configurações da conta" },
  { avoid: "Fazer Login", prefer: "Fazer login" },
];
const abbreviationExamples = [
  { avoid: "ex.: use isso", prefer: "Por exemplo: use isso" },
  { avoid: "Qtde. de itens", prefer: "Quantidade de itens" },
];

export const StyleGuide: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body, color: typo.bodyColor }}>
      <StorySection title="Style guide">
        <StoryCard title="UX writing best practices">
          <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
            {Object.entries(styleGuideUxWriting).map(([key, text]) => (
              <li key={key} style={{ marginBottom: 10 }}>
                <strong style={{ textTransform: "capitalize" }}>
                  {key.replace(/([A-Z])/g, " $1").trim().toLowerCase()}:
                </strong>{" "}
                {text}
              </li>
            ))}
          </ul>
        </StoryCard>
        <StoryCard title="Sentence case">
          <p style={{ margin: "0 0 12px", color: typo.muted }}>Só a primeira letra em maiúscula em títulos e labels.</p>
          {sentenceCaseExamples.map((ex) => (
            <div key={ex.avoid} style={{ display: "flex", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 180px", ...exampleBlock("Evite", ex.avoid, "avoid") }}>
                <span style={typo.labelUppercase}>Evite</span>
                <div style={{ marginTop: 4 }}>{ex.avoid}</div>
              </div>
              <div style={{ flex: "1 1 180px", ...exampleBlock("Prefira", ex.prefer, "prefer") }}>
                <span style={typo.labelUppercase}>Prefira</span>
                <div style={{ marginTop: 4 }}>{ex.prefer}</div>
              </div>
            </div>
          ))}
        </StoryCard>
        <StoryCard title="Abreviações">
          <p style={{ margin: "0 0 12px", color: typo.muted }}>Escreva por extenso quando ajudar a compreensão.</p>
          {abbreviationExamples.map((ex) => (
            <div key={ex.avoid} style={{ display: "flex", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 180px", ...exampleBlock("Evite", ex.avoid, "avoid") }}>
                <span style={typo.labelUppercase}>Evite</span>
                <div style={{ marginTop: 4 }}>{ex.avoid}</div>
              </div>
              <div style={{ flex: "1 1 180px", ...exampleBlock("Prefira", ex.prefer, "prefer") }}>
                <span style={typo.labelUppercase}>Prefira</span>
                <div style={{ marginTop: 4 }}>{ex.prefer}</div>
              </div>
            </div>
          ))}
        </StoryCard>
        <StoryCard title="Word choice">
          <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
            {Object.entries(styleGuideWordChoice).map(([key, text]) => (
              <li key={key} style={{ marginBottom: 6 }}>
                <strong>{key.replace(/([A-Z])/g, " $1").trim().toLowerCase()}:</strong> {text}
              </li>
            ))}
          </ul>
        </StoryCard>
        <StoryCard title="Grammar and punctuation">
          <ul style={{ margin: 0, paddingLeft: 20, color: typo.bodyColor }}>
            {Object.entries(styleGuideGrammar).map(([key, text]) => (
              <li key={key} style={{ marginBottom: 6 }}>
                <strong>{key.replace(/([A-Z])/g, " $1").trim().toLowerCase()}:</strong> {text}
              </li>
            ))}
          </ul>
        </StoryCard>
      </StorySection>
    </div>
  ),
};
