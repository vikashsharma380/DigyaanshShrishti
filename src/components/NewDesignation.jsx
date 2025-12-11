import { useState } from "react";

export default function AddDesignation() {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return alert("Enter designation!");

    const res = await fetch("https://api.digyaanshshrishti.com/api/designations/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const out = await res.json();
    if (out.success) {
    

    } else {
      alert("Already exists!");
    }
  };

  return (
    <div>
      <h2>Add New Designation</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter designation name"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
