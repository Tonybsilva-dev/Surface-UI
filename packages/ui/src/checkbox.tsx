import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { cn } from "./lib/utils";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	children?: ReactNode;
	size?: CheckboxSize;
	indeterminate?: boolean;
}

const sizeClasses: Record<CheckboxSize, string> = {
	sm: "h-[18px] w-[18px]",
	md: "h-5 w-5",
};

const visuallyHidden =
	"absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	props,
	ref,
) {
	const {
		children,
		size = "md",
		indeterminate = false,
		disabled,
		checked,
		className,
		style,
		...other
	} = props;

	const inputRef = useRef<HTMLInputElement | null>(null);
	const setRef = (el: HTMLInputElement | null) => {
		inputRef.current = el;
		if (typeof ref === "function") ref(el);
		else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
	};
	useEffect(() => {
		if (inputRef.current) inputRef.current.indeterminate = indeterminate;
	}, [indeterminate]);

	const isChecked = checked === true || indeterminate;

	return (
		<label
			className={cn(
				"inline-flex items-center gap-2 cursor-pointer",
				disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
				className,
			)}
			style={style}
		>
			<input
				type="checkbox"
				ref={setRef}
				{...other}
				disabled={disabled}
				checked={checked}
				className={visuallyHidden}
				aria-checked={indeterminate ? "mixed" : checked}
			/>
			<span
				aria-hidden
				className={cn(
					"inline-flex shrink-0 items-center justify-center rounded border-2 transition-colors duration-150",
					sizeClasses[size],
					isChecked
						? "border-primary bg-primary text-primary-foreground"
						: "border-input bg-background",
				)}
			>
				{isChecked ? (
					indeterminate ? (
						<span className="h-0.5 w-2.5 rounded-full bg-current" />
					) : (
						<svg
							width={12}
							height={10}
							viewBox="0 0 12 10"
							fill="none"
							aria-hidden
							className="shrink-0 stroke-current"
						>
							<title>Marcado</title>
							<path
								d="M1 5.5L4.5 9L11 1"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)
				) : null}
			</span>
			{children != null ? (
				<span className="text-sm font-normal leading-normal text-foreground">
					{children}
				</span>
			) : null}
		</label>
	);
});

Checkbox.displayName = "Checkbox";
