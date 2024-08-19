import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import Footer from './Footer';

function MyService() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedFormMobileNumber = localStorage.getItem("formMobileNumber");
    const loggedInUser = localStorage.getItem("loggedInUser"); // Check if the user is logged in

    if (loggedInUser) {
      setIsLoggedIn(true);
    }

    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get('http://localhost:2000/myservices', {
<<<<<<< HEAD
          params: { mobnumber: storedFormMobileNumber } //use to send query parameter
=======
          params: { mobnumber: storedFormMobileNumber }
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
        });
        setServiceRequests(response.data);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };

    if (storedFormMobileNumber) {
      fetchServiceRequests();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    window.location.reload(); // Optional: Reload to reflect changes
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} isMyServicePage={true} />

      {/* Main Content */}
      <div className='flex-grow w-3/4 mx-auto mt-28 mb-10'>
        <h1 className='text-3xl font-semibold mb-6 text-center'>Your Bookings</h1>
        <div className='space-y-4'>
<<<<<<< HEAD
          {serviceRequests.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className='text-xl font-bold mb-2'><label>Name: </label>{item.name}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <p><span className='font-semibold'>Bike Model:</span> {item.bikeModel}</p>
                  <p><span className='font-semibold'>Delivery Date:</span> {item.deliveryDate}</p>
                  <p><span className='font-semibold'>Address:</span> {item.address}</p>
                </div>
                <div>
                  <p><span className='font-semibold'>Services:</span> {item.selectedServices.join(', ')}</p>
                  <p><span className='font-semibold'>Total Cost:</span> ₹{item.totalCost}</p>
                  <p><span className='font-semibold'>Status:</span> <span className='font-bold'>{item.status}</span></p>
=======
          {serviceRequests.map((request) => (
            <div key={request._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className='text-xl font-bold mb-2'><label>Name: </label>{request.name}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <p><span className='font-semibold'>Bike Model:</span> {request.bikeModel}</p>
                  <p><span className='font-semibold'>Delivery Date:</span> {request.deliveryDate}</p>
                  <p><span className='font-semibold'>Address:</span> {request.address}</p>
                </div>
                <div>
                  <p><span className='font-semibold'>Services:</span> {request.selectedServices.join(', ')}</p>
                  <p><span className='font-semibold'>Total Cost:</span> ₹{request.totalCost}</p>
                  <p><span className='font-semibold'>Status:</span> <span className='font-bold'>{request.status}</span></p>
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyService;

