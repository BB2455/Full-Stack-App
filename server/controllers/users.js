import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();

    console.log(Users);

    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  res.send("THIS WORKS");
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
