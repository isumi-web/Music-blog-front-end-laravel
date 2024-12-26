const AdminAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAlbumId, setEditAlbumId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlbums(currentPage);
  }, [currentPage]);

  const fetchAlbums = async (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page requests
    setLoading(true);
    try {
      const response = await api.get(`/albums?page=${page}`);
      setAlbums(response.data.data || []);
      setTotalPages(response.data.meta.last_page || 1);
    } catch (error) {
      toast.error("Error fetching albums");
      console.error("Error fetching albums:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (albumId) => {
    try {
      await api.delete(`/albums/${albumId}`);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
      toast.success("Album deleted successfully!");
    } catch (error) {
      toast.error("Error deleting album");
      console.error("Error deleting album:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAlbumId) {
        const response = await api.put(`/albums/${editAlbumId}`, formData);
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) =>
            album.id === editAlbumId ? response.data.data : album
          )
        );
        toast.success("Album updated successfully!");
      } else {
        const response = await api.post("/albums", formData);
        setAlbums((prevAlbums) => [response.data.data, ...prevAlbums]);
        toast.success("Album created successfully!");
      }
      resetForm();
    } catch (error) {
      toast.error(editAlbumId ? "Error updating album" : "Error creating album");
      console.error("Error saving album:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", artist: "", image: "" });
    setShowForm(false);
    setEditAlbumId(null);
  };

  const handleEdit = (album) => {
    setFormData({
      name: album.name,
      artist: album.artist,
      image: album.image,
    });
    setEditAlbumId(album.id);
    setShowForm(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
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
            onClick={() => {
              setShowForm(!showForm);
              resetForm();
            }}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            {showForm ? "Cancel" : "Add Album"}
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
                {editAlbumId ? "Update Album" : "Save Album"}
              </button>
            </form>
          )}

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <table className="w-full mt-4 bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Artist</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {albums.length > 0 ? (
                  albums.map((album) => (
                    <tr key={album.id}>
                      <td className="px-4 py-2 border">{album.id}</td>
                      <td className="px-4 py-2 border">{album.name}</td>
                      <td className="px-4 py-2 border">{album.artist}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={album.image}
                          alt={album.name}
                          className="object-cover w-20 h-20"
                        />
                      </td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center border">
                      No albums found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
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
