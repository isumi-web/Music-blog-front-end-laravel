import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { api } from "../lib/auth";

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumsResponse, artistsResponse] = await Promise.all([
          api.get('/albums'),
          api.get('/public/artists')
        ]);

        setAlbums(albumsResponse.data.data || []);
        setArtists(artistsResponse.data.users || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlbums([]);
        setArtists([]);
      }
    };
    fetchData();
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
                  src={album.image}
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
            {artists.length > 0 ? (
              artists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center p-6 transition-transform transform rounded-lg shadow-lg bg-blue-50 hover:scale-105">
                  <div className="w-32 h-32 overflow-hidden rounded-full">
                    <img
                      src={artist.image} 
                      alt={artist.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-blue-700">
                    {artist.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{artist.email}</p>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">No artists found</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

