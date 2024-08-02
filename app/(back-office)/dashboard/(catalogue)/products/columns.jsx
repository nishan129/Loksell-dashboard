"use client";

import { Checkbox } from "@/components/ui/checkbox"

import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";

import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";



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
    accessorKey: "title",
    header: ({ column }) => (<SortableColumn column={column} title="Title" />)
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (<ImageColumn row={row} accesskey='imageUrl' />)
  },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => {
//         const description = row.getValue("description")
//         return (
//             <div className="line-clamp-1">
//                 {description}
//             </div>
//         );
//       },
//   },


  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorkey="createdAt"/>),
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const product = row.original
      return <ActionColumn row={row} title="Product" editEndpoint={`products/update/${product.id}`} endpoint={`products/${product.id}`} />
    }
  },
]
