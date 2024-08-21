import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Service_Avaliable() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ heading: '', description: '', cost: '' });
    const [editService, setEditService] = useState(null);
    const [serviceToDelete, setServiceToDelete] = useState(null); // State to track service for deletion
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to show/hide delete confirmation

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:3005/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (serviceToDelete) {
                await axios.delete(`http://localhost:3005/services/${serviceToDelete._id}`);
                fetchServices();
                setShowDeleteConfirmation(false); // Close the confirmation dialog
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleAddService = async () => {
        try {
            await axios.post("http://localhost:3005/services", newService);
            setNewService({ heading: '', description: '', cost: '' });
            fetchServices();
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    const handleEditService = async (id) => {
        try {
            await axios.put(`http://localhost:3005/services/${id}`, editService);   
            setEditService(null);
            fetchServices();
        } catch (error) {
            console.error("Error updating service:", error);
        }
    };

    return (
        <div className="flex">
            <Navbar />
            <div className="flex-1 p-6 ml-72 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Available Services</h1>
                <div className="mb-6">
                    {services.map(service => (
                        <div key={service._id} className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold">{service.heading}</h2>
                                <p className="text-gray-700">{service.description}</p>
                                <p className="text-gray-900 font-semibold">Cost: ₹ {service.cost}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => {
                                        setServiceToDelete(service);
                                        setShowDeleteConfirmation(true);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                                <button onClick={() => setEditService(service)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 rounded shadow mb-6">
                    <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
                    <input
                        type="text"
                        placeholder="Service Name"
                        value={newService.heading}
                        onChange={(e) => setNewService({ ...newService, heading: e.target.value })}
                        className="block w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="block w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Cost"
                        value={newService.cost}
                        onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                        className="block w-full p-2 mb-2 border rounded"
                    />
                    <button onClick={handleAddService} className="bg-blue-500 text-white px-4 py-2 rounded">Add Service</button>
                </div>
                {editService && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3 animate-fadeIn">
                            <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
                            <input
                                type="text"
                                placeholder="Service Name"
                                value={editService.heading}
                                onChange={(e) => setEditService({ ...editService, heading: e.target.value })}
                                className="block w-full p-2 mb-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={editService.description}
                                onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                                className="block w-full p-2 mb-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Cost"
                                value={editService.cost}
                                onChange={(e) => setEditService({ ...editService, cost: e.target.value })}
                                className="block w-full p-2 mb-2 border rounded"
                            />
                            <div className="space-x-2">
                                <button onClick={() => handleEditService(editService._id)} className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
                                <button onClick={() => setEditService(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3 animate-fadeIn">
                            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this service?</h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Service_Avaliable;
