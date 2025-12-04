import { useState } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

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

            <button className="icon-btn">🔔</button>
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
