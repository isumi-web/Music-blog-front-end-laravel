import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <nav className="text-white bg-blue-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {user.role !== "admin" && (
              <h1 className="text-2xl font-bold">Entertainment</h1>
            )}
          </div>
          <div className="hidden space-x-6 md:flex">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/albums" className="hover:text-blue-300">
              Albums
            </Link>
            <Link to="/songs" className="hover:text-blue-300">
              Songs
            </Link>
            {isAuthenticated && user.role === "admin" && (
              <Link to="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="hover:text-blue-300"
                >
                  Account
                </button>
                {isAccountMenuOpen && (
                  <div className="absolute right-0 z-10 w-48 p-2 mt-2 bg-white rounded-md shadow-lg">
                    <p className="text-gray-700">Name: {user.name}</p>
                    <p className="text-gray-700">Email: {user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-300">
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="items-center hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 text-black rounded-md"
            />
            <button className="px-4 py-1 ml-2 bg-blue-700 rounded-md hover:bg-blue-800">
              Search
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-blue-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
            Home
          </Link>
          <Link to="/albums" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
            Albums
          </Link>
          <Link to="/songs" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
            Songs
          </Link>
          {isAuthenticated && user.role === "admin" && (
            <Link to="/dashboard" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <div className="px-3 py-2 text-white rounded-md hover:bg-blue-700">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 text-white rounded-md hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
          <div className="flex items-center px-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-3 py-1 text-black rounded-md"
            />
            <button className="px-4 py-1 ml-2 bg-blue-700 rounded-md hover:bg-blue-800">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
