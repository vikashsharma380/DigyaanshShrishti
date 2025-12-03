import { useState } from "react";
import "../../styles/user.css";

export default function CreateUserForm() {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    block: "",
    designation: "",
    aadhaar: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User Created Successfully!");
    console.log(data);
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Create New User</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        
        <label>Name:</label>
        <input type="text" name="name" value={data.name} onChange={handleChange} required />

        <label>Father Name:</label>
        <input type="text" name="fatherName" value={data.fatherName} onChange={handleChange} required />

        <label>Block:</label>
        <input type="text" name="block" value={data.block} onChange={handleChange} required />

        <label>Designation:</label>
        <input type="text" name="designation" value={data.designation} onChange={handleChange} required />

        <label>Aadhaar Number:</label>
        <input type="text" name="aadhaar" maxLength="12" value={data.aadhaar} onChange={handleChange} required />

        <label>Mobile Number:</label>
        <input type="text" name="mobile" maxLength="10" value={data.mobile} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={data.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={data.password} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={data.address} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={data.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={data.dob} onChange={handleChange} required />

        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
}
