"use client";


import { Checkbox } from "@/components/ui/checkbox"


import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import Status from "@/components/backoffice/Status";

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
        accessorKey: "name",
        header: ({ column }) => (<SortableColumn column={column} title="Name" />)
      },
      {
        accessorKey: "profileImageUrl",
        header: "Image",
        cell: ({ row }) => (<ImageColumn row={row} accesskey='profileImageUrl' />)
      },
      {
        accessorKey: "email",
        header: "Email",
      },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Status row={row} accessorKey="status" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorkey="createdAt"/>),
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const wholesaler = row.original
      return <ActionColumn row={row} title="Wholesaler" endpoint={`users/${wholesaler.id}`} />
    }
  },
]
