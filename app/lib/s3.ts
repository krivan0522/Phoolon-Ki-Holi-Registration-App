import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const uploadToS3 = async (file: Buffer, fileName: string) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
    };
    try {
        const { Location } = await s3.upload(params).promise();
        return Location; // This returns the public URL of the uploaded file.
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        return null;
    }
};
