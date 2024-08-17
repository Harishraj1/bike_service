const ServiceRequest = require('../models/ServiceRequest');
const transporter = require('../config/mailer');

exports.bookService = async (req, res) => {
  try {
    const { name, email, mobileNumber, bikeModel, bookingDate, deliveryDate, address, bikeNumber, selectedServices, totalCost } = req.body;

    const serviceRequest = new ServiceRequest({
      name,
      email,
      mobileNumber,
      bikeModel,
      bookingDate, 
      deliveryDate,
      address,
      bikeNumber,
      selectedServices,
      totalCost,
      status: 'Pending',
    });

    await serviceRequest.save();

    const userMailOptions = {
      from: "harishrajd6@gmail.com",
      to: email,
      subject: "Service Booking Confirmation",
      text: `Dear ${name},\n\nThank you for booking a service with us. Your booking details:\n- Services: ${selectedServices.join(", ")}\n- Total Cost: ₹ ${totalCost}\n- Delivery Date: ${deliveryDate}\n- Address: ${address}\n- Bike Number: ${bikeNumber} \n\nWe will notify you once your bike is ready for delivery.\n\nBest regards,\nBike Service Station`,
    };

    const ownerMailOptions = {
      from: "harishrajd6@gmail.com",
      to: "harishrajd6@gmail.com",
      subject: "New Service Booking",
      text: `New service booking details:\n\n- Name: ${name}\n- Email: ${email}\n- Mobile Number: ${mobileNumber}\n- Bike Model: ${bikeModel}\n- Services: ${selectedServices.join(", ")}\n- Total Cost: ₹ ${totalCost}\n- Delivery Date: ${deliveryDate}\n- Address: ${address}\n- Bike Number: ${bikeNumber}\n\nPlease prepare the service accordingly.`,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(ownerMailOptions);

    res.send("Service request submitted successfully");
  } catch (err) {
    console.error("Error submitting service request:", err);
    res.status(500).send("Server error");
  }
};

exports.getMyServices = async (req, res) => {
  try {
    const { mobnumber } = req.query;
    const serviceRequests = await ServiceRequest.find({ mobileNumber: mobnumber });
    res.json(serviceRequests);
  } catch (err) {
    console.error("Error fetching service requests:", err);
    res.status(500).send("Server error");
  }
};
