import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUpload() {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const binary = event.target.result;
      const workbook = XLSX.read(binary, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json);
    };

    reader.readAsBinaryString(file);
  };

  const sendToBackend = async () => {
    const res = await fetch("https://digyaanshshrishti.onrender.com/api/sweeper/upload-excel", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: jsonData })
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Sweeper Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {jsonData.length > 0 && (
        <>
          <p>{jsonData.length} records loaded</p>
          <button onClick={sendToBackend}>Save to Database</button>
        </>
      )}
    </div>
  );
}
