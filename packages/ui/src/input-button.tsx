import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { cn } from "./lib/utils";

interface InputButtonContextValue {
	showInput: boolean;
	setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputButtonContext = createContext<InputButtonContextValue | null>(null);

export interface InputButtonProviderProps {
	showInput?: boolean;
	setShowInput?: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputButtonProvider(props: InputButtonProviderProps): JSX.Element {
	const {
		showInput: controlledShow,
		setShowInput: controlledSet,
		children,
		style,
		className,
	} = props;
	const [uncontrolledShow, setUncontrolledShow] = useState(false);
	const isControlled = controlledSet !== undefined && controlledShow !== undefined;
	const showInput = isControlled ? controlledShow! : uncontrolledShow;
	const setShowInput = isControlled ? controlledSet! : setUncontrolledShow;

	const ctx: InputButtonContextValue = { showInput, setShowInput };

	return (
		<InputButtonContext.Provider value={ctx}>
			<div
				className={cn(
					"relative inline-flex h-10 max-w-[400px] items-stretch overflow-hidden rounded-full border border-border",
					showInput ? "w-full" : "w-auto",
					className,
				)}
				style={style}
			>
				{children}
			</div>
		</InputButtonContext.Provider>
	);
}

InputButtonProvider.displayName = "InputButton.Provider";

export interface InputButtonActionProps {
	children: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputButtonAction(props: InputButtonActionProps): JSX.Element | null {
	const { children, style, className } = props;
	const ctx = useContext(InputButtonContext);
	if (!ctx) return <>{children}</>;
	const { setShowInput, showInput } = ctx;
	if (showInput) return null;

	return (
		<button
			type="button"
			className={cn(
				"inline-flex h-full items-center justify-center border-0 bg-background px-4 text-sm font-medium text-foreground",
				className,
			)}
			style={style}
			onClick={() => setShowInput(true)}
		>
			{children}
		</button>
	);
}

InputButtonAction.displayName = "InputButton.Action";

export interface InputButtonSubmitProps {
	children?: ReactNode;
	icon?: ReactNode;
	style?: CSSProperties;
	className?: string;
}

export function InputButtonSubmit(props: InputButtonSubmitProps): JSX.Element {
	const { children, icon, style, className } = props;
	const ctx = useContext(InputButtonContext);
	if (!ctx) return <>{children}</>;
	const { showInput, setShowInput } = ctx;

	return (
		<button
			type="button"
			className={cn(
				"inline-flex h-full shrink-0 items-center justify-center border-0 bg-primary px-3 text-sm font-medium text-primary-foreground transition-[min-width,padding] duration-150",
				showInput ? "min-w-[72px]" : "min-w-10 px-0",
				className,
			)}
			style={style}
			onClick={() => setShowInput(!showInput)}
		>
			{showInput ? children : icon}
		</button>
	);
}

InputButtonSubmit.displayName = "InputButton.Submit";

export interface InputButtonInputProps extends InputHTMLAttributes<HTMLInputElement> {
	style?: CSSProperties;
	className?: string;
}

export function InputButtonInput(props: InputButtonInputProps): JSX.Element | null {
	const { style, className, ...other } = props;
	const ctx = useContext(InputButtonContext);
	if (!ctx) return <input {...other} />;
	const { showInput } = ctx;

	if (!showInput) return null;

	return (
		<input
			type="text"
			className={cn(
				"h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-foreground outline-none",
				className,
			)}
			style={style}
			{...other}
		/>
	);
}

InputButtonInput.displayName = "InputButton.Input";

export const InputButton = {
	Provider: InputButtonProvider,
	Action: InputButtonAction,
	Submit: InputButtonSubmit,
	Input: InputButtonInput,
};
