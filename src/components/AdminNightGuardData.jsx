import { useEffect, useState } from "react";
import "../styles/SweeperData.css"; // same styling use hogi
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function AdminNightGuardData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("ALL");

  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    block: "",
    schoolName: "",
    guardName: "",
    accountNumber: "",
    ifsc: "",
    salary: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // LOAD DATA
  useEffect(() => {
    fetch("https://digyaanshshrishti.onrender.com/api/nightguard/all-data")
      .then((res) => res.json())
      .then((out) => {
        const clean = out.filter((i) => i && i.block);
        setData(clean);
        setFiltered(clean);
        setBlocks([...new Set(clean.map((i) => i.block))]);
      });
  }, []);

  // SEARCH
  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());

    const f = data.filter(
      (x) =>
        x.guardName?.toLowerCase().includes(value) ||
        x.schoolName?.toLowerCase().includes(value) ||
        x.block?.toLowerCase().includes(value)
    );

    setFiltered(f);
  };

  // FILTER BY BLOCK
  const handleFilter = (blockName) => {
    setSelectedBlock(blockName);
    if (blockName === "ALL") setFiltered(data);
    else setFiltered(data.filter((i) => i.block === blockName));
  };

  // ENABLE EDIT
  const enableEdit = (row) => {
    setEditingId(row._id);
    setEditRow({ ...row });
  };

  // SAVE EDIT
  const saveEdit = async () => {
    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/nightguard/update/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRow),
      }
    );

    const out = await res.json();
    if (out.success) {
      alert("Updated!");
      const updated = data.map((i) =>
        i._id === editingId ? out.updated : i
      );
      setData(updated);
      setFiltered(updated);
      setEditingId(null);
    }
  };

  // DELETE NIGHT GUARD
  const deleteGuard = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/nightguard/delete/${id}`,
      { method: "DELETE" }
    );

    const out = await res.json();
    if (out.success) {
      const rem = data.filter((d) => d._id !== id);
      setData(rem);
      setFiltered(rem);
    }
  };

  // ADD NEW
  const saveNew = async () => {
    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/nightguard/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      }
    );

    const out = await res.json();
    if (out.success) {
      alert("Added!");
      setData([out.newData, ...data]);
      setFiltered([out.newData, ...filtered]);
      setShowAddForm(false);
    }
  };

  return (
    <div className="sweeper-page">

      <h1 className="dash-title">Night Guard Data</h1>

      {/* FILTERS */}
      <div className="filter-bar">
        <select
          value={selectedBlock}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="ALL">All Blocks</option>
          {blocks.map((b, i) => (
            <option key={i}>{b}</option>
          ))}
        </select>

        <input
          className="search-input"
          placeholder="Search guard, school…"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Block</th>
              <th>School</th>
              <th>Guard Name</th>
              <th>Account No</th>
              <th>IFSC</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) =>
              editingId === row._id ? (
                <tr key={row._id}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      value={editRow.block}
                      onChange={(e) =>
                        setEditRow({ ...editRow, block: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editRow.schoolName}
                      onChange={(e) =>
                        setEditRow({ ...editRow, schoolName: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editRow.guardName}
                      onChange={(e) =>
                        setEditRow({ ...editRow, guardName: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editRow.accountNumber}
                      onChange={(e) =>
                        setEditRow({
                          ...editRow,
                          accountNumber: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editRow.ifsc}
                      onChange={(e) =>
                        setEditRow({ ...editRow, ifsc: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editRow.salary}
                      onChange={(e) =>
                        setEditRow({ ...editRow, salary: e.target.value })
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
                <tr key={row._id}>
                  <td>{i + 1}</td>
                  <td>{row.block}</td>
                  <td>{row.schoolName}</td>
                  <td>{row.guardName}</td>
                  <td>{row.accountNumber}</td>
                  <td>{row.ifsc}</td>
                  <td>{row.salary}</td>

                  <td>
                    <button
                      onClick={() => enableEdit(row)}
                      className="btn-blue"
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => deleteGuard(row._id)}
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

      {/* ADD MODAL */}
      {showAddForm && (
        <div className="overlay">
          <div className="popup">
            <h2>Add Night Guard</h2>

            <input
              placeholder="Block"
              onChange={(e) =>
                setAddForm({ ...addForm, block: e.target.value })
              }
            />

            <input
              placeholder="School Name"
              onChange={(e) =>
                setAddForm({ ...addForm, schoolName: e.target.value })
              }
            />

            <input
              placeholder="Guard Name"
              onChange={(e) =>
                setAddForm({ ...addForm, guardName: e.target.value })
              }
            />

            <input
              placeholder="Account No"
              onChange={(e) =>
                setAddForm({ ...addForm, accountNumber: e.target.value })
              }
            />

            <input
              placeholder="IFSC"
              onChange={(e) =>
                setAddForm({ ...addForm, ifsc: e.target.value })
              }
            />

            <input
              placeholder="Salary"
              onChange={(e) =>
                setAddForm({ ...addForm, salary: e.target.value })
              }
            />

            <button className="btn-green" onClick={saveNew}>
              Save
            </button>
            <button className="btn-red" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
