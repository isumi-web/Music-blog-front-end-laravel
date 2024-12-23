import { useState } from 'react';
import Navbar from "../component/navbar";
import { api } from "../lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    albumId: '',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/songs', formData);
      if (response.status === 201) {
        const newSong = response.data.data;
        setSongs([...songs, newSong]);
        setFormData({ name: '', description: '', url: '', albumId: '', imageUrl: '' });
        toast.success("Song added successfully!");
      }
    } catch (error) {
      toast.error("Error adding song. Please try again.");
      console.error('Error adding song:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Music Page</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {['name', 'description', 'url', 'albumId', 'imageUrl'].map((field) => (
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
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Add Song
          </button>
        </form>
        <div>
          <h2 className="text-2xl font-semibold">Song List</h2>
          <ul className="mt-4">
            {songs.map((song, index) => (
              <li key={index} className="p-2 border-b">
                {song.name} - {song.description} ({song.url}, Album ID: {song.album_id}, Image URL: {song.image_url})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MusicPage;
