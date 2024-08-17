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

exports.addService = async (req, res) => {
  const { heading, description, cost } = req.body;
  try {
      const newService = new Service({ heading, description, cost });
      await newService.save();
      res.status(201).send("Service added successfully");
  } catch (err) {
      console.error("Error adding service:", err);
      res.status(500).send("Server error");
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { heading, description, cost } = req.body;
  try {
      await Service.findByIdAndUpdate(id, { heading, description, cost });
      res.send("Service updated successfully");
  } catch (err) {
      console.error("Error updating service:", err);
      res.status(500).send("Server error");
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
      await Service.findByIdAndDelete(id);
      res.send("Service deleted successfully");
  } catch (err) {
      console.error("Error deleting service:", err);
      res.status(500).send("Server error");
  }
};
