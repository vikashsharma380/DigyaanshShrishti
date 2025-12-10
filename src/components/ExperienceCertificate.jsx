import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import "../styles/digyaansh.css";

export default function DeepakExperience() {
  const [data, setData] = useState({
    ref: "DSM/EXP/0051/24-25",
    date: "2025-09-30",
    name: "Deepak Kumar",
    father: "Umesh Kumar Sah",
    address: "Mehta Tola, Harsidhi, East Champaran, Bihar - 845417",
    designation: "Accountant",
    startDate: "10 April 2022",
    endDate: "30 September 2025",
    salary: "1,700",
  });
const [list, setList] = useState([]);
const fetchList = async () => {
  const res = await fetch(
    "https://api.digyaanshshrishti.com/api/experience/list"
  );

  const result = await res.json();

  if (result.success) {
    setList(result.list);
  }
};
useEffect(() => {
  fetchList();
}, []);
const deleteExperience = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/experience/delete/${id}`,
    { method: "DELETE" }
  );

  const result = await res.json();

  if (result.success) {
    alert("Deleted!");
    fetchList();
  }
};

const downloadExcel = () => {
  if (list.length === 0) {
    alert("No data available!");
    return;
  }

  // Remove MongoDB fields (_id, __v)
  const cleaned = list.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest);

  const ws = XLSX.utils.json_to_sheet(cleaned);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Experience List");

  XLSX.writeFile(wb, "experience_list.xlsx");
};


  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditable = (key, value) => {
    setData((p) => ({ ...p, [key]: value }));
  };

  const saveExperience = async () => {
  const res = await fetch(
    "https://api.digyaanshshrishti.com/api/experience/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (result.success) {
    } else {
    alert("Error: " + result.message);
  }
};


  const generatePDF = async () => {
    await saveExperience();
    const element = document.getElementById("pdf-wrapper");
    const opt = {
      margin: 0,
      filename: `${data.name || "Experience_Certificate"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="appointment-container">
      {/* ===== FORM INPUT AREA ===== */}
      <div className="form-wrapper">
        <h3>Fill Employee Details</h3>

        <div className="form-grid">
          <input
            name="ref"
            placeholder="Reference No."
            value={data.ref}
            onChange={handleChange}
          />
          <input
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Employee Name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            name="father"
            placeholder="Father Name"
            value={data.father}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            value={data.designation}
            onChange={handleChange}
          />
          <input
            name="salary"
            placeholder="Basic Pay"
            value={data.salary}
            onChange={handleChange}
          />

          <input
            name="startDate"
            placeholder="Start Date"
            value={data.startDate}
            onChange={handleChange}
          />
          <input
            name="endDate"
            placeholder="End Date"
            value={data.endDate}
            onChange={handleChange}
          />
        </div>

        <button className="btn-primary" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      {/* ===== PDF PREVIEW AREA ===== */}
      <div id="pdf-wrapper" className="pdf-wrapper">
        {/* ========== PAGE 1 ========== */}
        <div className="pdf-page">
          {/* HEADER */}
          <header className="pdf-header">
            <img
              src="/Screenshot 2025-12-01 163717.png"
              className="logo-img"
              alt="logo"
            />
            <div className="header-text">
              <div className="company-name" contentEditable>
                DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
              </div>
              <div className="company-meta" contentEditable>
                CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
              </div>
            </div>
          </header>
          <div className="header-divider"></div>

          {/* REF/DATE */}
          <div className="ref-date">
            <div className="ref-left">
              <div
                contentEditable
                onInput={(e) => handleEditable("ref", e.target.innerText)}
              >
                REF: {data.ref}
              </div>
            </div>

            <div className="qr-section">
              <div
                className="date-text"
                contentEditable
                onInput={(e) => handleEditable("date", e.target.innerText)}
              >
                Date: {formatDate(data.date)}
              </div>

              <img
                src="/WhatsApp Image 2025-12-01 at 2.39.49 PM.png"
                className="qr-img"
                alt="qr"
              />
            </div>
          </div>

          <h2 className="center-heading"> EXPERIENCE CERTIFICATE</h2>

          {/* EMPLOYEE DETAILS */}
          {/* <div className="employee-details">
            <p contentEditable>Employee Name – {data.name}</p>
            <p contentEditable>S/O – {data.father}</p>
            <p contentEditable>Address – {data.address}</p>
          </div> */}

          {/* CERTIFICATE BODY */}
          <div className="letter-body" contentEditable>
            This is to certify that <b>{data.name}</b>, S/o – {data.father}, Add
            – {data.address} was employed with Digyaansh Shrishti Maintenance
            Pvt. Ltd. as a <b>{data.designation}</b> from{" "}
            <b>{data.startDate}</b> to <b>{data.endDate}</b>.
            <br />
            <br />
            During his working period we found him sincere, honest, hardworking,
            and dedicated with a professional attitude. He maintained accuracy
            and integrity in all financial matters with our entire
            satisfaction.He is amiable in nature and character is well. We have
            no objection to allow him in any better position and have no
            liabilities in our company.
            <br />
            <br />
            <b>His Basic Pay is ₹ {data.salary}/- only.</b>
            <br />
            <br />
            We sincerely appreciate his service and wish him success in his
            future endeavors.
          </div>

          <div className="signaturess">
            <div contentEditable className=" experiencecertificate">
              For, Digyaansh Shrishti Maintenance Pvt. Ltd.
              <br />
              <div contentEditable className="signe ">
                {" "}
                Managing Director
              </div>
            </div>
            {/* <div>For, Digyaansh Shrishti Maintenance Pvt. Ltd.<br />Managing Director</div> */}
          </div>

          <footer className="pdf-footer" contentEditable>
            Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com
            <br />
            Only For Verification: 97095 25410 (Mon-Sat) (10AM–6PM)
            <br />
            Office Address: Sadhu Sadan Near Bapudham Station to Janpul Road,
            Ward 22, Shantipuri, Motihari, East Champaran, Bihar - 845401
          </footer>
        </div>
      </div>
   <div className="list-box">
  <h3>Saved Experience Certificates</h3>

  <button className="btn-primary" onClick={downloadExcel}>
    Download Excel
  </button>

  <table>
    <thead>
      <tr>
        <th>Ref No.</th>
        <th>Name</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {list.map((item, i) => (
        <tr key={i}>
          <td>{item.ref}</td>
          <td>{item.name}</td>
          <td>{item.date}</td>
          <td>
            <button className="delete-btn" onClick={() => deleteExperience(item._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </div>
  );
}
