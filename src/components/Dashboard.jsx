import { useState , useEffect} from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
const [notifications, setNotifications] = useState([]);
const [showNotifications, setShowNotifications] = useState(false);
const [selectedDistrict, setSelectedDistrict] = useState("");
const [selectedBlock, setSelectedBlock] = useState("");
const [openStates, setOpenStates] = useState({});


useEffect(() => {
  fetch("http://13.62.228.124:5000/api/contact/list")
    .then(res => res.json())
    .then(out => {
      if (out.success) {
        setNotifications(out.list);
      }
    });
}, []);
const [districts, setDistricts] = useState([]);

useEffect(() => {
  fetch("http://13.62.228.124:5000/api/district/list")
    .then(res => res.json())
    .then(out => {
      if (out.success) setDistricts(out.list);
    });
}, []);




const toggleRole = async (user) => {
  const newRole = user.roleType === "nightguard" ? "sweeper" : "nightguard";

  if (!window.confirm(`Change ${user.name}'s role to ${newRole}?`)) return;

  const res = await fetch(
    `http://13.62.228.124:5000/api/users/update-role/${user._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleType: newRole }),
    }
  );

  const out = await res.json();

  if (out.success) {
    alert("Role updated!");
    setUsers((prev) =>
      prev.map((u) => (u._id === user._id ? out.user : u))
    );
  } else {
    alert("Failed to update role!");
  }
};

const addDistrict = async () => {
  const name = document.getElementById("district-input").value;
  if (!name) return alert("Enter district");

  const res = await fetch(
    "http://13.62.228.124:5000/api/district/add-district",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }
  );
  const out = await res.json();

  if (out.success) {
    alert("District Added");
    setDistricts([...districts, out.district]);
  }
};

const addBlock = async () => {
  const districtName = document.getElementById("dist-select").value;
  const block = document.getElementById("block-input").value;

  if (!block) return alert("Enter block name");

  const res = await fetch(
    "http://13.62.228.124:5000/api/district/add-block",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ districtName, block }),
    }
  );
  const out = await res.json();

  if (out.success) {
    alert("Block Added");

    setDistricts(
      districts.map((d) => (d.name === districtName ? out.updated : d))
    );
  }
};

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
    {
  title: "Upload Night Guard Excel",
  link: "/upload-nightguard",
  icon: "📤",
  type: "nightguard",
},
    {
  title: "View Night Guard Data",
  link: "/admin/nightguard-data",
  icon: "🛡️",
  type: "nightguard",
},

{
  title: "Send Notification",
  link: "/admin/send-notification",
  icon: "📨",
  type: "reports",
  count: 0,
},


  ];
const deleteMessage = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  const res = await fetch(
    `http://13.62.228.124:5000/api/contact/delete/${id}`,
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
    {
      title: "Night Guard Data",
      icon: "🛡️",
      type: "nightguard",
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
    { id: "nightguard", label: "Night Guard Data", icon: "🛡️" },
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
          {activeNav === "settings" && (
  <div style={{ maxWidth: "500px" }}>
    <h2 className="section-title">Settings</h2>

    <h3>Add District</h3>
    <input
      type="text"
      placeholder="Enter district name"
      id="district-input"
      style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
    />
    <button
      onClick={addDistrict}
      style={{
        padding: "10px 18px",
        background: "black",
        color: "white",
        borderRadius: "6px",
      }}
    >
      Add District
    </button>

    <hr style={{ margin: "20px 0" }} />

   <h3>Add Block</h3>

{/* Select District Dropdown */}
<select
  id="dist-select"
  style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
>
  <option value="">Select District</option>
  {districts.map((d) => (
    <option key={d._id} value={d.name}>
      {d.name}
    </option>
  ))}
</select>

{/* Add Block Input */}
<input
  type="text"
  placeholder="Enter block name"
  id="block-input"
  style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
/>

<button
  onClick={addBlock}
  style={{
    padding: "10px 18px",
    background: "purple",
    color: "white",
    borderRadius: "6px",
  }}
>
  Add Block
</button>

<hr style={{ margin: "20px 0" }} />

{/* SHOW BLOCK LIST OF SELECTED DISTRICT */}
{/* SHOW BLOCK LIST OF SELECTED DISTRICT */}
<h3>Existing Blocks</h3>

<select
  onChange={(e) => setSelectedDistrict(e.target.value)}
  style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
>
  <option value="">Select District to View Blocks</option>
  {districts.map((d) => (
    <option key={d._id} value={d.name}>
      {d.name}
    </option>
  ))}
</select>

{/* 👉 DELETE DISTRICT BUTTON */}
{selectedDistrict && (
  <button
    onClick={async () => {
      if (!window.confirm("Delete this entire district? All blocks will be removed.")) return;

      const res = await fetch(
        `http://13.62.228.124:5000/api/district/delete-district/${selectedDistrict}`,
        { method: "DELETE" }
      );

      const out = await res.json();
      if (out.success) {
        alert("District deleted!");
        setDistricts(districts.filter((d) => d.name !== selectedDistrict));
        setSelectedDistrict("");
      }
    }}
    style={{
      padding: "8px 15px",
      background: "red",
      color: "white",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      marginBottom: "10px",
    }}
  >
    Delete District
  </button>
)}

{/* Show blocks dynamically with delete buttons */}
{selectedDistrict && (
  <ul style={{ padding: "10px", background: "#f7f7f7", borderRadius: "10px" }}>
    {districts
      .find((d) => d.name === selectedDistrict)
      ?.blocks?.map((b, idx) => (
        <li
          key={idx}
          style={{
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          • {b}

          {/* 👉 DELETE BLOCK BUTTON */}
          <button
            onClick={async () => {
              if (!window.confirm("Delete this block?")) return;

              const res = await fetch(
                "http://13.62.228.124:5000/api/district/delete-block",
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    districtName: selectedDistrict,
                    block: b,
                  }),
                }
              );

              const out = await res.json();
              if (out.success) {
                alert("Block deleted!");

                setDistricts(
                  districts.map((d) =>
                    d.name === selectedDistrict ? out.updated : d
                  )
                );
              }
            }}
            style={{
              background: "crimson",
              color: "white",
              border: "none",
              padding: "4px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
  </ul>
)}


  </div>
)}

          <h2 className="section-title">
            {activeNav === "dashboard"
              ? "Quick Actions"
              : activeNav === "letters"
              ? "Letters"
              : activeNav === "users"
              ? "User Management"
             : activeNav === "sweeper"
? "Sweeper Tools"
: activeNav === "nightguard"
? "Night Guard Tools"
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
