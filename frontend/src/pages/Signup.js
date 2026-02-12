import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [nameFocus, setNameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
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
        <h2 style={{ marginBottom: "30px" }}>Create an Account</h2>

        <input
          placeholder="Full Name"
          style={{ ...inputStyle, ...(nameFocus ? inputFocusStyle : {}) }}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <input
          placeholder="Phone Number"
          style={{ ...inputStyle, ...(phoneFocus ? inputFocusStyle : {}) }}
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        />
        <input
          type="email"
          placeholder="Email"
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

        <select style={{ ...inputStyle, padding: "12px" }}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Sign Up
        </button>

        <p style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/" style={{ color: "#4cafee" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
