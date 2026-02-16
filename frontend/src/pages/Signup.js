import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a1f44, #1b3b70, #2c5590)",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "16px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "20px",
    background: "rgba(29, 53, 87, 0.95)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    color: "#fff",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f7fa",
    color: "#0d1b2a",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>Teacher Signup</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Full Name" style={inputStyle} required />
          <input placeholder="Phone Number" style={inputStyle} required />
          <input type="email" placeholder="Email" style={inputStyle} required />
          <input type="password" placeholder="Password" style={inputStyle} required />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4cafee",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        {submitted ? (
          <p style={{ color: "#d8f6ff", marginTop: "12px" }}>
            Signup UI is ready. Connect backend registration endpoint next.
          </p>
        ) : null}

        <p style={{ marginTop: "18px", marginBottom: 0 }}>
          Already have an account?{" "}
          <Link to="/teacher/login" style={{ color: "#9bd9ff" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
