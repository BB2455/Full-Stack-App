import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import AdminModal from "../models/admin.js";

dotenv.config();
const SECRET = process.env.SECRET;

export const login = async (req, res) => {
  const { username, password } = req.body;
  const lowerUsername = username.toLowerCase();
  try {
    const existingAdmin = await AdminModal.findOne({ lowerUsername });
    if (!existingAdmin)
      return res.status(404).json({ message: "Admin doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { username: existingAdmin.username, id: existingAdmin._id },
      SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
