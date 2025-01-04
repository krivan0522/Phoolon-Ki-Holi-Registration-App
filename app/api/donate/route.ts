import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import prisma from '../../lib/prisma';

// Configure S3
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Use the non-public AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// API Route to handle donation and screenshot upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const amount = parseInt(formData.get('amount')?.toString() || '0');
    const contact = formData.get('contact')?.toString() || '';
    const screenshot = formData.get('screenshot') as File | null;
    if (!name || !amount || !contact || !screenshot) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Save the file to a temporary location before uploading to S3
    const screenshotBuffer = await screenshot.arrayBuffer();
    const screenshotBufferFile = Buffer.from(screenshotBuffer);

    // Generate unique file name
    const fileName = `${Date.now()}-${screenshot.name}`;

    // Save the screenshot to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!, // Use the correct environment variable
      Key: `donations/${fileName}`, // Store file under the "donations" folder in the bucket
      Body: screenshotBufferFile,
      ContentType: screenshot.type,
    };

    // Upload to S3
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Generate the S3 URL for the uploaded file
    const Location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/donations/${fileName}`;

    // Save the donation data to the database
    const donation = await prisma.donation.create({
      data: {
        name,
        amount,
        contact,
        screenshotUrl: Location, // S3 URL of the uploaded file
      },
    });

    return NextResponse.json({ success: true, donation });
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
