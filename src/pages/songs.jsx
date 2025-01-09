import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import { api } from "../lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../component/footer";

function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]); // State to store albums
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    albumName: "",
    image: "",
  });
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSongs = async (page = 1) => {
    try {
      const response = await api.get(`/songs?page=${page}`);
      setSongs(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      toast.error("Error loading songs");
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await api.get("/albums"); // Replace with your API endpoint for albums
      console.log("Albums API response:", response.data);
      setAlbums(Array.isArray(response.data.data) ? response.data.data : []); // Ensure albums is an array
    } catch (error) {
      toast.error("Error loading albums");
      console.error("Error fetching albums:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
    fetchSongs();
    fetchAlbums(); // Fetch albums when component mounts
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSongClick = () => {
    console.log("Albums state when 'Add Songs' clicked:", albums);
    setShowForm(!showForm);
    setFormData({ name: "", description: "", url: "", albumName: "", image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/songs", formData);
      if (response.status === 201) {
        toast.success("Song created successfully!");
        setFormData({ name: "", description: "", url: "", albumName: "", image: "" });
        setShowForm(false);
        fetchSongs(currentPage);
      } else {
        toast.error("Failed to create song");
      }
    } catch (error) {
      toast.error("Failed to create song");
      console.error("Error saving song:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (direction) => {
    const newPage = currentPage + direction;
    setCurrentPage(newPage);
    fetchSongs(newPage);
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Music Page</h1>
          {user && (
            <button
              onClick={handleAddSongClick}
              className="px-4 py-2 text-white bg-blue-900 rounded"
            >
              {showForm ? "Cancel" : "Add Song"}
            </button>
          )}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <label className="block mb-1 text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-semibold" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-semibold" htmlFor="url">
                URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-semibold" htmlFor="albumName">
                Album
              </label>
              <select
                id="albumName"
                name="albumName"
                value={formData.albumName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>
                  Select an album
                </option>
                {(Array.isArray(albums) ? albums : []).map((album) => (
                  <option key={album.id} value={album.name}>
                    {album.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-sm font-semibold" htmlFor="image">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Song"}
            </button>
          </form>
        )}
        <h2 className="text-2xl font-semibold">Song List</h2>
        <ul className="mt-4">
          {songs.map((song) => (
            <li key={song.id} className="p-4 mb-4 border rounded">
              <div className="flex items-center">
                <img src={song.image} alt={song.name} className="w-16 h-16 mr-4 rounded" />
                <div>
                  <h3 className="text-xl font-bold">{song.name}</h3>
                  <p className="text-gray-600">{song.description}</p>
                  <p className="text-blue-500">
                    <a href={song.url} target="_blank" rel="noopener noreferrer">
                      Listen
                    </a>
                  </p>
                  <p className="text-gray-600">Album: {song.albumName || "Unknown Album"}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => changePage(-1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-900 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => changePage(1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-900 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MusicPage;
