import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { success, message, token, name, email } = result;
      console.log(result);

      if (!response.ok || !success) {
        return handleError(message || "Login failed. Please try again.");
      }

      handleSuccess(message || "Login Successful");

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      handleError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <a href="/signup" className="text-decoration-none">Don't have an account? Sign up</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
