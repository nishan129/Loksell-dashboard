import db from "@/lib/db";
import { NextResponse } from "next/server";

// Function to generate order numbers
function generateOrderNumber(length) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let orderNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}

// Handler for POST request
export async function POST(request) {
  try {
    const { checkoutFormData, orderItems } = await request.json();
    const { address, city, phone, pinCode, state, storename, userId } = checkoutFormData.customers[0];
    const { paymentMethod } = checkoutFormData;

    // Prisma transaction for creating order, order items, and sales
    const result = await db.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          storename,
          phoneNumber: phone,
          streetAddress: address,
          city,
          state,
          zipCode: pinCode,
          shippingCost: 2.00,  // Assuming fixed shipping cost
          paymentMethod,
          orderNumber: generateOrderNumber(8),
        },
      });

      await prisma.orderItem.createMany({
        data: orderItems.map((item) => ({
          productId: item.id,
          vendorId: item.vendorId,
          quantity: parseInt(item.qty, 10),
          price: parseFloat(item.discountedPrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
        })),
      });

      const sales = await Promise.all(
        orderItems.map(async (item) => {
          const totalAmount = parseFloat(item.discountedPrice) * parseInt(item.qty, 10);

          return prisma.sale.create({
            data: {
              orderId: newOrder.id,
              productId: item.id,
              productTitle: item.title,
              productPrice: parseFloat(item.discountedPrice),
              imageUrl: item.imageUrl,
              productQty: parseInt(item.qty, 10),
              vendorId: item.vendorId,
              total: totalAmount,
            },
          });
        })
      );

      return { newOrder, sales };
    });

    console.log(result.newOrder, result.sales);
    return NextResponse.json(result.newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to create Order",
    }, { status: 500 });
  }
}

// Handler for GET request
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to Fetch Orders",
      error: error.message,
    }, { status: 500 });
  }
}
