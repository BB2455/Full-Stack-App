import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;

const decodeJWT = (token) => {
  return jwt.verify(token, SECRET);
};

export default decodeJWT;
