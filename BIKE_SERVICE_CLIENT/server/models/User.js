const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mob: Number,
  password: String,
}, { collection: "user_login" });

module.exports = mongoose.model("User", UserSchema);
