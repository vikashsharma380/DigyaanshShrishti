import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AdminSweeperData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("ALL");

  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
const deleteSweeper = async (id) => {
  if (!window.confirm("Delete this sweeper?")) return;

  const res = await fetch(
    `https://digyaanshshrishti.onrender.com/api/sweeper/delete/${id}`,
    { method: "DELETE" }
  );

  const out = await res.json();

  if (out.success) {
    alert("Deleted!");

    const remaining = data.filter((d) => d._id !== id);
    setData(remaining);
    setFiltered(remaining);
  } else {
    alert("Failed!");
  }
};

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    block: "",
    schoolName: "",
    sweeperName: "",
    toilets: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Load all data
  useEffect(() => {
    fetch("https://digyaanshshrishti.onrender.com/api/sweeper/all-data")
      .then((res) => res.json())
      .then((out) => {
        const clean = out.filter((i) => i && i.block);
        setData(clean);
        setFiltered(clean);

        const uniqueBlocks = [...new Set(clean.map((i) => i.block))];
        setBlocks(uniqueBlocks);
      });
  }, []);

  // Filter by block
  const handleFilter = (blockName) => {
    setSelectedBlock(blockName);

    if (blockName === "ALL") setFiltered(data);
    else setFiltered(data.filter((i) => i.block === blockName));
  };

  // Enable edit mode
  const enableEdit = (row) => {
    setEditingId(row._id);
    setEditRow({ ...row });
  };

  // Update edit form
  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  // Save updated data
  const saveEdit = async () => {
    const res = await fetch(`https://digyaanshshrishti.onrender.com/api/sweeper/update/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editRow),
    });

    const out = await res.json();

    if (out.success) {
      alert("Updated Successfully!");

      const updatedList = data.map((item) =>
        item._id === editingId ? editRow : item
      );

      setData(updatedList);
      setFiltered(updatedList);

      setEditingId(null);
    }
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SweeperData");
    XLSX.writeFile(workbook, "Sweeper_Data.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Add new sweeper into DB
  const saveNewSweeper = async () => {
    const payload = {
      ...addForm,
      toilets: Number(addForm.toilets) || 0,
      salary: Number(addForm.salary) || 0,
    };

    const res = await fetch("https://digyaanshshrishti.onrender.com/api//sweeper/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const out = await res.json();

    if (out.success) {
      alert("Sweeper Added!");

      setData([out.newData, ...data]);
      setFiltered([out.newData, ...filtered]);

      setShowAddForm(false);
      setAddForm({
        block: "",
        schoolName: "",
        sweeperName: "",
        toilets: "",
        accountNumber: "",
        ifsc: "",
        salary: "",
      });
    } else {
      alert(out.message);
    }
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

      {/* Excel Download + Add */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        <button
          onClick={downloadExcel}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            borderRadius: "8px",
          }}
        >
          ⬇️ Download Excel
        </button>

        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            borderRadius: "8px",
          }}
        >
          ➕ Add Sweeper
        </button>
      </div>

      {/* Block Filter */}
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
        <p>No data found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Block</th>
                <th>School</th>
                <th>Sweeper</th>
                <th>Toilets</th>
                <th>Account No.</th>
                <th>IFSC</th>
                <th>Salary</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) =>
                editingId === item._id ? (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <td><input value={editRow.block} onChange={(e) => handleEditChange("block", e.target.value)} /></td>
                    <td><input value={editRow.schoolName} onChange={(e) => handleEditChange("schoolName", e.target.value)} /></td>
                    <td><input value={editRow.sweeperName} onChange={(e) => handleEditChange("sweeperName", e.target.value)} /></td>
                    <td><input value={editRow.toilets} onChange={(e) => handleEditChange("toilets", e.target.value)} /></td>
                    <td><input value={editRow.accountNumber} onChange={(e) => handleEditChange("accountNumber", e.target.value)} /></td>
                    <td><input value={editRow.ifsc} onChange={(e) => handleEditChange("ifsc", e.target.value)} /></td>
                    <td><input value={editRow.salary} onChange={(e) => handleEditChange("salary", e.target.value)} /></td>

                    <td>
                      <button
                        onClick={saveEdit}
                        style={{
                          padding: "5px 10px",
                          background: "blue",
                          color: "white",
                          borderRadius: "6px",
                        }}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.block}</td>
                    <td>{item.schoolName}</td>
                    <td>{item.sweeperName}</td>
                    <td>{item.toilets}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.ifsc}</td>
                    <td>{item.salary}</td>

                    <td>
                      <button
                        onClick={() => enableEdit(item)}
                        style={{
                          padding: "5px 10px",
                          background: "orange",
                          color: "black",
                          borderRadius: "6px",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
  <button
    onClick={() => deleteSweeper(item._id)}
    style={{
      padding: "5px 10px",
      background: "red",
      color: "white",
      borderRadius: "6px",
    }}
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
      )}

      {/* ADD POPUP */}
    {showAddForm && (
  <div className="overlay">
    <div className="popup">

      <h2>Add New Sweeper</h2>

      {/* BLOCK DROPDOWN — ADMIN CAN SELECT ANY BLOCK */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>BLOCK</label>
        <select
          value={addForm.block}
          onChange={(e) => setAddForm({ ...addForm, block: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">Select Block</option>

          {blocks.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}

        </select>
      </div>

      {/* SCHOOL NAME */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>School Name</label>
        <input
          value={addForm.schoolName}
          onChange={(e) =>
            setAddForm({ ...addForm, schoolName: e.target.value })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* SWEEPER NAME */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>Sweeper Name</label>
        <input
          value={addForm.sweeperName}
          onChange={(e) =>
            setAddForm({ ...addForm, sweeperName: e.target.value })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* TOILETS */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>Toilets</label>
        <input
          type="number"
          value={addForm.toilets}
          onChange={(e) =>
            setAddForm({ ...addForm, toilets: Number(e.target.value) })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* ACCOUNT NUMBER */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>Account Number</label>
        <input
          value={addForm.accountNumber}
          onChange={(e) =>
            setAddForm({ ...addForm, accountNumber: e.target.value })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* IFSC */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>IFSC</label>
        <input
          value={addForm.ifsc}
          onChange={(e) =>
            setAddForm({ ...addForm, ifsc: e.target.value })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* SALARY */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "600" }}>Salary</label>
        <input
          type="number"
          value={addForm.salary}
          onChange={(e) =>
            setAddForm({ ...addForm, salary: Number(e.target.value) })
          }
          style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
        />
      </div>

      {/* BUTTONS */}
      <button
        onClick={saveNewSweeper}
        style={{
          padding: "10px 15px",
          background: "green",
          color: "white",
          borderRadius: "8px",
          marginRight: "10px",
        }}
      >
        Save
      </button>

      <button
        onClick={() => setShowAddForm(false)}
        style={{
          padding: "10px 15px",
          background: "red",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Cancel
      </button>

    </div>
  </div>
)}


    </div>
  );
}
