import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.CONNECTION_URL;

const connect = async () => {
  return await mongoose
    .connect(DB_URL)
    .catch((error) => console.log(error.message));
};

const close = () => {
  return mongoose.disconnect();
};

export default { connect, close };
