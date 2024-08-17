const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harishrajd6@gmail.com", // Replace with your email
    pass: "flpz mbcb kwma qnxt",   // Replace with your email password or app password
  },
});

module.exports = transporter;
