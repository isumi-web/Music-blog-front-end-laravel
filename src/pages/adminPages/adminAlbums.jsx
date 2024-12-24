import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../component/adminSidebar';
import Navbar from '../../component/navbar';
import { api } from '../../lib/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/albums');
        setAlbums(response.data.data);
      } catch (error) {
        console.error('Error fetching albums:', error.response?.data || error.message);
      }
    };
    fetchAlbums();
  }, []);

  const handleDelete = async (albumId) => {
    try {
      await api.delete(`/albums/${albumId}`);
      setAlbums(albums.filter(album => album.id !== albumId));
      toast.success("Album deleted successfully!");
    } catch (error) {
      toast.error("Error deleting album. Please try again.");
      console.error('Error deleting album:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 mt-16 ml-64">
          <h1 className="text-3xl font-bold">Admin Albums</h1>
          <table className="w-full mt-4 bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Artist</th>
                <th className="px-4 py-2 border">ImageURL</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-4 py-2 border">{album.name}</td>
                  <td className="px-4 py-2 border">{album.artist}</td>
                  <td className="px-4 py-2 border">{album.image_url}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(album.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
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

export default AdminAlbums;
