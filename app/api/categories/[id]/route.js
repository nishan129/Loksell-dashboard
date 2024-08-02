import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params:{id}}){
    try {
      const category = await db.category.findUnique({
        where:{
         id
      },
      include: {
        products: true,
      }
      })
      return NextResponse.json(category)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Fetch category",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }


export async function DELETE(request, {params:{id}}){
    try {
      const existingCategory = await db.category.findUnique({
        where:{
         id
      },
      })
      if(!existingCategory){  
        return NextResponse.json({
          data: null,
          message: "Category not found",
        },
      {status: 404});
      }
      const deletedCategory = await db.category.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedCategory)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete category",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }

export async function PUT(request, { params: { id } }) {
    try {
      const {title, slug, imageUrl, description, marketsIds, isActive } = await request.json();
      
      const existingCategory = await db.category.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingCategory) {
        return NextResponse.json({
          data: null,
          message: 'Category not found',
        }, { status: 404 });
      }
  
      const updatedCategory = await db.category.update({
        where: { id },
        data: {
          title,
          slug,
          imageUrl,
          description,
          marketId:marketsIds,
          isActive,
        },
      });
  
      return NextResponse.json(updatedCategory);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update category',
        error,
      }, { status: 500 });
    }
  }