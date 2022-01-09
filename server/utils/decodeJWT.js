import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const decodeJWT = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return { expired: true };
  }
};

export default decodeJWT;
