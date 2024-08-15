const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/bike_Services").then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("DB connection error", err);
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { collection: "admin_login" });

const Admin = mongoose.model("Admin", AdminSchema);

// Register a new admin without password hashing
app.post("/register-admin", async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();
      res.status(201).send("Admin registered successfully");
  } catch (err) {
      console.error("Error registering admin:", err);
      res.status(500).send("Server error");
  }
});

// Fetch admin details
app.get("/admin-details", async (req, res) => {
  try {
    const adminDetails = await Admin.find({}, 'name email'); // Select only 'name' and 'email'
    res.json(adminDetails);
  } catch (err) {
    console.error("Error fetching admin details:", err);
    res.status(500).send("Server error");
  }
});

// Login admin
app.post("/login-admin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    console.log(admin.email)
    console.log(admin.password)
    if(email == admin.email && password == admin.password){
      res.send(true)
    }
    else{
      res.send(false)
    }
  } catch (err) {
      console.error("Error logging in admin:", err);
      res.status(500).send("Server error");
  }
});


// Create Service Model
const ServiceSchema = new mongoose.Schema({
    heading: String,
    description: String,
    cost: Number,
}, { collection: "avail_service" });

const Service = mongoose.model("Avail_service", ServiceSchema);

// Create User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mob: Number,
}, { collection: "user_login" });

const User = mongoose.model("User", UserSchema);

// Create Service Request Model
const ServiceRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  bikeModel: String,
  bookingDate: String,
  deliveryDate: String,
  address: String,
  selectedServices: [String],
  totalCost: Number,
  status: { type: String, default: 'Pending' },
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

// Get all services
app.get("/services", async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (err) {
        console.error("Error fetching services:", err);
        res.status(500).send("Server error");
    }
});

// Add a new service
app.post("/services", async (req, res) => {
    const { heading, description, cost } = req.body;
    try {
        const newService = new Service({ heading, description, cost });
        await newService.save();
        res.status(201).send("Service added successfully");
    } catch (err) {
        console.error("Error adding service:", err);
        res.status(500).send("Server error");
    }
});

// Update a service
app.put("/services/:id", async (req, res) => {
    const { id } = req.params;
    const { heading, description, cost } = req.body;
    try {
        await Service.findByIdAndUpdate(id, { heading, description, cost });
        res.send("Service updated successfully");
    } catch (err) {
        console.error("Error updating service:", err);
        res.status(500).send("Server error");
    }
});

// Delete a service
app.delete("/services/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Service.findByIdAndDelete(id);
        res.send("Service deleted successfully");
    } catch (err) {
        console.error("Error deleting service:", err);
        res.status(500).send("Server error");
    }
});

// Route to fetch users
app.get("/users", async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
  }
});

// Get Service Requests Route
app.get("/servicerequests", async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({});
    res.json(serviceRequests);
  } catch (err) {
    console.error("Error fetching service requests:", err);
    res.status(500).send("Server error");
  }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harishrajd6@gmail.com", // Replace with your email
    pass: "flpz mbcb kwma qnxt", // Replace with your email password or app password
  },
});

// Update Service Request Status Route and send email if status is "Ready for delivery"
app.put("/servicerequests/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (status === "Ready for delivery") {
      // Send email notification
      const mailOptions = {
        from: 'harishrajd6@gmail.com',  // Replace with your email
        to: serviceRequest.email,       // Send to the user's email
        subject: 'Your Bike is Ready for Delivery',
        text: `Dear ${serviceRequest.name},\n\nYour bike is ready for delivery. Here are the details:\n\n` +
              `Name: ${serviceRequest.name}\n` +
              `Email: ${serviceRequest.email}\n` +
              `Mobile Number: ${serviceRequest.mobileNumber}\n` +
              `Selected Services: ${serviceRequest.selectedServices.join(", ")}\n` +
              `Bike Model: ${serviceRequest.bikeModel}\n` +
              `Delivery Date: ${serviceRequest.deliveryDate}\n` +
              `Total Cost: ₹  ${serviceRequest.totalCost}\n\n` +
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
});


app.listen(9000, function () {
    console.log("Server started..!");
});

