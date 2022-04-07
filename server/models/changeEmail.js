import crypto from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { handleChangeEmailVerification } from '../EmailTemplates/VerifyChangeEmail'
import { handleNewEmailVerification } from '../EmailTemplates/VerifyNewEmail'
import adminModel from './admin'

dotenv.config()
const TOKEN_SECRET = process.env.CHANGE_EMAIL_TOKEN_SECRET

const changeEmailSchema = mongoose.Schema({
  cancelChangeToken: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  newEmail: {
    required: true,
    type: String,
  },
  userId: {
    ref: 'User',
    required: true,
    type: mongoose.Types.ObjectId,
  },
  verifiedCurrentEmail: {
    default: false,
    type: Boolean,
  },
  verifiedNewEmail: {
    default: false,
    type: Boolean,
  },
  verifyCurrentEmailToken: {
    required: true,
    type: String,
  },
  verifyNewEmailToken: {
    required: true,
    type: String,
  },
})

changeEmailSchema.methods.changeUserEmail = async function () {
  const admin = await adminModel.findById(this.userId)
  await admin.changeEmail(this.newEmail)
}

changeEmailSchema.methods.prepareTokens = function () {
  const cancelToken = jwt.sign(
    { requestId: this._id, token: this.cancelChangeToken },
    TOKEN_SECRET,
    { expiresIn: '30d', subject: 'cancel' }
  )
  const currentVerifyToken = jwt.sign(
    { requestId: this._id, token: this.verifyCurrentEmailToken },
    TOKEN_SECRET,
    { expiresIn: '30d', subject: 'verifyCurrent' }
  )
  const newVerifyToken = jwt.sign(
    { requestId: this._id, token: this.verifyNewEmailToken },
    TOKEN_SECRET,
    { expiresIn: '30d', subject: 'verifyNew' }
  )

  return {
    current: { cancel: cancelToken, verify: currentVerifyToken },
    new: { verify: newVerifyToken },
  }
}

changeEmailSchema.methods.createRequest = async function (currentEmail) {
  this.cancelChangeToken = crypto.randomBytes(32).toString('hex')
  this.verifyCurrentEmailToken = crypto.randomBytes(32).toString('hex')
  this.verifyNewEmailToken = crypto.randomBytes(32).toString('hex')
  const tokens = this.prepareTokens()
  await handleNewEmailVerification(this.newEmail, tokens.new)
  await handleChangeEmailVerification(currentEmail, tokens.current)
  await this.save()
}

changeEmailSchema.methods.handleVerificationRequest = async function (type) {
  switch (type) {
  case 'verifyNew': {
    await this.verifyNewEmail()
    break
  }

  case 'verifyCurrent': {
    await this.verifyCurrentEmail()
    break
  }

  case 'cancel': {
    await this.cancelRequest()
    break
  }

  default:
    throw new Error('Unknown Type Request')
  }
}

changeEmailSchema.methods.checkVerification = async function () {
  if (this.verifiedNewEmail && this.verifiedCurrentEmail) {
    await this.changeUserEmail()
    await this.delete()
    return true
  }
}

changeEmailSchema.methods.verifyNewEmail = async function () {
  this.verifiedNewEmail = true
  if (await this.checkVerification()) return
  await this.save()
}

changeEmailSchema.methods.verifyCurrentEmail = async function () {
  this.verifiedCurrentEmail = true
  if (await this.checkVerification()) return
  await this.save()
}

changeEmailSchema.methods.cancelRequest = async function () {
  await this.delete()
}

changeEmailSchema.methods.completeRequest = async function () {
  if (this.verifiedNewEmail) {
    await this.changeUserEmail()
  }

  await this.delete()
}

const ChangeEmail = mongoose.model('ChangeEmail', changeEmailSchema)

export default ChangeEmail
