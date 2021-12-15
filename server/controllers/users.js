import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();

    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const userData = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  const updatedUser = await User.findByIdAndUpdate(_id, userData, {
    new: true,
  });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  await User.findByIdAndDelete(_id);
  res.json({ message: "User Deleted Successfully" });
};
