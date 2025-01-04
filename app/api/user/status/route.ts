import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyToken } from '../../../lib/jwt';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('Authorization');
    const token = authorization?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ isRegistered: false });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ isRegistered: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (user?.isRegistered) {
      return NextResponse.json({
        isRegistered: true,
      });
    } else {
      return NextResponse.json({ isRegistered: false });
    }
  } catch (error) {
    console.error('Error checking user status:', error);
    return NextResponse.json({ isRegistered: false });
  }
}
