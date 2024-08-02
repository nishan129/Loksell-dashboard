import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const {title, link, imageUrl, isActive} = await request.json();
        const newBanner = await db.Banner.create({
            data: {
                title, link, imageUrl, isActive
            }
        })
        console.log(newBanner);

        return NextResponse.json(newBanner)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Failed to create new banner",
        }, {status:500})
    }

}

export async function GET(request){
    try {
      const banners = await db.Banner.findMany({
        orderBy:{
            createdAt : "desc"
        }
      })
      return NextResponse.json(banners)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Fetch Banners",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }