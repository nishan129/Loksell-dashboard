"use client";


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

import OrderStatusComponent from "@/components/backoffice/OrderStatus";
import OrdersItems from "@/components/backoffice/OrdersItems";

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
        accessorKey: "storename",
        header: ({ column }) => (<SortableColumn column={column} title="Store Name" />)
      },
      {
        accessorKey: "orderNumber",
        header: "Order Number",
      },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "zipCode",
    header: "Pine Code",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
    cell: ({ row }) => <OrdersItems row={row} accessorKey="orderItems"/>
  
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => <OrderStatusComponent row={row} accessorKey="orderStatus"/>,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorkey="createdAt"/>),
  },
]
