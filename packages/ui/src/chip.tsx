import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type ChipVariant = "default" | "primary" | "success" | "warning" | "error";
export type ChipSize = "sm" | "md";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	variant?: ChipVariant;
	size?: ChipSize;
	selected?: boolean;
	onRemove?: () => void;
}

function getChipVariantClasses(variant: ChipVariant, selected: boolean): string {
	const base = {
		default: "bg-muted text-muted-foreground border-border",
		primary: selected
			? "bg-primary text-primary-foreground border-primary"
			: "bg-muted text-muted-foreground border-border",
		success: "bg-[#f6ffed] text-[#52c41a] border-[#b7eb8f]",
		warning: "bg-[#fffbe6] text-[#faad14] border-[#ffe58f]",
		error: "bg-destructive/10 text-destructive border-destructive",
	};
	return base[variant];
};

const sizeClasses: Record<ChipSize, string> = {
	sm: "h-6 px-2 text-xs",
	md: "h-8 px-3 text-sm",
};

export function Chip(props: ChipProps): JSX.Element {
	const {
		children,
		variant = "default",
		size = "md",
		selected = false,
		onRemove,
		className,
		...other
	} = props;

	return (
		<span
			{...other}
			className={cn(
				"inline-flex items-center gap-1 font-medium leading-none rounded-full border box-border shrink-0",
				getChipVariantClasses(variant, selected),
				sizeClasses[size],
				className,
			)}
		>
			<span className="shrink-0">{children}</span>
			{onRemove != null ? (
				<button
					type="button"
					aria-label="Remover"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					className="inline-flex items-center justify-center w-4 h-4 p-0 m-0 border-0 bg-transparent text-inherit cursor-pointer rounded-full hover:opacity-80"
				>
					<svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden className="stroke-current">
						<title>Fechar</title>
						<path
							d="M1 1l8 8M9 1L1 9"
							strokeWidth={1.5}
							strokeLinecap="round"
						/>
					</svg>
				</button>
			) : null}
		</span>
	);
}

Chip.displayName = "Chip";
