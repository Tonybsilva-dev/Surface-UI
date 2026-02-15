/**
 * Empty – estado vazio por composição.
 * Monta a UI com Empty (root) + Empty.Header, Empty.Media, Empty.Title,
 * Empty.Description e Empty.Content conforme necessário.
 */
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export interface EmptyComponent {
	(props: EmptyProps): JSX.Element;
	Header: typeof EmptyHeader;
	Title: typeof EmptyTitle;
	Description: typeof EmptyDescription;
	Content: typeof EmptyContent;
	Media: typeof EmptyMedia;
}

const EmptyRoot = forwardRef<HTMLDivElement, EmptyProps>(function EmptyRoot(
	{ className, children, ...other },
	ref,
) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border border-dashed p-6 text-center md:p-12",
				className,
			)}
			ref={ref}
			{...other}
		>
			{children}
		</div>
	);
});

EmptyRoot.displayName = "Empty";

export const Empty = EmptyRoot as unknown as EmptyComponent;

export interface EmptyHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const EmptyHeader = forwardRef<HTMLDivElement, EmptyHeaderProps>(
	function EmptyHeader({ className, children, ...other }, ref) {
		return (
			<div
				data-slot="empty-header"
				className={cn(
					"flex max-w-sm flex-col items-center gap-2 text-center",
					className,
				)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

EmptyHeader.displayName = "Empty.Header";

const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>["variant"];

export interface EmptyMediaProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof emptyMediaVariants> {
	children?: ReactNode;
}

export const EmptyMedia = forwardRef<HTMLDivElement, EmptyMediaProps>(
	function EmptyMedia(
		{ className, variant = "default", children, ...other },
		ref,
	) {
		return (
			<div
				data-slot="empty-icon"
				data-variant={variant}
				className={cn(emptyMediaVariants({ variant, className }))}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

EmptyMedia.displayName = "Empty.Media";

export interface EmptyTitleProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const EmptyTitle = forwardRef<HTMLDivElement, EmptyTitleProps>(
	function EmptyTitle({ className, children, ...other }, ref) {
		return (
			<div
				data-slot="empty-title"
				className={cn("text-lg font-medium tracking-tight", className)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

EmptyTitle.displayName = "Empty.Title";

export interface EmptyDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const EmptyDescription = forwardRef<HTMLDivElement, EmptyDescriptionProps>(
	function EmptyDescription({ className, children, ...other }, ref) {
		return (
			<div
				data-slot="empty-description"
				className={cn(
					"text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
					className,
				)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

EmptyDescription.displayName = "Empty.Description";

export interface EmptyContentProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const EmptyContent = forwardRef<HTMLDivElement, EmptyContentProps>(
	function EmptyContent({ className, children, ...other }, ref) {
		return (
			<div
				data-slot="empty-content"
				className={cn(
					"flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
					className,
				)}
				ref={ref}
				{...other}
			>
				{children}
			</div>
		);
	},
);

EmptyContent.displayName = "Empty.Content";

Empty.Header = EmptyHeader;
Empty.Title = EmptyTitle;
Empty.Description = EmptyDescription;
Empty.Content = EmptyContent;
Empty.Media = EmptyMedia;
