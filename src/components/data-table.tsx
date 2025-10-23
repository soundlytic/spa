"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import { Check, ChevronDown, Columns2 } from "lucide-react"
import { useEffect } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  // Assuming each column may have a 'meta.defaultVisible' flag
  const hiddenColumns = columns
    .filter((col:any) => col.defaultVisible === false) // hidden by default
    .map((col:any) => col.accessorKey as string); // store only column names / keys

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const hideColunms = (keys: string[]): { [key: string]: boolean } => {
    return keys.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  };

  useEffect(() => {
    hiddenColumns && table.setColumnVisibility(hideColunms(hiddenColumns));
  }, [table]);
  return (
    <div>
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="icon-sm ml-auto text-sm flex items-center gap-1 without-ring">
              <Columns2 /> Columns <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side="bottom"      // dropdown appears below trigger
            align="end"        // aligns the right edge with trigger
            className="rounded-md border bg-white p-1 z-50
                data-[state=open]:animate-in data-[state=closed]:animate-out
                data-[state=open]:fade-in data-[state=closed]:fade-out
                data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2"          
            >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="
                      px-2 py-1 rounded-sm
                      hover:bg-gray-200 dark:hover:bg-gray-700
                      focus:outline-none focus:ring-0
                      text-sm text-gray-900 dark:text-gray-100
                      cursor-pointer
                    "                    
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    <div className="flex items-center">
                      <Check
                      className={`mx-2 h-4 w-4 sm ${
                        column.getIsVisible() ? "text-black dark:text-green-400" : "invisible"
                      }`}
                      />
                      {column.id}
                    </div>
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}