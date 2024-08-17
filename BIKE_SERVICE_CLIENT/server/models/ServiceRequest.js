const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  bikeModel: String,
  bookingDate: String,
  deliveryDate: String,
  address: String,
  bikeNumber: String,
  selectedServices: [String],
  totalCost: Number,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);
