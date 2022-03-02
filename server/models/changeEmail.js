import mongoose from 'mongoose'

const changeEmailSchema = mongoose.Schema({
  cancelChangeToken: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now,
    // 2592000
    expires: 60,
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

const ChangeEmail = mongoose.model('ChangeEmail', changeEmailSchema)

export default ChangeEmail
