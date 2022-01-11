import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (payload, timeout = '10m') => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: timeout });
};

export default generateAccessToken;
