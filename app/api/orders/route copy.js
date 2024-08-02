import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { checkoutFormData, orderItems } = await request.json();
    const { address, city, phone, pinCode, state, storename, userId } = checkoutFormData.customers[0];
    const { paymentMethod } = checkoutFormData;
    // Create Order Number
    function generateOrderNumber(length) {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let orderNumber = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderNumber += characters.charAt(randomIndex);
      }
    
      return orderNumber;
    }

    // Create Order
    const newOrder = await db.order.create({
      data: {
        userId,        
        storename,
        phoneNumber: phone,
        streetAddress: address,
        city,
        state,
        zipCode: pinCode,
        shippingCost: parseFloat(2),  // Assuming fixed shipping cost
        paymentMethod,
        orderNumber:generateOrderNumber(8)
      }
    });
    

    // Create Order Items
    const newOrderItems = await db.orderItem.createMany({
      data: orderItems.map((item) => ({
        productId: item.id,
        vendorId:item.vendorId,
        quantity: parseInt(item.qty),
        price: parseFloat(item.discountedPrice),
        orderId: newOrder.id,
        imageUrl:item.imageUrl,
        title:item.title,
        
        
      }))
    });

    console.log(newOrder);
    console.log(newOrderItems);
    return NextResponse.json(newOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to create Order",
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        orderItems: true
      }
    });
    return NextResponse.json(orders);
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
