import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { handleEmailVerification } from '../EmailTemplates/VerifyEmail'
import refreshTokenModel from './refreshToken'

const adminSchema = mongoose.Schema(
  {
    email: { required: true, type: String },
    password: { required: true, type: String },
    username: { required: true, type: String },
    verified_email: { default: false, type: Boolean },
  },
  { timestamps: true }
)

adminSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

adminSchema.methods.verifyRefreshToken = async function (refreshToken) {
  const refreshTokens = await refreshTokenModel.find({ userId: this._id })
  return await refreshTokens.find(async (token) => {
    if (await bcrypt.compare(refreshToken, token.refresh_token)) return true
    return false
  })
}

adminSchema.methods.sendVerificationEmail = function () {
  if (this.verified_email) throw new Error('Email already verified')
  const token = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  })
  handleEmailVerification(this.email, token)
}

adminSchema.methods.logout = async function (refreshToken) {
  const token = await this.verifyRefreshToken(refreshToken)
  if (token) await token.delete()
}

adminSchema.methods.issueAccessToken = function () {
  const user = {
    id: this._id,
    username: this.username,
    verified_email: this.verified_email,
  }
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
    issuer: 'fullStackAppServer',
    subject: this.username,
  })
}

adminSchema.methods.issueRefreshToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
    issuer: 'fullStackAppServer',
    subject: this.username,
  })

  const newRefreshToken = new refreshTokenModel({
    refresh_token: token,
    userId: this._id,
  })
  await newRefreshToken.save()

  return token
}

adminSchema.methods.changeEmail = async function (newEmail) {
  this.email = newEmail
  await this.save()
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
