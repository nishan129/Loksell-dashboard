import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request){
  try {
    const wholesaler = await db.User.findMany({
      orderBy:{
        createdAt : "desc"
    },
    where:{
      role: "WHOLESALER"
    }
    })
    return NextResponse.json(wholesaler)
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Wholesaler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}



export async function DELETE(request, {params:{id}}){
    try {
      const existingWholesaler = await db.User.findUnique({
        where:{
         id,
      },
      })
      if(!existingWholesaler){  
        return NextResponse.json({
          data: null,
          message: "product not found",
        },
      {status: 404});
      }
      const deletedWholeraler = await db.User.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedWholeraler)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Wholesaler",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }

  export async function PUT(request, { params: { id } }) {
    try {
      const {status } = await request.json();
      
      const existingUser = await db.User.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingUser) {
        return NextResponse.json({
          data: null,
          message: 'User not found',
        }, { status: 404 });
      }
  
      const updatedUser = await db.User.update({
        where: { id },
        data: {
        status
        },
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update User',
        error,
      }, { status: 500 });
    }
  }