import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request, {params: { id }}){
    try {
      const users = await  db.User.findUnique({
        where: {
            id, 

        },
      });
      return NextResponse.json(users)
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to Fetch Kirana Users",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }