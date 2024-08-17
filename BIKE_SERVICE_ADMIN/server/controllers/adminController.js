const Admin = require('../models/Admin');

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();
      res.status(201).send("Admin registered successfully");
  } catch (err) {
      console.error("Error registering admin:", err);
      res.status(500).send("Server error");
  }
};

exports.getAdminDetails = async (req, res) => {
  try {
    const adminDetails = await Admin.find({}, 'name email');
    res.json(adminDetails);
  } catch (err) {
    console.error("Error fetching admin details:", err);
    res.status(500).send("Server error");
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (admin && email === admin.email && password === admin.password) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
      console.error("Error logging in admin:", err);
      res.status(500).send("Server error");
  }
};
