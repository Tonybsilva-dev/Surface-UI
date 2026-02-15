/**
 * Table – tabela por composição.
 * Monta com Table (root + wrapper scroll), TableHeader, TableBody, TableFooter,
 * TableRow, TableHead, TableCell e TableCaption.
 */
import type {
	HTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { cn } from "./lib/utils";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
	{ className, ...props },
	ref,
) {
	return (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
});

Table.displayName = "Table";

export interface TableHeaderProps
	extends HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
	function TableHeader({ className, ...props }, ref) {
		return (
			<thead
				ref={ref}
				className={cn("[&_tr]:border-b", className)}
				{...props}
			/>
		);
	},
);

TableHeader.displayName = "TableHeader";

export interface TableBodyProps
	extends HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
	function TableBody({ className, ...props }, ref) {
		return (
			<tbody
				ref={ref}
				className={cn("[&_tr:last-child]:border-0", className)}
				{...props}
			/>
		);
	},
);

TableBody.displayName = "TableBody";

export interface TableFooterProps
	extends HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
	function TableFooter({ className, ...props }, ref) {
		return (
			<tfoot
				ref={ref}
				className={cn(
					"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
					className,
				)}
				{...props}
			/>
		);
	},
);

TableFooter.displayName = "TableFooter";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
	function TableRow({ className, ...props }, ref) {
		return (
			<tr
				ref={ref}
				className={cn(
					"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
					className,
				)}
				{...props}
			/>
		);
	},
);

TableRow.displayName = "TableRow";

export interface TableHeadProps
	extends ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
	function TableHead({ className, ...props }, ref) {
		return (
			<th
				ref={ref}
				className={cn(
					"h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
					className,
				)}
				{...props}
			/>
		);
	},
);

TableHead.displayName = "TableHead";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
	function TableCell({ className, ...props }, ref) {
		return (
			<td
				ref={ref}
				className={cn(
					"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
					className,
				)}
				{...props}
			/>
		);
	},
);

TableCell.displayName = "TableCell";

export interface TableCaptionProps
	extends HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
	function TableCaption({ className, ...props }, ref) {
		return (
			<caption
				ref={ref}
				className={cn("mt-4 text-sm text-muted-foreground", className)}
				{...props}
			/>
		);
	},
);

TableCaption.displayName = "TableCaption";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
};
