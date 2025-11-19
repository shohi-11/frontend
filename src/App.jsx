import React, { useState, createContext } from 'react';
import axios from 'axios';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Card from "./components/Cards/Card.jsx";
import Navbar from './components/Navbar/Navbar';
import All from './pages/All/All';
import Mens from './pages/Mens/Mens';
import Womens from './pages/Womens/Womens';

export const PassingValue = createContext();
export const api = "http://localhost:8004";

const App = () => {
  const [userstatus, setUserstatus] = useState("New user");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Move useNavigate inside the component body

  const updateStatus = () => {
    setUserstatus(userstatus === "New user" ? "Already a User" : "New user");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${api}/register`, {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${api}/login`, {
        email: formData.email,
        password: formData.password,
      });
      alert("Login Success! Token: " + res.data.token);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate('/'); // Now useNavigate is called within the <BrowserRouter> context
      fetchProtectedData();
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:8004/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch protected data");
    }
  };

  return (
      <div className='App' style={{ padding: "20px" }}>
        {isLoggedIn && <Navbar />}

        {/* Login Form */}
        <div
          className='login'
          style={{
            textAlign: "center",
            display: userstatus === "New user" && !isLoggedIn ? "flex" : "none",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Login</h1>
          <input type='text' name='email' placeholder='Enter Your Email' onChange={handleChange} />
          <input type='password' name='password' placeholder='Enter Your Password' onChange={handleChange} />
          <button onClick={handleLogin}>Login</button>
          <span onClick={updateStatus} style={{ cursor: 'pointer', color: 'blue' }}>
            {userstatus}
          </span>
        </div>

        {/* Register Form */}
        <div
          className='register'
          style={{
            textAlign: "center",
            display: userstatus === "Already a User" && !isLoggedIn ? "flex" : "none",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Register User</h1>
          <input type='text' name='name' placeholder='Enter Your Name' onChange={handleChange} />
          <input type='text' name='email' placeholder='Enter Your Email' onChange={handleChange} />
          <input type='text' name='mobile' placeholder='Enter Your Mobile' onChange={handleChange} />
          <input type='password' name='password' placeholder='Enter Your Password' onChange={handleChange} />
          <button onClick={handleRegister}>Register</button>
          <span onClick={updateStatus} style={{ cursor: 'pointer', color: 'blue' }}>
            {userstatus}
          </span>
        </div>

        {/* Routes when logged in */}
        {isLoggedIn && (
          <PassingValue.Provider value={products}>
            <Routes>
              <Route path='/' element={<All />} />
              <Route path='/mens' element={<Mens />} />
              <Route path='/womens' element={<Womens />} />
            </Routes>
          </PassingValue.Provider>
        )}
      </div>
  );
};

export default App;
