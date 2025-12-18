import { useEffect, useState } from "react";
import "../styles/gallery.css";

const Gallery = () => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/gallery/company")
      .then(res => res.json())
      .then(setCompanyDetails);

    fetch("https://api.digyaanshshrishti.com/api/gallery/team")
      .then(res => res.json())
      .then(setTeamMembers);
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>Our Company & Team</h2>
          <p>
            A professionally managed organization delivering reliable services
            through experienced leadership and skilled manpower.
          </p>
        </div>

        {/* COMPANY */}
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {companyDetails.concat(companyDetails).map((item, i) => (
              <div className="info-card" key={i}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {teamMembers.concat(teamMembers).map((m, i) => (
              <div className="member-card" key={i}>
                <img src={m.img} alt={m.name} />
                <h3>{m.name}</h3>
                <span>{m.role}</span>
                <p>{m.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
