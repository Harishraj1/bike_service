# 🚲 BIKE SERVICE APP

**Overview:**
The "BIKE SERVICE APP" is a web application designed for owners of bike service stations. It allows owners to manage their services, receive bookings from customers, and track the status of each service request. Customers can register, book services, and receive updates on their bookings via email.

## 🏗️ Project Structure

BIKE SERVICE APP/
│
├── BIKE_SERVICE_ADMIN/
│ ├── admin/
│ └── server/
│
└── BIKE_SERVICE_CLIENT/
├── client/
└── server/

## 🛠️ Prerequisites

Make sure you have Node.js and npm installed on your machine.

## 📂 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/BIKE-SERVICE-APP.git
cd BIKE-SERVICE-APP

## 2. Set Up the Admin Section
Navigate to the BIKE_SERVICE_ADMIN folder to set up the admin panel and its server.

### a. Install Admin Frontend Dependencies
cd BIKE_SERVICE_ADMIN/admin
npm install

### Dependencies:

axios: For making HTTP requests.
@mui/material, @mui/icons-material: For Material UI components and icons.
react-router-dom: For routing within the React application.
@fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome: For using FontAwesome icons in React.

### b. Install Admin Backend Dependencies
cd ../server
npm install

### Dependencies:

express: For building the backend server.
cors: For handling Cross-Origin Resource Sharing issues.
mongoose: For interacting with MongoDB.
nodemailer: For sending emails when a booking is made or completed.

## 3. Set Up the Client Section
Navigate to the BIKE_SERVICE_CLIENT folder to set up the client interface and its server.

### a. Install Client Frontend Dependencies
cd ../../BIKE_SERVICE_CLIENT/client
npm install

### Dependencies:

axios: For making HTTP requests.
@mui/material, @mui/icons-material: For Material UI components and icons.
react-router-dom: For routing within the React application.
@fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome: For using FontAwesome icons in React.
framer-motion: For animations.
react-tilt: For creating tilt effects on elements.

### b. Install Client Backend Dependencies
cd ../server
npm install

### Dependencies:

express: For building the backend server.
cors: For handling Cross-Origin Resource Sharing issues.
mongoose: For interacting with MongoDB.
nodemailer: For sending emails when a booking is made or completed.

## 🚀 Running the Application
### 1. Running the Admin Panel
Navigate to the BIKE_SERVICE_ADMIN directory:
### Admin Frontend:
cd BIKE_SERVICE_ADMIN/admin
npm start

admin email : admin@gmail.com
admin password : admin24

### Admin Backend:
cd ../server
npm start

### 2. Running the Client Interface
Navigate to the BIKE_SERVICE_CLIENT directory:
### Client Frontend:
cd ../../BIKE_SERVICE_CLIENT/client
npm start

### Client Backend:
cd ../server
npm start

## 🌐 API Endpoints
You will need to configure your backend server's API endpoints to handle requests from the frontend, such as booking services, updating booking statuses, and sending emails.

## 🔧 Configuration
Make sure to set up environment variables for your MongoDB connection, email server (for nodemailer), and any other sensitive information in .env files in both the admin/server and client/server folders.

## ✨ Features
### Admin Panel:

-> Create, edit, and delete services.
-> View, filter, and update booking statuses.
-> Receive email notifications when a service is booked or completed.
-> Client Interface:

-> User registration and login.
-> Book services on a specific date.
-> View current and past bookings.
-> Receive email notifications when a service is ready for delivery.
