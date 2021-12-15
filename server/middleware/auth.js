import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, SECRET);
      req.userID = decodedData?.id;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default auth;
