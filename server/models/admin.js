import mongoose from 'mongoose'

const adminSchema = mongoose.Schema(
  {
    active_tokens: { default: [], type: Array },
    email: { required: true, type: String },
    password: { required: true, type: String },
    username: { required: true, type: String },
    verified_email: { default: false, type: Boolean },
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
