import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function User_Login() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3005/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='flex'>
            <Navbar />
            <div className='flex-1 p-6 ml-72 overflow-y-auto'>
                <h1 className='text-3xl font-bold mb-6'>User Logins</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {users.map(user => (
                        <div key={user._id} className='bg-white p-4 rounded shadow'>
                            <h2 className='text-xl font-bold'>{user.name}</h2>
                            <p className='text-gray-700'>Email: {user.email}</p>
                            <p className='text-gray-700'>Mobile: {user.mob}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User_Login;
