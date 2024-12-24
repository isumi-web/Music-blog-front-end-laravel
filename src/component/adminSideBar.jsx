import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="fixed top-16 left-0 w-64 h-full text-white bg-blue-600">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 hover:bg-blue-700">
            <Link to="/admin/users">Users</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700">
            <Link to="/admin/albums">Albums</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700">
            <Link to="/admin/songs">Songs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
