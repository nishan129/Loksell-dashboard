import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const {
            barcode,
            boxes,
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
            wholesallerId
        } = await request.json();

        // Check if the product already exists
        const existingProduct = await db.Product.findUnique({
            where: {
                productCode,
            }
        });
        if (existingProduct) {
            return NextResponse.json({
                data: null,
                message: "Product already exists"
            }, { status: 409 });
        }

        // Create new product
        const newProduct = await db.Product.create({
            data: {
                barcode,
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
            }
        });

        console.log(newProduct);

        return NextResponse.json(newProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Failed to create new product",
        }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc"
            }
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
