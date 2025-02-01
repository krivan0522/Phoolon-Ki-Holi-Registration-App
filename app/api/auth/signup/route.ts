import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, mobile, password } = await request.json();

    if (!name || !mobile || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Generate default email if not provided or empty
    const userEmail = email && email.trim() !== "" ? email : `user${mobile}@example.com`;

    // Check if generated email already exists
    const emailInUse = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (emailInUse) {
      return NextResponse.json(
        { error: 'Email is already in use. Try again.' },
        { status: 400 }
      );
    }

    // Check if mobile already exists
    const mobileInUse = await prisma.user.findUnique({
      where: { mobile },
    });
    if (mobileInUse) {
      return NextResponse.json(
        { error: 'Mobile number is already in use.' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: { name, email: userEmail, mobile, password: hashedPassword },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
