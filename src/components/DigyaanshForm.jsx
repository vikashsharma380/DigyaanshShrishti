import { useState, useEffect } from "react";
import "../styles/digyaansh.css";

export default function DigyaanshAppointmentForm() {
  const [data, setData] = useState({
    ref: "",
    date: "",
    name: "",
    father: "",
    address: "",
    idType: "",
    idNumber: "",
    salary: "20000",
    designation: "Trainer",
    letterBody: "",
  });
  const saveToDatabase = async () => {
    const body = {
      ref: data.ref,
      name: data.name,
      date: data.date,
    };

    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/appointments/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();
    if (result.success) {
      alert("Appointment Saved!");
    } else {
      alert("Error: " + result.message);
    }
  };

  // handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // handle editable content below
  const handleEditable = (key, value) => {
    setData((p) => ({ ...p, [key]: value }));
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generatePDF = async () => {
    // Step 1: Save to database before generating PDF
    await fetch("https://digyaanshshrishti.onrender.com/api/appointments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: data.ref,
        name: data.name,
        date: data.date,
      }),
    });

    // Step 2: Generate PDF
    const element = document.getElementById("pdf-wrapper");
    const opt = {
      margin: 0,
      filename: `${data.name || "Appointment"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        letterRendering: true,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css"] },
    };

    window.html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    fetchList();
  }, []);

  const [list, setList] = useState([]);
  const fetchList = async () => {
    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/appointments/list"
    );
    const result = await res.json();
    if (result.success) {
      setList(result.list);
    }
  };

  return (
    <div className="appointment-container">
      {/* ⭐ MAIN 2-COLUMN LAYOUT ⭐ */}
      <div className="appointment-layout">
        {/* ================= LEFT SIDE – SAVED APPOINTMENTS ================= */}
        <div className="left-panel">
          <div className="list-box">
            <h3>Saved Appointments</h3>

            <table>
              <thead>
                <tr>
                  <th>Ref No.</th>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ref}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT SIDE – FORM + PDF ================= */}
        <div className="right-panel">
          {/* ========= INPUT BOX AREA ========= */}
          <div className="form-wrapper">
            <h3>Fill Employee Details</h3>

            <div className="form-grid">
              <input
                name="ref"
                placeholder="Reference No."
                onChange={handleChange}
              />
              <input
                name="date"
                type="date"
                placeholder="Date"
                onChange={handleChange}
              />
              <input
                name="name"
                placeholder="Employee Name"
                onChange={handleChange}
              />
              <input
                name="father"
                placeholder="Father Name"
                onChange={handleChange}
              />
              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />

              <input
                name="salary"
                placeholder="Salary CTC"
                onChange={handleChange}
              />
              <input
                name="deo"
                type="date"
                placeholder="Date of Joining"
                onChange={handleChange}
              />
              <input
                name="project"
                placeholder="Project"
                onChange={handleChange}
              />
              <input
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
              />

              <select name="idType" onChange={handleChange}>
                <option value="">Select ID Type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Passport">Passport</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Driving License">Driving License</option>
              </select>

              <input
                name="idNumber"
                placeholder="Enter ID Number"
                onChange={handleChange}
              />
            </div>

            <button className="btn-primary" onClick={generatePDF}>
              Generate PDF
            </button>
          </div>

          {/* ========= PDF PREVIEW AREA ========= */}
          <div id="pdf-wrapper" className="pdf-wrapper">
            {/* ======== PAGE 1 ========= */}
            <div className="pdf-page">
              <header className="pdf-header">
                <img
                  src="/Screenshot 2025-12-01 163717.png"
                  className="logo-img"
                  alt="logo"
                />
                <div className="header-text">
                  <div className="company-name">
                    DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
                  </div>
                  <div className="company-meta">
                    CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
                  </div>
                </div>
              </header>

              <div className="header-divider"></div>

              {/* REF & DATE */}
              <div className="ref-date">
                <div className="ref-left">
                  <b>REF: {data.ref}</b>
                </div>

                <div className="qr-section">
                  <b>Date: {formatDate(data.date)}</b>
                  <img
                    src="/WhatsApp Image 2025-12-01 at 2.39.49 PM.png"
                    className="qr-img"
                    alt="qr"
                  />
                </div>
              </div>

              <h2 className="center-heading">JOINING LETTER</h2>

              {/* EMPLOYEE DETAILS */}
              <div className="employee-details">
                <p>
                  <b>Employee Name – {data.name || "__________"}</b>
                </p>
                <p>S/O – {data.father || "__________"}</p>
                <p>Address – {data.address || "__________"}</p>

                <p>
                  <b>IDENTITY CARD</b>
                </p>

                <p>
                  <b>
                    {data.idType ? data.idType.toUpperCase() : "ID TYPE"} NO. –{" "}
                    {data.idNumber || "__________"}
                  </b>
                </p>
              </div>

              {/* BODY */}
              <div className="letter-body">
                Dear {data.name || "__________"},
                <br />
                <br />
                हमें आपको<b> {data.project || "__________"} </b>
                के <b>{data.designation}</b> पद की नियुक्ति प्रदान करते हुए
                प्रसन्नता हो रही है। DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.,
                प्रभावी तिथि
                {data.deo || "__________"} यह नियुक्ति कुछ नियमो और शर्तों पर
                निर्भर है:
                <br />
                <br />
                1) आप <b>{data.designation}</b> के रूप में कार्य करेंगे।
                <br />
                2) आपका वेतन {data.salary}/- CTC है।
                <br />
                3) आपका व्यक्तिगत पारिश्रमिक गोपनीय रखा जाएगा।
              </div>

              {/* SIGNATURE */}
              <div className="signatures">
                <div className="emply">Employee Signature</div>

                <div className="Authorized">
                  <div className="Authorized-sign">
                    DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
                  </div>
                  Authorized Signatory
                </div>
              </div>

              {/* FOOTER */}
              <footer className="pdf-footer footer1" contentEditable>
                Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com{" "}
                <br />
                Only For Verification: 97095 25410 (Mon-Sat) (10AM–6PM) <br />
                Office Address: Sadhu Sadan Near Bapudham Station, Motihari,
                Bihar
              </footer>
            </div>

            {/* ======== PAGE 2 ========= */}
            <div className="pdf-page">
              <header className="pdf-header small">
                <img
                  src="/Screenshot 2025-12-01 163717.png"
                  className="logo-img"
                />
                <div className="header-text">
                  <div className="company-name">
                    DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
                  </div>
                  <div className="company-meta">
                    CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
                  </div>
                </div>
              </header>

              <div className="header-divider"></div>

              <h2 className="rules-heading">नियम एवं शर्तें :-</h2>

              <ol className="rules-list">
                <li>
                  आपकी सेवा कंपनी के किसी अन्य स्थान पर स्थानांतरित की जा सकती
                  है।
                </li>
                <li>आपको वार्षिक 12 आकस्मिक छुट्टियां दी जाएंगी।</li>
                <li>
                  सभी पद नि:शुल्क हैं, किसी भी भुगतान पर कड़ी कार्रवाई होगी।
                </li>
                <li>अतिरिक्त कार्य पर कोई अतिरिक्त भुगतान नहीं होगा।</li>
                <li>अनुशासनहीनता पर आपकी सेवा समाप्त की जा सकती है।</li>
                <li>कार्य समय में मोबाइल फोन का दुरुपयोग वर्जित है।</li>
                <li>पद छोड़ने के लिए 45 दिन पहले सूचना देनी होगी।</li>
              </ol>

              <div className="signatures">
                <div className="emply">Employee Signature</div>

                <div className="Authorized">
                  <div className="Authorized-sign">
                    DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
                  </div>
                  Authorized Signatory
                </div>
              </div>

              <footer className="pdf-footer" contentEditable>
                Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com{" "}
                <br />
                Only For Verification: 97095 25410 (Mon-Sat) (10AM–6PM) <br />
                Office Address: Sadhu Sadan, Motihari, Bihar
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
