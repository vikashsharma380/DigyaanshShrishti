import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditable = (key, value) => {
    setData((p) => ({ ...p, [key]: value }));
  };

  const generatePDF = () => {
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
          <input name="ref" placeholder="Reference No." value={data.ref} onChange={handleChange} />
          <input name="date" type="date" value={data.date} onChange={handleChange} />

          <input name="name" placeholder="Employee Name" value={data.name} onChange={handleChange} />
          <input name="father" placeholder="Father Name" value={data.father} onChange={handleChange} />
          <input name="address" placeholder="Address" value={data.address} onChange={handleChange} />

          <input name="designation" placeholder="Designation" value={data.designation} onChange={handleChange} />
          <input name="salary" placeholder="Basic Pay" value={data.salary} onChange={handleChange} />

          <input name="startDate" placeholder="Start Date" value={data.startDate} onChange={handleChange} />
          <input name="endDate" placeholder="End Date" value={data.endDate} onChange={handleChange} />
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
            <img src="/Screenshot 2025-12-01 163717.png" className="logo-img" alt="logo" />
            <div className="header-text">
              <div className="company-name" contentEditable>
                DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
              </div>
              <div className="company-meta" contentEditable>
                CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
              </div>
            </div>
          </header>

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
      Date: {data.date}
    </div>

    <img
      src="/WhatsApp Image 2025-12-01 at 2.39.49 PM.png"
      className="qr-img"
      alt="qr"
    />
  </div>

</div>


          <h2 className="center-heading">EMPLOYEE EXPERIENCE CERTIFICATE</h2>

          {/* EMPLOYEE DETAILS */}
          <div className="employee-details">
            <p contentEditable>Employee Name – {data.name}</p>
            <p contentEditable>S/O – {data.father}</p>
            <p contentEditable>Address – {data.address}</p>
          </div>

          {/* CERTIFICATE BODY */}
          <div className="letter-body" contentEditable>
            This is to certify that <b>{data.name}</b>, S/o – {data.father}, Add – {data.address} was employed with Digyaansh Shrishti Maintenance Pvt. Ltd. as a <b>{data.designation}</b> from <b>{data.startDate}</b> to <b>{data.endDate}</b>.
            <br /><br />
            During his working period we found him sincere, honest, hardworking, and dedicated with a professional attitude. He maintained accuracy and integrity in all financial matters with our entire satisfaction.
            <br /><br />
            <b>His Basic Pay is ₹ {data.salary}/- only.</b>
            <br /><br />
            We sincerely appreciate his service and wish him success in his future endeavors.
          </div>

          <div className="signatures">
            <div>For, Digyaansh Shrishti Maintenance Pvt. Ltd.<br />Managing Director</div>
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
    </div>
  );
}
