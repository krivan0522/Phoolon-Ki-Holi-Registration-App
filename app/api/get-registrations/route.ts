import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    
    const registrations = await prisma.registration.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            mobile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    //if no registrations found
    if (registrations.length==0) {
      return NextResponse.json({ message: 'No registrations found' });
    }

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
