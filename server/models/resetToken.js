import mongoose from 'mongoose'

const resetTokenSchema = mongoose.Schema({
  createdAt: {
    default: Date.now,
    expires: 1800,
    type: Date
  },
  email: {
    ref: 'User',
    required: true,
    type: String,
    unique: true,
  },
  reset_token: {
    required: true,
    type: String
  },
})

const ResetToken = mongoose.model('ResetToken', resetTokenSchema)

export default ResetToken
