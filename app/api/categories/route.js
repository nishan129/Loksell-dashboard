import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const {title, slug, imageUrl,description,marketsIds,isActive} = await request.json();

        const existingCategory = await db.category.findUnique({
            where: {
                slug,
            }
        });
        if (existingCategory) {
            return NextResponse({
                data: null,
                message:`Category (${title}) already exists`
            }, {status:409})
        }
        const newCategory = await db.category.create({
            data: {
              title, 
              slug, imageUrl, description,marketId:marketsIds,isActive}
          });

        return NextResponse.json(newCategory)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create new category",
            error
        }, {status:500})
    }

}


export async function GET(request){
    try {
      const categories = await db.category.findMany({
        orderBy:{
          createdAt : "desc"
      },
      include: {
        products: true,
      }
      })
      return NextResponse.json(categories)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Fetch Categories",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }