import { useState, useEffect } from 'react';
import Navbar from "../component/navbar";
import { api } from "../lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../component/footer';

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    imageUrl: '',
  });
  const [showForm, setShowForm] = useState(false);
  const user_type = 'fan'; 
  const user_id = 1; 

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
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Albums Page</h1>
        {user_type !== 'fan' && (
          <>
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
          </>
        )}
        <div>
          <h2 className="text-2xl font-semibold">Album List</h2>
          <ul className="mt-4">
            {albums.map((album, index) => (
              <li key={index} className="p-4 mb-4 border rounded">
                <div className="flex items-center">
                  <img src={album.image_url} alt={album.name} className="w-16 h-16 mr-4 rounded" />
                  <div>
                    <h3 className="text-xl font-bold">{album.name}</h3>
                    <p className="text-gray-600">{album.artist}</p>
                    {user_type === 'artist' && album.user_id === user_id && (
                      <div className="mt-2">
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
                      </div>
                    )}
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

export default AlbumsPage;
