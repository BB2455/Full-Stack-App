/* eslint-disable @babel/no-invalid-this */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
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

adminSchema.method('verifyPassword', async function (password) {
  return await bcrypt.compare(password, this.password)
})

adminSchema.method('verifyRefreshToken', async function (refreshToken) {
  const refreshTokens = await refreshTokenModel.find({ userId: this._id })
  return await refreshTokens.find(async (token) => {
    if (await bcrypt.compare(refreshToken, token.refresh_token)) return true
    return false
  })
})

adminSchema.method('logout', async function (refreshToken) {
  const token = await this.verifyRefreshToken(refreshToken)
  if (token) await token.delete()
})

adminSchema.method('issueAccessToken', function () {
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
})

adminSchema.method('issueRefreshToken', async function () {
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
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
