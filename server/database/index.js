import mongoose from "mongoose";
import { Mockgoose } from "mockgoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.CONNECTION_URL;

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "TEST") {
      const mockgoose = new Mockgoose(mongoose);
      mockgoose
        .prepareStorage()
        .then(() => {
          mongoose.connect(DB_URL);
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose.connect(DB_URL).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};

export default { connect, close };
