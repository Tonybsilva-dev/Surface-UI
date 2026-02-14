import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, createContext, useContext, useId } from "react";
import { cn } from "./lib/utils";

export type RadioSize = "sm" | "md";

const sizeMap: Record<RadioSize, string> = {
	sm: "size-4",
	md: "size-[18px]",
};

const innerDotSizeMap: Record<RadioSize, string> = {
	sm: "size-2",
	md: "size-2.5",
};

const visuallyHidden =
	"absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]";

type RadioGroupContextValue = {
	name: string;
	value: string | number | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	size?: RadioSize;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	disabled?: boolean;
	size?: RadioSize;
	children: ReactNode;
	className?: string;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element {
	const {
		value,
		onChange,
		name: nameProp,
		disabled = false,
		size = "md",
		children,
		className,
	} = props;
	const fallbackName = useId();
	const name = nameProp ?? fallbackName;

	const contextValue: RadioGroupContextValue = {
		name,
		value,
		onChange: onChange ?? (() => {}),
		disabled,
		size,
	};

	return (
		<RadioGroupContext.Provider value={contextValue}>
			<div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
}

RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	value?: string | number;
	children?: ReactNode;
	size?: RadioSize;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
	const {
		children,
		size: sizeProp,
		disabled: disabledProp,
		name: nameProp,
		value,
		checked: checkedProp,
		onChange: onChangeProp,
		className,
		...other
	} = props;

	const group = useContext(RadioGroupContext);
	const name = group ? group.name : nameProp;
	const disabled = group?.disabled ?? disabledProp;
	const size = group?.size ?? sizeProp ?? "md";
	const checked = group ? String(group.value) === String(value) : checkedProp;
	const onChange = group?.onChange ?? onChangeProp;

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
				type="radio"
				name={name}
				value={value != null ? String(value) : undefined}
				disabled={disabled}
				checked={checked}
				onChange={onChange}
				aria-checked={checked}
				className={visuallyHidden}
				{...other}
			/>
			<span
				aria-hidden
				className={cn(
					"inline-flex shrink-0 items-center justify-center rounded-full border-2 bg-transparent transition-colors duration-100",
					sizeMap[size],
					checked ? "border-primary" : "border-input",
				)}
			>
				<span
					className={cn(
						"rounded-full bg-primary transition-[width,height] duration-100",
						checked ? innerDotSizeMap[size] : "size-0",
					)}
				/>
			</span>
			{children != null ? (
				<span className="text-sm font-normal leading-normal text-foreground">
					{children}
				</span>
			) : null}
		</label>
	);
});

Radio.displayName = "Radio";
