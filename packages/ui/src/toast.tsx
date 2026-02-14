import type { CSSProperties, ReactNode } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";

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

const toastBorderClasses: Record<ToastType, string> = {
	default: "border-border",
	success: "border-[#52c41a]",
	error: "border-destructive",
	warning: "border-[#faad14]",
	info: "border-primary",
};

const DEFAULT_DURATION = 5000;

function ToastItemView({
	item,
	onDismiss,
}: {
	item: ToastItem;
	onDismiss: (id: string) => void;
}): JSX.Element {
	const duration = item.duration ?? DEFAULT_DURATION;

	useEffect(() => {
		if (duration <= 0) return;
		const t = setTimeout(() => onDismiss(item.id), duration);
		return () => clearTimeout(t);
	}, [item.id, duration, onDismiss]);

	return (
		<div
			className={cn(
				"flex items-center justify-between gap-3 min-w-[280px] max-w-[420px] rounded-md border bg-card px-4 py-3 text-sm text-foreground shadow-[var(--shadow-2)]",
				toastBorderClasses[item.type],
			)}
		>
			<span className="min-w-0 flex-1">{item.message}</span>
			<button
				type="button"
				aria-label="Fechar"
				onClick={() => onDismiss(item.id)}
				className="shrink-0 size-6 border-0 bg-transparent p-0 text-lg leading-none text-muted-foreground cursor-pointer"
			>
				×
			</button>
		</div>
	);
}

const positionClasses: Record<
	"bottom-right" | "top-right" | "bottom-left" | "top-left",
	string
> = {
	"bottom-right": "bottom-4 right-4",
	"top-right": "top-4 right-4",
	"bottom-left": "bottom-4 left-4",
	"top-left": "top-4 left-4",
};

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

	return (
		<ToastContext.Provider value={ctx}>
			{children}
			{typeof document !== "undefined" && document.body && toasts.length > 0
				? createPortal(
						<div
							className={`fixed z-[10000] flex flex-col gap-2 pointer-events-none ${positionClasses[position]}`}
						>
							{toasts.map((item) => (
								<div key={item.id} className="pointer-events-auto">
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
