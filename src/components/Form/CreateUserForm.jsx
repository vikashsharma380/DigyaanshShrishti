import { useState, useEffect } from "react";
import "../../styles/user.css";

export default function CreateUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [district, setDistrict] = useState([]);
  const districtBlocks = {};
  district.forEach((d) => {
    districtBlocks[d.name] = d.blocks;
  });

  const [designations, setDesignations] = useState([]);

useEffect(() => {
  fetch("https://api.digyaanshshrishti.com/api/designations/all")
    .then(res => res.json())
    .then(out => out.success && setDesignations(out.list));
}, []);
const initialState = {
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
  roleType: "sweeper",
};


const [data, setData] = useState(initialState);

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/district/list")
      .then(res => res.json())
      .then(out => {
        if (out.success) {
          setDistrict(out.list);
        }
      });
  }, []);

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

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/users/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (result.success) {
      alert("✅ User successfully created!");
       setData(initialState);
    setShowPassword(false);
      
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Create New User</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Name:</label>
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Father Name:</label>
            <input
              name="fatherName"
              value={data.fatherName}
              onChange={handleChange}
              required
            />
          </div>

          {/* UPDATED DISTRICT FIELD */}
          <div>
            <label>District:</label>
            <select
              name="district"
              value={data.district}
              onChange={(e) => {
                handleChange(e);
                setData({ ...data, district: e.target.value, block: "" });
              }}
              required
            >
              <option value="">Select District</option>
              {district.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))} 
            </select>
          </div>

          {/* UPDATED BLOCK FIELD */}
          <div>
            <label>Block:</label>
            <select
              name="block"
              value={data.block}
              onChange={handleChange}
              required
            >
              <option value="">Select Block</option>

              {data.district &&
                districtBlocks[data.district]?.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>
          </div>

<div>
  <label>Designation:</label>
  <select
    name="designation"
    value={data.designation}
    onChange={(e) => {
      const value = e.target.value;

      // Auto Set Role Type
      let role = "supervisor"; 

      if (value === "Sweeper") role = "sweeper";
      if (value === "Night Guard") role = "nightguard";
      if (value === "Admin") role = "admin";

      setData({
        ...data,
        designation: value,
        roleType: role,
      });
    }}
    required
  >
    <option value="">Select Designation</option>

    {designations
  .filter(d => d?.name)
  .map(d => (
    <option key={d._id} value={d.name}>
      {d.name}
    </option>
  ))}

  </select>
</div>


          <div>
            <label>Aadhaar:</label>
            <input
              name="aadhaar"
              maxLength="12"
              value={data.aadhaar}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Mobile:</label>
            <input
              name="mobile"
              maxLength="10"
              value={data.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Address:</label>
            <input
              name="address"
              value={data.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                style={{ paddingRight: "40px" }}
              />

              {/* Show/Hide Button */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
        </div>

        {/* BANK DETAILS */}
        <h3 style={{ marginTop: "20px" }}>Bank Details</h3>

        <div className="form-grid">
          <div>
            <label>Account Number:</label>
            <input
              name="accountNumber"
              value={data.bankDetails.accountNumber}
              onChange={handleBankChange}
            />
          </div>

          <div>
            <label>IFSC Code:</label>
            <input
              name="ifscCode"
              value={data.bankDetails.ifscCode}
              onChange={handleBankChange}
            />
          </div>

          <div>
            <label>Bank Name:</label>
            <input
              name="bankName"
              value={data.bankDetails.bankName}
              onChange={handleBankChange}
            />
          </div>
        </div>

        <button className="submit-btn" type="submit">
          Create User
        </button>
      </form>
    </div>
  );
}
