import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const registrations = await prisma.registration.findMany();
    res.status(200).json(registrations);
    console.log('registrations', registrations);
}
