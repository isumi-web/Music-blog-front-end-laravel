import React from 'react';
import AdminSidebar from '../../component/adminSidebar';
import Navbar from '../../component/navbar';

const AdminHome = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 mt-16 ml-64">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-4">Welcome to the admin dashboard. Use the sidebar to navigate through the admin options.</p>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
