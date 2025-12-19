import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "../../styles/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  // ---- SAFE USER (initial from localStorage) ----
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentUser, setCurrentUser] = useState(stored);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const adminBackup = JSON.parse(localStorage.getItem("admin_backup"));


  // ⭐ role + permission derived state
  const [roleType, setRoleType] = useState(stored?.roleType || "sweeper");
  const [canModify, setCanModify] = useState(stored?.access === "active");

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    block: stored?.block || "",
    schoolName: "",
    sweeperName: "",
    guardName: "",
    toilets: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
  });

  // ---------- helper: fetch fresh user from API ----------
  const fetchCurrentUser = useCallback(async () => {
    if (!currentUser?._id && !stored?.id && !stored?._id) return;
    const id = currentUser._id || stored.id || stored._id;
    try {
      const res = await fetch(
        `https://api.digyaanshshrishti.com/api/users/${id}`
      );
      const out = await res.json();
      if (out.success && out.user) {
        setCurrentUser(out.user);
        setRoleType(out.user.roleType || "sweeper");
        setCanModify(out.user.access === "active");
        localStorage.setItem("user", JSON.stringify(out.user));
        // keep addForm.block in sync if needed
        setAddForm((prev) => ({ ...prev, block: out.user.block || prev.block }));
      }
    } catch (err) {
      console.error("Failed fetching current user:", err);
    }
  }, [currentUser._id, stored.id, stored._id]);

  // ---------- re-fetch current user on mount and when localStorage or focus changes ----------
  useEffect(() => {
    // initial fetch to ensure latest
    fetchCurrentUser();

    const onStorage = (e) => {
      if (e.key === "user") {
        // another tab updated the user
        try {
          const u = JSON.parse(e.newValue || "{}");
          if (u && u._id) {
            setCurrentUser(u);
            setRoleType(u.roleType || "sweeper");
            setCanModify(u.access === "active");
            setAddForm((prev) => ({ ...prev, block: u.block || prev.block }));
          } else {
            // fallback fetch
            fetchCurrentUser();
          }
        } catch {
          fetchCurrentUser();
        }
      }
    };

  

    const onFocus = () => {
      // user returned to tab: re-fetch to pick up admin changes
      fetchCurrentUser();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchCurrentUser();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fetchCurrentUser]);

    useEffect(() => {
  const id = currentUser._id || stored.id || stored._id;
  if (!id) return;

  fetch(`https://api.digyaanshshrishti.com/api/notifications/user/${id}`)
    .then(res => res.json())
    .then(out => {
      if (out.success) {
        setNotifications(out.notifications || []);
      }
    })
    .catch(err => console.error("Notification Error:", err));
}, [currentUser]);
  // ---------------- FETCH DATA BASED ON ROLE & currentUser id ----------------
  useEffect(() => {
    const id = currentUser._id || stored.id || stored._id;
    if (!id) return;
if (currentUser.visibility !== "on") {
  setData([]);
  setFiltered([]);
  return;
}

    const apiPath =
      roleType === "nightguard"
        ? "nightguard/supervisor-data"
        : "sweeper/supervisor-data";

    fetch(`https://api.digyaanshshrishti.com/api/${apiPath}/${id}`)
      .then((res) => res.json())
      .then((out) => {
        // handle both array response or wrapped object
        const list = Array.isArray(out) ? out : out.list || out.data || out;
        const cleanData = (list || []).filter((d) => d && d.block);
        setData(cleanData);
        setFiltered(cleanData);
      })
      .catch((err) => {
        console.error("Failed fetching role data:", err);
        setData([]);
        setFiltered([]);
      });
  }, [roleType, currentUser._id, stored.id, stored._id]);

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
          (row.schoolName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          ((row[key] || "").toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFiltered(result);
  }, [search, blockFilter, data, roleType]);

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
      `https://api.digyaanshshrishti.com/api/${apiPath}/delete/${id}`,
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
      `https://api.digyaanshshrishti.com/api/${apiPath}/update/${editingId}`,
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
      `https://api.digyaanshshrishti.com/api/${apiPath}`,
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
  // Remove unwanted fields
  const cleaned = filtered.map(item => {
    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      district,  // REMOVE THIS IF NOT NEEDED
      ...rest
    } = item;

    return rest;
  });

  const worksheet = XLSX.utils.json_to_sheet(cleaned);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "SweeperData");
  XLSX.writeFile(workbook, "Sweeper_Data.xlsx");
};


  // ---------- render UI (unchanged UI logic) ----------
  return (
    <div className="dashboard-bg">
      {/* TOPBAR */}
      <div className="topbar modern-topbar">
        {/* 🔙 BACK TO ADMIN (ONLY WHEN IMPERSONATING) */}
  {adminBackup && (
    <button
      onClick={() => {
        localStorage.setItem("token", adminBackup.token);
        localStorage.setItem("user", JSON.stringify(adminBackup.user));
        localStorage.removeItem("admin_backup");
        window.location.replace("/dashboard");
      }}
      style={{
        background: "#ff9800",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        marginRight: "15px",
      }}
    >
      ⬅ Back to Admin
    </button>
  )}

  
        <h1 className="title">
          {roleType === "nightguard" ? "Night Guard Dashboard" : "Sweeper Dashboard"}
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
        <div className="notification-box" onClick={() => setShowNotifications(prev => !prev)}>
  <span className="bell-icon">🔔</span>

  {notifications.length > 0 && (
    <span className="notif-count">{notifications.length}</span>
  )}
</div>

      </div>

      {/* CONTENT */}
      <div className="content dashboard-container">
        {/* FILTERS */}
        <div className="filter-box">
          <input
            className="filter-input"
            placeholder={`Search school or ${roleType === "nightguard" ? "guard" : "sweeper"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="filter-input" value={blockFilter} onChange={(e) => setBlockFilter(e.target.value)}>
            <option value="">Filter Block</option>
            {[...new Set(data.map((d) => d.block))].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

{currentUser?.access === "active" && (
  <button className="btn" onClick={downloadExcel}>
    📥 Download Excel
  </button>
)}


          {canModify && <button className="btn" onClick={() => setShowAddForm(true)}>➕ Add New</button>}
        </div>
{currentUser?.visibility !== "on" && (
  <div
    style={{
      background: "#ffe0e0",
      color: "#b00020",
      padding: "14px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontWeight: "600",
      textAlign: "center",
    }}
  >
    🚫 Access disabled by Admin. Data is hidden.
  </div>
)}

        {/* TABLE */}
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th><th>Block</th><th>School</th><th>{roleType === "nightguard" ? "Guard Name" : "Sweeper"}</th>
              {roleType !== "nightguard" && <th>Toilets</th>}
<th>Account No</th><th>IFSC</th><th>Salary</th> <th>Payment</th><th>Edit</th><th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr key={row._id || index}>
                <td>{index + 1}</td>
                {editingId === row._id ? (
                  <>
                    <td><input value={editForm.block} onChange={(e) => setEditForm({...editForm, block: e.target.value})} /></td>
                    <td><input value={editForm.schoolName} onChange={(e) => setEditForm({...editForm, schoolName: e.target.value})} /></td>
                    <td>
                      <input
                        value={roleType === "nightguard" ? editForm.guardName : editForm.sweeperName}
                        onChange={(e) => setEditForm({...editForm, [roleType === "nightguard" ? "guardName" : "sweeperName"]: e.target.value})}
                      />
                    </td>
                    <td><input value={editForm.toilets} onChange={(e) => setEditForm({...editForm, toilets: e.target.value})} /></td>
                    <td><input value={editForm.accountNumber} onChange={(e) => setEditForm({...editForm, accountNumber: e.target.value})} /></td>
                    <td><input value={editForm.ifsc} onChange={(e) => setEditForm({...editForm, ifsc: e.target.value})} /></td>
                    <td>
  <input
    value={editForm.salary}
    onChange={(e) =>
      setEditForm({ ...editForm, salary: e.target.value })
    }
  />
</td>

{/* PAYMENT STATUS (READ ONLY) */}
<td>
  {editForm.utrNumber ? (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "16px",
        background: "#d1e7dd",
        color: "#0f5132",
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      {editForm.utrNumber}
    </span>
  ) : (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "16px",
        background: "#f8d7da",
        color: "#842029",
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      Pending
    </span>
  )}
</td>

<td>
  <button onClick={saveEdit}>💾 Save</button>
</td>

                  </>
                ) : (
                  <>
                    <td>{row.block}</td>
                    <td>{row.schoolName}</td>
                    <td>{roleType === "nightguard" ? row.guardName : row.sweeperName}</td>
                  {roleType !== "nightguard" && <td>{row.toilets}</td>}

                    <td>{row.accountNumber}</td>
                    <td>{row.ifsc}</td>
                    <td>{row.salary}</td>
                    <td>
  {row.utrNumber ? (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "16px",
        background: "#d1e7dd",
        color: "#0f5132",
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      {row.utrNumber}
    </span>
  ) : (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "16px",
        background: "#f8d7da",
        color: "#842029",
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      Pending
    </span>
  )}
</td>

                    {canModify && <td><button onClick={() => startEdit(row)}>✏ Edit</button></td>}
                    {canModify && <td><button onClick={() => deleteRow(row._id)} style={{background:"red",color:"white"}}>🗑 Delete</button></td>}
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
              <div style={{marginBottom:10}}>
                <label>Block</label>
                <input value={addForm.block} readOnly style={{background:"#eee"}}/>
              </div>
              <div style={{marginBottom:10}}>
                <label>School Name</label>
                <input value={addForm.schoolName} onChange={(e)=>setAddForm({...addForm, schoolName: e.target.value})}/>
              </div>
              <div style={{marginBottom:10}}>
                <label>{roleType === "nightguard" ? "Guard Name" : "Sweeper Name"}</label>
                <input value={roleType === "nightguard" ? addForm.guardName : addForm.sweeperName}
                  onChange={(e)=>setAddForm({...addForm, [roleType === "nightguard" ? "guardName" : "sweeperName"]: e.target.value})}/>
              </div>
             {roleType !== "nightguard" && (
  <div style={{ marginBottom: "10px" }}>
    <label>Toilets</label>
    <input
      value={addForm.toilets}
      onChange={(e) =>
        setAddForm({ ...addForm, toilets: e.target.value })
      }
    />
  </div>
)}

              <div style={{marginBottom:10}}>
                <label>Account Number</label>
                <input value={addForm.accountNumber} onChange={(e)=>setAddForm({...addForm, accountNumber: e.target.value})}/>
              </div>
              <div style={{marginBottom:10}}>
                <label>IFSC</label>
                <input value={addForm.ifsc} onChange={(e)=>setAddForm({...addForm, ifsc: e.target.value})}/>
              </div>
              <div style={{marginBottom:10}}>
                <label>Salary</label>
                <input value={addForm.salary} onChange={(e)=>setAddForm({...addForm, salary: e.target.value})}/>
              </div>

              <button style={{background:"green",color:"white", marginRight:250, fontSize : "25px"}} onClick={saveNew}>Save</button>
              <button style={{background:"red",color:"white" , fontSize : "25px"}} onClick={()=>setShowAddForm(false)}>Cancel</button>
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
                <tr><th>Name</th><td>{currentUser?.name}</td></tr>
                <tr><th>Email</th><td>{currentUser?.email}</td></tr>
                <tr><th>Mobile</th><td>{currentUser?.mobile}</td></tr>
                <tr><th>District</th><td>{currentUser?.district}</td></tr>
                <tr><th>Block</th><td>{currentUser?.block}</td></tr>
                {currentUser?.bankDetails ? (
                  <>
                    <tr><th>Bank Name</th><td>{currentUser.bankDetails.bankName || "Not Provided"}</td></tr>
                    <tr><th>Account Number</th><td>{currentUser.bankDetails.accountNumber || "Not Provided"}</td></tr>
                    <tr><th>IFSC Code</th><td>{currentUser.bankDetails.ifscCode || "Not Provided"}</td></tr>
                  </>
                ) : (<tr><th>Bank Details</th><td>Not Provided</td></tr>)}
                <tr><th>Role Type</th><td>{roleType}</td></tr>
              </tbody>
            </table>

            <button className="close-btn-pro" onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}

      {showNotifications && (
  <div className="notification-dropdown">
    <h4>Notifications</h4>

    {notifications.length === 0 ? (
      <p className="empty">No notifications</p>
    ) : (
      notifications.map((n, i) => (
        <div key={i} className="notif-item">
          <p>{n.message}</p>
          <span className="time">{new Date(n.createdAt).toLocaleString()}</span>
        </div>
      ))
    )}
  </div>
)}

    </div>
  );
}
