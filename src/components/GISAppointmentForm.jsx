import { useState } from "react";
import "../styles/form.css";

export default function GISAppointmentForm() {
  const [data, setData] = useState({
    refNumber: "",
    date: "",
    name: "",
    father: "",
    address: "",
    // editable big fields
    subject: `विषय - जिला शिक्षा पदाधिकारी पूर्वी चंपारण पत्रांक – 1820 दिनांक 08-05-2024 के तहत संविदा के आधार पर प्रखंड के मध्य/माध्यमिक विद्यालय के लिए जिला - पूर्वी चंपारण, प्रखंड – BRC  के विद्यालय GMS जितौड़ा BRC मधुबन के विद्यालय में रात्रि प्रहरी के पद पर नियुक्ति के संबंध में।`,
    intro: `महोदय/महोदया,
उपयुक्त विषय  के संबंध में कहना है कि जिला शिक्षा पदाधिकारी पूर्वी चंपारण पत्रक - 1820 दिनांक – 08-05-2024 के तहत संविदा के आधार पर मध्य या माध्यमिक विद्यालय के लिए जिला - पूर्वी चंपारण, प्रखंड – BRC मधुबन के विद्यालय GMS जितौड़ा BRC मधुबन के विद्यालय  के  लिए रात्रि प्रहरी के पद पर कंपनी द्वारा कौशल जांच के पश्चात आपका योगदान हेतु नियोजन GIS World Hospitality Services Pvt. Ltd. द्वारा निम्न शर्तों एवं बंधेज पर सुनिश्चित किया जाता है|`,
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
      `यदि उपर्युक्त शर्तेमान्य हो तो नियुक्ति पत्र की एक हस्ताक्षर प्रति कार्यालय को समर्पित कर संबंधित स्कूल में अपना योगदान देना सुनिश्चित करना चाहेंगे पत्र प्राप्ति के 45 दिन के अंदर योगदान नहीं करने पर आपका नियुक्ति स्वत: रद्द मानी जाएगी।`
    ]
  });

  // generic input handler for simple inputs
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // handle contentEditable changes
  const handleEditable = (key, value) => {
    setData({ ...data, [key]: value });
  };

  // handle term edit
  const handleTermEdit = (index, value) => {
    const newTerms = [...data.terms];
    newTerms[index] = value;
    setData({ ...data, terms: newTerms });
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-wrapper");
    const opt = {
      margin: 0,
      filename: `${data.name || "appointment"}_Appointment_Letter.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }
    };
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ padding: 12 }}>
      {/* INPUT FORM */}
    <div className="input-grid">
  <input name="refNumber" className="input-box" placeholder="पत्रांक No." onChange={handleChange} />
  <input name="date" type="date" className="input-box" onChange={handleChange} />
  <input name="name" className="input-box" placeholder="Employee Name" onChange={handleChange} />
  <input name="father" className="input-box" placeholder="Father's Name (S/O)" onChange={handleChange} />
  <input name="address" className="input-box" placeholder="Address" onChange={handleChange} />
  <input name="block" className="input-box" placeholder="Block" onChange={handleChange} />
</div>



    

      <button className="btn-primary" onClick={generatePDF}>Generate PDF</button>

      {/* ---------------- PDF WRAPPER (2 Pages) -------------- */}
      <div id="pdf-wrapper" style={{ marginTop: 12 }}>

        {/* PAGE 1 */}
        <div className="pdf-page">
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/images.png" width="80" alt="left logo" />
            <div style={{ textAlign: "center", maxWidth: "58%" }}>
              <div style={{ fontWeight: 700 }}>GIS WORLD HOSPITALITY SERVICES PVT. LTD.</div>
              <div>We Lead because, We understand needs.</div>
              <div>A-56, Shreenath Plaza, FC Road, Pune – 411005</div>
              <div>Website: www.secure-isgroup.com</div>
              <div>Email: info@secure-isgroup.com</div>
            </div>
            <img src="/images.png" width="80" alt="right logo" />
          </div>

          <hr />

          {/* REF + DATE */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div><b>पत्रांक:</b> GWHSPL/EC/NG/{data.refNumber}</div>
            <div><b>दिनांक:</b> {data.date}</div>
          </div>

          {/* QR */}
          <img src="/qr.png" width="90" style={{ float: "right", marginLeft: 12 }} alt="qr" />

          {/* Recipient */}
          <p>
            सेवा में,<br />
            <b>{data.name || <i>(नाम डालें)</i>}</b><br />
            S/O – {data.father || <i>(पिता का नाम)</i>}<br />
            Address – {data.address || <i>(address)</i>}
          </p>

          {/* SUBJECT — editable */}
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleEditable("subject", e.currentTarget.innerText)}
            style={{ fontWeight: 700, marginBottom: 8 }}
          >
            {data.subject}
          </div>

          {/* INTRO PARAGRAPH — editable */}
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleEditable("intro", e.currentTarget.innerText)}
            style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}
          >
            {data.intro}
          </div>

          {/* TERMS 1-3 shown here (editable inline) */}
          <div>
            {data.terms.slice(0, 3).map((t, i) => (
              <div
                key={i}
                style={{ marginBottom: 6 }}
              >
                <b>{i + 1}.</b>{" "}
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
          {/* header same */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/images.png" width="80" alt="left logo" />
            <div style={{ textAlign: "center", maxWidth: "58%" }}>
              <div style={{ fontWeight: 700 }}>GIS WORLD HOSPITALITY SERVICES PVT. LTD.</div>
              <div>We Lead because, We understand needs.</div>
              <div>A-56, Shreenath Plaza, FC Road, Pune – 411005</div>
              <div>Website: www.secure-isgroup.com</div>
              <div>Email: info@secure-isgroup.com</div>
            </div>
            <img src="/images.png" width="80" alt="right logo" />
          </div>

          <hr />

          {/* Terms 4-10 editable */}
          <div>
            {data.terms.slice(3).map((t, idx) => {
              const realIndex = idx + 3;
              return (
                <div key={realIndex} style={{ marginBottom: 8 }}>
                  <b>{realIndex + 1}.</b>{" "}
                  <span
                    className="editable"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={(e) => handleTermEdit(realIndex, e.currentTarget.innerText)}
                  >
                    {t}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14 }}>
            <div>Employee Signature: _______________________</div>
            <div style={{ marginTop: 8 }}>
              Authorized Signatory<br />
              GIS WORLD HOSPITALITY SERVICES PVT. LTD.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
