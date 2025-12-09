import { useState } from "react";
import * as XLSX from "xlsx";

export default function NightGuardExcel() {
  const [jsonData, setJsonData] = useState([]);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json);
    };
    reader.readAsBinaryString(file);
  };

  const sendToBackend = async () => {
    await fetch("https://digyaanshshrishti.onrender.com/api/nightguard/upload-excel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: jsonData }),
    });

    alert("Night Guard Data Uploaded!");
  };

  return (
    <div>
      <h2>Upload Night Guard Excel</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {jsonData.length > 0 && (
        <>
          <p>{jsonData.length} records detected!</p>
          <button onClick={sendToBackend}>Upload</button>
        </>
      )}
    </div>
  );
}
