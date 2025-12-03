import "../styles/dashboard.css";

export default function Dashboard() {
  const cards = [
    // { title: "GIS World – Appointment Letter", link: "/form/gis-appointment" },
    // { title: "GIS World – Leaving Letter", link: "/form/gis-leaving" },

    // { title: "Destiny IT – Appointment Letter", link: "/form/destiny-appointment" },
    // { title: "Destiny IT – Leaving Letter", link: "/form/destiny-leaving" },

    { title: "Digyaansh – Appointment Letter", link: "/form/digyaansh-appointment" },
    { title: "Digyaansh – Leaving Letter", link: "/form/digyaansh-leaving" },

    // ⭐ NEW ADDED CARD ⭐
    { title: "Digyaansh – Experience Certificate", link: "/form/digyaansh-experience" },

    // { title: "Raider Security – Appointment Letter", link: "/form/raider-appointment" },
    // { title: "Raider Security – Leaving Letter", link: "/form/raider-leaving" },
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
