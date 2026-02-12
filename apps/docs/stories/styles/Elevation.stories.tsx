import type { Meta, StoryObj } from "@storybook/react";
import {
  elevationOverview,
  applyingElevationGuidelines,
  elevationTokensSummary,
  elevationTokens,
  lightColorScheme,
} from "@surface/ui/foundation";
import { StoryCard, StorySection, TwoColumn } from "../foundation/shared";

const meta: Meta = {
  title: "Styles/Elevation",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Elevation M3: overview, como aplicar níveis 0–5 e tokens de elevação. Esquerda: guidelines. Direita: exemplos visuais.",
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

const levelOrder = ["level0", "level1", "level2", "level3", "level4", "level5"] as const;

/** Mapa de níveis 0–5: baseline 0dp, barras à altura em dp (0dp a 12dp), como referência M3 */
function ElevationGraph() {
  const svgHeight = 160;
  const svgWidth = 380;
  const baselineY = 100;
  const scaleTop = 18;
  const scaleBottom = baselineY;
  /** dp aproximado por nível (0, ~2, ~4, 6, ~9, 12) */
  const dpByLevel = [0, 2, 4, 6, 9, 12];
  const barWidth = 44;
  const barHeight = 10;
  const colStep = (svgWidth - 80) / 6;
  const colStart = 40;

  const dpToY = (dp: number) => scaleBottom - (dp / 12) * (scaleBottom - scaleTop);

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      style={{ width: "100%", maxWidth: 420, display: "block" }}
      aria-hidden="true"
    >
      <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="#f6f0ff" rx={12} />
      {/* Grid horizontal (0dp, 6dp, 12dp) */}
      {[0, 6, 12].map((dp) => {
        const y = dpToY(dp);
        return (
          <line
            key={dp}
            x1={24}
            y1={y}
            x2={svgWidth - 56}
            y2={y}
            stroke={dp === 0 ? "#1a1a1a" : "#e0d7f5"}
            strokeWidth={dp === 0 ? 2 : 1}
          />
        );
      })}
      {/* Barras: uma por nível, posição vertical = elevação em dp */}
      {dpByLevel.map((dp, idx) => {
        const barY = dpToY(dp) - barHeight / 2;
        const barX = colStart + idx * colStep + (colStep - barWidth) / 2;
        return (
          <rect
            key={dp}
            x={barX}
            y={barY}
            width={barWidth}
            height={barHeight}
            rx={5}
            fill="#e8e0ec"
            stroke="#6750a4"
            strokeWidth={2}
          />
        );
      })}
      {/* Labels da escala (0dp, 6dp, 12dp) à direita */}
      <text x={svgWidth - 42} y={scaleBottom + 4} fontSize={11} fill="#333" fontWeight={500}>
        0dp
      </text>
      <text x={svgWidth - 42} y={dpToY(6) + 4} fontSize={11} fill="#333" fontWeight={500}>
        6dp
      </text>
      <text x={svgWidth - 42} y={scaleTop + 4} fontSize={11} fill="#333" fontWeight={500}>
        12dp
      </text>
      {/* Labels Level 0–5 abaixo da baseline */}
      {[0, 1, 2, 3, 4, 5].map((level) => {
        const cx = colStart + level * colStep + colStep / 2;
        const labelY = baselineY + 28;
        return (
          <g key={`label-${level}`}>
            <rect
              x={cx - 28}
              y={labelY - 10}
              width={56}
              height={20}
              rx={10}
              fill="#313033"
            />
            <text x={cx} y={labelY + 4} textAnchor="middle" fontSize={11} fill="#fff" fontWeight={500}>
              Level {level}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export const Overview: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Elevation (overview)">
        <TwoColumn
          left={
            <StoryCard title={elevationOverview.title}>
              <p style={{ margin: "0 0 12px" }}>{elevationOverview.description}</p>
              <a
                href={elevationOverview.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: "#6750a4" }}
              >
                M3 – Elevation overview →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Mapa de níveis 0–5">
              <ElevationGraph />
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const ApplyingElevation: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Applying elevation">
        <TwoColumn
          left={
            <StoryCard title="Quando usar cada nível">
              <p style={{ margin: "0 0 12px" }}>{applyingElevationGuidelines.description}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {applyingElevationGuidelines.keyPoints.map((p) => (
                  <li key={p} style={{ marginBottom: 8 }}>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={applyingElevationGuidelines.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "#6750a4" }}
              >
                M3 – Applying elevation →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Superfícies em diferentes níveis">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  alignItems: "flex-end",
                }}
              >
                {[
                  { level: "level0", label: "Background" },
                  { level: "level1", label: "Card" },
                  { level: "level2", label: "FAB" },
                  { level: "level3", label: "Bottom sheet" },
                  { level: "level5", label: "Dialog" },
                ].map((item) => {
                  const token = elevationTokens[item.level as keyof typeof elevationTokens];
                  return (
                    <div key={item.level} style={{ flex: "1 1 120px", minWidth: 0 }}>
                      <div
                        style={{
                          height: 64,
                          borderRadius: 12,
                          backgroundColor: lightColorScheme.surface,
                          boxShadow: token.boxShadow,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: "#111827",
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: 11, color: typo.muted, marginTop: 4 }}>
                        {item.level}
                      </div>
                    </div>
                  );
                })}
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

export const Tokens: StoryObj = {
  render: () => (
    <div style={{ fontFamily: typo.fontFamily, fontSize: typo.body }}>
      <StorySection title="Elevation tokens">
        <TwoColumn
          left={
            <StoryCard title="Níveis e dp aproximado">
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                    <th style={{ padding: "8px 0" }}>Token</th>
                    <th style={{ padding: "8px 0" }}>Label</th>
                    <th style={{ padding: "8px 0" }}>dp (ref.)</th>
                  </tr>
                </thead>
                <tbody>
                  {elevationTokensSummary.levels.map((l) => (
                    <tr key={l.level} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "8px 0", fontFamily: "monospace" }}>{l.level}</td>
                      <td style={{ padding: "8px 0" }}>{l.label}</td>
                      <td style={{ padding: "8px 0", color: typo.muted }}>{l.dp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a
                href={elevationTokensSummary.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "#6750a4" }}
              >
                M3 – Elevation tokens →
              </a>
            </StoryCard>
          }
          right={
            <StoryCard title="Swatches com box-shadow">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {levelOrder.map((level) => {
                  const token = elevationTokens[level];
                  const info = elevationTokensSummary.levels.find((l) => l.level === level);
                  return (
                    <div
                      key={level}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 90,
                          height: 44,
                          borderRadius: 12,
                          backgroundColor: "#ffffff",
                          boxShadow: token.boxShadow,
                        }}
                      />
                      <div style={{ fontSize: 12 }}>
                        <div style={{ fontWeight: 600 }}>{info?.label ?? level}</div>
                        <div style={{ color: typo.muted }}>{level}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </StoryCard>
          }
        />
      </StorySection>
    </div>
  ),
};

