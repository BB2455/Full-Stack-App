import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import AdminModal from '../models/admin.js';
import createJWT from '../utils/createJWT.js';
import decodeJWT from '../utils/decodeJWT.js';
import {
  handleEmailVerification,
  handleForgotPasswordEmail,
} from '../utils/emailHandler.js';

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
    const refreshToken = createJWT(
      {
        username: existingAdmin.username,
        id: existingAdmin._id,
      },
      '30d'
    );
    existingAdmin.active_tokens.push(refreshToken);
    await existingAdmin.save();
    res.status(200).json({ token, refreshToken });
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
    const refreshToken = createJWT(
      {
        username: lowerUsername,
        id: newAdmin._id,
      },
      '30d'
    );
    newAdmin.active_tokens.push(refreshToken);
    await newAdmin.save();
    // Send Verification Email
    const verifyToken = createJWT(
      {
        username: lowerUsername,
        id: newAdmin._id,
      },
      '30m'
    );
    handleEmailVerification(
      email,
      `http://localhost:3000/verify/${verifyToken}`
    );
    const token = createJWT({ username: lowerUsername, id: newAdmin._id });
    res.status(201).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const logout = async (req, res) => {
  const { username, refreshToken } = req.body;
  if (!username) return res.status(400).json({ message: 'Invalid Request' });
  const lowerUsername = username.toLowerCase();
  try {
    const existingAdmin = await AdminModal.findOne({ username: lowerUsername });
    if (!existingAdmin)
      return res.status(404).json({ message: 'Admin Not Found' });
    // Remove RefreshToken from active_tokens
    if (!refreshToken) {
      existingAdmin.active_tokens.splice(0, existingAdmin.active_tokens.length);
    } else {
      const tokenIndex = existingAdmin.active_tokens.indexOf(refreshToken);
      existingAdmin.active_tokens.splice(tokenIndex, 1);
    }
    await existingAdmin.save();
    const token = createJWT({}, '1');
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const changePassword = async (req, res) => {
  const { token } = req.query;
  const { oldPassword, newPassword } = req.body;
  if (!token || !oldPassword || !newPassword)
    return res.status(400).json({ message: 'Invalid Request' });
  try {
    const { id, expired } = decodeJWT(token);
    if (expired) return res.status(400).json({ message: 'Token Expired' });
    // Get Existing Admin
    const existingAdmin = await AdminModal.findById(id);
    if (!existingAdmin)
      return res.status(404).json({ message: "Admin doesn't exist" });
    // Check If Correct Password
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });
    // Set New Password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    res.status(200).json({ message: 'Test' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  let token;
  try {
    if (!refreshToken) {
      token = createJWT({}, '1');
      return res.status(200).json(token);
    } else {
      const { username, id, expired } = decodeJWT(refreshToken);
      if (expired) return res.status(200).json(createJWT({}, '1'));
      const existingAdmin = await AdminModal.findById(id);
      if (!existingAdmin)
        return res.status(404).json({ message: "Admin doesn't exist" });
      const active_token = existingAdmin.active_tokens.find(
        (token) => token === refreshToken
      );
      if (active_token && !expired) {
        token = createJWT({ username, id });
      } else {
        token = createJWT({}, '1');
      }
      res.status(200).json(token);
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Invalid Request' });
  const lowerEmail = email.toLowerCase();
  try {
    const existingAdmin = await AdminModal.findOne({ email: lowerEmail });
    if (!existingAdmin)
      return res.status(404).json({ message: "Admin doesn't exist" });
    const resetToken = createJWT(
      { username: existingAdmin.username, id: existingAdmin._id },
      '30m'
    );
    handleForgotPasswordEmail(
      lowerEmail,
      `http://localhost:3000/resetPassword/${resetToken}`
    );
    res.status(200).json({ message: 'Sent Email' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) return res.status(400).json({ message: 'Not a valid token' });
  const { id } = decodeJWT(token);
  try {
    const existingAdmin = await AdminModal.findById(id);
    if (!existingAdmin)
      return res.status(404).json({ message: "Admin doesn't exist" });
    existingAdmin.verified_email = true;
    await existingAdmin.save();
    res.status(200).json({ message: 'Admin Email Successfully Verified' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
