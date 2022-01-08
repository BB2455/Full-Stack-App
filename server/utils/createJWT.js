import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const createJWT = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export default createJWT;
