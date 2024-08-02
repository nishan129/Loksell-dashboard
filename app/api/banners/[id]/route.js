import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params:{id}}){
  try {
    const banners = await db.Banner.findUnique({
      where:{
       id
    },
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

export async function DELETE(request, {params:{id}}){
    try {
      const existingBanners = await db.Banner.findUnique({
        where:{
         id
      },
      })
      if(!existingBanners){  
        return NextResponse.json({
          data: null,
          message: "Banner not found",
        },
      {status: 404});
      }
      const deletedBanner = await db.Banner.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedBanner)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete Banner",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }


export async function PUT(request, { params: { id } }) {
    try {
      const {title, link, imageUrl, isActive } = await request.json();
      
      const existingBanner = await db.Banner.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingBanner) {
        return NextResponse.json({
          data: null,
          message: 'Banner not found',
        }, { status: 404 });
      }
  
      const updatedBanner = await db.Banner.update({
        where: { id },
        data: {
          title, link, imageUrl, isActive
        },
      });
  
      return NextResponse.json(updatedBanner);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update Banner',
        error,
      }, { status: 500 });
    }
  }