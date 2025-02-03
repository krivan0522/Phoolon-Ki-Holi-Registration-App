import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../lib/jwt';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Check if the identifier is an email or mobile number
    const isEmail = identifier.includes('@');

    // Find user by email or mobile
    const user = await prisma.user.findUnique({
      where: isEmail
        ? { email: identifier }
        : { mobile: identifier },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }
    // Generate a token
    const token = generateToken(user.id);
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
