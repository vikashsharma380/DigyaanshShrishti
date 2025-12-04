import { useState } from "react";
import "../../styles/user.css";

export default function CreateUserForm() {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    district: "",
    block: "",
    designation: "",
    aadhaar: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    dob: "",
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
    },
    access: "active",
  });

  // NORMAL FIELD CHANGE
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // BANK DETAILS NESTED FIELD HANDLER
  const handleBankChange = (e) => {
    setData({
      ...data,
      bankDetails: {
        ...data.bankDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  // SUBMIT FORM
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    alert(
      `User Created!\nUser ID: ${result.userId}\nPassword: ${result.password}`
    );
  } else {
    alert("Error: " + result.message);
  }
};


  return (
    <div className="form-wrapper">
      <h2 className="form-title">Create New User</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        
        <label>Name:</label>
        <input name="name" value={data.name} onChange={handleChange} required />

        <label>Father Name:</label>
        <input name="fatherName" value={data.fatherName} onChange={handleChange} required />

        <label>District:</label>
        <input name="district" value={data.district} onChange={handleChange} required />

        <label>Block:</label>
        <input name="block" value={data.block} onChange={handleChange} required />

        <label>Designation:</label>
        <input name="designation" value={data.designation} onChange={handleChange} required />

        <label>Aadhaar:</label>
        <input name="aadhaar" maxLength="12" value={data.aadhaar} onChange={handleChange} required />
        <label>Mobile:</label>
        <input name="mobile" maxLength="10" value={data.mobile} onChange={handleChange} required />
        <label>Email:</label>
        <input name="email" value={data.email} onChange={handleChange} required />
        <label>Address:</label>
        <input name="address" value={data.address} onChange={handleChange} required />
        <label>Gender:</label>
        <select name="gender" value={data.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={data.dob} onChange={handleChange} required />

        {/* BANK DETAILS */}
        <h3 style={{ marginTop: "20px" }}>Bank Details</h3>

        <label>Account Number:</label>
        <input name="accountNumber" value={data.bankDetails.accountNumber} onChange={handleBankChange} />

        <label>IFSC Code:</label>
        <input name="ifscCode" value={data.bankDetails.ifscCode} onChange={handleBankChange} />

        <label>Bank Name:</label>
        <input name="bankName" value={data.bankDetails.bankName} onChange={handleBankChange} />

        <button className="submit-btn" type="submit">Create User</button>

      </form>
    </div>
  );
}
