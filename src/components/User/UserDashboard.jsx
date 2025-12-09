import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "../../styles/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  // ---- SAFE USER ----
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`https://digyaanshshrishti.onrender.com/api/users/${user.id}`)
      .then((res) => res.json())
      .then((updatedUser) => {
        console.log("Fetched updated user:", updatedUser);

        if (updatedUser.success) {
          const u = {
            ...updatedUser.user,
            id: updatedUser.user._id, 
          };

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...res.data.user,
              id: res.data.user.id || res.data.user._id,
            })
          );

          setCurrentUser(u);
        }
      });
  }, []);

  const canModify = currentUser?.access === "active";

  useEffect(() => {
    if (!currentUser?.id) {
      navigate("/login");
    }
  }, [currentUser]);

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  // ---------------- DELETE ----------------
  const deleteSweeper = async (id) => {
    if (!window.confirm("Delete this sweeper?")) return;

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/sweeper/delete/${id}`,
      { method: "DELETE" }
    );

    const out = await res.json();

    if (out.success) {
      alert("Deleted!");

      const updated = data.filter((d) => d._id !== id);
      setData(updated);
      setFiltered(updated);
    } else {
      alert("Failed!");
    }
  };

  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    block: currentUser?.block || user.block || "",

    schoolName: "",
    sweeperName: "",
    toilets: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
  });

  // ---------------- FETCH BLOCKWISE DATA ----------------
  useEffect(() => {
    fetch(
      `https://digyaanshshrishti.onrender.com/api/sweeper/supervisor-data/${user.id}`
    )
      .then((res) => res.json())
      .then((out) => {
        const cleanData = out.filter((d) => d && d.block);
        setData(cleanData);
        setFiltered(cleanData);
      })
      .catch(() => setData([]));
  }, []);

  // ---------------- FILTERING ----------------
  useEffect(() => {
    let result = [...data];

    if (blockFilter) {
      result = result.filter((row) => row.block === blockFilter);
    }

    if (search.trim()) {
      result = result.filter(
        (row) =>
          row.schoolName.toLowerCase().includes(search.toLowerCase()) ||
          row.sweeperName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, blockFilter, data]);

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ---------------- EDIT ----------------
  const startEdit = (row) => {
    setEditingId(row._id);
    setEditForm(row);
  };

  const saveEdit = async () => {
    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/sweeper/update/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );

    const out = await res.json();

    if (out.success) {
      const newData = data.map((d) => (d._id === editingId ? out.updated : d));

      setData(newData);
      setEditingId(null);
      alert("Updated Successfully!");
    }
  };

  // ---------------- ADD NEW ----------------
  const addSweeper = async () => {
    const payload = {
      ...addForm,
      toilets: Number(addForm.toilets) || 0,
      salary: Number(addForm.salary) || 0,
    };

    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/sweeper/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const out = await res.json();

    if (out.success) {
      setData([out.newData, ...data]);
      setShowAddForm(false);
      alert("Sweeper Added!");
    } else {
      alert(out.message);
    }
  };

  // ---------------- DOWNLOAD EXCEL ----------------
  const downloadExcel = () => {
  // Clean unwanted keys
  const cleaned = filtered.map(item => {
    const obj = { ...item.toUpperCase() };

    delete obj._id;
    delete obj.district;
    delete obj.__v;

    return obj;
  });

  console.log("Cleaned Data: ", cleaned);  // ← Check this (ID should be removed)

  const ws = XLSX.utils.json_to_sheet(cleaned);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sweeper Data");
  XLSX.writeFile(wb, "SweeperData.xlsx");
};



  return (
    <div className="dashboard-bg">
      {/* TOPBAR */}
      <div className="topbar modern-topbar">
        <h1 className="title">User Dashboard</h1>

        <div className="profile">
          <span>👤 {currentUser?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="content dashboard-container">
        {/* FILTERS */}
        <div className="filter-box">
          <input
            className="filter-input"
            placeholder="Search school or sweeper..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-input"
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
          >
            <option value="">Filter Block</option>

            {[
              ...new Set(data.filter((d) => d && d.block).map((d) => d.block)),
            ].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <button className="btn" onClick={downloadExcel}>
            📥 Download Excel
          </button>
          {canModify && (
            <button className="btn" onClick={() => setShowAddForm(true)}>
              ➕ Add Sweeper
            </button>
          )}
        </div>

        {/* TABLE */}
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Block</th>
              <th>School</th>
              <th>Sweeper</th>
              <th>Toilets</th>
              <th>Account No</th>
              <th>IFSC</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr key={row._id || index}>
                <td>{index + 1}</td>

                {editingId === row._id ? (
                  <>
                    <td>
                      <input
                        value={editForm.block}
                        onChange={(e) =>
                          setEditForm({ ...editForm, block: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.schoolName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            schoolName: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.sweeperName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            sweeperName: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.toilets}
                        onChange={(e) =>
                          setEditForm({ ...editForm, toilets: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.accountNumber}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            accountNumber: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.ifsc}
                        onChange={(e) =>
                          setEditForm({ ...editForm, ifsc: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.salary}
                        onChange={(e) =>
                          setEditForm({ ...editForm, salary: e.target.value })
                        }
                      />
                    </td>

                    <td>
                      <button onClick={saveEdit}>💾 Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{row.block}</td>
                    <td>{row.schoolName}</td>
                    <td>{row.sweeperName}</td>
                    <td>{row.toilets}</td>
                    <td>{row.accountNumber}</td>
                    <td>{row.ifsc}</td>
                    <td>{row.salary}</td>
                    {currentUser?.access === "active" && (
                      <td>
                        <button onClick={() => startEdit(row)}>✏ Edit</button>
                      </td>
                    )}
                    {currentUser?.access === "active" && (
                      <td>
                        <button
                          onClick={() => deleteSweeper(row._id)}
                          style={{
                            background: "red",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "6px",
                          }}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD POPUP */}
        {showAddForm && (
          <div className="overlay">
            <div className="popup popup-modern">
              <h3>Add Sweeper</h3>

              {Object.keys(addForm).map((key) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                  <label>{key.toUpperCase()}</label>

                  <input
                    value={addForm[key]}
                    onChange={(e) =>
                      setAddForm({ ...addForm, [key]: e.target.value })
                    }
                    readOnly={key === "block"}
                    style={{ background: key === "block" ? "#eee" : "white" }}
                  />
                </div>
              ))}

              <button onClick={addSweeper}>Save</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
