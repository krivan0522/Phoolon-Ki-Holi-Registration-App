import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';


export async function GET(req: Request) {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ donations });

  } catch(error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

