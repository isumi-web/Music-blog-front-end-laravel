import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../component/adminSidebar';
import Navbar from '../../component/navbar';
import { api } from '../../lib/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    imageUrl: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/albums', formData);
      if (response.status === 201) {
        const newAlbum = response.data.album;
        setAlbums([...albums, newAlbum]);
        setFormData({ name: '', artist: '', imageUrl: '' });
        toast.success("Album added successfully!");
        setShowForm(false);
      }
    } catch (error) {
      toast.error("Error adding album. Please try again.");
      console.error('Error adding album:', error.response?.data || error.message);
    }
  };

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

  const handleEdit = (album) => {
    setFormData({
      name: album.name,
      artist: album.artist,
      imageUrl: album.image_url,
    });
    setShowForm(true);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 mt-16 ml-64">
          <h1 className="text-3xl font-bold">Admin Albums</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            {showForm ? 'Cancel' : 'Add Album'}
          </button>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {['name', 'artist', 'imageUrl'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
              >
                Save Album
              </button>
            </form>
          )}
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
                      onClick={() => handleEdit(album)}
                      className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                    >
                      Edit
                    </button>
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
