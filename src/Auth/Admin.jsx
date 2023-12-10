/* eslint-disable */

// Import necessary dependencies and styles
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Import your CSS file for styling

// Define the SignIn component
const SignIn = () => {
  // State to manage form data (username and password)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Submit handler for the sign-in form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the server for user authentication
      const response = await axios.post(
        "https://localhost:44337/api/Admin/Login",
        formData
      );

      // Check if the login is successful
      if (response.status === 200) {
        // Retrieve the JWT token from the response and store it in local storage
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Navigate to the "/home" route upon successful login
        navigate("/home");
      } else {
        // Log an error message if the login fails
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      // Log an error message if an error occurs during login
      console.error("An error occurred during login:", error);
    }
  };

  // Create an authorized Axios instance with an interceptor to attach the JWT token to headers
  const authorizedAxios = axios.create();
  authorizedAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Function to fetch authorized data
  const fetchData = async () => {
    try {
      // Make a GET request to fetch authorized data using the authorized Axios instance
      const response = await authorizedAxios.get(
        "http://localhost:44337/api/Employee/GetEmployees"
      );

      // Log the response data to the console
      console.log(response.data);

      // Navigate to the "/employeePanel" route
      navigate("/employeePanel");
    } catch (error) {
      // Log an error message if there's an error fetching data
      console.error("Error fetching data:", error);
    }
  };

  // Input change handler to update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // JSX structure for the sign-in form and fetch data button
  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>

      <button className="fetch-data-button" onClick={fetchData}>
        Fetch Authorized Data
      </button>
    </div>
  );
};

// Export the SignIn component
export default SignIn;
