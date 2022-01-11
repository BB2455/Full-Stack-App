import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return { expired: true };
  }
};

export default decodeAccessToken;
