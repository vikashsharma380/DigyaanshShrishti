import { useState } from "react";
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
});


  // handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // handle editable content below
  const handleEditable = (key, value) => {
    setData((p) => ({ ...p, [key]: value }));
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-wrapper");
    const opt = {
      margin: 0,
      filename: `${data.name || "Appointment_Letter"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="appointment-container">

      {/* ========= INPUT BOX AREA ========= */}
      <div className="form-wrapper">
        <h3>Fill Employee Details</h3>

        <div className="form-grid">
          <input name="ref" placeholder="Reference No." onChange={handleChange} />
          <input name="date" type="date" placeholder="Date" onChange={handleChange} />
          <input name="name" placeholder="Employee Name" onChange={handleChange} />
          <input name="father" placeholder="Father Name" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="passport" placeholder="Passport No." onChange={handleChange} />
          <input name="salary" placeholder="Salary CTC" onChange={handleChange} />
          <input name="designation" placeholder="Designation" onChange={handleChange} />
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
            <img src="/images.png" className="logo-img" alt="logo" />
            <div className="header-text">
              <div className="company-name" contentEditable>
                DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
              </div>
              <div className="company-meta" contentEditable>
                CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
              </div>
            </div>
           
          </header>

          {/* REF & DATE */}
          <div className="ref-date">
            <div contentEditable onInput={(e)=>handleEditable("ref", e.target.innerText)}>
              REF: {data.ref}
            </div>
            <div  contentEditable onInput={(e)=>handleEditable("date", e.target.innerText)}>
              Date: {data.date}
            </div>
             <img src="/images.png" className="qr-img" alt="qr" />
          </div>

          <h2 className="center-heading">JOINING LETTER</h2>

          {/* EMP DETAILS */}
          <div className="employee-details">
            <p contentEditable>Employe Name – {data.name || "__________"}</p>
            <p contentEditable>S/O – {data.father || "__________"}</p>
            <p contentEditable>Address – {data.address || "__________"}</p>
           
<p><b>IDENTITY CARD</b></p>

<p contentEditable>
  <b>
    {data.idType ? data.idType.toUpperCase() : "ID TYPE"} NO. – {data.idNumber || "__________"}
  </b>
</p>

          </div>

          {/* BODY */}
          <div className="letter-body" contentEditable>
            Dear {data.name || "__________"},  
            <br /><br />
            हमें आपको BSDM प्रोजेक्ट के {data.designation} पद की नियुक्ति प्रदान करते हुए
            हर्ष हो रहा है। आपकी ज्वाइनिंग तिथि {data.date || "__________"} से मानी जाएगी।
            <br /><br />
            1) 	आप {data.designation || "__________"} के रूप में कार्य करेंगे|, आप अपने कर्तव्यों के लिए जिम्मेदार होंगे|,यह कंपनी की नीतियों के अधीन होगा।  
            <br />
            2) 	आपका वेतन {data.salary || "__________"}/- CTC है, जो महीने के अंतिम तिथि को भुगतान होगा| 
            <br />
            3) आपका व्यक्तिगत पारिश्रमिक पूरी तरह से आपके और कंपनी के बीच है। हम आपसे अपेक्षा करते हैं कि आप सभी जानकारी और समय-समय पर किए गए किसी भी बदलाव को व्यक्तिगत और गोपनीय रूप से सुरक्षित रखेंगे।
          </div>

          {/* SIGN */}
          <div className="signatures">
            <div>Employee Signature</div>
            <div>Authorized Signatory</div>
          </div>

          {/* FOOTER */}
          <footer className="pdf-footer" contentEditable>
            Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com  
            <br />
            Office: Sadhu Sadan, Motihari, Bihar - 845401
          </footer>
        </div>

        {/* ======== PAGE 2 ========= */}
        <div className="pdf-page">
          <header className="pdf-header small">
            <img src="/logo.png" className="logo-img" />
            <div className="header-text">
              <div className="company-name" contentEditable>
                DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
              </div>
              <div className="company-meta" contentEditable>
                CIN NO. - U63992BR2024PTC068371 | GST NO. - 10AAKCD7260N1ZH
              </div>
            </div>
          </header>

          <h2 className="rules-heading">नियम एवं शर्तें :-</h2>

          <ol className="rules-list">
            <li contentEditable>
              	आपकी सेवा कंपनी के किसी अन्य स्थान या शाखा में स्थानांतरित की जा सकती है, चाहे वह अभी मौजूद हो या अभी बनने वाली हो। आपको कंपनी के द्वारा किसी भी पद पर प्रतिनियुक्त भी किया जा सकता है। कंपनी आपकी परिवीक्षा अवधि को बढ़ाने/ घटाने का पूर्ण अधिकार रखती है।
            </li>
            <li contentEditable>
              	आपको कार्य अवधि में वार्षिक मात्र 12 आकस्मिक छुट्टियां रविवार एवं राष्ट्रीय छुट्टियों को छोड़कर देय होगी | किसी भी तरह की छुट्टी लेने से पहले इसकी सुचना अपने सीनियर अधिकारी को कम से कम तीन दिन पहले देनी होगी | यदि आपको दी गयी छुट्टी की अवधि आपके द्वारा बढती है तो प्रति दिन के दर से राशि आपके वेतन से काट ली जाएगी|
            </li>
            <li contentEditable>
            	कंपनी में उपलब्ध सभी पद निःशुल्क हैं, इसके लिए कोई शुल्क देय नहीं है, यदि आपके द्वारा कोई भी राशि किसी व्यक्ति को देने की सुचना मिलती है, तो कंपनी आप को पद से निष्काषित (हटा देगी) कर देगी|
            </li>
            <li contentEditable>
             	यदि कंपनी द्वारा आपको दी गई निर्धारित कार्य अवधि  से ज्यादा आपसे काम कराती है, (प्रति माह में 2-3 दिन) तो कंपनी इसकी कोई अतिरिक्त राशि नहीं देगी|
            </li>
            <li contentEditable>
              	यदि कार्य अवधि के दौरान आपका व्यवहार कंपनी के नियम के अधीन बदलता है या आपके द्वारा किये जा रहे कार्यो  में किसी प्रकार की त्रुटी होती है, जो कंपनी के समक्ष माफी योग नहीं पाए जाने पर कंपनी अपनी सवेक्षा से आपके पद और कार्य अवधि को समाप्त कर सकती है|  
            </li>
            <li contentEditable>
              	अपने कार्य अवधि के समय ज्यादा मोबाइल का उपयोग, अपने निजी काम या किसी प्रकार के इलेक्ट्रॉनिक उपकरणों का उपयोग नहीं करना है|
            </li>
            <li contentEditable>
              	यदि किसी कारणवश आपको त्यागपत्र देना पड़े/अपने पद से विमुक्त होना चाहते हैं तो इसकी सूचना सीनियर अधिकारी को 45 दिन पहले देनी होगी।
            </li>
          </ol>

          <div className="final-sign" contentEditable>
            DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
          </div>
           <footer className="pdf-footer" contentEditable>
            Contact Us: 7004062960 | Email: digyaanshshrishti@gmail.com  
            <br />
            Office: Sadhu Sadan, Motihari, Bihar - 845401
          </footer>
        </div>
        
      </div>
    </div>
  );
}
