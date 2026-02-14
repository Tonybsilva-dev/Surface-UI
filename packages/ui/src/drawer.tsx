/**
 * Drawer – painel deslizante (vaul) por composição.
 * Drawer.Root + Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Close.
 */
import type { ReactNode } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "./lib/utils";

export type DrawerRootProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

export function DrawerRoot(props: DrawerRootProps): JSX.Element {
	return (
		<DrawerPrimitive.Root data-slot="drawer" {...props} />
	);
}

DrawerRoot.displayName = "Drawer.Root";

export type DrawerTriggerProps =
	React.ComponentProps<typeof DrawerPrimitive.Trigger>;

export function DrawerTrigger(props: DrawerTriggerProps): JSX.Element {
	return (
		<DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
	);
}

DrawerTrigger.displayName = "Drawer.Trigger";

export type DrawerPortalProps =
	React.ComponentProps<typeof DrawerPrimitive.Portal>;

export function DrawerPortal(props: DrawerPortalProps): JSX.Element {
	return (
		<DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
	);
}

DrawerPortal.displayName = "Drawer.Portal";

export type DrawerCloseProps =
	React.ComponentProps<typeof DrawerPrimitive.Close>;

export function DrawerClose(props: DrawerCloseProps): JSX.Element {
	return (
		<DrawerPrimitive.Close data-slot="drawer-close" {...props} />
	);
}

DrawerClose.displayName = "Drawer.Close";

export type DrawerOverlayProps =
	React.ComponentProps<typeof DrawerPrimitive.Overlay> & { className?: string };

export function DrawerOverlay({
	className,
	...props
}: DrawerOverlayProps): JSX.Element {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/50",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className,
			)}
			{...props}
		/>
	);
}

DrawerOverlay.displayName = "Drawer.Overlay";

export type DrawerContentProps =
	React.ComponentProps<typeof DrawerPrimitive.Content> & {
		className?: string;
		children?: ReactNode;
	};

export function DrawerContent({
	className,
	children,
	...props
}: DrawerContentProps): JSX.Element {
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="drawer-content"
				className={cn(
					"group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
					"data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:border-border",
					"data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:border-border",
					"data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:border-border data-[vaul-drawer-direction=right]:sm:max-w-sm",
					"data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:border-border data-[vaul-drawer-direction=left]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				<div
					className={cn(
						"bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full",
						"group-data-[vaul-drawer-direction=bottom]/drawer-content:block",
						"group-data-[vaul-drawer-direction=top]/drawer-content:block",
					)}
					aria-hidden
				/>
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

DrawerContent.displayName = "Drawer.Content";

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
}

export function DrawerHeader({
	className,
	...props
}: DrawerHeaderProps): JSX.Element {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"flex flex-col gap-0.5 p-4 md:gap-1.5 md:text-left",
				"group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
				"group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
				className,
			)}
			{...props}
		/>
	);
}

DrawerHeader.displayName = "Drawer.Header";

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
}

export function DrawerFooter({
	className,
	...props
}: DrawerFooterProps): JSX.Element {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

DrawerFooter.displayName = "Drawer.Footer";

export type DrawerTitleProps =
	React.ComponentProps<typeof DrawerPrimitive.Title> & { className?: string };

export function DrawerTitle({
	className,
	...props
}: DrawerTitleProps): JSX.Element {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("text-foreground font-semibold", className)}
			{...props}
		/>
	);
}

DrawerTitle.displayName = "Drawer.Title";

export type DrawerDescriptionProps =
	React.ComponentProps<typeof DrawerPrimitive.Description> & {
		className?: string;
	};

export function DrawerDescription({
	className,
	...props
}: DrawerDescriptionProps): JSX.Element {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

DrawerDescription.displayName = "Drawer.Description";

export const Drawer = Object.assign(DrawerRoot, {
	Trigger: DrawerTrigger,
	Portal: DrawerPortal,
	Overlay: DrawerOverlay,
	Close: DrawerClose,
	Content: DrawerContent,
	Header: DrawerHeader,
	Footer: DrawerFooter,
	Title: DrawerTitle,
	Description: DrawerDescription,
});
