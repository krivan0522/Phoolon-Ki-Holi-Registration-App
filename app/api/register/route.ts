import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { verifyToken } from '../../lib/jwt';

const MAX_REGISTRATIONS = 300;
export async function POST(request: Request) {
  try {

    const authorization = request.headers.get('Authorization');
    const token = authorization?.split(' ')[1]; 
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please Login' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized. Logout and Log in again. ' }, { status: 401 });
    }

    const userId = payload.userId;

    const existingRegistration = await prisma.registration.findUnique({
      select: { id: true },
      where: {
        userId: userId
       },
    })
    console.log('Existing registration:', existingRegistration);
    if (existingRegistration) {
      return NextResponse.json({ error: 'User has already registered.' }, { status: 400 });
    }

    const registrationCount = await prisma.registration.count();

    if (registrationCount >= MAX_REGISTRATIONS) {
      return NextResponse.json(
        { error: 'Registration limit reached. No more registrations allowed.' },
        { status: 403 }
      );
    }

    // Parse and log the incoming request
    const body = await request.json();
    
    if (!body) {
      console.error('Request body is null or undefined');
      return NextResponse.json({ error: 'Request body is missing' }, { status: 400 });
    }
    
    const { name, address, idolDescription, idolSize } = body;
    
    // Validate required fields
    if (!name || !address || !idolDescription || !idolSize) {
      console.error('Missing fields in the request body:', body);
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    
    // Get the highest token number from the existing registrations
    const lastRegistration = await prisma.registration.count();
    console.log('Received body:', lastRegistration);
    const newToken = lastRegistration ? lastRegistration + 1 : 1;
    console.log('New token:', newToken);
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

    // Update the user to set isRegistered to true
    await prisma.user.update({
      where: { id: userId },
      data: { isRegistered: true },
    });

    return NextResponse.json({
      message: 'Registration successful',
      success: true,
      registration,
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
