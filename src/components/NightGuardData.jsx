import { useEffect, useState } from "react";

export default function NightGuardData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/nightguard/all-data")
      .then((res) => res.json())
      .then((out) => setData(out));
  }, []);

  return (
    <div>
      <h2>Night Guard Records</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>District</th>
            <th>Block</th>
            <th>School</th>
            <th>Name</th>
            <th>Duty</th>
            <th>Account</th>
            <th>IFSC</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {data.map((g, i) => (
            <tr key={i}>
              <td>{g.district}</td>
              <td>{g.block}</td>
              <td>{g.schoolName}</td>
              <td>{g.guardName}</td>
              <td>{g.dutyTime}</td>
              <td>{g.accountNumber}</td>
              <td>{g.ifsc}</td>
              <td>{g.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
