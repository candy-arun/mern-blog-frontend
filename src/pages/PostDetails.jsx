import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../services/api";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        alert("Post not found");
        navigate("/");
      }
    }
    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!token) return alert("You must be logged in!");
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.description}</p>

        {/* ✅ Show full blog content */}
        {post.content && (
          <div className="text-gray-800 mb-6 whitespace-pre-line">
            {post.content}
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Author: {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {token && (
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
