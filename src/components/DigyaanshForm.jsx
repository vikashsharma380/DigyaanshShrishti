import { useState, useEffect } from "react";
import "../styles/digyaansh.css";
import * as XLSX from "xlsx";


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
      "https://api.digyaanshshrishti.com/api/appointments/add",
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
const downloadExcel = () => {
  if (list.length === 0) {
    alert("No data to download!");
    return;
  }

  // Remove _id and __v if present
  const cleaned = list.map(({ _id, __v, ...rest }) => rest);

  const ws = XLSX.utils.json_to_sheet(cleaned);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Appointments");

  XLSX.writeFile(wb, "appointments.xlsx");
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
    await fetch("https://api.digyaanshshrishti.com/api/appointments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: data.ref,
        name: data.name,
        date: data.date,
      }),
    });

    const deleteAppointment = async (id) => {
  if (!window.confirm("Are you sure you want to delete this record?")) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/appointments/delete/${id}`,
    { method: "DELETE" }
  );

  const result = await res.json();

  if (result.success) {
    alert("Deleted Successfully");
    fetchList(); // list refresh
  } else {
    alert("Delete Failed: " + result.message);
  }
};

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
      "https://api.digyaanshshrishti.com/api/appointments/list"
    );
    const result = await res.json();
    if (result.success) {
      setList(result.list);
    }
  };

  return (
    <div className="appointment-container">
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
          <input name="address" placeholder="Address" onChange={handleChange} />
          {/* <input name="passport" placeholder="Passport No." onChange={handleChange} /> */}
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
          <input name="project" placeholder="Project" onChange={handleChange} />
          <input
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
          />
          {/* <textarea
            className="edit-box"
            rows="8"
            value={data.letterBody}
            onChange={(e) => setData({ ...data, letterBody: e.target.value })}
          /> */}
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
          {/* HEADER */}
          <header className="pdf-header">
            <img
              src="/Screenshot 2025-12-01 163717.png"
              className="logo-img"
              alt="logo"
            />
            <div className="header-text">
              <div className="company-name ">
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
              <div>
                {" "}
                <b>REF: {data.ref}</b>
              </div>
            </div>

            <div className="qr-section">
              <div>
                {" "}
                <b> Date: {formatDate(data.date)}</b>
              </div>
              <img
                src="/WhatsApp Image 2025-12-01 at 2.39.49 PM.png"
                className="qr-img"
                alt="qr"
              />
            </div>
          </div>

          <h2 className="center-heading">JOINING LETTER</h2>

          {/* EMP DETAILS */}
          <div className="employee-details">
            <p>
              {" "}
              <b>Employe Name – {data.name || "__________"} </b>
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
            <p style={{ whiteSpace: "pre-line" }}>{data.letterBody}</p>
            Dear {data.name || "__________"},
            <br />
            <br />
            हमें आपको<b> {data.project || "__________"}</b> के{" "}
            <b> {data.designation} </b>पद की नियुक्ति प्रदान करते हुए प्रसन्नता
            हो रही है। DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.,प्रभावी तिथि{" "}
            {data.deo || "__________"} यह नियुक्ति कुछ नियमो और शर्तों पर निर्भर
            है जो नीचे दी गयी हैं :-
            <br />
            <br />
            1) आप <b> {data.designation || "__________"}</b> के रूप में कार्य
            करेंगे|, आप अपने कर्तव्यों के लिए जिम्मेदार होंगे|,यह कंपनी की
            नीतियों के अधीन होगा।
            <br />
            2) आपका वेतन {data.salary || "__________"}/- CTC है, जो महीने के
            अंतिम तिथि को भुगतान होगा|
            <br />
            3) आपका व्यक्तिगत पारिश्रमिक पूरी तरह से आपके और कंपनी के बीच है। हम
            आपसे अपेक्षा करते हैं कि आप सभी जानकारी और समय-समय पर किए गए किसी भी
            बदलाव को व्यक्तिगत और गोपनीय रूप से सुरक्षित रखेंगे।
          </div>

          {/* SIGN */}
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
          <footer className="pdf-footer  footer1" contentEditable>
            Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com
            <br />
            Only For Verification: 97095 25410 (Mon-Sat) (10AM–6PM)
            <br />
            Office Address: Sadhu Sadan Near Bapudham Station to Janpul Road,
            Ward 22, Shantipuri, Motihari, East Champaran, Bihar - 845401
          </footer>
        </div>

        {/* ======== PAGE 2 ========= */}
        <div className="pdf-page">
          <header className="pdf-header small">
            <img src="/Screenshot 2025-12-01 163717.png" className="logo-img" />
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
              आपकी सेवा कंपनी के किसी अन्य स्थान या शाखा में स्थानांतरित की जा
              सकती है, चाहे वह अभी मौजूद हो या अभी बनने वाली हो। आपको कंपनी के
              द्वारा किसी भी पद पर प्रतिनियुक्त भी किया जा सकता है। कंपनी आपकी
              परिवीक्षा अवधि को बढ़ाने/ घटाने का पूर्ण अधिकार रखती है।
            </li>
            <li>
              आपको कार्य अवधि में वार्षिक मात्र 12 आकस्मिक छुट्टियां रविवार एवं
              राष्ट्रीय छुट्टियों को छोड़कर देय होगी | किसी भी तरह की छुट्टी
              लेने से पहले इसकी सुचना अपने सीनियर अधिकारी को कम से कम तीन दिन
              पहले देनी होगी | यदि आपको दी गयी छुट्टी की अवधि आपके द्वारा बढती
              है तो प्रति दिन के दर से राशि आपके वेतन से काट ली जाएगी|
            </li>
            <li>
              कंपनी में उपलब्ध सभी पद निःशुल्क हैं, इसके लिए कोई शुल्क देय नहीं
              है, यदि आपके द्वारा कोई भी राशि किसी व्यक्ति को देने की सुचना
              मिलती है, तो कंपनी आप को पद से निष्काषित (हटा देगी) कर देगी|
            </li>
            <li>
              यदि कंपनी द्वारा आपको दी गई निर्धारित कार्य अवधि से ज्यादा आपसे
              काम कराती है, (प्रति माह में 2-3 दिन) तो कंपनी इसकी कोई अतिरिक्त
              राशि नहीं देगी|
            </li>
            <li>
              यदि कार्य अवधि के दौरान आपका व्यवहार कंपनी के नियम के अधीन बदलता
              है या आपके द्वारा किये जा रहे कार्यो में किसी प्रकार की त्रुटी
              होती है, जो कंपनी के समक्ष माफी योग नहीं पाए जाने पर कंपनी अपनी
              सवेक्षा से आपके पद और कार्य अवधि को समाप्त कर सकती है|
            </li>
            <li>
              अपने कार्य अवधि के समय ज्यादा मोबाइल का उपयोग, अपने निजी काम या
              किसी प्रकार के इलेक्ट्रॉनिक उपकरणों का उपयोग नहीं करना है|
            </li>
            <li>
              यदि किसी कारणवश आपको त्यागपत्र देना पड़े/अपने पद से विमुक्त होना
              चाहते हैं तो इसकी सूचना सीनियर अधिकारी को 45 दिन पहले देनी होगी।
            </li>
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
          <footer className="pdf-footer " contentEditable>
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
   <button className="btn-primary" onClick={downloadExcel}>
  Download Excel
</button>
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

      <td>
        <button
          className="delete-btn"
          onClick={() => deleteAppointment(item._id)}
        >
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
