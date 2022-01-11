import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '30d' });
};

export default generateRefreshToken;
