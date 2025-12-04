import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log("Error fetching users:", err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-10 text-white">
      <style>{`
        .users-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255,255,255,0.04);
          border-radius: 12px;
          overflow: hidden;
        }
        th {
          background: rgba(255,255,255,0.08);
          padding: 12px;
          text-align: left;
          font-size: 14px;
          color: #cbd5e1;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        tr:hover {
          background: rgba(255,255,255,0.06);
        }

        .status {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color:white;
        }
        .active { background: #22c55e55; }
        .inactive { background: #ef444455; }

        .search-box {
          width: 300px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
        }
      `}</style>

      <h2 className="text-3xl font-bold mb-6">All Users</h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        className="search-box mb-4"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* USERS TABLE */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <span className={`status ${u.status.toLowerCase()}`}>
                    {u.status}
                  </span>
                </td>

                <td>{u.createdAt?.slice(0, 10) || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
