import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        console.error(err);
        alert("Post not found");
        navigate("/");
      }
    }
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in!");

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
