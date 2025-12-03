import { useState } from "react";
import "../styles/form.css";

export default function GISAppointmentForm() {
  const [data, setData] = useState({
    refNumber: "",
    date: "",
    name: "",
    father: "",
    address: "",
    doeDate: "", // DEO letter date (08-05-2024)
    school: "", // GMS / GMSS name
    area: "",
    block: "",
    // user-editable overrides (if user manually edits subject/intro)
    subject: "",
    intro: "",
    terms: [
      `यह नियुक्ति संविदा के आधार पर विभाग द्वारा तय सीमा तक के लिए की जा रही है इस कार्य हेतु आपको प्रति माह  विभाग द्वारा अनुमोदित दर लागू नियम एवं शर्तों के अधीन देय होगा।`,
      `आपके कार्य कुशलता पूर्ण मूल्यांकन के पश्चात आपके संविदा की अवधि का विस्तार किया जा सकता है परंतु संविदा अवधि विस्तार के संबंध में GIS World Hospitality Services Pvt. Ltd का निर्णय अंतिम होगा|`,
      `संविदा की अवधि की समाप्ति के पूर्व भी अग्रिम सूचना देकर इस संविदा को समाप्त किया जा सकता है इस संबंध में नियुक्ता का निर्णय अंतिम होगा अथवा संस्था प्रबंधन जिला समन्वयक एवं संबंधित जिला शिक्षा पदाधिकारी के अनुशंसा पर अथवा आपका कार्य असंतोष जनक पाए जाने पर अनुशासनहीनता बरतने वरीय पदाधिकारी के आदेश की अवहेलना एवं अवांछित गतिविधियों में सम्मिलित पाए जाने की स्थिति में नियुक्ता द्वारा बगैर किसी पूर्व सूचना के तत्काल प्रभाव से आपको पद से पदमुक्त किया जा सकता है`,
      `आपकी कार्य अवधि संबंधित जिला के संचालन अवधि के अनुरूप होगी अपने कार्यालय से संस्था के द्वारा उपलब्ध कराए गए MIS सॉफ्टवेयर एप्लीकेशन के माध्यम से अपने उपस्थिति दर्ज करना अनिवार्य होगा यदि निर्धारित समय में MIS सॉफ्टवेयर एप्लीकेशन के माध्यम से आप अपनी उपस्थिति दर्ज नहीं करते हैं तो ऐसी स्थिति में अनुशासनिक कार्यवाही करते हुए आपकी सेवा समाप्त की जा सकती है।`,
      `आपको संविदा अवधि में मात्र 16 आकस्मिक छुट्टियां रविवार एवं राष्ट्रीय छुट्टियों को छोड़कर देय होगी किसी भी तरह का अवकाश का उपयोग अपने संबंधित वरीय पदाधिकारी की पूर्वानुमानित एवं स्वीकृत से ही की जा सकती है साथ ही अवकाश में जाने के पूर्व एवं लौट के पश्चात इसकी सूचना जिले के जिला कार्यक्रम पदाधिकारी एवं संस्था प्रबंधक को देना अनिवार्य होगा।`,
      `संविदा अवधि में यदि आप अपने पद से त्यागपत्र देंगे तो इसकी अग्रिम में लिखित सूचना एक माह पूर्व अपने जिला के जिला कार्यक्रम पदाधिकारी एवं संस्था प्रबंधक को देना अनिवार्य होगा अन्यथा आपका बकाया भुगतान नियुक्ता द्वारा देय नहीं होगा।`,
      `यदि संविदा की अवधि के पहले ही किसी अप्रत्याशित एवं परिहार के कर्म से GIS World Hospitality Services Pvt. Ltd द्वारा संचालित कार्यक्रम समाप्त हो जाता है तो उसके साथ ही या संविदा भी स्वतंत्रता समाप्त हो जाएगी।`,
      `आपके अपने कर्तव्यों के प्रति समर्पण तथा संचालित कार्यक्रमों के उद्देश्यों की समाप्ति हेतु सत्य निष्ठा सहित पूर्व पूर्ण प्रतिद्धता अपेक्षित है|`,
      `रात्रि प्रहरी के सेवा के दौरान विद्यालय में यदि किसी प्रकार की चोरी अथवा सुरक्षा में चूक होती है तो इसकी सारी जिम्मेवारी कार्यरत रात्रि प्रहरी की होगी तथा चोरी हुई सामान के समतुल्य मूल्य की कटौती की जाएगी और कटौती की गई राशि से चोरी सामान के प्रतिपूर्ति की जाएगी एवं समतुल्य राशि 15 दिनों के अंदर कार्यरत रात्रि प्रहरी को चुकानी पड़ेगी अन्यथा कानूनी कार्यवाही के द्वारा राशि वसूल की जाएगीl कार्य अवधि में अपना मोबाइल फोन हमेशा ऑन रखेंगेl यदि आप अपना मोबाइल नंबर बदलते हैं, तो इसकी सूचना अपने जिले के कंपनी कार्यालय मोतिहारी को अभिलंब देना होगा।`,
      `यदि उपर्युक्त शर्तेमान्य हो तो नियुक्ति पत्र की एक हस्ताक्षर प्रति कार्यालय को समर्पित कर संबंधित स्कूल में अपना योगदान देना सुनिश्चित करना चाहेंगे पत्र प्राप्ति के 45 दिन के अंदर योगदान नहीं करने पर आपका नियुक्ति स्वत: रद्द मानी जाएगी।`,
    ],
  });

  // generic input handler for simple inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // handle contentEditable changes (subject / intro / terms)
  const handleEditable = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTermEdit = (index, value) => {
    setData((prev) => {
      const terms = [...prev.terms];
      terms[index] = value;
      return { ...prev, terms };
    });
  };

  // computed template subject & intro (used when user didn't overwrite)
  const templateSubject = ` विषय - जिला शिक्षा पदाधिकारी पूर्वी चंपारण पत्रांक – 1820 दिनांक ${data.doeDate || "08-05-2024"} के तहत संविदा के आधार पर प्रखंड के मध्य/माध्यमिक विद्यालय के लिए जिला - पूर्वी चंपारण, प्रखंड – BRC ${data.block || "मधुबन"} के विद्यालय ${data.school || "GMS जितौड़ा"} ${data.area ? data.area : ""} BRC ${data.block || "मधुबन"} मधुबन के विद्यालय में रात्रि प्रहरी के पद पर नियुक्ति के संबंध में।`;

  const templateIntro = `महोदय/महोदया,
उपयुक्त विषय  के संबंध में कहना है कि जिला शिक्षा पदाधिकारी पूर्वी चंपारण पत्रक - 1820 दिनांक – ${data.doeDate || "08-05-2024"} के तहत संविदा के आधार पर मध्य या माध्यमिक विद्यालय के लिए जिला - पूर्वी चंपारण, प्रखंड – BRC ${data.block || "मधुबन"} के विद्यालय ${data.school || "GMS जितौड़ा"} ${data.area ? data.area : ""} BRC ${data.block || "मधुबन"} मधुबन के विद्यालय  के  लिए रात्रि प्रहरी के पद पर कंपनी द्वारा कौशल जांच के पश्चात आपका योगदान हेतु नियोजन GIS World Hospitality Services Pvt. Ltd. द्वारा निम्न शर्तों एवं बंधेज पर सुनिश्चित किया जाता है|`;

  const generatePDF = () => {
    const element = document.getElementById("pdf-wrapper");
    const opt = {
      margin: 0,
      filename: `${data.name || "appointment"}_Appointment_Letter.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="form-wrapper">
      {/* INPUT FORM */}
      <div className="form-grid">
        <input name="refNumber" placeholder="पत्रांक No." onChange={handleChange} />
        <input name="date" type="date" placeholder="Letter Date" onChange={handleChange} />
        <input name="doeDate" type="date" placeholder="D.E.O Letter Date (उदा: 08-05-2024)" onChange={handleChange} />
        <input name="name" placeholder="Employee Name" onChange={handleChange} />
        <input name="father" placeholder="Father's Name (S/O)" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="school" placeholder="GMS/GMSS School Name" onChange={handleChange} />
        <input name="area" placeholder="Area" onChange={handleChange} />
        <input name="block" placeholder="Block (BRC)" onChange={handleChange} />
      </div>

      

      <button className="btn-primary" onClick={generatePDF}>Generate PDF</button>

      {/* ---------------- PDF WRAPPER (2 Pages) -------------- */}
      <div id="pdf-wrapper" style={{ marginTop: 16 }}>

        {/* PAGE 1 */}
        <div className="pdf-page">
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/images.png" width="120" alt="left logo" />
            <div style={{ textAlign: "center", maxWidth: "100%" }}>
              <div style={{  fontSize: 16 }}> <h1>GIS WORLD HOSPITALITY SERVICES PVT. LTD.</h1></div>
              <div style={{  fontSize: 16 }}>We Lead because, We understand needs.</div>
              <div style={{  fontSize: 16 }} >A-56, Shreenath Plaza, FC Road, Pune – 411005</div>
              <div style={{  fontSize: 16 }} >Website: www.secure-isgroup.com</div>
              <div style={{      fontSize: 16 }}>Email: info@secure-isgroup.com</div>
            </div>
           
          </div>

          <hr />

          {/* REF + DATE */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div><b>पत्रांक:</b> GWHSPL/EC/{data.refNumber}</div>
            <div><b>दिनांक:</b> {data.date}</div>
          </div>

          {/* QR */}
          <img src="/Screenshot 2025-12-01 151342.png" width="150" style={{ float: "right", marginLeft: 12 }} alt="qr" />

          {/* Recipient */}
          <p>
            सेवा में,<br />
            <b>{data.name || <i>(नाम डालें)</i>}</b><br />
            S/O – {data.father || <i>(पिता का नाम)</i>}<br />
            Address – {data.address || <i>(address)</i>}
          </p>

          {/* SUBJECT — editable (uses user override if present else template) */}
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleEditable("subject", e.currentTarget.innerText)}
            style={{  marginBottom: 8 }}
          >
            {data.subject ? data.subject : templateSubject}
          </div>

          {/* INTRO PARAGRAPH — editable */}
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleEditable("intro", e.currentTarget.innerText)}
            style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}
          >
            {data.intro ? data.intro : templateIntro}
          </div>

          {/* TERMS 1-3 editable */}
          <div style={{ marginTop: 50, fontSize: 16 }}>
           {data.terms.slice(0, 3).map((t, i) => (
  <div key={i} style={{ marginBottom: 6 }}>
   {i + 1}.{" "}
    <span
      className="editable"
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => handleTermEdit(i, e.currentTarget.innerText)}
    >
      {t}
    </span>
  </div>
))}

          </div>
        </div>

        {/* PAGE BREAK */}
        <div className="html2pdf__page-break"></div>

        {/* PAGE 2 */}
        <div className="pdf-page">
          {/* HEADER SAME */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/images.png" width="120" alt="left logo" />
            <div style={{ textAlign: "center", maxWidth: "100%" }}>
              <div style={{  fontSize: 16 }}> <h1>GIS WORLD HOSPITALITY SERVICES PVT. LTD.</h1></div>
              <div style={{  fontSize: 16 }}>We Lead because, We understand needs.</div>
              <div style={{  fontSize: 16 }}>A-56, Shreenath Plaza, FC Road, Pune – 411005</div>
              <div style={{  fontSize: 16 }}>Website: www.secure-isgroup.com</div>
              <div style={{  fontSize: 16 }}>Email: info@secure-isgroup.com</div>
            </div>
           
          </div>

          <hr />

          {/* Terms 4-10 editable */}
          <div style={{ marginTop: 20, fontSize: 16 }}>
           {data.terms.slice(3).map((t, idx) => {
  const index = idx + 3;
  return (
    <div key={index} style={{ marginBottom: 8 }}>
    {index + 1}.{" "}
      <span
        className="editable"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => handleTermEdit(index, e.currentTarget.innerText)}
      >
      {t}
      </span>
    </div>
  );
})}

          </div>

          <div style={{ marginTop: 100, display: "flex", justifyContent: "space-between" }}>
            <div>Employee Signature</div>
            <div style={{ marginTop: 8,  display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    Authorized Signatory<br />
              GIS WORLD HOSPITALITY SERVICES PVT. LTD.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
