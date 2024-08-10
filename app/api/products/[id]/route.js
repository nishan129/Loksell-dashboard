import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,{params:{id}}) {
  try {
      const products = await db.Product.findUnique({
        where:{
          id
       },
      });
      return NextResponse.json(products);
  } catch (error) {
      console.log(error);
      return NextResponse.json({
          message: "Failed to fetch products",
          error: error.message,
      }, { status: 500 });
  }
}


export async function DELETE(request, {params:{id}}){
    try {
      const existingProduct = await db.Product.findUnique({
        where:{
         id
      },
      })
      if(!existingProduct){  
        return NextResponse.json({
          data: null,
          message: "product not found",
        },
      {status: 404});
      }
      const deletedProduct = await db.Product.delete({
        where:{
          id
       },
      })
      return NextResponse.json(deletedProduct)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Delete product",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }

export async function PUT(request, { params: { id } }) {
    try {
      const { barcode,
        boxes,
        brand,
        categoryIds,
        description,
        discount,
        packets_box_peti,
        no_piece,
        piece_price,
        discountedPrice,
        productImages,
        life,
        offers,
        packets_per_box,
        productCode,
        product_price,
        sku,
        slug,
        title,
        totalPackets,
        tags,
        unit,
        isActive,
        wholesallerId  } = await request.json();
      
      const existingProduct = await db.Product.findUnique({
        where: {
          id,
        },
      });
      
      if (!existingProduct) {
        return NextResponse.json({
          data: null,
          message: 'Coupon not found',
        }, { status: 404 });
      }
  
      const updatedProduct = await db.Product.update({
        where: { id },
        data: {
          barcode,
                brand,
                boxes: parseInt(boxes),
                categoryId:categoryIds,
                description,
                discount: parseInt(discount),
                discountedPrice: parseFloat(discountedPrice),
                packets_box_peti,
            no_piece: parseInt(no_piece),
            piece_price:parseFloat(piece_price),
                productImages,
                imageUrl:productImages[0],
                life,
                offers,
                packets_per_box: parseInt(packets_per_box),
                productCode,
                product_price: parseFloat(product_price),
                sku,
                slug,
                title,
                totalPackets: parseInt(totalPackets),
                tags,
                unit,
                isActive,
                WholesalerProfileId: wholesallerId,
        },
      });
  
      return NextResponse.json(updatedProduct);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: 'Failed to update Product',
        error,
      }, { status: 500 });
    }
  }