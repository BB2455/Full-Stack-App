import bcrypt from 'bcryptjs';
import AdminModal from '../models/admin.js';
import createJWT from '../utils/createJWT.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Invalid Request' });
  const lowerUsername = username.toLowerCase();
  try {
    const existingAdmin = await AdminModal.findOne({
      username: lowerUsername,
    });
    if (!existingAdmin)
      return res.status(404).json({ message: "Admin doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = createJWT({
      username: existingAdmin.username,
      id: existingAdmin._id,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res.status(400).json({ message: 'Invalid Request' });
  const lowerUsername = username.toLowerCase();
  const lowerEmail = email.toLowerCase();
  try {
    const existingAdmin = await AdminModal.findOne({ username: lowerUsername });
    if (existingAdmin)
      return res.status(409).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new AdminModal({
      username: lowerUsername,
      password: hashedPassword,
      email: lowerEmail,
    });
    await newAdmin.save();
    // Send Verification Email
    const token = createJWT({ username: lowerUsername, id: newAdmin._id });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const logout = async (req, res) => {};
