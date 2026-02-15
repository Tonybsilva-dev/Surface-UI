import type { ReactNode } from "react";
import { forwardRef, useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "./lib/utils";

export type CheckboxSize = "sm" | "md";

type RadixCheckboxRoot = typeof CheckboxPrimitive.Root;

export interface CheckboxProps
	extends Omit<
		React.ComponentPropsWithoutRef<RadixCheckboxRoot>,
		"size" | "onChange" | "aria-checked"
	> {
	children?: ReactNode;
	size?: CheckboxSize;
	indeterminate?: boolean;
	/** Compatibilidade com input nativo: chamado quando o estado muda (checked = true/false). */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeClasses: Record<CheckboxSize, string> = {
	sm: "h-[18px] w-[18px]",
	md: "h-4 w-4",
};

export const Checkbox = forwardRef<
	React.ComponentRef<RadixCheckboxRoot>,
	CheckboxProps
>(function Checkbox(props, ref) {
	const {
		children,
		size = "md",
		indeterminate = false,
		checked,
		onCheckedChange,
		onChange,
		className,
		style,
		...other
	} = props;

	const mappedChecked =
		indeterminate === true ? "indeterminate" : checked;

	const handleCheckedChange = (value: boolean | "indeterminate") => {
		onCheckedChange?.(value);
		onChange?.({ target: { checked: value === true } } as React.ChangeEvent<HTMLInputElement>);
	};

	const id = useId();

	const rootClassName = cn(
		"grid place-content-center peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
		sizeClasses[size],
		className,
	);

	const ariaChecked: boolean | "mixed" | undefined =
		indeterminate || mappedChecked === "indeterminate"
			? "mixed"
			: mappedChecked === true
				? true
				: mappedChecked === false
					? false
					: undefined;

	const content = (
		<CheckboxPrimitive.Root
			ref={ref}
			checked={mappedChecked}
			onCheckedChange={handleCheckedChange}
			className={rootClassName}
			style={style}
			aria-checked={ariaChecked}
			{...other}
		>
			<CheckboxPrimitive.Indicator className="grid place-content-center text-current">
				{indeterminate ? (
					<Minus className="h-3 w-3" aria-hidden />
				) : (
					<Check className="h-4 w-4" aria-hidden />
				)}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);

	if (children != null) {
		return (
			<label
				htmlFor={id}
				className={cn(
					"inline-flex cursor-pointer items-center gap-2",
					other.disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
				)}
			>
				<CheckboxPrimitive.Root
					ref={ref}
					id={id}
					checked={mappedChecked}
					onCheckedChange={handleCheckedChange}
					className={rootClassName}
					style={style}
					aria-checked={ariaChecked}
					{...other}
				>
					<CheckboxPrimitive.Indicator className="grid place-content-center text-current">
						{indeterminate ? (
							<Minus className="h-3 w-3" aria-hidden />
						) : (
							<Check className="h-4 w-4" aria-hidden />
						)}
					</CheckboxPrimitive.Indicator>
				</CheckboxPrimitive.Root>
				<span className="text-sm font-normal leading-normal text-foreground">
					{children}
				</span>
			</label>
		);
	}

	return content;
});

Checkbox.displayName = "Checkbox";
