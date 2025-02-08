import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { mobile, apiKey } = await request.json();

    // Check API key for admin authentication
    if (apiKey !== process.env.SECRET_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!mobile) {
      return NextResponse.json({ error: 'Mobile number required' }, { status: 400 });
    }

    // Delete user
    console.log('Deleted User:');
    const deletedUser = await prisma.user.deleteMany({
      where: {
        mobile : mobile.toString(),
      },
    });
    if (deletedUser.count === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
