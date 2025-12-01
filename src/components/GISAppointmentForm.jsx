import { useState } from "react";
// import html2pdf from "html2pdf.js";
import "../styles/form.css";

export default function GISAppointmentForm() {
  const [data, setData] = useState({
    refNumber: "",
    name: "",
    father: "",
    address: "",
    patraank: "",
    schoolType: "",
    schoolName: "",
    brcArea: "",
    date: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const element = document.getElementById("gis-letter-template");

    const opt = {
      margin: 5,
      filename: `${data.name}_GIS_Appointment.pdf`,
      html2canvas: { scale: 3 },
      jsPDF: { format: "a4", unit: "mm" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">GIS WORLD Appointment Letter</h1>

      {/* FORM INPUTS */}
      <div className="form-grid">
        <input name="refNumber" placeholder="Ref No. (Only Number)" onChange={handleChange} />
        <input name="date" type="date" onChange={handleChange} />
        <input name="name" placeholder="Employee Name" onChange={handleChange} />
        <input name="father" placeholder="Father's Name (S/O)" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="patraank" placeholder="पत्रांक – 1820 दिनांक 08-05-2024" onChange={handleChange} />
        <input name="schoolType" placeholder="मध्य/माध्यमिक विद्यालय" onChange={handleChange} />
        <input name="schoolName" placeholder="विद्यालय का नाम" onChange={handleChange} />
        <input name="brcArea" placeholder="BRC मधुबन / Block Name" onChange={handleChange} />
      </div>

      <button className="btn-primary" onClick={generatePDF}>Generate PDF →</button>

      {/* PDF TEMPLATE */}
      <div id="gis-letter-template" className="letter-template">
        <p><b>Ref.No. : GWHSPL/EC/NG/{data.refNumber}</b></p>
        <p><b>Date : {data.date}</b></p>

        <br />

        <p>सेवा में,<br />
        <b>{data.name}</b><br />
        S/O – {data.father}<br />
        Address – {data.address}</p>

        <br />

        <p><b>विषय - जिला शिक्षा पदाधिकारी {data.patraank} के तहत संविदा के आधार पर {data.schoolType} के लिए जिला - पूर्वी चंपारण, प्रखंड – {data.brcArea} के विद्यालय {data.schoolName} में रात्रि प्रहरी के पद पर नियुक्ति के संबंध में।</b></p>

        <br />

        <p>
        महोदय/महोदया,<br /><br />
        उपयुक्त विषय के संबंध में कहना है कि जिला शिक्षा पदाधिकारी पत्रांक {data.patraank}
        के तहत संविदा के आधार पर विद्यालय {data.schoolName}, प्रखंड {data.brcArea},
        जिला पूर्वी चंपारण के लिए रात्रि प्रहरी के पद पर कंपनी द्वारा कौशल जांच के पश्चात 
        आपका योगदान हेतु नियोजन GIS World Hospitality Services Pvt. Ltd. द्वारा निम्न 
        शर्तों एवं बंधेज पर सुनिश्चित किया जाता है:
        </p>

        <br />
<ol >

  <li>
    यह नियुक्ति संविदा के आधार पर विभाग द्वारा तय सीमा तक के लिए की जा रही है।
    इस कार्य हेतु आपको प्रति माह विभाग द्वारा अनुमोदित दर लागू नियम एवं शर्तों के अधीन देय होगा।
  </li>

  <li>
    आपके कार्य कुशलता पूर्ण मूल्यांकन के पश्चात आपके संविदा की अवधि का विस्तार किया जा सकता है,
    परंतु संविदा अवधि विस्तार के संबंध में GIS World Hospitality Services Pvt. Ltd. का निर्णय अंतिम होगा।
  </li>

  <li>
    संविदा की अवधि की समाप्ति के पूर्व भी अग्रिम सूचना देकर इस संविदा को समाप्त किया जा सकता है।
    इस संबंध में नियुक्ता का निर्णय अंतिम होगा अथवा संस्था प्रबंधन जिला समन्वयक एवं संबंधित जिला शिक्षा
    पदाधिकारी के अनुशंसा पर अथवा आपका कार्य असंतोषजनक पाए जाने पर, अनुशासनहीनता बरतने,
    वरीय पदाधिकारी के आदेश की अवहेलना एवं अवांछित गतिविधियों में सम्मिलित पाए जाने की स्थिति में,
    नियुक्ता द्वारा बिना किसी पूर्व सूचना के तत्काल प्रभाव से आपको पद से पदमुक्त किया जा सकता है।
  </li>

  <br />

  <p><b>Branch Office :</b> Sadhu Sadan Near Bapudham Station to Janpul Road Ward no – 22 Santipuri Motihari<br/>
  <b>Contact No. :</b> 7004062960</p>

  <br /><br />

  <li>
    आपकी कार्य अवधि संबंधित जिला के संचालन अवधि के अनुरूप होगी।
    अपने कार्यालय से संस्था के द्वारा उपलब्ध कराए गए MIS सॉफ्टवेयर एप्लीकेशन के माध्यम से
    अपनी उपस्थिति दर्ज करना अनिवार्य होगा।
    यदि निर्धारित समय में MIS सॉफ्टवेयर एप्लीकेशन के माध्यम से उपस्थिति दर्ज नहीं करते हैं,
    तो अनुशासनात्मक कार्रवाई करते हुए आपकी सेवा समाप्त की जा सकती है।
  </li>

  <li>
    आपको संविदा अवधि में मात्र 16 आकस्मिक छुट्टियां, रविवार एवं राष्ट्रीय छुट्टियों को छोड़कर देय होगी।
    किसी भी तरह का अवकाश अपने संबंधित वरीय पदाधिकारी की पूर्वानुमति एवं स्वीकृति से ही किया जा सकता है।
    साथ ही अवकाश में जाने के पूर्व एवं लौटने के पश्चात इसकी सूचना जिला कार्यक्रम पदाधिकारी एवं
    संस्था प्रबंधक को देना अनिवार्य होगा।
  </li>

  <li>
    संविदा अवधि में यदि आप अपने पद से त्यागपत्र देंगे तो इसकी अग्रिम में लिखित सूचना एक माह पूर्व
    जिला कार्यक्रम पदाधिकारी एवं संस्था प्रबंधक को देना अनिवार्य होगा।
    अन्यथा आपका बकाया भुगतान नियुक्ता द्वारा देय नहीं होगा।
  </li>

  <li>
    यदि संविदा की अवधि के पहले किसी अप्रत्याशित एवं परिहार्य कृत्य से GIS World Hospitality Services Pvt. Ltd.
    द्वारा संचालित कार्यक्रम समाप्त हो जाता है, तो संविदा स्वतः समाप्त मानी जाएगी।
  </li>

  <li>
    आपके कर्तव्यों के प्रति समर्पण तथा संचालित कार्यक्रमों के उद्देश्यों की प्राप्ति हेतु सत्यनिष्ठा सहित
    पूर्ण प्रतिबद्धता अपेक्षित है।
  </li>

  <li>
    रात्रि प्रहरी के सेवा के दौरान विद्यालय में यदि किसी प्रकार की चोरी अथवा सुरक्षा में चूक होती है,
    तो इसकी संपूर्ण जिम्मेवारी कार्यरत रात्रि प्रहरी की होगी।
    चोरी हुए सामान के समतुल्य मूल्य की कटौती की जाएगी तथा कटौती की गई राशि से चोरी सामान की
    प्रतिपूर्ति की जाएगी।
    समतुल्य राशि 15 दिनों के अंदर जमा न करने पर कानूनी कार्रवाई के द्वारा राशि वसूल की जाएगी।
    कार्य अवधि में मोबाइल फोन हमेशा ऑन रखना अनिवार्य है।
    यदि आप अपना मोबाइल नंबर बदलते हैं, तो इसकी सूचना संबंधित कंपनी कार्यालय मोतिहारी को
    अविलंब देना होगा।
  </li>

  <li>
    यदि उपर्युक्त शर्तें मान्य हों तो नियुक्ति पत्र की एक हस्ताक्षरित प्रति कार्यालय को समर्पित कर
    संबंधित विद्यालय में योगदान देना सुनिश्चित करें।
    पत्र प्राप्ति के 45 दिनों के अंदर योगदान नहीं करने पर नियुक्ति स्वतः रद्द मानी जाएगी।
  </li>

</ol>


        <br /><br />

        <p>Employee Signature ___________________</p>
        <p>Authorized Signature<br />GIS WORLD HOSPITALITY SERVICES PVT. LTD.</p>

        <br /><br />

        <p><b>Branch Office:</b> Sadhu Sadan Near Bapudham Station to Janpul Road, Ward no – 22 Santipuri Motihari<br />
        <b>Contact:</b> 7004062960</p>
      </div>
    </div>
  );
}
