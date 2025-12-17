import { useEffect, useState } from "react";

export default function AdminSendNotification() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  // FETCH USERS
  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/users/list")
      .then((res) => res.json())
      .then((out) => out.success && setUsers(out.users));
  }, []);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "https://api.digyaanshshrishti.com/api/notifications/admin/all"
      );
      const out = await res.json();
      if (out.success) setSentMessages(out.list);
    };

    load();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return alert("Please type a message!");

    const payload = {
      message,
      userId: selectedUser === "all" ? null : selectedUser,
    };

    const res = await fetch(
      "https://api.digyaanshshrishti.com/api/notifications/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const out = await res.json();

    if (out.success) {
      alert("Notification Sent! 🚀");
      setMessage("");
      setSelectedUser("all");

      // FETCH AGAIN FROM SERVER (ONLY THIS)
      const updated = await fetch(
        "https://api.digyaanshshrishti.com/api/notifications/admin/all"
      ).then((res) => res.json());

      if (updated.success) setSentMessages(updated.list);
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    const res = await fetch(
      `https://api.digyaanshshrishti.com/api/notifications/delete/${id}`,
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
        maxWidth: "900px",
        margin: "40px auto",
        padding: "40px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      }}
    >
      {/* HEADER */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "34px",
          fontWeight: "700",
          background: "linear-gradient(90deg,#00d2ff,#3a7bd5)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: "1px",
        }}
      >
        📢 Send Notification
      </h2>

      {/* SELECT USER */}
      <label style={{ fontWeight: "600", fontSize: "18px", color: "#fff" }}>
        Select User
      </label>

      <select
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          margin: "10px 0 20px 0",
          background: "rgba(255,255,255,0.2)",
          color: "black",
          fontSize: "16px",
          outline: "none",
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

      {/* MESSAGE BOX */}
      <label
        style={{ fontWeight: "600", fontSize: "18px", color: "#000000ff" }}
      >
        Message
      </label>
      <textarea
        style={{
          width: "100%",
          padding: "15px",
          minHeight: "130px",
          borderRadius: "12px",
          border: "none",
          background: "rgba(255,255,255,0.2)",
          color: "black",
          fontSize: "16px",
          outline: "none",
          marginTop: "10px",
        }}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* SEND BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "15px",
          background: "linear-gradient(90deg,#3a7bd5,#00d2ff)",
          color: "white",
          borderRadius: "12px",
          fontSize: "20px",
          fontWeight: "700",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
          transition: "0.25s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        onClick={sendMessage}
      >
        🚀 Send Notification
      </button>

      {/* LIST OF SENT MESSAGES */}
      <h3
        style={{
          fontSize: "24px",
          // color: "black",
          marginTop: "35px",
          color: "#fff",
          borderBottom: "2px solid rgba(255,255,255,0.3)",
          paddingBottom: "8px",
        }}
      >
        📜 Sent Notifications
      </h3>

      {sentMessages.length === 0 && (
        <p style={{ color: "#eee", marginTop: "10px" }}>
          No notifications sent yet.
        </p>
      )}

      {[
        ...new Map(sentMessages.map((item) => [item.message, item])).values(),
      ].map((m) => (
        <div
          key={m._id}
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "14px",
            borderRadius: "12px",
            marginTop: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <strong style={{ fontSize: "17px", color: "#000000ff" }}>
            {m.message}
          </strong>
          <br />
          <small style={{ color: "#000000ff" }}>
            {new Date(m.createdAt).toLocaleString()}
          </small>

          <button
            style={{
              float: "right",
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
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
