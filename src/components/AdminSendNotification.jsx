import { useEffect, useState } from "react";

export default function AdminSendNotification() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [message, setMessage] = useState("");

  const [sentMessages, setSentMessages] = useState([]);

  // GET ALL USERS
  useEffect(() => {
    fetch("https://digyaanshshrishti.onrender.com/api/users/all")
      .then((res) => res.json())
      .then((out) => {
        if (out.success) setUsers(out.users);
      });
  }, []);

  // GET ALL SENT NOTIFICATIONS
  useEffect(() => {
    fetch("https://digyaanshshrishti.onrender.com/api/notifications/admin/all")
      .then((res) => res.json())
      .then((out) => {
        if (out.success) setSentMessages(out.list);
      });
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return alert("Please type a message!");

    let payload = {
      message,
      userId: selectedUser === "all" ? null : selectedUser,
    };

    const res = await fetch(
      "https://digyaanshshrishti.onrender.com/api/notifications/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert(selectedUser === "all"
        ? "Message sent to ALL users!"
        : "Message sent successfully!"
      );

      setMessage("");
      setSelectedUser("all");

      // REFRESH NOTIFICATION LIST
      fetch("https://digyaanshshrishti.onrender.com/api/notifications/admin/all")
        .then((res) => res.json())
        .then((out) => {
          if (out.success) setSentMessages(out.list);
        });
    } else {
      alert("Failed to send message!");
    }
  };

  // DELETE MESSAGE
  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this notification?")) return;

    const res = await fetch(
      `https://digyaanshshrishti.onrender.com/api/notifications/delete/${id}`,
      { method: "DELETE" }
    );

    const out = await res.json();

    if (out.success) {
      setSentMessages(sentMessages.filter((m) => m._id !== id));
    }
  };

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "40px auto",
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        📢 Send Notification
      </h2>

      {/* USER SELECTION */}
      <label style={{ fontWeight: "600" }}>Send To</label>
      <select
        style={{
          width: "100%",
          padding: "12px",
          margin: "8px 0 16px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="all">📢 All Users</option>

        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.roleType})
          </option>
        ))}
      </select>

      {/* MESSAGE INPUT */}
      <label style={{ fontWeight: "600" }}>Message</label>
      <textarea
        style={{
          width: "100%",
          padding: "12px",
          minHeight: "120px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          fontSize: "16px",
        }}
        placeholder="Type message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* SEND BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "14px",
          background: "#007bff",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontSize: "18px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "30px",
        }}
        onClick={sendMessage}
      >
        Send Message 🚀
      </button>

      {/* ========================== */}
      {/* SENT MESSAGES LIST */}
      {/* ========================== */}

      <h3 style={{ marginBottom: "10px", fontWeight: "600" }}>
        📜 Sent Notifications
      </h3>

      {sentMessages.length === 0 && <p>No messages sent yet.</p>}

      {sentMessages.map((m) => (
        <div
          key={m._id}
          style={{
            background: "#f5f5f5",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>Message:</strong> {m.message} <br />
          <small style={{ color: "gray" }}>
            {new Date(m.createdAt).toLocaleString()}
          </small>
          <br />

          <button
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginTop: "8px",
            }}
            onClick={() => deleteMsg(m._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
