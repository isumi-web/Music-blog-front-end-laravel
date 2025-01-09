import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-full pt-16 text-white bg-blue-900">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 hover:bg-blue-900">
            <Link to="/admin/users">Users</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-900">
            <Link to="/admin/albums">Albums</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-900">
            <Link to="/admin/songs">Songs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
