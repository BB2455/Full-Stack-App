import mongoose from 'mongoose'

const refreshTokenSchema = mongoose.Schema({
  createdAt: {
    default: Date.now,
    expires: 604800,
    type: Date,
  },
  reset_token: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

export default RefreshToken
