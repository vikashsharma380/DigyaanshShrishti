import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminUsersExcelView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/list")
      .then((res) => res.json())
      .then((out) => {
        if (out.success) setUsers(out.users);
      });
  }, []);

  // ----------------------------
  // EXPORT TO EXCEL FUNCTION
  // ----------------------------
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "Users_List.xlsx");
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
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

        .download-btn {
          background: #198754;
          padding: 10px 20px;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          border: none;
          font-size: 15px;
          margin-bottom: 20px;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-6">Users (Excel Format View)</h1>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel ⬇️
      </button>

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
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
