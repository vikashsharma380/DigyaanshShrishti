import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import logo from "../assets/logo.jpeg";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://www.digyaanshshrishti.com/api/auth/login",
        {
          mobile: mobile,
          password: password,
        }
      );

      const { token, user } = res.data;

      // Save token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      // ⭐ Redirect based on designation
      if (user.designation === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      setLoading(false);
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="login-bg">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <div className="login-wrapper">
        <div className="login-card">
          {/* ⭐ YOUR LOGO ABOVE WELCOME BACK ⭐ */}
          <div className="login-logo-box">
            <img src={logo} alt="Company Logo" className="login-logo" />
          </div>

          <h2 className="login-title">Welcome Back To DSM</h2>
          <p className="login-subtitle">Login to access your dashboard</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label>Mobile Number</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button
              className="btn-primary login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
