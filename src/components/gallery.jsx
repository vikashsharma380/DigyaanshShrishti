// import "../styles/gallery.css";

// const companyDetails = [
//   {
//     title: "Registered Company",
//     desc: "Digyaansh Shrishti Maintenance Pvt. Ltd. is a fully registered and compliant organization delivering professional maintenance, manpower, and infrastructure services.",
//   },
//   {
//     title: "Government Projects",
//     desc: "We actively work on government-approved projects including BSDM skill programs, infrastructure development, and facility management services.",
//   },
//   {
//     title: "Pan-India Services",
//     desc: "Our operational reach spans across multiple states, serving private organizations, institutions, and government bodies.",
//   },
//   {
//     title: "Trusted Workforce",
//     desc: "We supply skilled and unskilled manpower with proper training, verification, and supervision standards.",
//   },
// ];

// const teamMembers = [
//   {
//     name: "Managing Director",
//     role: "Leadership & Strategy",
//     img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
//     info: "Oversees company vision, compliance, and long-term growth initiatives.",
//   },
//   {
//     name: "Operations Head",
//     role: "Operations & Execution",
//     img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
//     info: "Manages daily operations, manpower deployment, and service quality.",
//   },
//   {
//     name: "Project Manager",
//     role: "Government Projects",
//     img: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
//     info: "Handles execution, monitoring, and reporting of government-approved projects.",
//   },
//   {
//     name: "HR & Admin",
//     role: "Human Resources",
//     img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
//     info: "Manages recruitment, payroll, compliance, and employee relations.",
//   },
// ];

// const Gallery = () => {
//   return (
//     <section id="gallery" className="gallery-section">
//       <div className="gallery-container">
//         {/* HEADER */}
//         <div className="gallery-header">
//           <h2>Our Company & Team</h2>
//           <p>
//             A professionally managed organization delivering reliable services
//             through experienced leadership and skilled manpower.
//           </p>
//         </div>

//         {/* COMPANY DETAILS – INFINITE */}
//         <div className="scroll-wrapper">
//           <div className="scroll-track">
//             {companyDetails.concat(companyDetails).map((item, index) => (
//               <div className="info-card" key={index}>
//                 <h3>{item.title}</h3>
//                 <p>{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TEAM MEMBERS – INFINITE */}
//         <div className="scroll-wrapper">
//           <div className="scroll-track">
//             {teamMembers.concat(teamMembers).map((member, index) => (
//               <div className="member-card" key={index}>
//                 <img src={member.img} alt={member.name} />
//                 <h3>{member.name}</h3>
//                 <span>{member.role}</span>
//                 <p>{member.info}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Gallery;
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
