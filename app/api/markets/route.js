import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const {title, slug, logoUrl,description,isActive} = await request.json();
        const newMarkets = await db.market.create({
            data: {
                title, 
                slug, 
                logoUrl, 
                description,
                isActive
            }
        })
        console.log(newMarkets);

        return NextResponse.json(newMarkets)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create new Markets",
            error
        }, {status:500})
    }

}


export async function GET(request){
    try {
      const markets = await db.market.findMany({
        orderBy:{
          createdAt : "desc"
      },
      include: {
        categories: {
          include: {
            products: true, // Include all products within each category
          },
        },
      },
      })
      return NextResponse.json(markets)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Fetch Market",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }