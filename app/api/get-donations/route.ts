import prisma from '../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const donations = await prisma.donation.findMany();
      res.status(200).json({ success: true, donations });
    } catch { 
      res.status(500).json({ success: false, message: 'Error fetching donations.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
