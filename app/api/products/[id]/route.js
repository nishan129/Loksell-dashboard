import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Fetch a single product by ID
export async function GET(request, { params: { id } }) {
  try {
    // Fetch the product by ID, including related category (if applicable)
    const product = await db.Product.findUnique({
      where: { id },
      include: {
        category: true, // Include the related category
        WholesalerProfile: true, // Include the related wholesaler profile
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({
      message: "Failed to fetch product",
      error: error.message,
    }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.Product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({
        message: "Product not found",
      }, { status: 404 });
    }

    const deletedProduct = await db.Product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({
      message: "Failed to delete product",
      error: error.message,
    }, { status: 500 });
  }
}

// PUT: Update a product by ID
export async function PUT(request, { params: { id } }) {
  try {
    const data = await request.json();

    const requiredFields = [
      "barcode",
      "boxes",
      "brand",
      "categoryIds",
      "description",
      "discount",
      "packets_box_peti",
      "no_piece",
      "piece_price",
      "discountedPrice",
      "productImages",
      "life",
      "offers",
      "packets_per_box",
      "productCode",
      "product_price",
      "sku",
      "slug",
      "title",
      "totalPackets",
      "tags",
      "unit",
      "isActive",
      "wholesallerId",
    ];

    // Validate required fields
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({
          message: `Missing required field: ${field}`,
        }, { status: 400 });
      }
    }

    const existingProduct = await db.Product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({
        message: "Product not found",
      }, { status: 404 });
    }

    const updatedProduct = await db.Product.update({
      where: { id },
      data: {
        barcode: data.barcode,
        brand: data.brand,
        boxes: parseInt(data.boxes),
        categoryId: data.categoryIds,
        description: data.description,
        discount: parseInt(data.discount),
        discountedPrice: parseFloat(data.discountedPrice),
        packets_box_peti: data.packets_box_peti,
        no_piece: parseInt(data.no_piece),
        piece_price: parseFloat(data.piece_price),
        productImages: data.productImages,
        imageUrl: data.productImages[0],
        life: data.life,
        offers: data.offers,
        packets_per_box: parseInt(data.packets_per_box),
        productCode: data.productCode,
        product_price: parseFloat(data.product_price),
        sku: data.sku,
        slug: data.slug,
        title: data.title,
        totalPackets: parseInt(data.totalPackets),
        tags: data.tags,
        unit: data.unit,
        isActive: data.isActive,
        WholesalerProfileId: data.wholesallerId,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({
      message: "Failed to update product",
      error: error.message,
    }, { status: 500 });
  }
}
