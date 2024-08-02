import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

// Handler for creating a new user
export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Extract the credentials from the request body
    const { name, email, gstNumber,password, role } = await request.json();

    // Check if the user already exists in the database
    const existingUser = await db.User.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Already Exists",
        },
        { status: 409 }
      );
    }

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random UUID (version 4) and encode it using Base64 URL-safe format
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    // Create a new user in the database
    const newUser = await db.User.create({
      data: {
        name,
        email,
        gstNumber,
        password: hashedPassword,
        role,
        verificationToken: token,
      },
    });

    // Send the email if the user role is WHOLESALER
    if (role === "WHOLESALER") {
      const userId = newUser.id;
      const linkText = "Verify Account";
      const redirectUrl = `onboarding/${userId}?token=${token}`;
      const sendMail = await resend.emails.send({
        from: "Wholesure <nishantborkar139@gmail.com>",
        to: email,
        subject: "Account Verification Wholesaler",
        react: EmailTemplate({ name, redirectUrl, linkText }),
      });
      console.log(sendMail);
    }

    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}

// Handler for fetching all users
export async function GET() {
  try {
    const users = await db.User.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to Fetch Users:", error);

    return NextResponse.json(
      {
        message: "Failed to Fetch Users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
