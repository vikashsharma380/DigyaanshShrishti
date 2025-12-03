import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = "admin@digi.com";
    const validPassword = "123456";

    if (email === validEmail && pass === validPassword) {
      setError("");
      alert("Login Successful!");
      navigate("/dashboard"); // PERFECT NAVIGATION
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-bg">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Login to access your dashboard</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <label>Password</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button className="btn-primary login-btn" type="submit">
              Login →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
