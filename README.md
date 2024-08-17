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
Receive email notifications when a service is ready for delivery.
