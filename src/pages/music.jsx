import { useState } from 'react';
import Navbar from "../component/navbar";

function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    duration: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newSong = await response.json();
        setSongs([...songs, newSong]);
        setFormData({ title: '', artist: '', genre: '', duration: '' });
      }
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Music Page</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {['title', 'artist', 'genre', 'duration'].map((field) => (
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
              {song.title} by {song.artist} ({song.genre}, {song.duration} mins)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MusicPage;
