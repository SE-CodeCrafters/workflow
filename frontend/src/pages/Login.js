import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a1f44, #1b3b70, #2c5590)",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const cardStyle = {
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(29, 53, 87, 0.95)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    color: "#fff",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f7fa",
    color: "#0d1b2a",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  };

  const inputFocusStyle = {
    border: "1px solid #4cafee",
    boxShadow: "0 0 8px rgba(76, 175, 238, 0.4)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4cafee",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#6fc8ff",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "30px" }}>Welcome Back!</h2>

        <input
          type="text"
          placeholder="Email or Phone"
          style={{ ...inputStyle, ...(emailFocus ? inputFocusStyle : {}) }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ ...inputStyle, ...(passFocus ? inputFocusStyle : {}) }}
          onFocus={() => setPassFocus(true)}
          onBlur={() => setPassFocus(false)}
        />

        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Login
        </button>

        <p style={{ marginTop: "20px" }}>
          No account? <Link to="/signup" style={{ color: "#4cafee" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
