"use client";

import { Checkbox } from "@/components/ui/checkbox"

import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";

import SortableColumn from "@/components/DataTableColumns/SortableColumn";




export const columns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "productTitle",
    header: ({ column }) => (<SortableColumn column={column} title="Product Title" />)
  },
  {
    accessorKey: "imageUrl",
    header: "Product Image",
    cell: ({ row }) => (<ImageColumn row={row} accesskey='imageUrl' />)
  },
  {
    accessorKey: "productPrice",
    header: "Price",
  },
  {
    accessorKey: "productQty",
    header: "Qty",
  },
  {
    accessorKey: "total",
    header: "Total",
  }, 
  {
    accessorKey: "createdAt",
    header: "Date Sales",
    cell: ({ row }) => (<DateColumn row={row} accessorkey="createdAt"/>),
  },
]
