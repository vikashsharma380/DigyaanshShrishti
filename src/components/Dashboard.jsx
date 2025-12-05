import { useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
useEffect(() => {
  fetch("https://YOUR_BACKEND_URL/api/contact/list")
    .then(res => res.json())
    .then(out => {
      if (out.success) {
        setNotifications(out.list);
      }
    });
}, []);

  // ================================
  // ALL CHILD ITEMS
  // ================================
  const quickActions = [
    // LETTERS
    {
      title: "Appointment Letter",
      link: "/form/digyaansh-appointment",
      icon: "📋",
      count: 12,
      type: "letters",
    },
    {
      title: "Leaving Letter",
      link: "/form/digyaansh-leaving",
      icon: "📦",
      count: 5,
      type: "letters",
    },
    {
      title: "Experience Certificate",
      link: "/form/digyaansh-experience",
      icon: "🏆",
      count: 8,
      type: "letters",
    },

    // USERS
    {
      title: "Create User",
      link: "/form/create-user",
      icon: "👤",
      count: 3,
      type: "users",
    },
    {
      title: "View Users",
      link: "/users",
      icon: "👥",
      count: 2,
      type: "users",
    },

    // SWEEPER
    {
      title: "Upload Sweeper Data",
      link: "/upload-excel",
      icon: "📤",
      count: 0,
      type: "sweeper",
    },
    {
      title: "View Sweeper Data",
      link: "/admin/sweeper-data",
      icon: "📊",
      count: 0,
      type: "sweeper",
    },
  ];
const deleteMessage = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  const res = await fetch(
    `https://digyaanshshrishti.onrender.com/api/contact/delete/${id}`,
    { method: "DELETE" }
  );

  const out = await res.json();

  if (out.success) {
    setNotifications(notifications.filter((msg) => msg._id !== id));
  }
};

  // ================================
  // DASHBOARD PARENT BOXES
  // ================================
  const parentBoxes = [
    {
      title: "Letters",
      icon: "✉️",
      type: "letters",
      count: 3,
    },
    {
      title: "Users",
      icon: "👥",
      type: "users",
      count: 2,
    },
    {
      title: "Sweeper Data",
      icon: "🧹",
      type: "sweeper",
      count: 2,
    },
  ];

  // ================================
  // SIDEBAR ITEMS
  // ================================
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "letters", label: "Letters", icon: "✉️" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "sweeper", label: "Sweeper Data", icon: "🧹" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  // ================================
  // FILTERING
  // ================================
  const filteredCards =
    activeNav === "dashboard"
      ? parentBoxes
      : quickActions.filter((item) => item.type === activeNav);

  return (
    <div className="dashboard-wrapper">
      {/* ---------------------- SIDEBAR ---------------------- */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
          </div>

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "‹" : "›"}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-title">
            {activeNav === "dashboard"
              ? "Dashboard"
              : activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
          </div>

          <div className="topbar-right">
            <input
              type="text"
              className="search-bar"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

         <button
  className="icon-btn"
  onClick={() => setShowNotifications(!showNotifications)}
  style={{ position: "relative" }}
>
  🔔
  {notifications.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-5px",
        right: "-5px",
        background: "red",
        color: "white",
        fontSize: "12px",
        padding: "2px 6px",
        borderRadius: "50%",
      }}
    >
      {notifications.length}
    </span>
  )}
</button>

            <button className="icon-btn">🔧</button>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {showNotifications && (
  <div
    style={{
      position: "absolute",
      top: "70px",
      right: "30px",
      width: "350px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
      padding: "15px",
      zIndex: 50,
    }}
  >
    <h3 style={{ marginBottom: "10px" }}>Messages</h3>

    {notifications.length === 0 && <p>No new messages</p>}

    {notifications.map((msg) => (
      <div
        key={msg._id}
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <strong>{msg.name}</strong> <br />
        <small>{msg.email}</small> <br />
        <p>{msg.message}</p>

        <button
          style={{
            background: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => deleteMessage(msg._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}


        {/* CONTENT SECTION */}
        <div className="content">
          <h2 className="section-title">
            {activeNav === "dashboard"
              ? "Quick Actions"
              : activeNav === "letters"
              ? "Letters"
              : activeNav === "users"
              ? "User Management"
              : activeNav === "sweeper"
              ? "Sweeper Tools"
              : "Section"}
          </h2>

          <div className="actions-grid">
            {filteredCards.map((item, idx) => (
              <a
                key={idx}
                href={item.link || "#"}
                onClick={(e) => {
                  if (!item.link) {
                    e.preventDefault();
                    setActiveNav(item.type);
                  }
                }}
                className="action-card"
              >
                <div className="action-header">
                  <div className="action-icon">{item.icon}</div>
                  <div className="action-badge">{item.count} items</div>
                </div>

                <div className="action-title">{item.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
