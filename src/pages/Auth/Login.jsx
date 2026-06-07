import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // Use "username" instead of "email"
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShow(!show);
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username, // Use "username" instead of "email"
        password,
      });
      if (res) {
        // Handle successful login
        console.log("Login successful");
        navigate("/"); // Navigate to the home page
      } else {
        console.error("Login failed:", res.data);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
        >
          <h4 className="text-2xl font-bold text-center mb-6">LOGIN FORM</h4>
          <div className="mb-4">
            <input
              type="text" // Change input type to "text"
              autoFocus
              value={username} // Use "username" instead of "email"
              onChange={(e) => setUsername(e.target.value)} // Use "setUsername"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter Your Username" // Change placeholder to "Enter Your Username"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Enter Your Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {show ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            LOGIN
          </button>
          <div className="mb-4 mx-6 flex justify-between align-items pt-5">
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
