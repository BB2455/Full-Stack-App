import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return { expired: true };
  }
};

export default decodeRefreshToken;
