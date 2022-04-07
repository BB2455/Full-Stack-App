import Boom from '@hapi/boom'
import bcrypt from 'bcryptjs'
import { handleForgotPasswordEmail } from '../EmailTemplates/ForgotPassword.js'
import { handleEmailVerification } from '../EmailTemplates/VerifyEmail.js'
import AdminModal from '../models/admin.js'
import ChangeEmailModel from '../models/changeEmail.js'
import ResetToken from '../models/resetToken.js'
import { createChangeEmailRequest } from '../utils/createChangeEmailRequest.js'
import decodeAccessToken from '../utils/decodeAccessToken.js'
import decodeRefreshToken from '../utils/decodeRefreshToken.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateResetToken from '../utils/generateResetToken.js'

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
    const isPasswordCorrect = await existingAdmin.verifyPassword(password)
    // Check if Password is correct
    if (!isPasswordCorrect) throw new Error('Invalid Password')
    // Get tokens
    const refreshToken = await existingAdmin.issueRefreshToken()
    const accessToken = existingAdmin.issueAccessToken()
    // One Week Time
    const oneWeek = 7 * 24 * 3600 * 1000
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: oneWeek,
    })
    res.status(200).json({ accessToken })
  } catch (error) {
    res.json(Boom.badData(error.message))
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
    await newAdmin.save()
    const refreshToken = await newAdmin.issueRefreshToken()
    const accessToken = newAdmin.issueAccessToken()
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
      verifyToken
    )
    // One Week
    const oneWeek = 7 * 24 * 3600 * 1000
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: oneWeek,
    })
    res.status(201).json({ accessToken })
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
    existingAdmin.logout(refreshToken)
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
    currentPassword,
    newPassword
  } = req.body
  try {
    // Get Existing Admin
    const existingAdmin = await AdminModal.findById(req.userID)
    // Check If Correct Password
    const isPasswordCorrect = await existingAdmin.verifyPassword(currentPassword)
    if (!isPasswordCorrect)
      return res.json(Boom.badRequest('Invalid credentials'))
    // Set New Password
    existingAdmin.password = await bcrypt.hash(newPassword, 12)
    await existingAdmin.save()
    res.status(200).json({ message: 'Password Changed Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const refresh_token = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token
  try {
    if (!refreshToken) throw new Error('Invalid Or Expired Token')
    const {
      expired,
      id
    } = decodeRefreshToken(refreshToken)
    if (expired) throw new Error('Invalid Or Expired Token')
    const existingAdmin = await AdminModal.findById(id)
    if (!existingAdmin) return res.json(Boom.notFound('Admin doesn\'t exist'))

    const verifyToken = await existingAdmin.verifyRefreshToken(refreshToken)
    if (!verifyToken) throw new Error('Invalid Or Expired Token')

    const accessToken = existingAdmin.issueAccessToken()
    res.status(200).json({ accessToken })
  } catch (error) {
    res.json(Boom.badRequest(error.message))
  }
}

export const getUsersByToken = async (req, res) => {
  const { token } = req.params
  try {
    const resetToken = await ResetToken.findOne({ reset_token: token })
    if (!resetToken)
      return res.json(Boom.unauthorized('Expired Or Invalid Token'))
    const users = await AdminModal.find({
      $and: [
        { email: resetToken.email },
        { verified_email: true }
      ],
    })
    if (users.length === 0)
      return res.json(Boom.notFound('No Admins Linked To Email'))
    const filteredUsers = users.map((user) => {
      return {
        id: user._id,
        username: user.username,
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
        { verified_email: true }
      ],
    })
    if (!existingAdmin) return res.json(Boom.notFound('Admin doesn\'t exist'))
    let resetToken = await ResetToken.findOne({ email })
    if (!resetToken) {
      resetToken = await new ResetToken({
        email,
        reset_token: await generateResetToken(),
      }).save()
    }

    handleForgotPasswordEmail(
      email,
      resetToken.reset_token
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
    if (existingAdmin.email !== existingToken.email)
      return res.json(Boom.unauthorized())
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
  const { id } = decodeAccessToken(token)
  try {
    const existingAdmin = await AdminModal.findById(id)
    if (!existingAdmin)
      return res.json(Boom.notFound('Admin doesn\'t exist'))
    if (existingAdmin.verified_email)
      return res.json(Boom.badRequest('Email already verified'))
    existingAdmin.verified_email = true
    await existingAdmin.save()
    res.status(200).json({ message: 'Admin Email Successfully Verified' })
  } catch (error) {
    res.json(Boom.badRequest(error.message))
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const existingAdmin = await AdminModal.findById(req.userID)
    if (!existingAdmin)
      return res.status(404).json({ message: 'Admin doesn\'t exist' })
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingAdmin.password
    )
    // Check if Password is correct
    if (!isPasswordCorrect)
      return res.json(Boom.unauthorized('Invalid Password'))
    existingAdmin.delete()
    // Logout Token
    res.clearCookie('refresh_token', { httpOnly: true, maxAge: -1 })
    res.status(200).json({ message: 'Admin Deleted Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const resendVerificationEmail = async (req, res) => {
  try {
    const existingAdmin = await AdminModal.findById(req.userID)
    if (!existingAdmin) return res.json(Boom.notFound('Admin doesn\'t exist'))
    if (existingAdmin.verified_email) throw new Error('Email already verified')
    const verifyToken = generateAccessToken(
      {
        id: existingAdmin._id,
      },
      '30m'
    )
    handleEmailVerification(
      existingAdmin.email,
      verifyToken
    )
    res.status(200).json({ message: 'Email Sent' })
  } catch (error) {
    res.json(Boom.badRequest(error.message))
  }
}

export const changeEmail = async (req, res) => {
  try {
    const existingAdmin = await AdminModal.findById(req.userID)
    const verifiedPassword = await existingAdmin.verifyPassword(req.body.password)
    if (!verifiedPassword) throw new Error('Invalid Password')
    await createChangeEmailRequest(existingAdmin._id, existingAdmin.email, req.body.newEmail)
    res.status(200).json({message: 'Change Email Request Successfully Sent'})
  } catch (error) {
    res.json(Boom.badRequest(error.message))
  }
}

export const verifyChangeEmailToken = async (req, res) => {
  try {
    const request = await ChangeEmailModel.findOne({$or: [
      {verifyCurrentEmailToken: req.token},
      {verifyNewEmailToken: req.token},
      {verifyNewEmailToken: req.token},
    ], _id: req.requestId})
    await request.handleVerificationRequest(req.type)

    res.status(200).json({message: 'Success'})
  } catch (error) {
    res.json(Boom.badRequest(error.message))
  }
}
