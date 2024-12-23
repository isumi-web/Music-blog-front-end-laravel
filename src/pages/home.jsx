import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { api } from "../lib/auth";

const HomePage = () => {
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

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="relative w-full bg-blue-500 h-[80vh]">
          <img
            src="../wallpaper.jpg"
            alt="Wallpaper"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-50">
            <h1 className="text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
              Welcome to Entertainment World
            </h1>
          </div>
        </div>
        <section className="px-4 py-8 md:px-12 bg-gradient-to-r from-blue-50 to-white">
          <h2 className="mb-6 text-3xl font-bold text-blue-800 underline decoration-2 decoration-blue-600">
            Albums
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {albums.map((album) => (
              <div key={album.id} className="p-4 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                <img
                  src={album.image_url}
                  alt={album.name}
                  className="object-cover w-full h-48 rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-blue-700">
                  {album.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {album.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="px-4 py-8 bg-white md:px-12">
          <h2 className="mb-6 text-3xl font-bold text-blue-800 underline decoration-2 decoration-blue-600">
            Our Artists
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 transition-transform transform rounded-lg shadow-lg bg-blue-50 hover:scale-105">
              <img
                src="artist1.jpg"
                alt="Artist 1"
                className="object-cover w-32 h-32 rounded-full"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-700">
                Artist 1
              </h3>
            </div>
            <div className="flex flex-col items-center p-6 transition-transform transform rounded-lg shadow-lg bg-blue-50 hover:scale-105">
              <img
                src="artist2.jpg"
                alt="Artist 2"
                className="object-cover w-32 h-32 rounded-full"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-700">
                Artist 2
              </h3>
            </div>
            <div className="flex flex-col items-center p-6 transition-transform transform rounded-lg shadow-lg bg-blue-50 hover:scale-105">
              <img
                src="artist3.jpg"
                alt="Artist 3"
                className="object-cover w-32 h-32 rounded-full"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-700">
                Artist 3
              </h3>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
