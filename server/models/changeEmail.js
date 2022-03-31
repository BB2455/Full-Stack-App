/* eslint-disable @babel/no-invalid-this */
import crypto from 'crypto'
import mongoose from 'mongoose'
import adminModel from './admin'
// import { handleChangeEmailVerification } from '../EmailTemplates/VerifyChangeEmail'
// import { handleNewEmailVerification } from '../EmailTemplates/VerifyNewEmail'

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

changeEmailSchema.methods.createRequest = async function (currentEmail) {
  this.cancelChangeToken = crypto.randomBytes(32).toString('hex')
  this.verifyCurrentEmailToken = crypto.randomBytes(32).toString('hex')
  this.verifyNewEmailToken = crypto.randomBytes(32).toString('hex')
  // const tokens = {cancel: this.cancelChangeToken, verify: this.verifyCurrentEmailToken}
  // await handleNewEmailVerification(this.newEmail, {verify: verifyNewEmailToken})
  // await handleChangeEmailVerification(currentEmail, tokens)
}

changeEmailSchema.methods.checkVerification = async function () {
  if (this.verifiedNewEmail && this.verifyCurrentEmail) {
    await this.changeUserEmail()
    await this.delete()
    return true
  }
}

changeEmailSchema.methods.verifyNewEmail = async function (token) {
  if (this.verifyNewEmailToken === token) {
    this.verifiedNewEmail = true
    if (await this.checkVerification()) {
      return
    }

    await this.save()
  }
}

changeEmailSchema.methods.verifyCurrentEmail = async function (token) {
  if (this.verifyCurrentEmailToken === token) {
    this.verifiedCurrentEmail = true
    if (await this.checkVerification()) {
      return
    }

    await this.save()
  }
}

changeEmailSchema.methods.completeRequest = async function () {
  if (this.verifiedNewEmail) {
    await this.changeUserEmail()
  }

  await this.delete()
}

const ChangeEmail = mongoose.model('ChangeEmail', changeEmailSchema)

export default ChangeEmail
