import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response.data.msg || "Login Failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
