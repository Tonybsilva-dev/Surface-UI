import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	motionTokens,
} from "./foundation";

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
				className={className}
				style={{
					position: "relative",
					display: "inline-flex",
					alignItems: "stretch",
					height: 40,
					width: showInput ? "100%" : "auto",
					maxWidth: 400,
					borderRadius: componentShapeTokens.chip,
					border: `1px solid ${lightColorScheme.outline}`,
					overflow: "hidden",
					...style,
				}}
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

	const buttonStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		paddingInline: spacingTokens[4],
		height: "100%",
		border: "none",
		borderRadius: 0,
		backgroundColor: lightColorScheme.surface,
		fontFamily: typographyTokens.label.large.fontFamily,
		fontSize: typographyTokens.label.large.fontSize,
		color: lightColorScheme.onSurface,
		cursor: "pointer",
	};

	return (
		<button
			type="button"
			className={className}
			style={{ ...buttonStyles, ...style }}
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

	const buttonStyles: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		minWidth: showInput ? 72 : 40,
		paddingInline: showInput ? spacingTokens[3] : 0,
		height: "100%",
		border: "none",
		borderRadius: 0,
		backgroundColor: lightColorScheme.primary,
		color: lightColorScheme.onPrimary,
		fontFamily: typographyTokens.label.large.fontFamily,
		fontSize: typographyTokens.label.large.fontSize,
		cursor: "pointer",
		transition: `min-width ${motionTokens.duration.short2}, padding ${motionTokens.duration.short2}`,
	};

	return (
		<button
			type="button"
			className={className}
			style={{ ...buttonStyles, ...style }}
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

	const inputStyles: CSSProperties = {
		flex: 1,
		minWidth: 0,
		height: "100%",
		boxSizing: "border-box",
		paddingInline: spacingTokens[3],
		border: "none",
		backgroundColor: lightColorScheme.surface,
		fontFamily: typographyTokens.body.medium.fontFamily,
		fontSize: typographyTokens.body.medium.fontSize,
		color: lightColorScheme.onSurface,
		outline: "none",
	};

	if (!showInput) return null;

	return (
		<input
			type="text"
			className={className}
			style={{ ...inputStyles, ...style }}
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
