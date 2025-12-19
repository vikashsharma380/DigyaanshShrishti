import { useEffect, useState } from "react";
import "../styles/SweeperData.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AdminNightGuardData() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("ALL");

  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [addForm, setAddForm] = useState({
    block: "",
    schoolName: "",
    guardName: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
    utrNumber: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // LOAD ALL DATA
  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/nightguard/all-data")
      .then((res) => res.json())
      .then((out) => {
        const clean = out.filter((i) => i && i.block);
        setData(clean);
        setFiltered(clean);

        const uniqueBlocks = [...new Set(clean.map((i) => i.block))];
        setBlocks(uniqueBlocks);
      });
  }, []);

  // FILTER BY BLOCK
  const handleFilter = (blockName) => {
    setSelectedBlock(blockName);

    if (blockName === "ALL") setFiltered(data);
    else setFiltered(data.filter((i) => i.block === blockName));
  };

  // SEARCH
  const handleSearch = (value) => {
    setSearchQuery(value);

    const text = value.toLowerCase();

    const filteredData = data.filter((item) => {
      return (
        item.block.toLowerCase().includes(text) ||
        item.schoolName.toLowerCase().includes(text) ||
        item.guardName.toLowerCase().includes(text) ||
        String(item.accountNumber).includes(text) ||
        item.ifsc.toLowerCase().includes(text) ||
        String(item.salary).includes(text)
      );
    });

    setFiltered(filteredData);
  };

  // ENABLE EDIT
  const enableEdit = (row) => {
    setEditingId(row._id);
    setEditRow({ ...row });
  };

  // HANDLE EDIT FIELD CHANGE
  const handleEditChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  // SAVE EDIT
  const saveEdit = async () => {
    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/nightguard/update/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRow),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Updated Successfully!");

      const updatedList = data.map((item) =>
        item._id === editingId ? out.updated : item
      );

      setData(updatedList);
      setFiltered(updatedList);

      setEditingId(null);
    }
  };

  // DELETE SINGLE NIGHT GUARD
  const deleteNightGuard = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/nightguard/delete/${id}`,
      { method: "DELETE" }
    );

    const out = await res.json();

    if (out.success) {
      alert("Record Deleted!");

      const remaining = data.filter((d) => d._id !== id);
      setData(remaining);
      setFiltered(remaining);
    }
  };

  // DELETE ALL NIGHT GUARD DATA
  const deleteAllNightGuards = async () => {
    if (!window.confirm("Delete all Night Guard records?")) return;

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/nightguard/delete-all",
      { method: "DELETE" }
    );

    const out = await res.json();

    if (out.success) {
      alert("All Night Guard Data Deleted!");
      setData([]);
      setFiltered([]);
      setShowDeleteForm(false);
    }
  };

  // ADD NEW NIGHT GUARD
  const saveNewNightGuard = async () => {
    const payload = {
      ...addForm,
      salary: Number(addForm.salary) || 0,
    };

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/nightguard/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Night Guard Added!");

      setData([out.newData, ...data]);
      setFiltered([out.newData, ...filtered]);
      setShowAddForm(false);

      setAddForm({
        block: "",
        schoolName: "",
        guardName: "",
        accountNumber: "",
        ifsc: "",
        salary: "",
        utrNumber: "",
      });
    }
  };

  // DOWNLOAD EXCEL
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


  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sweeper-page">
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

      {/* TITLE */}
      <h1 className="dash-title">Night Guard Data</h1>

      {/* ACTION BUTTONS */}
      <div className="top-actions">
        <button onClick={downloadExcel} className="btn-green">
          ⬇️ Download Excel
        </button>

        <button onClick={() => setShowDeleteForm(true)} className="btn-red">
          Delete All Data
        </button>

        <button onClick={() => setShowAddForm(true)} className="btn-blue">
          ➕ Add Night Guard
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <label className="filter-label">Filter Block:</label>

        <select
          value={selectedBlock}
          onChange={(e) => handleFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Blocks</option>
          {blocks.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search guard, school, IFSC, account..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <p>No Data Found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SI.No</th>
                <th>Block</th>
                <th>School</th>
                <th>Guard Name</th>
                <th>Account No</th>
                <th>IFSC</th>
                <th>Salary</th>
                 <th>utrNumber</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) =>
                editingId === item._id ? (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.block}
                        onChange={(e) =>
                          handleEditChange("block", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.schoolName}
                        onChange={(e) =>
                          handleEditChange("schoolName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.guardName}
                        onChange={(e) =>
                          handleEditChange("guardName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.accountNumber}
                        onChange={(e) =>
                          handleEditChange("accountNumber", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.ifsc}
                        onChange={(e) =>
                          handleEditChange("ifsc", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.salary}
                        onChange={(e) =>
                          handleEditChange("salary", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.utrNumber}
                        onChange={(e) =>
                          handleEditChange("utrNumber", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <button onClick={saveEdit} className="btn-blue">
                        Save
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.block}</td>
                    <td>{item.schoolName}</td>
                    <td>{item.guardName}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.ifsc}</td>
                    <td>{item.salary}</td>
                    <td>
  {item.utrNumber ? (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "18px",
        background: "#d1e7dd",
        color: "#0f5132",
        fontWeight: "600",
        fontSize: "13px",
      }}
    >
      {item.utrNumber}
    </span>
  ) : (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "18px",
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
                      <button
                        onClick={() => enableEdit(item)}
                        className="btn-blue"
                      >
                        Edit
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteNightGuard(item._id)}
                        className="btn-red"
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
            <h2>Add Night Guard</h2>

            <label>Block</label>
            <select
              value={addForm.block}
              onChange={(e) =>
                setAddForm({ ...addForm, block: e.target.value })
              }
            >
              <option value="">Select Block</option>
              {blocks.map((b, idx) => (
                <option key={idx} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <label>School Name</label>
            <input
              value={addForm.schoolName}
              onChange={(e) =>
                setAddForm({ ...addForm, schoolName: e.target.value })
              }
            />

            <label>Guard Name</label>
            <input
              value={addForm.guardName}
              onChange={(e) =>
                setAddForm({ ...addForm, guardName: e.target.value })
              }
            />

            <label>Account Number</label>
            <input
              value={addForm.accountNumber}
              onChange={(e) =>
                setAddForm({ ...addForm, accountNumber: e.target.value })
              }
            />

            <label>IFSC</label>
            <input
              value={addForm.ifsc}
              onChange={(e) =>
                setAddForm({ ...addForm, ifsc: e.target.value })
              }
            />

            <label>Salary</label>
            <input
              type="number"
              value={addForm.salary}
              onChange={(e) =>
                setAddForm({ ...addForm, salary: e.target.value })
              }
            />

            <label>UTR Number</label>
            <input
              value={addForm.utrNumber}
              onChange={(e) =>
                setAddForm({ ...addForm, utrNumber: e.target.value })
              }
            />

            <div className="popup-actions">
              <button onClick={saveNewNightGuard} className="btn-green">
                Save
              </button>

              <button onClick={() => setShowAddForm(false)} className="btn-red">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ALL POPUP */}
      {showDeleteForm && (
        <div className="overlay">
          <div className="popup">
            <h2>Delete ALL Night Guard Data?</h2>
            <p>This action cannot be undone.</p>

            <div className="popup-actions">
              <button className="btn-red" onClick={deleteAllNightGuards}>
                Yes, Delete All
              </button>

              <button
                className="btn-blue"
                onClick={() => setShowDeleteForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
