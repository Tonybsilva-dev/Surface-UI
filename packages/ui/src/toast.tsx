import type { CSSProperties, ReactNode } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
	lightColorScheme,
	typographyTokens,
	spacingTokens,
	componentShapeTokens,
	elevationTokens,
} from "./foundation";

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastItem {
	id: string;
	message: string;
	type: ToastType;
	/** Duração em ms; 0 = não fechar automaticamente. */
	duration?: number;
}

interface ToastContextValue {
	toasts: ToastItem[];
	addToast: (toast: Omit<ToastItem, "id">) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastColors: Record<ToastType, { bg: string; border: string }> = {
	default: {
		bg: lightColorScheme.surface,
		border: lightColorScheme.outline,
	},
	success: {
		bg: lightColorScheme.surface,
		border: "rgb(82, 196, 26)",
	},
	error: {
		bg: lightColorScheme.surface,
		border: lightColorScheme.error,
	},
	warning: {
		bg: lightColorScheme.surface,
		border: "rgb(250, 173, 20)",
	},
	info: {
		bg: lightColorScheme.surface,
		border: lightColorScheme.primary,
	},
};

const DEFAULT_DURATION = 5000;

function ToastItemView({
	item,
	onDismiss,
}: {
	item: ToastItem;
	onDismiss: (id: string) => void;
}): JSX.Element {
	const colors = toastColors[item.type];
	const duration = item.duration ?? DEFAULT_DURATION;

	useEffect(() => {
		if (duration <= 0) return;
		const t = setTimeout(() => onDismiss(item.id), duration);
		return () => clearTimeout(t);
	}, [item.id, duration, onDismiss]);

	const wrapperStyles: CSSProperties = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spacingTokens[3],
		padding: `${spacingTokens[3]} ${spacingTokens[4]}`,
		minWidth: 280,
		maxWidth: 420,
		borderRadius: componentShapeTokens.textField,
		border: `1px solid ${colors.border}`,
		backgroundColor: colors.bg,
		boxShadow: elevationTokens.level2.boxShadow,
		fontFamily: typographyTokens.body.medium.fontFamily,
		fontSize: typographyTokens.body.medium.fontSize,
		color: lightColorScheme.onSurface,
	};

	return (
		<div style={wrapperStyles}>
			<span style={{ flex: 1, minWidth: 0 }}>{item.message}</span>
			<button
				type="button"
				aria-label="Fechar"
				onClick={() => onDismiss(item.id)}
				style={{
					flexShrink: 0,
					width: 24,
					height: 24,
					padding: 0,
					border: "none",
					background: "transparent",
					color: lightColorScheme.onSurfaceVariant,
					cursor: "pointer",
					fontSize: 18,
					lineHeight: 1,
				}}
			>
				×
			</button>
		</div>
	);
}

function getPositionStyles(
	position: "bottom-right" | "top-right" | "bottom-left" | "top-left",
): CSSProperties {
	const base: CSSProperties = {
		position: "fixed",
		zIndex: 10000,
		display: "flex",
		flexDirection: "column",
		gap: spacingTokens[2],
		pointerEvents: "none",
	};
	if (position === "top-right")
		return { ...base, top: spacingTokens[4], right: spacingTokens[4] };
	if (position === "bottom-left")
		return { ...base, bottom: spacingTokens[4], left: spacingTokens[4] };
	if (position === "top-left")
		return { ...base, top: spacingTokens[4], left: spacingTokens[4] };
	return { ...base, bottom: spacingTokens[4], right: spacingTokens[4] };
}

export interface ToastProviderProps {
	children: ReactNode;
	/** Posição dos toasts. */
	position?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
}

export function ToastProvider(props: ToastProviderProps): JSX.Element {
	const { children, position = "bottom-right" } = props;
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const addToast = useCallback((t: Omit<ToastItem, "id">) => {
		const id =
			typeof crypto !== "undefined" && crypto.randomUUID
				? crypto.randomUUID()
				: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
		setToasts((prev) => [...prev, { ...t, id }]);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	useEffect(() => {
		(toast as { _add?: ToastContextValue["addToast"] })._add = addToast;
		return () => {
			(toast as { _add?: ToastContextValue["addToast"] })._add = undefined;
		};
	}, [addToast]);

	const ctx: ToastContextValue = { toasts, addToast, removeToast };

	const containerStyles = getPositionStyles(position);

	return (
		<ToastContext.Provider value={ctx}>
			{children}
			{typeof document !== "undefined" && document.body && toasts.length > 0
				? createPortal(
						<div style={containerStyles}>
							{toasts.map((item) => (
								<div key={item.id} style={{ pointerEvents: "auto" }}>
									<ToastItemView item={item} onDismiss={removeToast} />
								</div>
							))}
						</div>,
						document.body,
					)
				: null}
		</ToastContext.Provider>
	);
}

ToastProvider.displayName = "Toast.Provider";

/** API imperativa: toast.success("Mensagem"), toast.error("Erro"), etc. Requer Toast.Provider na árvore. */
export const toast = {
	success: (message: string, duration?: number) => {
		(toast as { _add?: ToastContextValue["addToast"] })._add?.({
			message,
			type: "success",
			duration: duration ?? DEFAULT_DURATION,
		});
	},
	error: (message: string, duration?: number) => {
		(toast as { _add?: ToastContextValue["addToast"] })._add?.({
			message,
			type: "error",
			duration: duration ?? DEFAULT_DURATION,
		});
	},
	warning: (message: string, duration?: number) => {
		(toast as { _add?: ToastContextValue["addToast"] })._add?.({
			message,
			type: "warning",
			duration: duration ?? DEFAULT_DURATION,
		});
	},
	info: (message: string, duration?: number) => {
		(toast as { _add?: ToastContextValue["addToast"] })._add?.({
			message,
			type: "info",
			duration: duration ?? DEFAULT_DURATION,
		});
	},
	message: (message: string, duration?: number) => {
		(toast as { _add?: ToastContextValue["addToast"] })._add?.({
			message,
			type: "default",
			duration: duration ?? DEFAULT_DURATION,
		});
	},
};

export const Toast = {
	Provider: ToastProvider,
};
