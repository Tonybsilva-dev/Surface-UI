import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type LabelSize = "labelSmall" | "labelMedium" | "labelLarge";

export interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "size"> {
	children: ReactNode;
	size?: LabelSize;
	required?: boolean;
	disabled?: boolean;
}

const sizeClasses: Record<LabelSize, string> = {
	labelSmall: "text-xs font-medium leading-none",
	labelMedium: "text-sm font-medium leading-none",
	labelLarge: "text-sm font-medium leading-none",
};

export function Label(props: LabelProps): JSX.Element {
	const {
		children,
		size = "labelMedium",
		required = false,
		disabled,
		className,
		...other
	} = props;

	return (
		<label
			className={cn(
				"inline-block text-foreground",
				disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
				sizeClasses[size],
				className,
			)}
			{...other}
		>
			{children}
			{required ? <span aria-hidden className="text-destructive ml-0.5">*</span> : null}
		</label>
	);
}

Label.displayName = "Label";
