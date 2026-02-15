import { cn } from "./lib/utils";

/**
 * Componente para medir e exibir a força da senha
 * Segue Nielsen Heuristics: Visibilidade do Status do Sistema e Feedback Visual
 */
interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const getStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

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
    <div
      className="mt-2"
      role="status"
      aria-live="polite"
      aria-label={`Força da senha: ${STRENGTH_LABELS[strength - 1] ?? "Muito Fraca"}`}
    >
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={`segment-${index}`}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-[var(--duration-medium)] ease-[var(--ease-standard)]",
              index < strength ? STRENGTH_COLORS[strength - 1] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Força da senha: {STRENGTH_LABELS[strength - 1] ?? "Muito Fraca"}
      </p>
    </div>
  );
};
