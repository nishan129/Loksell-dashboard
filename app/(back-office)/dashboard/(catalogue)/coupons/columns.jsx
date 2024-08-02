"use client";


import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
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
  accessorKey: "couponCode",
  header: "Coupon Code",
},
{
  accessorKey: "expiryDate",
  header: "Expiry Date",
  cell: ({ row }) => (<DateColumn row={row} accessorkey="expiryDate"/>),
},
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
      const coupon = row.original
      return <ActionColumn row={row} title="Coupon" editEndpoint={`coupons/update/${coupon.id}`} endpoint={`coupons/${coupon.id}`} />
    }
  },
]
