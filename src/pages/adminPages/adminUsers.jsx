import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../component/adminSidebar';
import Navbar from '../../component/navbar';
import { api } from '../../lib/auth';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user');
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 mt-16 ml-64">
          <h1 className="text-3xl font-bold">Admin Users</h1>
          <table className="w-full mt-4 bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">{user.user_type}</td>
                  <td className="px-4 py-2 border">
                    <button className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded">Edit</button>
                    <button className="px-2 py-1 text-white bg-red-500 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
