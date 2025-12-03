import "../styles/services.css";

const ServicesSection = () => {
  const services = [
    {
      title: "Housekeeping Management",
      description:
        "Professional housekeeping services for offices, hotels, hospitals, and commercial spaces.",
      image:
        "https://homemaidbetter.com/wp-content/uploads/2019/07/shutterstock_395889778.jpg",
    },
    {
      title: "Information Technology",
      description:
        "End-to-end IT services including software development, networking, system management and support.",
      image: "https://wallpaperset.com/w/full/b/3/3/436108.jpg",
    },
    {
      title: "Security & Surveillance",
      description:
        "Smart security solutions with trained guards, CCTV, access control and monitoring systems.",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2025/1/481866628/YL/FP/ZL/30509586/security-surveillance-system-1000x1000.jpg",
    },
    {
      title: "Construction",
      description:
        "All types of civil construction work with modern tools, quality assurance and expert manpower.",
      image: "https://amsindia.co.in/wp-content/uploads/2024/09/d264829c4d.jpg",
    },
    {
      title: "BSDM Project",
      description:
        "Government skill development and training services under BSDM guidelines.",
      image:
        "https://www.author.thinkwithniche.com/allimages/project/thumb_d3fd5bihar-skill-development-mission-registration.jpg",
    },
    {
      title: "All Types of Manpower Work",
      description:
        "Skilled and unskilled manpower supply for industries, corporates, and government projects.",
      image:
        "http://advancedgroup.co/wp-content/uploads/2017/10/Manpower-Recruitment-1.jpg",
    },
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <span className="services-tag">Our Services</span>
          <h2 className="services-title">
            Solutions That <span className="highlight">Transform</span>
          </h2>
          <p className="services-subtext">
            We offer industry-grade professional services tailored to your
            requirements.
          </p>
        </div>

        <div className="services-grid">
          {services.map((item, index) => (
            <div key={index} className="service-card">
              <img src={item.image} alt={item.title} className="service-img" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
