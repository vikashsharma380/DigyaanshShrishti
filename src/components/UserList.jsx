import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminUsersExcelView() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});

  useEffect(() => {
    fetch("https://digyaanshshrishti.onrender.com/api/users/list")
      .then((res) => res.json())
      .then((out) => {
        if (out.success) setUsers(out.users);
      });
  }, []);

  // ============= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/users/delete/${id}`,
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
      `https://digyaanshshrishti.onrender.com/api/users/update/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRow),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Updated!");

      const updated = users.map((u) =>
        u._id === editingId ? out.updated : u
      );

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
    <div className="p-10 min-h-screen bg-gray-100">
      {/* STYLE */}
      <style>{`
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          font-size: 14px;
        }
        th, td {
          border: 1px solid #d1d5db;
          padding: 10px;
          text-align: left;
        }
        th {
          background: #f3f4f6;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background: #f9fafb;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-6">Users (Editable Table)</h1>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel ⬇️
      </button>

      {/* TABLE */}
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
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) =>
            editingId === u._id ? (
              // ===================== EDIT MODE ROW =====================
              <tr key={u._id}>

                <td>{i + 1}</td>

                <td><input value={editRow.name} onChange={(e) => handleEditChange("name", e.target.value)} /></td>
                <td><input value={editRow.fatherName} onChange={(e) => handleEditChange("fatherName", e.target.value)} /></td>
                <td><input value={editRow.gender} onChange={(e) => handleEditChange("gender", e.target.value)} /></td>
                <td><input value={editRow.dob} onChange={(e) => handleEditChange("dob", e.target.value)} /></td>
                <td><input value={editRow.mobile} onChange={(e) => handleEditChange("mobile", e.target.value)} /></td>
                <td><input value={editRow.email} onChange={(e) => handleEditChange("email", e.target.value)} /></td>
                <td><input value={editRow.aadhaar} onChange={(e) => handleEditChange("aadhaar", e.target.value)} /></td>
                <td><input value={editRow.district} onChange={(e) => handleEditChange("district", e.target.value)} /></td>
                <td><input value={editRow.block} onChange={(e) => handleEditChange("block", e.target.value)} /></td>
                <td><input value={editRow.designation} onChange={(e) => handleEditChange("designation", e.target.value)} /></td>
                <td><input value={editRow.address} onChange={(e) => handleEditChange("address", e.target.value)} /></td>

                <td><input value={editRow.bankDetails?.accountNumber} onChange={(e) => handleEditChange("bank.accountNumber", e.target.value)} /></td>
                <td><input value={editRow.bankDetails?.ifscCode} onChange={(e) => handleEditChange("bank.ifscCode", e.target.value)} /></td>
                <td><input value={editRow.bankDetails?.bankName} onChange={(e) => handleEditChange("bank.bankName", e.target.value)} /></td>

                <td>{u.access}</td>
                <td>{u.createdAt?.slice(0, 10)}</td>

                {/* SAVE + CANCEL */}
                <td>
                  <button
                    onClick={saveEdit}
                    style={{ background: "green", color: "white", padding: "6px" }}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    style={{ background: "gray", color: "white", padding: "6px", marginLeft: "5px" }}
                  >
                    Cancel
                  </button>
                </td>

              </tr>
            ) : (
              // ===================== NORMAL ROW =====================
              <tr key={u._id}>
                <td>{i + 1}</td>

                <td>{u.name}</td>
                <td>{u.fatherName}</td>
                <td>{u.gender}</td>
                <td>{u.dob}</td>
                <td>{u.mobile}</td>
                <td>{u.email}</td>
                <td>{u.aadhaar}</td>
                <td>{u.district}</td>
                <td>{u.block}</td>
                <td>{u.designation}</td>
                <td>{u.address}</td>

                <td>{u.bankDetails?.accountNumber}</td>
                <td>{u.bankDetails?.ifscCode}</td>
                <td>{u.bankDetails?.bankName}</td>

                <td>{u.access}</td>
                <td>{u.createdAt?.slice(0, 10)}</td>

                <td>
                  <button
                    onClick={() => enableEdit(u)}
                    style={{ background: "orange", padding: "5px", marginRight: "5px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{ background: "red", padding: "5px", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
