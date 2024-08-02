import { NextResponse } from "next/server";

export async function POST(request){
    try{
        const {address, email, name, notes,password, phone, employee_id,dob,isActive,employeeCode
            } = await request.json();
        const newstaff = {address, email, name, notes,password, phone, employee_id,dob,isActive,employeeCode };
        console.log(newstaff);

        return NextResponse.json(newstaff)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Failed to create new staff",
        }, {status:500})
    }

}