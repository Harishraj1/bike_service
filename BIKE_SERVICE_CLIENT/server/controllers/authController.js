const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.send(false);
    }
    
    res.send(true);
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Server error");
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, mob, password } = req.body;
    const newUser = new User({ name, email, mob, password });
    await newUser.save();
    res.send("New user saved successfully");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Server error");
  }
};
