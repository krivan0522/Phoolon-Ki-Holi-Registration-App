import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';


export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    //if no donations found
    if (donations.length==0) {
      return NextResponse.json({ message: 'No donations found' });
    }

    return NextResponse.json({ donations },{
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

  } catch(error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

