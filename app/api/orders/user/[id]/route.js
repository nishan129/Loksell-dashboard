import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const orders = await db.order.findMany({
      where: { 
        userId:id
       },
      include: {
        orderItems: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!orders) {
      return NextResponse.json(
        {
          message: "No orders found for the given user ID",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Uncomment and modify the following code if you need the PUT functionality

// export async function PUT(request, { params: { id } }) {
//   try {
//     const { title, link, imageUrl, isActive } = await request.json();
    
//     const existingBanner = await db.Banner.findUnique({
//       where: {
//         id,
//       },
//     });
    
//     if (!existingBanner) {
//       return NextResponse.json({
//         data: null,
//         message: 'Banner not found',
//       }, { status: 404 });
//     }

//     const updatedBanner = await db.Banner.update({
//       where: { id },
//       data: {
//         title, link, imageUrl, isActive,
//       },
//     });

//     return NextResponse.json(updatedBanner);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       message: 'Failed to update Banner',
//       error: error.message,
//     }, { status: 500 });
//   }
// }
