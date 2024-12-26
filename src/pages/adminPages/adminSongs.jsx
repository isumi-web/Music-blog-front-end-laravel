import React, { useState, useEffect } from "react";
import AdminSidebar from "../../component/adminSidebar";
import Navbar from "../../component/navbar";
import { api } from "../../lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSongs = () => {
  const [songs, setSongs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    albumId: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSongs = async (page = 1) => {
    try {
      const response = await api.get(`/songs?page=${page}`);
      setSongs(response.data.data || []);
      setTotalPages(response.data.meta?.last_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSongs([]);
    }
  };

  useEffect(() => {
    fetchSongs(currentPage);
  }, [currentPage]);

  const handleDelete = async (songId) => {
    try {
      await api.delete(`/songs/${songId}`);
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
      toast.success("Song deleted successfully!");
      fetchSongs(currentPage);
    } catch (error) {
      toast.error("Error deleting song");
      console.error(
        "Error deleting song:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.albumId) {
        toast.error("Album ID is required");
        return;
      }

      if (editSongId) {
        const response = await api.put(`/songs/${editSongId}`, formData);
        const updatedSong = response.data.data;

        if (updatedSong) {
          setSongs((prevSongs) =>
            prevSongs.map((song) =>
              song.id === editSongId ? updatedSong : song
            )
          );
          toast.success("Song updated successfully!");
        }
      } else {
        const response = await api.post("/songs", formData);
        const newSong = response.data.data;

        if (newSong) {
          setSongs((prevSongs) => [...prevSongs, newSong]);
          toast.success("Song created successfully!");
        }
      }

      setFormData({
        name: "",
        description: "",
        url: "",
        albumId: "",
        image: "",
      });
      setShowForm(false);
      setEditSongId(null);
      fetchSongs(currentPage);
    } catch (error) {
      toast.error(editSongId ? "Error updating song" : "Error creating song");
      console.error("Error saving song:", error);
    }
  };

  const handleEdit = (song) => {
    setFormData({
      name: song.name,
      description: song.description,
      url: song.url,
      albumId: song.albumId || "",
      image: song.image,
    });
    setEditSongId(song.id);
    setShowForm(true);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 mt-16 ml-64">
          <h1 className="text-3xl font-bold">Admin Songs</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditSongId(null);
              setFormData({
                name: "",
                description: "",
                url: "",
                albumId: "",
                image: "",
              });
            }}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            {showForm ? "Cancel" : "Add Song"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData).map((field) => (
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
                {editSongId ? "Update Song" : "Save Song"}
              </button>
            </form>
          )}

          <table className="w-full mt-4 bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">URL</th>
                <th className="px-4 py-2 border">Album ID</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs && songs.length > 0 ? (
                songs.map((song) =>
                  song && song.id ? (
                    <tr key={song.id}>
                      <td className="px-4 py-2 border">{song.id}</td>
                      <td className="px-4 py-2 border">{song.name}</td>
                      <td className="px-4 py-2 border">{song.description}</td>
                      <td className="px-4 py-2 border">{song.url}</td>
                      <td className="px-4 py-2 border">{song.albumId}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={song.image}
                          alt={song.name}
                          className="object-cover w-20 h-20"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleEdit(song)}
                          className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(song.id)}
                          className="px-2 py-1 text-white bg-red-500 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center border">
                    No songs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSongs;
