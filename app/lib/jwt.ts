import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (userId: string) => {
  const secret= process.env.JWT_SECRET!;
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  try {
    const secret= process.env.JWT_SECRET!;
    return jwt.verify(token, secret) as { userId: string };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
