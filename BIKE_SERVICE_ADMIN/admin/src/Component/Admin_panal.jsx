import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function AdminPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [adminDetails, setAdminDetails] = useState([]);
  const [errors, setErrors] = useState({});

  const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/;


  // Define the fetchAdminDetails function outside useEffect so it can be reused
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get('http://localhost:9000/admin-details');
      setAdminDetails(response.data);
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  useEffect(() => {
    // Fetch admin details from the backend when the component mounts
    fetchAdminDetails(); 
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Email must be in the format 'word@gmail.com'";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be between 6 to 20 characters long and contain at least one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await axios.post('http://localhost:9000/register-admin', { name, email, password });
      setMessage('Admin added successfully!');
      setName('');
      setEmail('');
      setPassword('');
      // Re-fetch admin details after adding a new admin
      fetchAdminDetails();
    } catch (error) {
      console.error('Error adding admin:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className='flex'>
        <Navbar></Navbar>
        <div className='flex-1 p-6 ml-72 overflow-y-auto'>
          <h1 className='text-2xl font-bold mb-4'>Add New Admin</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded mt-1`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
               {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Admin
            </button>
          </form>

          <h2 className='text-2xl font-bold mt-8 mb-4'>Admin List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {adminDetails.map((admin, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{admin.name}</td>
                  <td className="border px-4 py-2">{admin.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
