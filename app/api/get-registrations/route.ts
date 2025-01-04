import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const registrations = await prisma.registration.findMany();
      res.status(200).json({ success: true, registrations });
    } catch {
      res.status(500).json({ success: false, message: 'Error fetching registrations.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
