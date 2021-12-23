import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
  const { page } = req.params;
  try {
    let getPage = page ? page : 1;
    const LIMIT = 12;
    const total = await User.countDocuments();
    if (getPage < 1) getPage = 1;
    const numberOfPages = Math.ceil(total / LIMIT);
    if (total >= 1 && getPage > numberOfPages)
      return res.status(400).json({ message: "Not a valid page request" });
    const startIndex = (Number(getPage) - 1) * LIMIT;
    const users = await User.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: users,
      currentPage: Number(getPage),
      numberOfPages: numberOfPages,
      results: total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).json({ message: "Not a valid id" });
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "No user with that id" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsersBySearch = async (req, res) => {
  const { search, filterBy, startDate, endDate, orderType, order, page } =
    req.query;
  try {
    const LIMIT = 12;
    const getPage = page || 1;
    const startIndex = (Number(getPage) - 1) * LIMIT;
    let searchRegEx;
    try {
      searchRegEx = search ? new RegExp(search, "i") : /[\d\D]+/i;
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid Character in Search Query" });
    }
    const searchName =
      filterBy === "firstName"
        ? { first_name: searchRegEx }
        : filterBy === "lastName"
        ? { last_name: searchRegEx }
        : { $or: [{ first_name: searchRegEx }, { last_name: searchRegEx }] };
    const searchStartDate = startDate && {
      createdAt: { $gte: new Date(startDate) },
    };
    const searchEndDate = endDate && { createdAt: { $lte: new Date(endDate) } };
    let getOrder;
    switch (orderType) {
      case "relevancy":
        getOrder =
          filterBy === "lastName"
            ? { last_name: order === "ascending" ? 1 : -1 }
            : { first_name: order === "ascending" ? 1 : -1 };
        break;
      case "first_name":
        getOrder = { first_name: order === "ascending" ? 1 : -1 };
        break;
      case "last_name":
        getOrder = { last_name: order === "ascending" ? 1 : -1 };
        break;
      case "created_at":
        getOrder = { createdAt: order === "ascending" ? 1 : -1 };
        break;
      case "updated_at":
        getOrder = { updatedAt: order === "ascending" ? 1 : -1 };
        break;
      default:
        getOrder = { first_name: order === "ascending" ? 1 : -1 };
        break;
    }

    const users = await User.find(
      searchStartDate && searchEndDate
        ? { $and: [searchName, searchStartDate, searchEndDate] }
        : searchStartDate
        ? { $and: [searchName, searchStartDate] }
        : searchEndDate
        ? { $and: [searchName, searchEndDate] }
        : searchName
    ).sort(getOrder);
    const total = users.length;

    if (users.length < 1)
      return res.status(404).json({ message: "No Users Found" });

    res.status(200).json({
      data: users.slice(startIndex, startIndex + LIMIT),
      currentPage: Number(getPage),
      numberOfPages: Math.ceil(total / LIMIT),
      results: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
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
      return res.status(400).send("Not a valid id");

    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.status(404).json({ message: "No user with that id" });
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
