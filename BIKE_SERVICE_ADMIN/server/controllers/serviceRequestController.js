const ServiceRequest = require('../models/ServiceRequest');
const transporter = require('../config/mailer');

exports.getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({});
    res.json(serviceRequests);
  } catch (err) {
    console.error("Error fetching service requests:", err);
    res.status(500).send("Server error");
  }
};

exports.updateServiceRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(id, { status }, { new: true }); // the new:true is used for, after the data updated the the further process will be done or data will be sent. 

    if (status === "Ready for delivery") {
      const mailOptions = {
        from: 'harishrajd6@gmail.com',
        to: serviceRequest.email,
        subject: 'Your Bike is Ready for Delivery',
        text: `Dear ${serviceRequest.name},\n\nYour bike is ready for delivery. Here are the details:\n\n` +
              `Name: ${serviceRequest.name}\n` +
              `Email: ${serviceRequest.email}\n` +
              `Mobile Number: ${serviceRequest.mobileNumber}\n` +
              `Selected Services: ${serviceRequest.selectedServices.join(", ")}\n` +
              `Bike Model: ${serviceRequest.bikeModel}\n` +
              `Delivery Date: ${serviceRequest.deliveryDate}\n` +
              `Total Cost: ₹ ${serviceRequest.totalCost}\n\n` +
              `Your bike is ready for delivery. You can either wait for home delivery or visit the service center to pick up your bike.\n\nThank you for choosing our service!\n\nBest regards,\nBike Services Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.send("Service request status updated successfully");
  } catch (err) {
    console.error("Error updating service request status:", err);
    res.status(500).send("Server error");
  }
};
