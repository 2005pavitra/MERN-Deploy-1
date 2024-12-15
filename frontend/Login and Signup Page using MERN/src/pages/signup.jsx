import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://mern-deploy-1-api.vercel.app
/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message } = result;

      if (!response.ok) {
        return handleError(message || "Signup failed. PLEASE try again");
      }

      if (success) {
        handleSuccess(message || "Signup Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      handleError(error || "An error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">Already have an account? Login</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
