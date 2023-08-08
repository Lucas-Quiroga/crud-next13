import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    match: [/^[a-zA-Z0-9._-]+@[a-z]+$/, "Email is not valid"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
  },
  fullname: {
    type: String,
    require: [true, "Fullname is required"],
    minLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [50, "Fullname must be at most 50 characters"],
  },
});

const User = models.User || model("User", userSchema);
export default User;
