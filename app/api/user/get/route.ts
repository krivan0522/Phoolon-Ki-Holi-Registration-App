import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users,{
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({error: "Failed to fetch users"});
  }
}

