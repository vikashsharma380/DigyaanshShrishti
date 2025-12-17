import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function AdminUsersExcelView() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [uploading, setUploading] = useState(false);
const [viewUser, setViewUser] = useState(null);

const [search, setSearch] = useState("");
const filteredUsers = users.filter((u) => {
  const q = search.toLowerCase();

  return (
    u.name?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q) ||
    u.district?.toLowerCase().includes(q) ||
    u.designation?.toLowerCase().includes(q) ||
    u.roleType?.toLowerCase().includes(q) ||
    u.block?.toLowerCase().includes(q) ||
    u.schoolName?.toLowerCase().includes(q)|| 
    u.aadhaar?.toLowerCase().includes(q) ||
    u.mobile?.toLowerCase().includes(q) 
  );
});
const uploadExcel = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  const reader = new FileReader();

  reader.onload = async (evt) => {
    const data = evt.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, { raw: false });

    if (rows.length === 0) {
      alert("Excel is empty!");
      setUploading(false);
      return;
    }

    const formattedRows = rows.map((row) => {
      let dob = row.dob || row.DOB || row["Date of Birth"];

      if (typeof dob === "string" && dob.includes("-")) {
        const [dd, mm, yyyy] = dob.split("-");
        dob = `${yyyy}-${mm}-${dd}`;
      }

      if (typeof dob === "number") {
        const jsDate = new Date(Math.round((dob - 25569) * 86400 * 1000));
        dob = jsDate.toISOString().split("T")[0];
      }

      return { ...row, dob };
    });

    try {
      const res = await fetch(
        "https://api.digyaanshshrishti.com/api/users/bulk-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ users: formattedRows }),
        }
      );

      const out = await res.json();

      if (out.success) {
        alert(`✅ ${out.inserted} users uploaded`);
        setUsers((prev) => [...out.users, ...prev]);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  reader.readAsBinaryString(file);
};


const deleteAllUsers = async () => {
  const confirm1 = window.confirm(
    "⚠️ WARNING: This will delete ALL users except Super Admin. Continue?"
  );
  if (!confirm1) return;

  const confirm2 = window.prompt(
    'Type "DELETE ALL" to confirm'
  );
  if (confirm2 !== "DELETE ALL") {
    alert("Cancelled");
    return;
  }

  try {
    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/users/delete-all-users",
      {
        method: "DELETE",
      }
    );

    const out = await res.json();

    if (out.success) {
      alert(`✅ ${out.deletedCount} users deleted`);
      
      // Frontend state update (keep only admin)
      setUsers((prev) =>
        prev.filter((u) => u.designation === "Admin")
      );
    } else {
      alert("Failed to delete users");
    }
  } catch (err) {
    alert("Server error");
  }
};
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/users/list")
      .then((res) => res.json())
      .then((out) => {
        if (out.success) setUsers(out.users);
      });
  }, []);
  const toggleAccess = async (user) => {
    const newAccess = user.access === "active" ? "inactive" : "active";

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/users/update/${user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access: newAccess }),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Access Updated!");
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, access: newAccess } : u))
      );
    }
  };
const toggleRole = async (user) => {
  const newRole = user.roleType === "nightguard" ? "sweeper" : "nightguard";

  if (!window.confirm(`Change ${user.name} role to ${newRole}?`)) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/users/update/${user._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleType: newRole }), // ⭐ Only roleType update
    }
  );

  const out = await res.json();

  if (out.success) {
    alert("Role updated!");

    setUsers((prev) =>
      prev.map((u) =>
        u._id === user._id ? { ...u, roleType: newRole } : u
      )
    );
  }
};

const updateAllRoles = async (role) => {
  if (!window.confirm(`Are you sure to change ALL users to ${role}?`)) return;

  const res = await fetch(
    "https://api.digyaanshshrishti.com/api/users/update-all-roles",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleType: role }),
    }
  );

  const out = await res.json();

  if (out.success) {
    alert("All user roles updated!");

    // Update frontend state
    setUsers((prev) =>
      prev.map((u) =>
        u.designation === "Admin"
          ? u
          : { ...u, roleType: role }
      )
    );
  }
};

  // ============= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/users/delete/${id}`,
      { method: "DELETE" }
    );

    const out = await res.json();

    if (out.success) {
      alert("Deleted!");
      setUsers(users.filter((u) => u._id !== id));
    } else {
      alert("Failed!");
    }
  };

  // ============= ENABLE EDIT MODE =============
  const enableEdit = (user) => {
    setEditingId(user._id);
    setEditRow({ ...user });
  };
  const updateAllStatus = async (status) => {
    if (!window.confirm(`Are you sure to set all users as ${status}?`)) return;

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/users/update-all-status",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("All users updated!");

      // Update frontend state except admin
      setUsers((prev) =>
        prev.map((u) => (u.role === "admin" ? u : { ...u, access: status }))
      );
    }
  };
const loginAsUser = async (userId) => {
  if (!window.confirm("Login as this user?")) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/users/admin-login-as-user/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const out = await res.json();

  if (out.success) {
    // 🔐 BACKUP ORIGINAL ADMIN
    localStorage.setItem(
      "admin_backup",
      JSON.stringify({
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      })
    );

    // 👉 SWITCH TO USER
    localStorage.setItem("token", out.token);
    localStorage.setItem("user", JSON.stringify(out.user));

    // 🚀 REDIRECT TO USER DASHBOARD
    window.location.replace("/userdashboard");
  } else {
    alert(out.message);
  }
};


  // ============= HANDLE EDIT CHANGE ============
  const handleEditChange = (field, value) => {
    if (field.startsWith("bank.")) {
      const prop = field.split(".")[1];
      setEditRow((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [prop]: value,
        },
      }));
    } else {
      setEditRow((prev) => ({ ...prev, [field]: value }));
    }
  };

  // ============= SAVE EDIT =============
  const saveEdit = async () => {
    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/users/update/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRow),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Updated!");

      const updated = users.map((u) => (u._id === editingId ? out.updated : u));

      setUsers(updated);
      setEditingId(null);
    }
  };

  // ============= EXPORT TO EXCEL =============
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "Users_List.xlsx");
  };

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Users (Editable Table)</h1>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel ⬇️
      </button>
      <label
  className="download-btn"
  style={{ background: "#0a7cff", cursor: "pointer" }}
>
  {uploading ? "Uploading..." : "Upload Excel ⬆️"}
  <input
    type="file"
    accept=".xlsx, .xls"
    hidden
    onChange={uploadExcel}
  />
</label>

      <input
  type="text"
  placeholder="Search by name, mobile, email, district..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    margin: "15px 0",
    padding: "10px 14px",
    width: "320px",
    borderRadius: "8px",
    border: "1px solid #cfd6e1",
    fontSize: "14px",
  }}
/>
<button className="download-btn" style={{ background: "red" }} onClick={deleteAllUsers}>
  Delete All
</button>

      <div style={{ display: "flex", gap: "10px",justifyContent: "space-evenly", margin: "15px 0" }}>
        <button
  className="download-btn"
  style={{ background: "green" }}
  onClick={() => updateAllRoles("sweeper")}
>
  Set All as Sweeper
</button>

<button
  className="download-btn"
  style={{ background: "orange" }}
  onClick={() => updateAllRoles("nightguard")}
>
  Set All as Night Guard
</button>

        <button
          className="download-btn"
          style={{ background: "green" }}
          onClick={() => updateAllStatus("active")}
        >
          Activate All (Except Admin)
        </button>

        <button
          className="download-btn"
          style={{ background: "red" }}
          onClick={() => updateAllStatus("inactive")}
        >
          Deactivate All (Except Admin)
        </button>


        <button
  className="download-btn"
  style={{ background: "green" }}
  onClick={async () => {
    if (!window.confirm("Turn ON all users?")) return;

    await fetch(
      "https://api.digyaanshshrishti.com/api/users/update-all-visibility",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: "on" }),
      }
    );

    setUsers(prev =>
      prev.map(u =>
        u.designation === "Admin" ? u : { ...u, visibility: "on" }
      )
    );
  }}
>
  ALL ON
</button>

<button
  className="download-btn"
  style={{ background: "red" }}
  onClick={async () => {
    if (!window.confirm("Turn OFF all users?")) return;

    await fetch(
      "https://api.digyaanshshrishti.com/api/users/update-all-visibility",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: "off" }),
      }
    );

    setUsers(prev =>
      prev.map(u =>
        u.designation === "Admin" ? u : { ...u, visibility: "off" }
      )
    );
  }}
>
  ALL OFF
</button>

      </div>

      {/* TABLE */}
      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Father</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Password</th>
                <th>Aadhaar</th>
                <th>District</th>
                <th>Block</th>
                <th>Designation</th>
                <th>Address</th>
                <th>Account No.</th>
                <th>IFSC</th>
                <th>Bank Name</th>
                <th>Status</th>
                <th>CreatedAt</th>
                <th>Actions</th>
                <th>Role Action</th>

              </tr>
            </thead>

          <tbody>
  {/* NO DATA */}
  {filteredUsers.length === 0 && (
    <tr>
      <td colSpan="20" style={{ textAlign: "center", padding: "20px" }}>
        No users found
      </td>
    </tr>
  )}

  {filteredUsers.map((u, i) => {
    // ================= EDIT MODE =================
    if (editingId === u._id) {
      return (
        <tr key={u._id}>
          <td>{i + 1}</td>

          <td>
            <input
              value={editRow.name || ""}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.fatherName || ""}
              onChange={(e) => handleEditChange("fatherName", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.gender || ""}
              onChange={(e) => handleEditChange("gender", e.target.value)}
            />
          </td>

          <td>
            <input
  type="date"
  value={
    editRow.dob
      ? new Date(editRow.dob).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) => handleEditChange("dob", e.target.value)}
/>

          </td>

          <td>
            <input
              value={editRow.mobile || ""}
              onChange={(e) => handleEditChange("mobile", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.email || ""}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.password || ""}
              onChange={(e) => handleEditChange("password", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.aadhaar || ""}
              onChange={(e) => handleEditChange("aadhaar", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.district || ""}
              onChange={(e) => handleEditChange("district", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.block || ""}
              onChange={(e) => handleEditChange("block", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.designation || ""}
              onChange={(e) => handleEditChange("designation", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.address || ""}
              onChange={(e) => handleEditChange("address", e.target.value)}
            />
          </td>

          <td>
            <input
              value={editRow.bankDetails?.accountNumber || ""}
              onChange={(e) =>
                handleEditChange("bank.accountNumber", e.target.value)
              }
            />
          </td>

          <td>
            <input
              value={editRow.bankDetails?.ifscCode || ""}
              onChange={(e) =>
                handleEditChange("bank.ifscCode", e.target.value)
              }
            />
          </td>

          <td>
            <input
              value={editRow.bankDetails?.bankName || ""}
              onChange={(e) =>
                handleEditChange("bank.bankName", e.target.value)
              }
            />
          </td>

          <td>{u.access}</td>
          <td>{u.createdAt?.slice(0, 10)}</td>

          <td>
            <button onClick={saveEdit} className="action-btn save-btn">
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="action-btn cancel-btn"
            >
              Cancel
            </button>
          </td>

          <td>—</td>
        </tr>
      );
    }

    // ================= NORMAL VIEW =================
    return (
      <tr key={u._id}>
        <td>{i + 1}</td>
        <td>{u.name}</td>
        <td>{u.fatherName}</td>
        <td>{u.gender}</td>
        <td>
  {u.dob
    ? new Date(u.dob).toLocaleDateString("en-GB")
    : ""}
</td>

        <td>{u.mobile}</td>
        <td>{u.email}</td>
        <td>{u.password}</td>
        <td>{u.aadhaar}</td>
        <td>{u.district}</td>
        <td>{u.block}</td>
        <td>{u.designation}</td>
        <td>{u.address}</td>
        <td>{u.bankDetails?.accountNumber}</td>
        <td>{u.bankDetails?.ifscCode}</td>
        <td>{u.bankDetails?.bankName}</td>

        <td>
          <button
            onClick={() => toggleAccess(u)}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: u.access === "active" ? "green" : "red",
              color: "white",
              fontWeight: "600",
            }}
          >
            {u.access}
          </button>

         <div
  onClick={async () => {
    const newValue = u.visibility === "on" ? "off" : "on";

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/users/update-visibility/${u._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: newValue }),
      }
    );

    const out = await res.json();
    if (out.success) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === u._id ? { ...user, visibility: newValue } : user
        )
      );
    }
  }}
  className={`toggle-switch ${u.visibility === "on" ? "on" : "off"}`}
>
  <div className="toggle-thumb"></div>
</div>


        </td>

        <td>{u.createdAt?.slice(0, 10)}</td>

        <td>
          <button
            onClick={() => enableEdit(u)}
            className="action-btn edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => deleteUser(u._id)}
            className="action-btn delete-btn"
          >
            Delete
          </button>
          <button
    onClick={() => setViewUser(u)}
    className="action-btn"
    style={{ background: "#0a7cff", color: "white" }}
  >
    View
  </button>

  <button
  onClick={() => loginAsUser(u._id)}
  className="action-btn"
  style={{ background: "green", color: "white" }}
>
  Login
</button>

        </td>

        <td>
          <button
            onClick={() => toggleRole(u)}
            style={{
              padding: "6px 12px",
              background: u.roleType === "nightguard" ? "orange" : "blue",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {u.roleType === "nightguard"
              ? "Make Sweeper"
              : "Make Night Guard"}
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>

          {viewUser && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h2>User Details</h2>

      <div className="modal-grid">
        <p><b>Name:</b> {viewUser.name}</p>
        <p><b>Father:</b> {viewUser.fatherName}</p>
        <p><b>Gender:</b> {viewUser.gender}</p>
        <p><b>DOB:</b> {viewUser.dob
          ? new Date(viewUser.dob).toLocaleDateString("en-GB")
          : ""}</p>

        <p><b>Mobile:</b> {viewUser.mobile}</p>
        <p><b>Email:</b> {viewUser.email}</p>
        <p><b>Aadhaar:</b> {viewUser.aadhaar}</p>

        <p><b>District:</b> {viewUser.district}</p>
        <p><b>Block:</b> {viewUser.block}</p>
        <p><b>Designation:</b> {viewUser.designation}</p>

        <p><b>Address:</b> {viewUser.address}</p>

        <p><b>Account No:</b> {viewUser.bankDetails?.accountNumber}</p>
        <p><b>IFSC:</b> {viewUser.bankDetails?.ifscCode}</p>
        <p><b>Bank:</b> {viewUser.bankDetails?.bankName}</p>

        <p><b>Status:</b> {viewUser.access}</p>
        <p><b>Role:</b> {viewUser.roleType}</p>
        <p><b>Created:</b> {viewUser.createdAt?.slice(0,10)}</p>
      </div>

      <button
        className="download-btn"
        style={{ marginTop: "15px" }}
        onClick={() => setViewUser(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

        </div>
      </div>
      {/* STYLE */}
      <style>{`
/* ================= PAGE ================= */
.page-container {
  padding: 40px;
  background: #f5f6fa;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* Title */
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

/* Excel Download Button */
.download-btn {
  padding: 10px 16px;
  background: #000000ff;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.download-btn:hover {
  background: #3d59e5;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  padding: 24px;
  width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 12px;
}

.modal-card h2 {
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 700;
}

.modal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;
}

.modal-grid p {
  font-size: 14px;
}

/* ================= TABLE CARD ================= */
.table-card {
  background: white;
  padding: 0;
  border-radius: 12px;
  border: 1px solid #d5d9e2;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* Scroll wrapper */
.table-scroll {
  overflow-x: auto;
}

/* ================= TABLE ================= */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* --- HEADER --- */
thead th {
  background: #eef1f6;
  padding: 12px;
  color: #333;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  border-bottom: 1px solid #cfd6e1;
  white-space: nowrap;
}

/* --- BODY ROWS --- */
tbody tr {
  background: white;
  border-bottom: 1px solid #eceff4;
  transition: background 0.2s ease;
}
tbody tr:hover {
  background: #f7f9fc;
}

/* --- CELLS --- */
td {
  padding: 12px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Column size control */
th, td { max-width: 160px; }

/* SL column small */
th:nth-child(1), td:nth-child(1) { width: 40px; text-align: center; }

/* Address / email bigger */
th:nth-child(7), td:nth-child(7) { max-width: 220px; }
th:nth-child(12), td:nth-child(12) { max-width: 250px; }

/* ================= EDIT INPUT ================= */
input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #bfc7d5;
  border-radius: 6px;
  background: #ffffff;
  font-size: 13px;
}
input:focus {
  border-color: #4a6cff;
  box-shadow: 0 0 3px rgba(74,108,255,0.5);
  outline: none;
}

/* ================= ACTION BUTTONS ================= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.action-btn {
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.edit-btn {
  background: #000000ff;
  color: #ecececff;
}
.delete-btn {
  background: #e64242;
  color: white;
}
.save-btn {
  background: #000000ff;
  color: white;
}
.cancel-btn {
  background: #6c757d;
  color: white;
}
.edit-user-btn{
  background:"black";
  color:"white";
}
.create-user-btn {
  margin-left: 12px;
  padding: 10px 18px;
  background: linear-gradient(90deg, #030405ff, #000000ff);
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  box-shadow: 0 4px 14px rgba(0, 114, 255, 0.3);
}

.create-user-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 114, 255, 0.45);
}

.create-user-btn:active {
  transform: scale(0.95);
}
  .toggle-switch {
  width: 46px;
  height: 24px;
  border-radius: 30px;
  background: #cfd6e1;
  position: relative;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
}

.toggle-switch.on {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
}

.toggle-switch.off {
  background: #d32f2f;
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 2px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.toggle-switch.on .toggle-thumb {
  transform: translateX(22px);
}



`}</style>
    </div>
  );
}
