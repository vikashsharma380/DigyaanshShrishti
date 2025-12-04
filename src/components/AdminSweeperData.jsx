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

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Load all data
  useEffect(() => {
    fetch("http://localhost:5000/api/sweeper/all-data")
      .then((res) => res.json())
      .then((out) => {
        setData(out);
        setFiltered(out);

        const uniqueBlocks = [...new Set(out.map((i) => i.block))];
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

  // Update value in editRow state
  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  // Save updated data to DB
  const saveEdit = async () => {
    const res = await fetch(`http://localhost:5000/api/sweeper/update/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editRow),
    });

    const out = await res.json();

    if (out.success) {
      alert("Updated Successfully!");

      // update list UI also
      const updatedData = data.map((item) =>
        item._id === editingId ? editRow : item
      );

      setData(updatedData);
      setFiltered(updatedData);

      setEditingId(null);
    } else {
      alert("Update Failed");
    }
  };

  // Excel Download Function
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

      {/* Excel Download */}
      <button
        onClick={downloadExcel}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      >
        ⬇️ Download Excel
      </button>

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

                    <td>
                      <input
                        value={editRow.block}
                        onChange={(e) => handleEditChange("block", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.schoolName}
                        onChange={(e) => handleEditChange("schoolName", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.sweeperName}
                        onChange={(e) => handleEditChange("sweeperName", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.toilets}
                        onChange={(e) => handleEditChange("toilets", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.accountNumber}
                        onChange={(e) => handleEditChange("accountNumber", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.ifsc}
                        onChange={(e) => handleEditChange("ifsc", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editRow.salary}
                        onChange={(e) => handleEditChange("salary", e.target.value)}
                      />
                    </td>

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
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
