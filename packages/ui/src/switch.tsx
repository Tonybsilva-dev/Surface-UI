import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./lib/utils";

export type SwitchSize = "sm" | "md";

const sizeClasses: Record<SwitchSize, { track: string; thumb: string; thumbTranslate: string }> = {
	sm: {
		track: "w-7 h-4",
		thumb: "size-3",
		thumbTranslate: "translate-x-[calc(1.75rem-0.75rem-2px)]",
	},
	md: {
		track: "w-11 h-[22px]",
		thumb: "size-[18px]",
		thumbTranslate: "translate-x-[calc(2.75rem-18px-2px)]",
	},
};

const visuallyHidden =
	"absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	children?: ReactNode;
	size?: SwitchSize;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
	const { children, size = "md", disabled, checked, className, ...other } = props;

	const sizes = sizeClasses[size];

	return (
		<label
			className={cn(
				"inline-flex items-center gap-2 cursor-pointer",
				disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
				className,
			)}
		>
			<input
				ref={ref}
				type="checkbox"
				role="switch"
				aria-checked={checked}
				disabled={disabled}
				checked={checked}
				className={visuallyHidden}
				{...other}
			/>
			<span
				aria-hidden
				className={cn(
					"relative inline-block rounded-full transition-colors duration-100 ease-out",
					sizes.track,
					checked ? "bg-primary" : "bg-border",
				)}
			>
				<span
					className={cn(
						"absolute top-1/2 -translate-y-1/2 left-0.5 rounded-full bg-background shadow-sm transition-transform duration-100 ease-out",
						sizes.thumb,
						checked ? sizes.thumbTranslate : "translate-x-0",
					)}
				/>
			</span>
			{children != null ? (
				<span className="text-sm leading-5 text-foreground">{children}</span>
			) : null}
		</label>
	);
});

Switch.displayName = "Switch";
