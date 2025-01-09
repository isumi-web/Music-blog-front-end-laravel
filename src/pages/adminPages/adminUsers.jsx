import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../component/adminSidebar';
import Navbar from '../../component/navbar';
import { api } from '../../lib/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get(`/user?page=${page}`);
      setUsers(response.data.users);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/user/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user. Please try again.");
      console.error('Error deleting user:', error.response?.data || error.message);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      fetchUsers(previousPage);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
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
                <th className="px-4 py-2 border">Image</th>
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
                  <td className="px-4 py-2 border">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="object-cover w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-900 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-900 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
