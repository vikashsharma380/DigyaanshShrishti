import "../styles/dashboard.css";

export default function Dashboard() {
  const cards = [
    { title: "Digyaansh – Appointment Letter", link: "/form/digyaansh-appointment" },
    { title: "Digyaansh – Leaving Letter", link: "/form/digyaansh-leaving" },
    { title: "Digyaansh – Experience Certificate", link: "/form/digyaansh-experience" },

    // ⭐ NEW — Create User Card ⭐
    { title: "Create User", link: "/form/create-user" },
  ];

  return (
    <div className="dashboard-wrapper">
      <h1 className="dash-title">Admin Dashboard</h1>

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
