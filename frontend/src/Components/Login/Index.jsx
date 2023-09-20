import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    senha: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4004/login", userData);
      if (response.data.success) {
        alert("Login successful!");
        navigate("/product");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again later.");
    }
  };

  // Inline styles for the components
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loginContainerStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "24px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const linkStyle = {
    display: "block",
    marginTop: "10px",
    textDecoration: "none",
    color: "#007bff",
  };

  return (
    <div style={containerStyle}>
      <div style={loginContainerStyle}>
        <h1 style={titleStyle}>Login</h1>
        <label style={labelStyle}>Email:</label>
        <input
          style={inputStyle}
          type="text"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <label style={labelStyle}>Password:</label>
        <input
          style={inputStyle}
          type="password"
          name="senha"
          value={userData.senha}
          onChange={handleInputChange}
        />
        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>
        <Link to="/cadastro" style={linkStyle}>
          Create an account
        </Link>
      </div>
    </div>
  );
};