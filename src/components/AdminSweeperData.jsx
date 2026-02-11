import { useEffect, useState } from "react";
import "../styles/SweeperData.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AdminSweeperData() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("ALL");
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
const [showDeleteForm, setShowDeleteForm] = useState(false);
const [districts, setDistricts] = useState([]);
useEffect(() => {
  fetch("https://api.digyaanshshrishti.com/api/district/list")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setDistricts(data.list);
      }
    })
    .catch((err) => console.log(err));
}, []);

 
 const deleteAllSweepers = async () => {
  if (!window.confirm("Are you sure you want to delete ALL data?")) return;

  const res = await fetch(
    "https://api.digyaanshshrishti.com/api/sweeper/delete-all",
    { method: "DELETE" }
  );

  const out = await res.json();

  if (out.success) {
    alert("All data deleted!");
    setData([]);
    setFiltered([]);
    setShowDeleteForm(false);
  } else {
    alert("Failed to delete all data!");
  }
};

  const deleteSweeper = async (id) => {
    if (!window.confirm("Delete this sweeper?")) return;

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/sweeper/delete/${id}`,
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
   utrNumber: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Load all data
  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/sweeper/all-data")
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
    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/sweeper/update/${editingId}`,
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
        item._id === editingId ? editRow : item
      );

      setData(updatedList);
      setFiltered(updatedList);

      setEditingId(null);
    }
  };
const downloadDistrictData = async (district) => {
  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/sweeper/download/district/${district}`
  );

  if (!res.ok) {
    alert("No data found for this district");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${district}_data.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

  // Download Excel
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

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api//sweeper/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

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
  const handleSearch = (value) => {
    setSearchQuery(value);

    const text = value.toLowerCase();

    const filteredData = data.filter((item) => {
      return (
        item.block.toLowerCase().includes(text) ||
        item.schoolName.toLowerCase().includes(text) ||
        item.sweeperName.toLowerCase().includes(text) ||
        String(item.toilets).includes(text) ||
        String(item.accountNumber).includes(text) ||
        item.ifsc.toLowerCase().includes(text) ||
        String(item.salary).includes(text)
      );
    });

    setFiltered(filteredData);
  };

  return (
    <div className="sweeper-page">
      {/* UPDATED HEADER */}
      <div className="dash-header">
        <h2 className="dash-logo">Admin Panel</h2>

        <div className="dash-right">
          <span className="dash-admin-name">{user?.name}</span>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* UPDATED TITLE */}
      <h1 className="dash-title">All Sweeper Data</h1>

      {/* ACTION BUTTONS */}
      <div className="top-actions">
        <button onClick={downloadExcel} className="btn-green">
          ⬇️ Download Excel
        </button>
<select
  onChange={(e) => downloadDistrictData(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  }}
>
  <option value="">Select District</option>

  {districts.map((d) => (
    <option key={d._id} value={d.name}>
      {d.name}
    </option>
  ))}
</select>


        <button onClick={() => setShowDeleteForm(true)} className="btn-blue">
          Delete AllData
        </button>
        <button onClick={() => setShowAddForm(true)} className="btn-blue">
          ➕ Add Sweeper
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
          placeholder="Search sweeper, school, IFSC, account..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
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
                <th>District</th>
                <th>Block</th>
                <th>School Name</th>
                <th>Sweeper Name</th>
                <th>No. Of Toilets</th>
                <th>Account No.</th>
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
                        value={editRow.district}
                        onChange={(e) =>
                          handleEditChange("district", e.target.value)
                        }
                      />
                    </td>

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
                        value={editRow.sweeperName}
                        onChange={(e) =>
                          handleEditChange("sweeperName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="input-edit"
                        value={editRow.toilets}
                        onChange={(e) =>
                          handleEditChange("toilets", e.target.value)
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
    placeholder="Leave blank = Pending"
    value={editRow.utrNumber || ""}
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
                    <td>{item.district}</td>
                    <td>{item.block}</td>
                    <td>{item.schoolName}</td>
                    <td>{item.sweeperName}</td>
                    <td>{item.toilets}</td>
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
                        onClick={() => deleteSweeper(item._id)}
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
            <h2>Add New Sweeper</h2>

            {/* BLOCK */}
            <label>BLOCK</label>
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

            {/* SCHOOL */}
            <label>School Name</label>
            <input
              value={addForm.schoolName}
              onChange={(e) =>
                setAddForm({ ...addForm, schoolName: e.target.value })
              }
            />

            {/* SWEEPER */}
            <label>Sweeper Name</label>
            <input
              value={addForm.sweeperName}
              onChange={(e) =>
                setAddForm({ ...addForm, sweeperName: e.target.value })
              }
            />

            {/* TOILETS */}
            <label>Toilets</label>
            <input
              type="number"
              value={addForm.toilets}
              onChange={(e) =>
                setAddForm({ ...addForm, toilets: Number(e.target.value) })
              }
            />

            {/* ACCOUNT */}
            <label>Account Number</label>
            <input
              value={addForm.accountNumber}
              onChange={(e) =>
                setAddForm({ ...addForm, accountNumber: e.target.value })
              }
            />

            {/* IFSC */}
            <label>IFSC</label>
            <input
              value={addForm.ifsc}
              onChange={(e) => setAddForm({ ...addForm, ifsc: e.target.value })}
            />

            {/* SALARY */}
            <label>Salary</label>
            <input
              type="number"
              value={addForm.salary}
              onChange={(e) =>
                setAddForm({ ...addForm, salary: Number(e.target.value) })
              }
            />

            <label>UTR Number (leave blank if pending)</label>
<input
  placeholder="Enter UTR if payment done"
  value={addForm.utrNumber}
  onChange={(e) =>
    setAddForm({ ...addForm, utrNumber: e.target.value })
  }
/>


            {/* BUTTONS */}
            <div className="popup-actions">
              <button onClick={saveNewSweeper} className="btn-green">
                Save
              </button>

              <button onClick={() => setShowAddForm(false)} className="btn-red">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteForm && (
  <div className="overlay">
    <div className="popup">
      <h2>Delete ALL Sweeper Data?</h2>

      <p>This action cannot be undone.</p>

      <div className="popup-actions">
        <button className="btn-red" onClick={deleteAllSweepers}>
          Yes, Delete All
        </button>

        <button className="btn-blue" onClick={() => setShowDeleteForm(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
