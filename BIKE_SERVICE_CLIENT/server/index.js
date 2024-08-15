const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connecting to the database
mongoose.connect("mongodb://127.0.0.1:27017/bike_Services", {}).then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.error("DB connection error:", err);
});

// Create User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mob: Number,
  password: String,
}, { collection: "user_login" });

const User = mongoose.model("User", UserSchema);

// Create Service Model
const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  cost: Number,
}, { collection: "avail_service" });

const Service = mongoose.model("Avail_service", ServiceSchema);

// Create Service Request Model
const ServiceRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  bikeModel: String,
  bookingDate: String,  // Add this line
  deliveryDate: String,
  address: String,
  bikeNumber: String,
  selectedServices: [String],
  totalCost: Number,
  status: { type: String, default: 'Pending' },
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harishrajd6@gmail.com", // Replace with your email
    pass: "flpz mbcb kwma qnxt", // Replace with your email password or app password
  },
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email, password }); // Await the findOne call
    console.log(user.email)
    console.log(user.password)
    if (user.email == email && user.password == password) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Server error");
  }
});


// Add User Route
app.post("/adduser", async (req, res) => {
  try {
    const { name, email, mob, password } = req.body;
    const newUser = new User({ name, email, mob, password });
    await newUser.save();
    res.send("New user saved successfully");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Server error");
  }
});

// Get Services Route
app.get("/services", async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).send("Server error");
  }
});

// Add Service Request Route
app.post("/bookservice", async (req, res) => {
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


    // Send email to the user
    const userMailOptions = {
      from: "harishrajd6@gmail.com",
      to: email,
      subject: "Service Booking Confirmation",
      text: `Dear ${name},\n\nThank you for booking a service with us. Your booking details:\n- Services: ${selectedServices.join(", ")}\n- Total Cost: ₹ ${totalCost}\n- Delivery Date: ${deliveryDate}\n- Address: ${address}\n- Bike Number: ${bikeNumber} \n\nWe will notify you once your bike is ready for delivery.\n\nBest regards,\nBike Service Station`,
    };

    // Send email to the service station owner
    const ownerMailOptions = {
      from: "harishrajd6@gmail.com",
      to: "harishrajd6@gmail.com", // Replace with the owner's email
      subject: "New Service Booking",
      text: `New service booking details:\n\n- Name: ${name}\n- Email: ${email}\n- Mobile Number: ${mobileNumber}\n- Bike Model: ${bikeModel}\n- Services: ${selectedServices.join(", ")}\n- Total Cost: ₹ ${totalCost}\n- Delivery Date: ${deliveryDate}\n- Address: ${address}\n- Bike Number: ${bikeNumber}\n\nPlease prepare the service accordingly.`,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(ownerMailOptions);

    res.send("Service request submitted successfully");
  } catch (err) {
    console.error("Error submitting service request:", err);
    res.status(500).send("Server error");
  }
});

app.get("/myservices", async (req, res) => {
  try {
    const { mobnumber } = req.query;
    const serviceRequests = await ServiceRequest.find({ mobileNumber: mobnumber });
    res.json(serviceRequests);
  } catch (err) {
    console.error("Error fetching service requests:", err);
    res.status(500).send("Server error");
  }
});

app.listen(2000, () => {
  console.log("Server started on port 2000");
});
