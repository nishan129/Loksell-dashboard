import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params:{id}}){
  try {
    const markets = await db.market.findUnique({
      where:{
       id
    },
    })
    return NextResponse.json(markets)
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Markets",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, {params:{id}}){
    try {
      const existingMarkets = await db.market.findUnique({
        where:{
         id
      },
      })
      if(!existingMarkets){  
        return NextResponse.json({
          data: null,
          message: "Market not found",
        },
      {status: 404});
      }
      const deletedMarket = await db.market.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedMarket)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Market",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }


export async function PUT(request, { params: { id } }) {
    try {
      const {title, 
        slug, 
        logoUrl, 
        description,
        isActive } = await request.json();
      
      const existingMarket = await db.market.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingMarket) {
        return NextResponse.json({
          data: null,
          message: 'Market not found',
        }, { status: 404 });
      }
  
      const updatedMarket = await db.market.update({
        where: { id },
        data: {
          title, 
                slug, 
                logoUrl, 
                description,
                isActive
        },
      });
  
      return NextResponse.json(updatedMarket);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update Market',
        error,
      }, { status: 500 });
    }
  }