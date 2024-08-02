import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params:{id}}){
  try {
    const customers = await db.User.findUnique({
      orderBy:{
        createdAt : "desc"
    },
    where:{
      role: "KIRANA"
    },
    include: {
      profile: true
    }
    })
    return NextResponse.json(customers)
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Customers",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, {params:{id}}){
    try {
      const existingCustomers = await db.User.findUnique({
        where:{
         id
      },
      })
      if(!existingCustomers){  
        return NextResponse.json({
          data: null,
          message: "Customers not found",
        },
      {status: 404});
      }
      const deletedCustomers = await db.User.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedCustomers)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Customers",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }


export async function PUT(request, { params: { id } }) {
    try {
      const {name, storeName, phone, email,storeAddress,adhar_number,pan_number,store_gst_number,profileImageUrl} = await request.json();
      
      const existingUser = await db.KiranaProfile.findUnique({
        where: {
          userId:id
        },
      });
      
      if (!existingUser) {
        return NextResponse.json({
          data: null,
          message: 'Coupon not found',
        }, { status: 404 });
      }
  
      const updatedCustomers = await db.KiranaProfile.update({
        where: {userId:id },
        data: {
          name, storeName, phone, email,storeAddress,adhar_number,pan_number,store_gst_number,profileImageUrl
        },
      });
  
      return NextResponse.json(updatedCustomers);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update Customers',
        error,
      }, { status: 500 });
    }
  }