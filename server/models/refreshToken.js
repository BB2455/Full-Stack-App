import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const refreshTokenSchema = mongoose.Schema({
  createdAt: {
    default: Date.now,
    expires: 604800,
    type: Date,
  },
  refresh_token: {
    required: true,
    type: String,
  },
  userId: {
    ref: 'User',
    required: true,
    type: mongoose.Types.ObjectId,
  },
})

// eslint-disable-next-line prefer-arrow-callback
refreshTokenSchema.pre('save', async function () {
  // eslint-disable-next-line @babel/no-invalid-this
  this.refresh_token = await bcrypt.hash(this.refresh_token, 12)
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

export default RefreshToken
