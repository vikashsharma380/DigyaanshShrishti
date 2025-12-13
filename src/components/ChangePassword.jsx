import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css"; // same styling reuse

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://api.digyaanshshrishti.com/api/auth/change-password",
        {
          userId,
          newPassword,
        }
      );

      // ✅ auto login after password change
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);

      if (res.data.user.designation === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Change Password</h2>
          <p className="login-subtitle">
            Please change your password to continue
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label>New Password</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button
              className="btn-primary login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
