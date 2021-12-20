import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  const { page } = req.params;
  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await User.countDocuments();
    const users = await User.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: users,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log("PROBLEM");
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "No user with that id" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//   search: "",
//   filterBy: "firstAndLast",
//   startDate: "",
//   endDate: "",
//   orderType: "relevancy",
//   order: "ascending",
export const getUsersBySearch = async (req, res) => {
  console.log("Called: ", req.query);
  const { search, filterBy, startDate, endDate, orderType, order, page } =
    req.query;
  let searchRegEx;
  search ? (searchRegEx = new RegExp(search, "i")) : (searchRegEx = /[\d\D]+/i);
  const users = await User.find(
    filterBy === "firstName"
      ? { first_name: searchRegEx }
      : filterBy === "lastName"
      ? { last_name: searchRegEx }
      : { $or: [{ first_name: searchRegEx }, { last_name: searchRegEx }] }
  );
  if (!users) return res.status(404).json({ message: "No Users Found" });
  const getPage = page || 1;
  res.json({
    data: users,
    currentPage: getPage,
    numberOfPages: 2,
  });
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error.message);
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
  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    await User.findByIdAndDelete(_id);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
