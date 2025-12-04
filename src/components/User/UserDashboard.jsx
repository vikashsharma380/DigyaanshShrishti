import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export default function UserDashboard() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/sweeper/supervisor-data/${user.id}`)

      .then((res) => res.json())
      .then((out) => setData(out));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">

      {/* --- TOP HEADER --- */}
      <div className="dash-header">
        <h2 className="dash-logo">User Panel</h2>

        <div className="dash-right">
          <span className="dash-admin-name">
            {user?.name || "User"}
          </span>

          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <h1 className="dash-title">Your Block Data</h1>

      {data.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No data found for your block.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Block Name</th>
                <th>School Name</th>
                <th>Sweeper Name</th>
                <th>No. of Toilets</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.block}</td>
                  <td>{item.schoolName}</td>
                  <td>{item.sweeperName}</td>
                  <td>{item.toilets}</td>
                  <td>{item.accountNumber}</td>
                  <td>{item.ifsc}</td>
                  <td>{item.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
