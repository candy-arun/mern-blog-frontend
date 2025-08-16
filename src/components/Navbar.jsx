import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">MERN Blog</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {token && <Link to="/create" className="hover:text-gray-300">Create Post</Link>}
          {!token && <Link to="/login" className="hover:text-gray-300">Login</Link>}
          {!token && <Link to="/register" className="hover:text-gray-300">Register</Link>}
          {token && <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>}
        </div>
      </div>
    </nav>
  );
}
