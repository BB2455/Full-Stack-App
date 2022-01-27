import crypto from 'crypto'
import Boom from '@hapi/boom'
import bcrypt from 'bcryptjs'
import AdminModal from '../models/admin.js'
import ResetToken from '../models/resetToken.js'
import decodeAccessToken from '../utils/decodeAccessToken.js'
import decodeRefreshToken from '../utils/decodeRefreshToken.js'
import {
  handleEmailVerification,
  handleForgotPasswordEmail,
} from '../utils/emailHandler.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateTokens from '../utils/generateTokens.js'

export const login = async (req, res) => {
  const {
    password,
    username
  } = req.body
  try {
    const existingAdmin = await AdminModal.findOne({
      username,
    })
    // Check if admin exists
    if (!existingAdmin) return res.json(Boom.notFound('Admin doesn\'t exist'))
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    )
    // Check if Password is correct
    if (!isPasswordCorrect)
      return res.json(Boom.unauthorized('Invalid Password'))
    // Get tokens
    const {
      accessToken,
      refreshToken
    } = generateTokens(
      existingAdmin._id,
      username
    )
    existingAdmin.active_tokens.push(refreshToken)
    await existingAdmin.save()
    // One Week Time
    const oneWeek = 7 * 24 * 3600 * 1000
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: oneWeek,
    })
    res.status(200).json({ accessToken, username })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  const {
    email,
    password,
    username
  } = req.body
  try {
    const existingAdmin = await AdminModal.findOne({ username })
    if (existingAdmin)
      return res.status(409).json({ message: 'Admin already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)
    const newAdmin = new AdminModal({
      email,
      password: hashedPassword,
      username,
    })
    const {
      accessToken,
      refreshToken
    } = generateTokens(newAdmin._id, username)
    newAdmin.active_tokens.push(refreshToken)
    await newAdmin.save()
    // Send Verification Email
    const verifyToken = generateAccessToken(
      {
        id: newAdmin._id,
        username,
      },
      '30m'
    )
    handleEmailVerification(
      email,
      `http://localhost:3000/verify/${verifyToken}`
    )
    // One Week
    const oneWeek = 7 * 24 * 3600 * 1000
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: oneWeek,
    })
    res.status(201).json({ accessToken, username })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    const { id } = decodeRefreshToken(refreshToken)
    const existingAdmin = await AdminModal.findById(id)
    if (!existingAdmin) {
      res.clearCookie('refresh_token', { httpOnly: true, maxAge: -1 })
      return res.json(Boom.notFound('Admin doesn\'t exist'))
    }

    // Remove RefreshToken from active_tokens
    const tokenIndex = existingAdmin.active_tokens.indexOf(refreshToken)
    existingAdmin.active_tokens.splice(tokenIndex, 1)
    await existingAdmin.save()
    // Clear cookies, send expired token
    res.clearCookie('refresh_token', { httpOnly: true, maxAge: -1 })
    res.status(200).json({ message: 'Logout Successful' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logoutAllSessions = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    const { id } = decodeRefreshToken(refreshToken)
    const existingAdmin = await AdminModal.findById(id)
    existingAdmin.active_tokens = []
    existingAdmin.save()
    res.clearCookie('refresh_token', { httpOnly: true, maxAge: -1 })
    res.status(200).json({ message: 'Successfully Ended All Sessions' })
  } catch (error) {
    res.json(Boom.notFound(error.message))
  }
}

export const changePassword = async (req, res) => {
  const {
    oldPassword,
    newPassword
  } = req.body
  try {
    // Get Existing Admin
    const existingAdmin = await AdminModal.findById(req.userID)
    if (!existingAdmin)
      return res.status(404).json({ message: 'Admin doesn\'t exist' })
    // Check If Correct Password
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingAdmin.password
    )
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })
    // Set New Password
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    existingAdmin.password = hashedPassword
    await existingAdmin.save()
    res.status(200).json({ message: 'Password Changed Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const refresh_token = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token
  let token
  try {
    if (refreshToken) {
      const {
        expired,
        id,
        username
      } = decodeRefreshToken(refreshToken)
      if (expired) return res.status(200).json(generateAccessToken({}, '1'))
      const existingAdmin = await AdminModal.findById(id)
      if (!existingAdmin)
        return res.status(404).json({ message: 'Admin doesn\'t exist' })
      const active_token = existingAdmin.active_tokens.find(
        (existingtoken) => existingtoken === refreshToken
      )
      if (active_token) {
        token = generateAccessToken({ id, username })
      } else {
        token = generateAccessToken({}, '1')
      }

      res.status(200).json(token)
    } else {
      token = generateAccessToken({}, '1')
      return res.status(200).json(token)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsersByToken = async (req, res) => {
  const {
    token
  } = req.params
  try {
    const resetToken = await ResetToken.findOne({reset_token: token})
    if (!resetToken) return res.json(Boom.unauthorized('Expired Or Invalid Token'))
    const users = await AdminModal.find({
      $and: [
        {email: resetToken.email},
        {verified_email: true}
      ]})
    if (users.length === 0) return res.json(Boom.notFound('No Admins Linked To Email'))
    const filteredUsers = users.map((user) => {
      return {
        id: user._id,
        username: user.username
      }
    })
    res.status(200).json(filteredUsers)
  } catch (error) {
    res.json(Boom.badImplementation(error.message))
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const existingAdmin = await AdminModal.findOne({
      $and: [
        { email },
        { verified_email: true}
      ],
    })
    if (!existingAdmin)
      return res.json(Boom.notFound('Admin doesn\'t exist'))
    let resetToken = await ResetToken.findOne({ email })
    if (!resetToken) {
      resetToken = await new ResetToken({
        email,
        reset_token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

    handleForgotPasswordEmail(
      email,
      `http://localhost:3000/reset-password?token=${resetToken.reset_token}`
    )
    res.status(200).json({ message: 'Sent Email' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  const { password } = req.body
  const {
    token,
    uid
  } = req.query
  try {
    const existingAdmin = await AdminModal.findById(uid)
    const existingToken = await ResetToken.findOne({ reset_token: token })
    if (!existingAdmin || !existingToken) return res.json(Boom.unauthorized())
    if (existingAdmin.email !== existingToken.email) return res.json(Boom.unauthorized())
    const isOldPassword = await bcrypt.compare(password, existingAdmin.password)
    if (isOldPassword) return res.json(Boom.conflict('Cannot use old password'))
    const hashedPassword = await bcrypt.hash(password, 12)
    existingAdmin.password = hashedPassword
    await existingAdmin.save()
    await existingToken.delete()
    res.status(200).json({ message: 'Password Successfully Updated' })
  } catch (error) {
    res.json(Boom.badImplementation(error.message))
  }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.params
  if (!token) return res.status(400).json({ message: 'Not a valid token' })
  const { id } = decodeAccessToken(token)
  try {
    const existingAdmin = await AdminModal.findById(id)
    if (!existingAdmin)
      return res.status(404).json({ message: 'Admin doesn\'t exist' })
    existingAdmin.verified_email = true
    await existingAdmin.save()
    res.status(200).json({ message: 'Admin Email Successfully Verified' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const existingAdmin = await AdminModal.findByIdAndDelete(req.params.id)
    if (!existingAdmin)
      return res.status(404).json({ message: 'Admin doesn\'t exist' })
    // Logout Token
    const token = generateAccessToken({}, '1')
    res.clearCookie('refresh_token', { httpOnly: true, maxAge: -1 })
    res.status(200).json({ message: 'Admin Deleted Successfully', token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
