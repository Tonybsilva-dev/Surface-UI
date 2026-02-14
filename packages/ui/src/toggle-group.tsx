import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "./lib/utils";

type ToggleGroupType = "single";

interface ToggleGroupContextValue {
	type: ToggleGroupType;
	value: string | undefined;
	onValueChange: (value: string) => void;
	variant: "default" | "outline";
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

const toggleGroupVariants = cva("inline-flex items-center justify-center rounded-md", {
	variants: {
		variant: {
			default: "bg-muted p-0.5",
			outline: "border border-input bg-transparent p-0.5",
		},
	},
	defaultVariants: {
		variant: "outline",
	},
});

const toggleGroupItemVariants = cva(
	"inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
	{
		variants: {
			variant: {
				default:
					"hover:bg-muted/80 hover:text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground",
				outline:
					"border border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:border-border data-[state=on]:bg-background data-[state=on]:shadow-sm",
			},
		},
		defaultVariants: {
			variant: "outline",
		},
	},
);

export interface ToggleGroupProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof toggleGroupVariants> {
	/** Tipo de seleção: single (apenas um valor). */
	type: ToggleGroupType;
	/** Valor selecionado (controlado). */
	value?: string;
	/** Callback quando o valor muda. */
	onValueChange?: (value: string) => void;
	children: ReactNode;
}

export function ToggleGroup(props: ToggleGroupProps): JSX.Element {
	const {
		type = "single",
		value,
		onValueChange,
		variant = "outline",
		className,
		children,
		...rest
	} = props;

	const resolvedVariant = variant ?? "outline";

	return (
		<ToggleGroupContext.Provider
			value={{
				type,
				value,
				onValueChange: onValueChange ?? (() => {}),
				variant: resolvedVariant,
			}}
		>
			<div
				className={cn(toggleGroupVariants({ variant }), className)}
				{...rest}
			>
				{children}
			</div>
		</ToggleGroupContext.Provider>
	);
}

ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
	/** Valor do item (obrigatório para single). */
	value: string;
	children: ReactNode;
	disabled?: boolean;
}

export function ToggleGroupItem(props: ToggleGroupItemProps): JSX.Element {
	const { value, className, children, disabled, ...rest } = props;
	const ctx = useContext(ToggleGroupContext);

	if (!ctx) {
		throw new Error("ToggleGroupItem must be used within ToggleGroup");
	}

	const isOn = ctx.value === value;

	const handleClick = (): void => {
		if (disabled) return;
		ctx.onValueChange(value);
	};

	return (
		<button
			type="button"
			aria-pressed={isOn}
			data-state={isOn ? "on" : "off"}
			disabled={disabled}
			className={cn(
				"px-4 py-2",
				toggleGroupItemVariants({ variant: ctx.variant }),
				className,
			)}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</button>
	);
}

ToggleGroupItem.displayName = "ToggleGroupItem";
