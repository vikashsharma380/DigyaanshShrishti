import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    {
      title: " Appointment Letter",
      link: "/form/digyaansh-appointment",
      icon: "📋",
      color: "from-blue-500 to-blue-600",
      desc: "Create new appointment",
      count: 12,
    },
    {
      title: " Leaving Letter",
      link: "/form/digyaansh-leaving",
      icon: "🚪",
      color: "from-red-500 to-red-600",
      desc: "Process employee exit",
      count: 5,
    },
    {
      title: " Experience Certificate",
      link: "/form/digyaansh-experience",
      icon: "🏆",
      color: "from-amber-500 to-amber-600",
      desc: "Issue certificates",
      count: 8,
    },
    {
      title: "Create User",
      link: "/form/create-user",
      icon: "👤",
      color: "from-green-500 to-green-600",
      desc: "Add new user account",
      count: 3,
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "Created new user account",
      time: "2 minutes ago",
      avatar: "JD",
      type: "user",
    },
    {
      user: "Jane Smith",
      action: "Submitted appointment form",
      time: "15 minutes ago",
      avatar: "JS",
      type: "form",
    },
    {
      user: "Mike Johnson",
      action: "Issued experience certificate",
      time: "1 hour ago",
      avatar: "MJ",
      type: "certificate",
    },
    {
      user: "Sarah Williams",
      action: "Processed leaving letter",
      time: "3 hours ago",
      avatar: "SW",
      type: "leaving",
    },
    {
      user: "Alex Brown",
      action: "Updated user profile",
      time: "5 hours ago",
      avatar: "AB",
      type: "update",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@digyaansh.com",
      role: "Manager",
      status: "Active",
      joined: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@digyaansh.com",
      role: "Admin",
      status: "Active",
      joined: "Jan 10, 2024",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@digyaansh.com",
      role: "User",
      status: "Active",
      joined: "Jan 8, 2024",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@digyaansh.com",
      role: "User",
      status: "Inactive",
      joined: "Jan 5, 2024",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@digyaansh.com",
      role: "Manager",
      status: "Active",
      joined: "Dec 28, 2023",
    },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "forms", label: "Forms", icon: "📋" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "activity", label: "Activity", icon: "⏱️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #ec4899);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #818cf8, #f472b6);
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
          border-right: 1px solid rgba(148, 163, 184, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          z-index: 1000;
          overflow-y: auto;
        }

        .sidebar.open {
          width: 280px;
        }

        .sidebar.closed {
          width: 90px;
        }

        .sidebar-header {
          padding: 24px 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sidebar-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
          color: white;
          flex-shrink: 0;
        }

        .sidebar-title {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
          overflow: hidden;
        }

        .sidebar.closed .sidebar-title {
          display: none;
        }

        .sidebar-toggle {
          background: rgba(148, 163, 184, 0.1);
          border: none;
          color: rgba(198, 198, 198, 0.6);
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .sidebar-toggle:hover {
          background: rgba(148, 163, 184, 0.2);
          color: white;
        }

        .sidebar-nav {
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          background: transparent;
          color: rgba(226, 232, 240, 0.6);
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .nav-item:hover {
          background: rgba(148, 163, 184, 0.1);
          color: white;
        }

        .nav-item-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .nav-item-label {
          display: none;
        }

        .sidebar.open .nav-item-label {
          display: block;
        }

        /* MAIN */
        .main-content {
          transition: all 0.3s ease;
        }

        .main-content.sidebar-open {
          margin-left: 280px;
        }

        .main-content.sidebar-closed {
          margin-left: 90px;
        }

        /* TOP BAR */
        .topbar {
          position: sticky;
          top: 0;
          height: 80px;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 100;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .topbar-title {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-bar {
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          padding: 10px 16px;
          border-radius: 10px;
          color: white;
          width: 280px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-bar:focus {
          outline: none;
          background: rgba(148, 163, 184, 0.15);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .search-bar::placeholder {
          color: rgba(226, 232, 240, 0.4);
        }

        .topbar-icons {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          color: rgba(0, 0, 0, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
          border: none;
        }

        .icon-btn:hover {
          background: rgba(148, 163, 184, 0.2);
          color: white;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
        }

        /* CONTENT */
        .content {
          padding: 40px;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* STATS */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(148, 163, 184, 0.05), rgba(148, 163, 184, 0.02));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.1);
          transform: translateY(-4px);
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .stat-change.positive {
          background: rgba(34, 197, 94, 0.1);
          color: #070908ff;
        }

        .stat-change.negative {
          background: rgba(239, 68, 68, 0.1);
          color: #951515ff;
        }

        .stat-label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
        }

        /* QUICK ACTIONS */
        .section-title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 20px;
          color:black;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .action-card {
          background: linear-gradient(135deg, rgba(148, 163, 184, 0.05), rgba(148, 163, 184, 0.02));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          text-decoration: none;
          color: black;
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .action-card:hover::before {
          left: 100%;
        }

        .action-card:hover {
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
          transform: translateY(-8px);
        }

        .action-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .action-icon {
          font-size: 32px;
        }

        .action-badge {
          background: rgba(99, 102, 241, 0.2);
          color: #000000ff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .action-title {
          font-size: 16px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .action-desc {
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          position: relative;
          z-index: 1;
        }

        .action-arrow {
          color: rgba(0, 0, 0, 0.4);
          font-size: 20px;
          position: relative;
          z-index: 1;
        }

        /* BOTTOM SECTION */
        .bottom-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .activity-card,
        .users-card {
          background: linear-gradient(135deg, rgba(148, 163, 184, 0.05), rgba(148, 163, 184, 0.02));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(148, 163, 184, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          background: rgba(148, 163, 184, 0.1);
        }

        .activity-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          flex-shrink: 0;
        }

        .activity-info {
          flex: 1;
        }

        .activity-user {
          font-weight: 600;
          font-size: 14px;
        }

        .activity-action {
          color: rgba(1, 1, 1, 0.92);
          font-size: 13px;
        }

        .activity-time {
          color: rgba(0, 0, 0, 0.5);
          font-size: 12px;
        }

        .users-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(148, 163, 184, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .user-item:hover {
          background: rgba(148, 163, 184, 0.1);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #ec4899, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 11px;
          flex-shrink: 0;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 13px;
        }

        .user-role {
          color: rgba(0, 0, 0, 0.5);
          font-size: 12px;
        }

        .user-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .user-status.active {
          background: #86efac;
        }

        .user-status.inactive {
          background: rgba(226, 232, 240, 0.3);
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          .bottom-section {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }

          .topbar {
            padding: 0 24px;
          }

          .search-bar {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .sidebar.open {
            width: 70px;
          }

          .sidebar-title,
          .nav-item-label {
            display: none !important;
          }

          .main-content.sidebar-open {
            margin-left: 70px;
          }

          .topbar {
            padding: 0 16px;
            height: 70px;
          }

          .topbar-title {
            font-size: 20px;
          }

          .search-bar {
            display: none;
          }

          .content {
            padding: 20px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .stat-card,
          .action-card,
          .activity-card,
          .users-card {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .topbar {
            flex-direction: column;
            height: auto;
            padding: 12px 16px;
            gap: 12px;
          }

          .topbar-left,
          .topbar-right {
            width: 100%;
          }

          .topbar-title {
            font-size: 18px;
          }

          .content {
            padding: 12px;
          }
        }
      `}</style>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-title">
            DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
          </a>

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
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">Dashboard</div>
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
            <button className="icon-btn">⚙️</button>
            <div className="profile-avatar">AD</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {/* QUICK ACTIONS */}
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, idx) => (
              <a key={idx} href={action.link} className="action-card">
                <div className="action-header">
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-badge">{action.count} pending</div>
                </div>
                <div className="action-title">{action.title}</div>
                <div className="action-desc">{action.desc}</div>
                <div className="action-arrow">→</div>
              </a>
            ))}
          </div>

          {/* BOTTOM SECTION */}
          <div className="bottom-section">
            {/* ACTIVITY */}
            <div className="activity-card">
              <div className="card-header">
                <h3 className="section-title" style={{ marginBottom: 0 }}>
                  Recent Activity
                </h3>
              </div>
              <div className="activity-list">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <div className="activity-avatar">{activity.avatar}</div>
                    <div className="activity-info">
                      <div className="activity-user">{activity.user}</div>
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* USERS */}
            <div className="users-card">
              <div className="card-header">
                <h3 className="section-title" style={{ marginBottom: 0 }}>
                  Active Users
                </h3>
              </div>
              <div className="users-list">
                {users.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="user-avatar">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-role">{user.role}</div>
                    </div>
                    <div
                      className={`user-status ${user.status.toLowerCase()}`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
