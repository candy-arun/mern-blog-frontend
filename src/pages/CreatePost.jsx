import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content: "", // ✅ Added content field
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in!");

    try {
      await createPost(postData, token);
      alert("Post created successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold">Create a New Post</h1>

        <input
          type="text"
          placeholder="Title"
          className="border rounded w-full p-2"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Short description"
          className="border rounded w-full p-2"
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />

        {/* ✅ Full content field */}
        <textarea
          placeholder="Write your full blog content..."
          className="border rounded w-full p-2 h-40"
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
