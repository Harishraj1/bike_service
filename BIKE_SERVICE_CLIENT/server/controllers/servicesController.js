const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).send("Server error");
  }
};
