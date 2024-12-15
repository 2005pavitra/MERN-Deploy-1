import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Set logged-in user name on component mount
  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (userName) {
      setLoggedInUser(userName);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const url = "http://mern-deploy-1-api.vercel.app
/products";
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const headers = {
        "Authorization": `Bearer ${token}`,
      };

      const response = await fetch(url, { headers });
      const result = await response.json();
      
      if (response.ok) {
        setProducts(result.products); // Assuming the response has a products key
      } else {
        throw new Error(result.message || "Failed to fetch products");
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Welcome {loggedInUser ? loggedInUser : "Guest"}</h1>
        <button onClick={handleLogout} className="btn btn-danger mt-3">
          Logout
        </button>
      </div>

      <h3 className="text-center">Products</h3>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              No products available.
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
