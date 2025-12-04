import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminSweeperData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("ALL");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Load all data
  useEffect(() => {
    fetch("http://localhost:5000/api/sweeper/all-data")
      .then((res) => res.json())
      .then((out) => {
        setData(out);
        setFiltered(out);

        // Extract unique block names
        const uniqueBlocks = [...new Set(out.map((i) => i.block))];
        setBlocks(uniqueBlocks);
      });
  }, []);

  // Filter when block selected
  const handleFilter = (blockName) => {
    setSelectedBlock(blockName);

    if (blockName === "ALL") {
      setFiltered(data);
    } else {
      const f = data.filter((item) => item.block === blockName);
      setFiltered(f);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dash-header">
        <h2 className="dash-logo">Admin Panel</h2>

        <div className="dash-right">
          <span className="dash-admin-name">{user?.name}</span>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <h1 className="dash-title">All Sweeper Data</h1>

      {/* BLOCK FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "18px", fontWeight: "600" }}>
          Filter by Block:
        </label>

        <select
          value={selectedBlock}
          onChange={(e) => handleFilter(e.target.value)}
          style={{
            marginLeft: "15px",
            padding: "8px 12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #999",
          }}
        >
          <option value="ALL">All Blocks</option>

          {blocks.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No data found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Block</th>
                <th>School Name</th>
                <th>Sweeper Name</th>
                <th>Toilets</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) => (
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
