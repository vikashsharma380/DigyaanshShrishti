// import { useState } from "react";
// import * as XLSX from "xlsx";

// export default function ExcelUpload() {
//   const [jsonData, setJsonData] = useState([]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binary = event.target.result;
//       const workbook = XLSX.read(binary, { type: "binary" });

//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       const json = XLSX.utils.sheet_to_json(sheet);
//       setJsonData(json);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const sendToBackend = async () => {
//     const res = await fetch("https://digyaanshshrishti.onrender.com/api/sweeper/upload-excel", {

//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: jsonData })
//     });

//     const result = await res.json();
//     alert(result.message);
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Upload Sweeper Excel File</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

//       {jsonData.length > 0 && (
//         <>
//           <p>{jsonData.length} records loaded</p>
//           <button onClick={sendToBackend}>Save to Database</button>
//         </>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function ExcelUpload() {
  const [jsonData, setJsonData] = useState([]);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) return;

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

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const sendToBackend = async () => {
    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/sweeper/upload-excel",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: jsonData }),
      }
    );

    const result = await res.json();
    alert(result.message);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "6px 14px",
            background: "#6e00ff",
            color: "white",
            border: "none",
            fontSize: "14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(110,0,255,0.25)",
            transition: "0.2s",
          }}
        >
          ← Back to Admin
        </button>

        <h2
          style={{
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "700",
            color: "#222",
            marginTop: "10px",
          }}
        >
          Upload Excel File
        </h2>

        {/* Drag + Upload Box */}
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "2px dashed #999",
            borderRadius: "14px",
            padding: "40px 20px",
            cursor: "pointer",
            display: "block",
            transition: "0.3s",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6e00ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "15px" }}
          >
            <path d="M12 17V3m0 0l-4 4m4-4l4 4" />
            <path d="M20 17a4 4 0 00-4-4H8a4 4 0 00-4 4" />
          </svg>

          <p style={{ color: "#555", marginBottom: "10px", fontSize: "15px" }}>
            Click or Drag & Drop Excel File
          </p>

          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>

        {/* Show Count */}
        {jsonData.length > 0 && (
          <div style={{ marginTop: "25px" }}>
            <p
              style={{
                color: "#333",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              {jsonData.length} records found ✔️
            </p>

            <button
              onClick={sendToBackend}
              style={{
                background: "#6e00ff",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "600",
                width: "100%",
              }}
            >
              Save to Database
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
