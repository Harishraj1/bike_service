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
          params: { mobnumber: storedFormMobileNumber } //use to send query parameter
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

