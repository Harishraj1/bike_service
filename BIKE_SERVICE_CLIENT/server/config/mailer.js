const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harishrajd6@gmail.com",
    pass: "flpz mbcb kwma qnxt",
  },
});

module.exports = transporter;
