import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
    // Fetch current and max registrations
    const control = await prisma.registrationControl.findFirst();
    if (!control) {
        return NextResponse.json({ error: 'Registration control not found'}, {status: 404 });
    }
    return NextResponse.json(control, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Destructure the fields from the request body
    const { maxRegistrations } = body;

    // Validate the input
    if (maxRegistrations == null || typeof maxRegistrations !== 'number' || maxRegistrations <= 0) {
      return NextResponse.json(
        { error: 'Invalid maxRegistrations. It must be a positive number.' },
        { status: 400 }
      );
    }

    // Fetch the current registration control
    const control = await prisma.registrationControl.findFirst();

    // If control doesn't exist, create it
    if (!control) {
      const newControl = await prisma.registrationControl.create({
        data: {
          maxRegistrations,
          currentRegistrations: 0, // Starts from 0 when created
        },
      });

      return NextResponse.json(
        { message: 'Registration control created successfully.', control: newControl },
        { status: 201 }
      );
    }

    // Update the existing control
    const updatedControl = await prisma.registrationControl.update({
      where: { id: control.id },
      data: {
        maxRegistrations,
      },
    });

    return NextResponse.json(
      { message: 'Registration control updated successfully.', control: updatedControl },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating registration control:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
