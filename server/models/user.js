import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  email: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
