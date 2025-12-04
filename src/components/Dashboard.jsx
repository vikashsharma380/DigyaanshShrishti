import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // stored user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cards = [
    {
      title: "Digyaansh – Appointment Letter",
      link: "/form/digyaansh-appointment",
    },
    { title: "Digyaansh – Leaving Letter", link: "/form/digyaansh-leaving" },

    {
      title: "Digyaansh – Experience Certificate",
      link: "/form/digyaansh-experience",
    },
{
  title: "Upload Sweeper Excel",
  link: "/upload-excel",
},
{
  title: "View All Sweeper Data",
  link: "/admin/sweeper-data",
}
    ,
    { title: "Create User", link: "/form/create-user" },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* --- TOP HEADER --- */}
      <div className="dash-header">
        <h2 className="dash-logo">Admin Panel</h2>

        <div className="dash-right">
          <span className="dash-admin-name">
            {user?.name || "Admin"}
          </span>

          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* --- PAGE TITLE --- */}
      <h1 className="dash-title">Admin Dashboard</h1>

      {/* --- CARDS --- */}
      <div className="dash-row">
        {cards.map((item, index) => (
          <a href={item.link} key={index} className="dash-card">
            <div className="dash-grad"></div>
            <h3 className="dash-card-title">{item.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
