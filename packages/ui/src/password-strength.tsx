import type { ReactNode } from "react";
import { cn } from "./lib/utils";

/**
 * Componente para medir e exibir a força da senha
 * Segue Nielsen Heuristics: Visibilidade do Status do Sistema e Feedback Visual
 */
interface PasswordStrengthProps {
  password: string;
}

const SEGMENT_KEYS = ["segment-0", "segment-1", "segment-2", "segment-3", "segment-4"] as const;

function getStrength(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

export function PasswordStrength({ password }: PasswordStrengthProps): ReactNode {
  const strength = getStrength(password);

  const STRENGTH_LABELS = [
    "Muito Fraca",
    "Fraca",
    "Média",
    "Forte",
    "Muito Forte",
  ];

  const STRENGTH_COLORS = [
    "bg-destructive",
    "bg-amber-500",
    "bg-primary",
    "bg-emerald-500",
    "bg-[#52c41a]",
  ];

  if (!password) return null;

  return (
    <output
      aria-label={`Força da senha: ${STRENGTH_LABELS[strength - 1] ?? "Muito Fraca"}`}
      aria-live="polite"
      className="mt-2"
    >
      <div className="mb-1 flex gap-1">
        {SEGMENT_KEYS.map((key, index) => (
          <div
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-(--duration-medium) ease-(--ease-standard)",
              index < strength ? STRENGTH_COLORS[strength - 1] : "bg-muted",
            )}
            key={key}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Força da senha: {STRENGTH_LABELS[strength - 1] ?? "Muito Fraca"}
      </p>
    </output>
  );
}
