const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  heading: String,
  description: String,
  cost: Number,
}, { collection: "avail_service" });

module.exports = mongoose.model("Avail_service", ServiceSchema);
