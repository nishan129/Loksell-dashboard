import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params:{id}}){
  try {
    const orders = await db.order.findUnique({
      where:{
       id
    },
    include: {
      orderItems: true
    }
    })
    return NextResponse.json(orders)
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, {params:{id}}){
    try {
      const existingOrders = await db.order.findUnique({
        where:{
         id
      },
      })
      if(!existingOrders){  
        return NextResponse.json({
          data: null,
          message: "Order not found",
        },
      {status: 404});
      }
      const deletedOrder = await db.order.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedOrder)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Order",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }


export async function PUT(request, { params: { id } }) {
    try {
      const { orderStatus } = await request.json();
      
      const existingOrder = await db.order.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingOrder) {
        return NextResponse.json({
          data: null,
          message: 'Order not found',
        }, { status: 404 });
      }
  
      const updatedOrder = await db.order.update({
        where: { id },
        data: {
          orderStatus
        },
      });
      
      return NextResponse.json(updatedOrder);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update Order',
        error: error.message,
      }, { status: 500 });
    }
  }
  