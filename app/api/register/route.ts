import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { verifyToken } from '../../lib/jwt';

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('Authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized. Logout and log in again.' }, { status: 401 });
    }

    const userId = payload.userId;

    // Check if the user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      select: { id: true },
      where: { userId },
    });

    if (existingRegistration) {
      return NextResponse.json({ error: 'User has already registered.' }, { status: 400 });
    }

    // Fetch the registration control limits
    const registrationControl = await prisma.registrationControl.findFirst({
      orderBy: { id: 'desc' }, // Fetch the most recent control record
    });

    if (!registrationControl) {
      return NextResponse.json(
        { error: 'Registration is currently closed. Please try again later.' },
        { status: 403 }
      );
    }

    const { maxRegistrations, currentRegistrations } = registrationControl;

    if (currentRegistrations >= maxRegistrations) {
      return NextResponse.json(
        { error: 'Registration limit reached. No more registrations allowed.' },
        { status: 403 }
      );
    }

    // Parse and validate the incoming request
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: 'Request body is missing.' }, { status: 400 });
    }

    const { name, address, idolDescription, idolSize } = body;

    if (!name || !address || !idolDescription || !idolSize) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Generate a unique token (PH0001, PH0002, ...)
    const lastRegistration = await prisma.registration.count();
    const newToken = `PH${(lastRegistration + 1).toString().padStart(4, '0')}`;

    // Create the registration
    const registration = await prisma.registration.create({
      data: {
        userId,
        name,
        address,
        idolDescription,
        idolSize,
        token: newToken,
      },
    });

    // Increment the current registrations count in RegistrationControl
    await prisma.registrationControl.update({
      where: { id: registrationControl.id },
      data: { currentRegistrations: { increment: 1 } },
    });

    // Update the user to set isRegistered to true
    await prisma.user.update({
      where: { id: userId },
      data: { isRegistered: true },
    });

    return NextResponse.json({
      message: 'Registration successful.',
      success: true,
      registration,
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
