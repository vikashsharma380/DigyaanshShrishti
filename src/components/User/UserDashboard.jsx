import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "../../styles/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  // ---- SAFE USER ----
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentUser, setCurrentUser] = useState(user);
  const [showProfile, setShowProfile] = useState(false);

  // ⭐ Sweeper / Night Guard Switch
  const roleType = currentUser?.roleType || "sweeper";

  const canModify = currentUser?.access === "active";

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [showAddForm, setShowAddForm] = useState(false);

  const [addForm, setAddForm] = useState({
    block: currentUser?.block || "",
    schoolName: "",
    sweeperName: "",
    guardName: "",
    toilets: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
  });

  // ---------------- FETCH DATA BASED ON ROLE ----------------
  useEffect(() => {
    const apiPath =
      roleType === "nightguard"
        ? "nightguard/supervisor-data"
        : "sweeper/supervisor-data";

    fetch(`https://digyaanshshrishti.onrender.com/api/${apiPath}/${user.id}`)
      .then((res) => res.json())
      .then((out) => {
        const cleanData = out.filter((d) => d && d.block);
        setData(cleanData);
        setFiltered(cleanData);
      })
      .catch(() => setData([]));
  }, [roleType]);

  // ---------------- FILTER ----------------
  useEffect(() => {
    let result = [...data];

    if (blockFilter) {
      result = result.filter((row) => row.block === blockFilter);
    }

    if (search.trim()) {
      const key = roleType === "nightguard" ? "guardName" : "sweeperName";

      result = result.filter(
        (row) =>
          row.schoolName?.toLowerCase().includes(search.toLowerCase()) ||
          row[key]?.toLowerCase().includes(search.toLowerCase())
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

  // ---------------- DELETE ----------------
  const deleteRow = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    const apiPath = roleType === "nightguard" ? "nightguard" : "sweeper";

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/${apiPath}/delete/${id}`,
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

  // ---------------- EDIT ----------------
  const startEdit = (row) => {
    setEditingId(row._id);
    setEditForm(row);
  };

  const saveEdit = async () => {
    const apiPath = roleType === "nightguard" ? "nightguard" : "sweeper";

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/${apiPath}/update/${editingId}`,
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
  const saveNew = async () => {
    const apiPath =
      roleType === "nightguard" ? "nightguard/add" : "sweeper/add";

    const payload = { ...addForm };
    if (roleType === "nightguard") delete payload.sweeperName;
    else delete payload.guardName;

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/${apiPath}`,
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
      alert("Added Successfully!");
    } else {
      alert(out.message);
    }
  };

  // ---------------- DOWNLOAD EXCEL ----------------
  const downloadExcel = () => {
    const cleaned = filtered.map((item) => {
      const obj = { ...item };
      delete obj._id;
      delete obj.__v;
      delete obj.district;
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(cleaned);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${roleType}-data.xlsx`);
  };

  return (
    <div className="dashboard-bg">
      {/* TOPBAR */}
      <div className="topbar modern-topbar">
        <h1 className="title">
          {roleType === "nightguard"
            ? "Night Guard Dashboard"
            : "Sweeper Dashboard"}
        </h1>

        <div className="profile" onClick={() => setShowProfile(true)}>
          <span>👤 {currentUser?.name}</span>
          <button
            className="logout-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content dashboard-container">
        {/* FILTERS */}
        <div className="filter-box">
          <input
            className="filter-input"
            placeholder={`Search school or ${
              roleType === "nightguard" ? "guard" : "sweeper"
            }...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-input"
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
          >
            <option value="">Filter Block</option>

            {[...new Set(data.map((d) => d.block))].map((b) => (
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
              ➕ Add New
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
              <th>{roleType === "nightguard" ? "Guard Name" : "Sweeper"}</th>
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
                        value={
                          roleType === "nightguard"
                            ? editForm.guardName
                            : editForm.sweeperName
                        }
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            [roleType === "nightguard"
                              ? "guardName"
                              : "sweeperName"]: e.target.value,
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
                    <td>
                      {roleType === "nightguard"
                        ? row.guardName
                        : row.sweeperName}
                    </td>

                    <td>{row.toilets}</td>
                    <td>{row.accountNumber}</td>
                    <td>{row.ifsc}</td>
                    <td>{row.salary}</td>

                    {canModify && (
                      <td>
                        <button onClick={() => startEdit(row)}>✏ Edit</button>
                      </td>
                    )}

                    {canModify && (
                      <td>
                        <button
                          onClick={() => deleteRow(row._id)}
                          style={{ background: "red", color: "white" }}
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
              <h3>Add New {roleType === "nightguard" ? "Guard" : "Sweeper"}</h3>

              <div style={{ marginBottom: "10px" }}>
                <label>Block</label>
                <input
                  value={addForm.block}
                  readOnly
                  style={{ background: "#eee" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>School Name</label>
                <input
                  value={addForm.schoolName}
                  onChange={(e) =>
                    setAddForm({ ...addForm, schoolName: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>
                  {roleType === "nightguard" ? "Guard Name" : "Sweeper Name"}
                </label>
                <input
                  value={
                    roleType === "nightguard"
                      ? addForm.guardName
                      : addForm.sweeperName
                  }
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      [roleType === "nightguard" ? "guardName" : "sweeperName"]:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Toilets</label>
                <input
                  value={addForm.toilets}
                  onChange={(e) =>
                    setAddForm({ ...addForm, toilets: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Account Number</label>
                <input
                  value={addForm.accountNumber}
                  onChange={(e) =>
                    setAddForm({ ...addForm, accountNumber: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>IFSC</label>
                <input
                  value={addForm.ifsc}
                  onChange={(e) =>
                    setAddForm({ ...addForm, ifsc: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Salary</label>
                <input
                  value={addForm.salary}
                  onChange={(e) =>
                    setAddForm({ ...addForm, salary: e.target.value })
                  }
                />
              </div>

              <button onClick={saveNew}>Save</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* PROFILE BOX */}
      {showProfile && (
        <div className="profile-overlay">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">{currentUser?.name?.charAt(0)}</div>
              <h2>User Profile</h2>
              <p className="sub-text">Account Information</p>
            </div>

            <table className="profile-table-pro">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{currentUser?.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{currentUser?.email}</td>
                </tr>

                <tr>
                  <th>Mobile</th>
                  <td>{currentUser?.mobile}</td>
                </tr>
                <tr>
                  <th>District</th>
                  <td>{currentUser?.district}</td>
                </tr>
                <tr>
                  <th>Block</th>
                  <td>{currentUser?.block}</td>
                </tr>
               {currentUser?.bankDetails ? (
  <>
    <tr>
      <th>Bank Name</th>
      <td>{currentUser.bankDetails.bankName || "Not Provided"}</td>
    </tr>

    <tr>
      <th>Account Number</th>
      <td>{currentUser.bankDetails.accountNumber || "Not Provided"}</td>
    </tr>

    <tr>
      <th>IFSC Code</th>
      <td>{currentUser.bankDetails.ifscCode || "Not Provided"}</td>
    </tr>
  </>
) : (
  <tr>
    <th>Bank Details</th>
    <td>Not Provided</td>
  </tr>
)}

                <tr>
                  <th>Role Type</th>
                  <td>{roleType}</td>
                </tr>
              </tbody>
            </table>

            <button
              className="close-btn-pro"
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
