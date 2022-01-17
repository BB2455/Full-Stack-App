import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    email: String,
    first_name: String,
    last_name: String,
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
