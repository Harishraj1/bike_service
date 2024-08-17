import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Service_Request() {
    const [serviceRequests, setServiceRequests] = useState([]);

    useEffect(() => {
        fetchServiceRequests();
    }, []);

    const fetchServiceRequests = async () => {
        try {
            const response = await axios.get("http://localhost:3005/servicerequests");
            setServiceRequests(response.data);
        } catch (error) {
            console.error("Error fetching service requests:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3005/servicerequests/${id}`, { status: newStatus });
            fetchServiceRequests();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="flex">
            
            <Navbar />

            <div className="flex-1 p-6 ml-72 overflow-x-auto">
                <h1 className="text-3xl font-bold mb-6">Service Requests</h1>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-2 text-left border-b-2 border-gray-300">Sno</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Name</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Mob num</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Service</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Booking</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Delivery</th>
                            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceRequests.map((request, index) => (
                            <tr key={request._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-2">{index + 1}.</td>
                                <td className="py-4 px-6 w-40">{request.name}</td>
                                <td className="py-4 px-6">{request.mobileNumber}</td>
                                <td className="py-4 px-6">{request.selectedServices.join(", ")}</td>
                                <td className="py-4 px-6 w-40">{request.bookingDate}</td>
                                <td className="py-4 px-6  w-40">{request.deliveryDate}</td>
                                <td className="py-4 px-6">
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                        className="p-2 border rounded-md"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Ready for delivery">Ready for delivery</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Service_Request;
