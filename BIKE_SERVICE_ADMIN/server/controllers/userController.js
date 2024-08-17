const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
  }
};
