const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { collection: "admin_login" });

module.exports = mongoose.model("Admin", AdminSchema);
