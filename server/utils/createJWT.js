import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const createJWT = (payload, timeout = '1h') => {
  return jwt.sign(payload, SECRET, { expiresIn: timeout });
};

export default createJWT;
