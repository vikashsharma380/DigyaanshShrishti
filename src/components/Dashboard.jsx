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
const [data, setData] = useState(null);
const [heroImage, setHeroImage] = useState(null);
const [sectionImage, setSectionImage] = useState(null);
const [bsdmImages, setBsdmImages] = useState([]);
const [companyList, setCompanyList] = useState([]);
const [teamList, setTeamList] = useState([]);

const [editCompany, setEditCompany] = useState(null);
const [editTeam, setEditTeam] = useState(null);

const [designations, setDesignations] = useState([]);
useEffect(() => {
  fetch("https://api.digyaanshshrishti.com/api/designations/all")
    .then(res => res.json())
    .then(out => {
      if (out.success) setDesignations(out.list);
    });
}, []);

useEffect(() => {
  fetch("https://api.digyaanshshrishti.com/api/contact/list")
    .then(res => res.json())
    .then(out => {
      if (out.success) {
        setNotifications(out.list);
      }
    });
}, []);
const [districts, setDistricts] = useState([]);

useEffect(() => {
  fetch("https://api.digyaanshshrishti.com/api/district/list")
    .then(res => res.json())
    .then(out => {
      if (out.success) setDistricts(out.list);
    });
}, []);


// useEffect(() => {
// fetch("https://api.digyaanshshrishti.com/api/bsdm")
//     .then(res => res.json())
//     .then(d => setBsdmImages(d?.heroImages || []));
// }, []);
const [page, setPage] = useState("bsdm");
const [images, setImages] = useState([]);

useEffect(() => {
  fetch(`https://api.digyaanshshrishti.com/api/page-images/${page}`)
    .then((res) => res.json())
    .then((data) => setImages(data.images));
}, [page]);

const toggleRole = async (user) => {
  const newRole = user.roleType === "nightguard" ? "sweeper" : "nightguard";

  if (!window.confirm(`Change ${user.name}'s role to ${newRole}?`)) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/users/update-role/${user._id}`,
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
    "https://api.digyaanshshrishti.com/api/district/add-district",
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
    "https://api.digyaanshshrishti.com/api/district/add-block",
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
{
  title: "Manage Designation",
  link: "/admin/designations",
  icon: "🏷️",
  type: "settings",
  count: 0,
},



  ];
const deleteMessage = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  const res = await fetch(
    `https://api.digyaanshshrishti.com/api/contact/delete/${id}`,
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
useEffect(() => {
  if (activeNav === "gallery") {
    fetch("https://api.digyaanshshrishti.com/api/gallery/company")
      .then(res => res.json())
      .then(setCompanyList);

    fetch("https://api.digyaanshshrishti.com/api/gallery/team")
      .then(res => res.json())
      .then(setTeamList);
  }
}, [activeNav]);

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
    { id: "designations", label: "Designations", icon: "🏷️" },
{ id: "pages", label: "Page Images", icon: "🖼️" },
{ id: "gallery", label: "Gallery Manager", icon: "🖼️" }



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
        `https://api.digyaanshshrishti.com/api/district/delete-district/${selectedDistrict}`,
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
                "https://api.digyaanshshrishti.com/api/district/delete-block",
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

{activeNav === "designations" && (
  <div style={{ maxWidth: "500px", marginTop: "20px" }}>
    <h2 className="section-title">Manage Designations</h2>

    {/* ADD NEW DESIGNATION */}
    <div style={{ marginBottom: "20px" }}>
      <h3>Add New Designation</h3>

      <input
        id="designation-input"
        type="text"
        placeholder="Enter designation name"
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={async () => {
          const name = document.getElementById("designation-input").value;
          if (!name.trim()) return alert("Enter designation");

          const res = await fetch("https://api.digyaanshshrishti.com/api/designations/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });

          const out = await res.json();
          if (out.success) {
            alert("Designation Added!");
           if (out.designation) {
   setDesignations([...designations, out.designation]);
} else {
   // fallback: refetch complete list
   fetch("https://api.digyaanshshrishti.com/api/designations/all")
     .then(res => res.json())
     .then(o => setDesignations(o.list));
}

          }
        }}
        style={{
          padding: "10px 18px",
          background: "green",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Add Designation
      </button>
    </div>

    <hr />

    {/* LIST ALL DESIGNATIONS */}
    <h3>Existing Designations</h3>

    {designations.length === 0 && <p>No designations found</p>}

    <ul style={{ padding: "0", listStyle: "none" }}>
      {designations.map((d) => (
        <li
          key={d._id}
          style={{
            padding: "10px",
            background: "#f2f2f2",
            marginBottom: "8px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {d.name}

          <button
            onClick={async () => {
              if (!window.confirm("Delete this designation?")) return;

              const res = await fetch(
                `https://api.digyaanshshrishti.com/api/designations/delete/${d._id}`,
                { method: "DELETE" }
              );

              const out = await res.json();
              if (out.success) {
                alert("Deleted!");
                setDesignations(designations.filter((x) => x._id !== d._id));
              }
            }}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}
{activeNav === "pages" && (
  <div style={{ maxWidth: "700px" }}>
    <h2 className="section-title">Page Slider Images</h2>

    {/* PAGE SELECT */}
    <select
      value={page}
      onChange={(e) => setPage(e.target.value)}
      style={{ padding: 10, marginBottom: 15, width: "100%" }}
    >
      <option value="bsdm">BSDM</option>
      <option value="construction">Construction</option>
      <option value="housekeeping">Housekeeping</option>
      <option value="security">Security</option>
      <option value="manpower">Manpower</option>
      <option value="it">IT</option>
    </select>

    {/* UPLOAD IMAGE */}
   {/* UPLOAD BOX */}
<label
  style={{
    display: "block",
    border: "2px dashed #aaa",
    borderRadius: 14,
    padding: 30,
    textAlign: "center",
    cursor: "pointer",
    background: "#fafafa",
    transition: "all 0.3s ease",
    marginBottom: 25,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "#2d5a7b";
    e.currentTarget.style.background = "#f0f6fb";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = "#aaa";
    e.currentTarget.style.background = "#fafafa";
  }}
>
  <div style={{ fontSize: 40 }}>📤</div>
  <h3 style={{ margin: "10px 0", color: "#333" }}>
    Upload Slider Image
  </h3>
  <p style={{ color: "#666", fontSize: 14 }}>
    Click to select image (JPG, PNG, WEBP)
  </p>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(
        `https://api.digyaanshshrishti.com/api/page-images/${page}/add-image`,
        {
          method: "POST",
          body: fd,
        }
      );

      const out = await res.json();
      if (out.success) setImages(out.images);
    }}
  />
</label>


    {/* IMAGE LIST */}
   {/* IMAGE GRID */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  }}
>
  {images.map((img, i) => (
    <div
      key={i}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        background: "#fff",
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* DELETE BUTTON */}
      <button
        onClick={async () => {
          if (!window.confirm("Delete image?")) return;

          const res = await fetch(
            `https://api.digyaanshshrishti.com/api/page-images/${page}/remove-image`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ imageUrl: img }),
            }
          );

          const out = await res.json();
          if (out.success) setImages(out.images);
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(255,0,0,0.85)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        ✕
      </button>
    </div>
  ))}
</div>

  </div>
)}

{activeNav === "gallery" && (
  <div style={{ maxWidth: 900 }}>
    <h2 className="section-title">Gallery Manager</h2>

    {/* ================= COMPANY SECTION ================= */}
    <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
      <h3>Company Highlights</h3>

      {/* ADD / EDIT */}
      <input
        placeholder="Title"
        value={editCompany?.title || ""}
        onChange={(e) =>
          setEditCompany({ ...editCompany, title: e.target.value })
        }
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />

      <textarea
        placeholder="Description"
        value={editCompany?.desc || ""}
        onChange={(e) =>
          setEditCompany({ ...editCompany, desc: e.target.value })
        }
        style={{ width: "100%", padding: 8 }}
      />

      <button
        style={{ marginTop: 10 }}
        onClick={async () => {
          const res = await fetch(
            editCompany?._id
              ? `https://api.digyaanshshrishti.com/api/gallery/company/${editCompany._id}`
              : "https://api.digyaanshshrishti.com/api/gallery/company",
            {
              method: editCompany?._id ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(editCompany),
            }
          );
          const out = await res.json();
          if (out.success) {
            setEditCompany(null);
            fetch("https://api.digyaanshshrishti.com/api/gallery/company")
              .then(res => res.json())
              .then(setCompanyList);
          }
        }}
      >
        {editCompany?._id ? "Update" : "Add"}
      </button>

      {/* LIST */}
      <ul style={{ marginTop: 20 }}>
        {companyList.map((c) => (
          <li
            key={c._id}
            style={{
              background: "#f5f5f5",
              padding: 10,
              marginBottom: 8,
              borderRadius: 6,
            }}
          >
            <strong>{c.title}</strong>
            <p>{c.desc}</p>

            <button onClick={() => setEditCompany(c)}>Edit</button>
            <button
              style={{ marginLeft: 10, color: "red" }}
              onClick={async () => {
                if (!window.confirm("Delete?")) return;
                await fetch(
                  `https://api.digyaanshshrishti.com/api/gallery/company/${c._id}`,
                  { method: "DELETE" }
                );
                setCompanyList(companyList.filter(x => x._id !== c._id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

    <hr style={{ margin: "40px 0" }} />

    {/* ================= TEAM SECTION ================= */}
    <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
      <h3>Team Members</h3>

      <input
        placeholder="Name"
        value={editTeam?.name || ""}
        onChange={(e) =>
          setEditTeam({ ...editTeam, name: e.target.value })
        }
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />

      <input
        placeholder="Role"
        value={editTeam?.role || ""}
        onChange={(e) =>
          setEditTeam({ ...editTeam, role: e.target.value })
        }
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />

      <textarea
        placeholder="Info"
        value={editTeam?.info || ""}
        onChange={(e) =>
          setEditTeam({ ...editTeam, info: e.target.value })
        }
        style={{ width: "100%", padding: 8 }}
      />

      {!editTeam?._id && (
        <input
          type="file"
          onChange={(e) =>
            setEditTeam({ ...editTeam, image: e.target.files[0] })
          }
        />
      )}

      <button
        style={{ marginTop: 10 }}
        onClick={async () => {
          const fd = new FormData();
          Object.entries(editTeam).forEach(([k, v]) =>
            fd.append(k, v)
          );

          await fetch(
            editTeam?._id
              ? `https://api.digyaanshshrishti.com/api/gallery/team/${editTeam._id}`
              : "https://api.digyaanshshrishti.com/api/gallery/team",
            {
              method: editTeam?._id ? "PUT" : "POST",
              body: fd,
            }
          );

          setEditTeam(null);
          fetch("https://api.digyaanshshrishti.com/api/gallery/team")
            .then(res => res.json())
            .then(setTeamList);
        }}
      >
        {editTeam?._id ? "Update" : "Add"}
      </button>

      {/* LIST */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 15, marginTop: 20 }}>
        {teamList.map((m) => (
          <div
            key={m._id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <img
              src={m.img}
              style={{ width: "100%", height: 140, objectFit: "cover" }}
            />
            <h4>{m.name}</h4>
            <small>{m.role}</small>
            <p>{m.info}</p>

            <button onClick={() => setEditTeam(m)}>Edit</button>
            <button
              style={{ marginLeft: 8, color: "red" }}
              onClick={async () => {
                if (!window.confirm("Delete?")) return;
                await fetch(
                  `https://api.digyaanshshrishti.com/api/gallery/team/${m._id}`,
                  { method: "DELETE" }
                );
                setTeamList(teamList.filter(x => x._id !== m._id));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}





      </div>
    </div>
  );
}
