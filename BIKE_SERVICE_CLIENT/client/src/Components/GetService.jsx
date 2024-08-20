import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GetService = ({ services, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bookingDate, setBookingDate] = useState('');  
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');
  const [bikeNumber, setbikeNumber] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleServiceChange = (service) => {
    const isSelected = selectedServices.includes(service.heading);

    if (isSelected) {
      setSelectedServices(prevSelectedServices =>
        prevSelectedServices.filter(selectedService => selectedService !== service.heading)
      );
      setTotalCost(prevTotalCost => prevTotalCost - service.cost);
    } else {
      setSelectedServices(prevSelectedServices => [...prevSelectedServices, service.heading]);
      setTotalCost(prevTotalCost => prevTotalCost + service.cost);
    }
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const mobRegex = /^[0-9]{10}$/;
    const bikeModelRegex = /^[A-Za-z0-9\s]+$/;
    const bikeNumberRegex = /^[A-Za-z0-9\s]+$/;

    if (!nameRegex.test(name)) {
      newErrors.name = 'Name must contain only letters and spaces';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Email must be in the format 'word@gmail.com'";
    }
    if (!mobRegex.test(mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must contain exactly 10 digits';
    }
    if (!bikeModelRegex.test(bikeModel)) {
      newErrors.bikeModel = 'Bike model must contain only letters and numbers';
    }
    if (!bikeNumberRegex.test(bikeNumber)) {
      newErrors.bikeNumber = 'Bike number must contain only letters and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
      // Close the form immediately after submission starts
      onClose();

    const bookingDetails = {
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
    };

    try {
      await axios.post('http://localhost:2000/bookservice', bookingDetails);
      alert('Service booked successfully!');
      localStorage.setItem('formMobileNumber', mobileNumber);
      navigate('/myservices');
    } catch (error) {
      console.error('Error booking service:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='modal-content border rounded-3xl bg-white w-full max-w-4xl mx-4 p-6 md:p-8 scrollbar-hide' style={{ maxHeight: '90vh', maxWidth: '80vw', overflowY: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <span className='close cursor-pointer text-xl absolute top-4 right-4' onClick={onClose}>&times;</span>
          <h1 className='text-2xl font-bold mb-4 text-center'>Book your Service now</h1>
          <p className='text-[#6F6C90] mb-4 text-sm text-center'>Please fill the form below to book a service for your bike.</p>
          <div className='bg-[#F7F7FB] border border-[#BFC1CD] rounded-2xl p-4 md:p-6'>
            <h1 className='text-lg font-semibold mb-4'>Contact details</h1>
            <p className='text-sm text-[#6F6C90] mb-6'>Please fill your information so we can get in touch with you</p>
            <form onSubmit={handleSubmit}>
              {/* Row 1: Name and Phone Number */}
              <div className='flex flex-col md:flex-row justify-between mb-4'>
                <div className='flex-1 mb-4 md:mb-0 md:mr-4'>
                  <p className='font-semibold text-sm mb-2'>Name</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter name.."
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className='flex-1 md:ml-4'>
                  <p className='font-semibold text-sm mb-2'>Phone Number</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    placeholder="Enter mobile number.."
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>
              {/* Row 2: Email and Bike Model */}
              <div className='flex flex-col md:flex-row justify-between mb-4'>
                <div className='flex-1 mb-4 md:mb-0 md:mr-4'>
                  <p className='font-semibold text-sm mb-2'>Email</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email.."
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className='flex-1 md:ml-4'>
                  <p className='font-semibold text-sm mb-2'>Bike Model</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="text"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    required
                    placeholder="Enter bike model.."
                  />
                  {errors.bikeModel && <p className="text-red-500 text-sm mt-1">{errors.bikeModel}</p>}
                </div>
              </div>
              {/* Row 3: Booking Date and Delivery Date */}
              <div className='flex flex-col md:flex-row justify-between mb-4'>
                <div className='flex-1 mb-4 md:mb-0 md:mr-4'>
                  <p className='font-semibold text-sm mb-2'>Booking Date</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
                <div className='flex-1 md:ml-4'>
                  <p className='font-semibold text-sm mb-2'>Delivery Date</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Row 4: Bike Number and Address */}
              <div className='flex flex-col md:flex-row justify-between mb-4'>
                <div className='flex-1 mb-4 md:mb-0 md:mr-4'>
                  <p className='font-semibold text-sm mb-2'>Address</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter address.."
                  />
                </div>
                <div className='flex-1 md:ml-4'>
                  <p className='font-semibold text-sm mb-2'>Bike Number</p>
                  <input 
                    className='w-full border border-[#BFC1CD] py-3 pl-3 pr-3 text-[#6F6C90] rounded-lg text-sm'
                    type="text"
                    value={bikeNumber}
                    onChange={(e) => setbikeNumber(e.target.value)}
                    required
                    placeholder="Enter bike number.."
                  />
                  {errors.bikeNumber && <p className="text-red-500 text-sm mt-1">{errors.bikeNumber}</p>}
                </div>
              </div>

              {/* Services */}
              <div className='mb-4'>
                <h1 className='text-lg font-semibold mb-2'>Our services</h1>
                <p className='text-sm text-[#6F6C90] mb-4'>Please select which service you are interested in.</p>
                <div className='flex flex-wrap -mx-2'>
                  {services.map((service) => (
                    <div key={service._id} className='w-full md:w-1/2 px-2 mb-4'>
                      <div
                        className={`cursor-pointer p-4 py-8 border rounded-xl ${selectedServices.includes(service.heading) ? 'border-2 border-green-600' : 'bg-white'}`}
                        onClick={() => handleServiceChange(service)}
                      >
                        <label className='text-xl font-semibold'>{service.heading}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Cost */}
              <div>
                <h4 className='text-lg font-semibold'>Total Cost: ₹ {totalCost}</h4>
              </div>
              {/* Submit Button */}
              <div className='text-center mt-4'>
                <button className='bg-[#4A3AFF] text-white border rounded-xl font-semibold px-6 py-2' type="submit">Book</button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetService;


