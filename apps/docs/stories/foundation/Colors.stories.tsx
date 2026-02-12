import type { Meta, StoryObj } from "@storybook/react";
import {
  lightColorScheme,
  darkColorScheme,
  type ColorScheme,
} from "@surface/ui/foundation";
import { StoryCard, StorySection } from "./shared";

const meta: Meta = {
  title: "Foundation/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Esquemas de cor do design system. Use os tokens em temas e componentes.",
      },
    },
  },
};

export default meta;

const colorGroups: { label: string; keys: (keyof ColorScheme)[] }[] = [
  {
    label: "Primary",
    keys: ["primary", "onPrimary", "primaryContainer", "onPrimaryContainer"],
  },
  {
    label: "Secondary",
    keys: ["secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer"],
  },
  {
    label: "Tertiary",
    keys: ["tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer"],
  },
  {
    label: "Error",
    keys: ["error", "onError", "errorContainer", "onErrorContainer"],
  },
  {
    label: "Surface & outline",
    keys: ["surface", "onSurface", "surfaceVariant", "onSurfaceVariant", "outline", "outlineVariant"],
  },
  {
    label: "Inverse & overlay",
    keys: ["inverseSurface", "inverseOnSurface", "shadow", "scrim"],
  },
];

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          width: "100%",
          minHeight: 56,
          borderRadius: 12,
          backgroundColor: value,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 8,
        }}
      />
      <div style={{ fontSize: 12, fontFamily: "monospace", color: "#555" }}>
        {name}
      </div>
      <div style={{ fontSize: 11, color: "#888" }}>{value}</div>
    </div>
  );
}

function SchemeShowcase({ scheme, title, isDark = false }: { scheme: ColorScheme; title: string; isDark?: boolean }) {
  return (
    <StorySection title={title}>
      <div style={{ padding: isDark ? 24 : 0, backgroundColor: isDark ? scheme.surface : "transparent", borderRadius: 16 }}>
        {colorGroups.map((group) => (
          <StoryCard key={group.label} title={group.label}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 16,
              }}
            >
              {group.keys.map((key) => {
                const value = scheme[key];
                if (!value) return null;
                return <ColorSwatch key={key} name={key} value={value} />;
              })}
            </div>
          </StoryCard>
        ))}
      </div>
    </StorySection>
  );
}

function ColorInContext({ scheme }: { scheme: ColorScheme }) {
  return (
    <StorySection title="Exemplo em contexto (light)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <StoryCard title="Botão primary">
          <div
            style={{
              backgroundColor: scheme.primary,
              color: scheme.onPrimary,
              padding: "12px 24px",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 500,
              display: "inline-block",
            }}
          >
            Action
          </div>
        </StoryCard>
        <StoryCard title="Card na surface">
          <div
            style={{
              backgroundColor: scheme.surfaceVariant,
              color: scheme.onSurfaceVariant,
              padding: 16,
              borderRadius: 12,
              maxWidth: 280,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Card title</div>
            <div style={{ fontSize: 14 }}>Body text using onSurfaceVariant on surfaceVariant.</div>
          </div>
        </StoryCard>
        <StoryCard title="Estado de erro">
          <div
            style={{
              backgroundColor: scheme.errorContainer,
              color: scheme.onErrorContainer,
              padding: 12,
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Mensagem de erro
          </div>
        </StoryCard>
      </div>
    </StorySection>
  );
}

export const Light: StoryObj = {
  render: () => (
    <div>
      <SchemeShowcase scheme={lightColorScheme} title="Light color scheme" />
      <ColorInContext scheme={lightColorScheme} />
    </div>
  ),
};

export const Dark: StoryObj = {
  render: () => (
    <div
      style={{
        padding: 24,
        backgroundColor: darkColorScheme.surface,
        color: darkColorScheme.onSurface,
        borderRadius: 16,
      }}
    >
      <SchemeShowcase scheme={darkColorScheme} title="Dark color scheme" isDark />
      <div style={{ marginTop: 24 }}>
        <StoryCard title="Exemplo em contexto (dark)">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <div
              style={{
                backgroundColor: darkColorScheme.primary,
                color: darkColorScheme.onPrimary,
                padding: "12px 24px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Action
            </div>
            <div
              style={{
                backgroundColor: darkColorScheme.surfaceVariant,
                color: darkColorScheme.onSurfaceVariant,
                padding: 16,
                borderRadius: 12,
                maxWidth: 260,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Card title</div>
              <div style={{ fontSize: 14 }}>Body on dark surface variant.</div>
            </div>
          </div>
        </StoryCard>
      </div>
    </div>
  ),
};

export const All: StoryObj = {
  render: () => (
    <div>
      <SchemeShowcase scheme={lightColorScheme} title="Light" />
      <StorySection title="Dark (preview)">
        <div
          style={{
            padding: 24,
            backgroundColor: darkColorScheme.surface,
            color: darkColorScheme.onSurface,
            borderRadius: 16,
          }}
        >
          {colorGroups.slice(0, 3).map((group) => (
            <StoryCard key={group.label} title={group.label}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {group.keys.map((key) => {
                  const value = darkColorScheme[key];
                  if (!value) return null;
                  return <ColorSwatch key={key} name={key} value={value} />;
                })}
              </div>
            </StoryCard>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};
