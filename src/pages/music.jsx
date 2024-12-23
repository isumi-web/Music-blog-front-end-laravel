import { useState, useEffect } from 'react';
import Navbar from "../component/navbar";
import { api } from "../lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../component/footer';

function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    albumId: '',
    imageUrl: '',
  });
  const [showForm, setShowForm] = useState(false);
  const user_type = 'fan'; 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get('/songs');
        setSongs(response.data.data);
      } catch (error) {
        console.error('Error fetching songs:', error.response?.data || error.message);
      }
    };
    fetchSongs();
  }, []);

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
        setShowForm(false);
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
        {user_type !== 'fan' && (
          <>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
            >
              {showForm ? 'Cancel' : 'Add Song'}
            </button>
            {showForm && (
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
                  className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
                >
                  Save Song
                </button>
              </form>
            )}
          </>
        )}
        <div>
          <h2 className="text-2xl font-semibold">Song List</h2>
          <ul className="mt-4">
            {songs.map((song, index) => (
              <li key={index} className="p-4 mb-4 border rounded">
                <div className="flex items-center">
                  <img src={song.image_url} alt={song.name} className="w-16 h-16 mr-4 rounded" />
                  <div>
                    <h3 className="text-xl font-bold">{song.name}</h3>
                    <p className="text-gray-600">{song.description}</p>
                    <p className="text-blue-500"><a href={song.url} target="_blank" rel="noopener noreferrer">Listen</a></p>
                    <p className="text-gray-600">Album: {song.albumName}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MusicPage;
