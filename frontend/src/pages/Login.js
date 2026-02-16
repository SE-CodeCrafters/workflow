import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginTeacher } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: loading ? "#7bbfe5" : "#4cafee",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: loading ? "not-allowed" : "pointer",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginTeacher({ email: email.trim(), password });
      navigate("/teacher/dashboard");
    } catch (err) {
      setError(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>Teacher Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={inputStyle}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            style={inputStyle}
            required
          />
          {error ? <p style={{ color: "#ffd6d6", margin: "12px 0 0" }}>{error}</p> : null}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "18px", marginBottom: 0 }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "#9bd9ff" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
