import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
    {/*
      const { address,
      code,
      contactPerson,
      contact_person_phone,
      profileImageUrl,
      email,
      name,
      notes,
      phone,
      storeName,
      store_address,
      store_phone_number,
      terms,
      wholesaler_adhar_number,
      wholesaler_pan_number,
      wholesaler_store_gst_number,
      isActive,userId} = await request.json();
       */}
       // Update the varification in the user 
    const wholesalerData = await request.json();
    
    // Check if the Wholesaler already exists in the database
    const existingUser = await db.User.findUnique({
      where: { id:wholesalerData.userId, },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "No User Found",
        },
        { status: 404 }
      );
    }
    // Update the email Verifide
    const updatedUser = await db.User.update({
      where: { id:wholesalerData.userId, },
      data: {emailVerified: true

      }
    });


    const newHolesaler = await db.wholesalerProfile.create({
      data: {
      address: wholesalerData.address,
      code:wholesalerData.code ,
      profileImageUrl: wholesalerData.profileImageUrl,
      email: wholesalerData.email,
      name: wholesalerData.name,
      phone:wholesalerData.phone ,
      storeName: wholesalerData.storeName,
      storeAddress: wholesalerData.storeAddress,
      storePhoneNumber:wholesalerData.store_phone_number ,
      wholesalerAdharNumber: wholesalerData.wholesaler_adhar_number,
      wholesalerPanNumber:wholesalerData.wholesaler_pan_number ,
      wholesalerStoreGstNumber: wholesalerData.wholesaler_store_gst_number,
      isActive: wholesalerData.isActive,
      userId: wholesalerData.userId
      }
    })
    console.log(newHolesaler);

    return NextResponse.json(newHolesaler);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create Wholesaler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request){
  try {
    const wholesaler = await db.User.findMany({
      orderBy:{
        createdAt : "desc"
    },
    where:{
      role: "WHOLESALER"
    },
    include: {
      wholesalerProfile: true
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
