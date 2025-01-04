import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, mobile, password } = await request.json();

    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Check if email or mobile already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobile }],
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Email or mobile number already in use.' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: { name, email, mobile, password: hashedPassword },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
