import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/sweeper/supervisor-data/${user.id}`)
      .then((res) => res.json())
      .then((out) => {
        setData(out);
        setFiltered(out);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // SEARCH
  useEffect(() => {
    let result = data;

    if (blockFilter !== "") {
      result = result.filter((row) => row.block === blockFilter);
    }

    if (search.trim() !== "") {
      result = result.filter((row) =>
        row.schoolName.toLowerCase().includes(search.toLowerCase()) ||
        row.sweeperName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, blockFilter, data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }

        .topbar {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: rgba(15,23,42,0.9);
          border-bottom: 1px solid rgba(148,163,184,0.15);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .title {
          font-size: 30px;
          font-weight: 800;
          background: linear-gradient(135deg,#6366f1,#ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .profile {
          display:flex;
          align-items:center;
          gap:20px;
        }

        .logout-btn {
          background: linear-gradient(135deg,#ef4444,#dc2626);
          padding:10px 18px;
          border-radius:8px;
          border:none;
          font-weight:600;
          cursor:pointer;
          color:white;
        }
        .logout-btn:hover {
          opacity:0.9;
        }

        .content {
          padding:40px;
        }

        .filters {
          display:flex;
          gap:20px;
          margin-bottom:20px;
        }

        .filter-input {
          background: rgba(255,255,255,0.08);
          padding:10px 15px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,0.1);
          color:white;
          width:260px;
        }

        table {
          width:100%;
          border-collapse: collapse;
          margin-top:20px;
          background: rgba(255,255,255,0.03);
          border-radius:12px;
          overflow:hidden;
        }

        th {
          background: rgba(255,255,255,0.08);
          padding:12px;
          text-align:left;
          font-size:14px;
          color:#cbd5e1;
        }

        td {
          padding:12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        tr:hover {
          background: rgba(255,255,255,0.05);
        }

      `}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="title">User Dashboard</div>

        <div className="profile">
          <span style={{ fontSize: "15px" }}>
            👤 {user?.name || "User"}
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>
          Your Block Data
        </h2>

        {/* SEARCH + FILTERS */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search school or sweeper..."
            className="filter-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-input"
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
          >
            <option value="">Filter by Block</option>
            {[...new Set(data.map((d) => d.block))].map((block, i) => (
              <option key={i} value={block}>
                {block}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        {filtered.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Block</th>
                <th>School</th>
                <th>Sweeper</th>
                <th>Toilets</th>
                <th>Account No.</th>
                <th>IFSC</th>
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
        )}
      </div>
    </div>
  );
}
