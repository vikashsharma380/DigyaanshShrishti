import "../styles/services.css";

const ServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies.",
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform and native mobile apps with seamless UX.",
    },
    {
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive designs that enhance brand identity.",
    },
    {
      title: "Digital Marketing",
      description:
        "Boost your online presence with strategic marketing solutions.",
    },
    {
      title: "Cybersecurity",
      description:
        "Protect your digital assets with robust security solutions.",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud architecture and deployment services.",
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
            We offer comprehensive digital services tailored to elevate your
            business.
          </p>
        </div>

        <div className="services-grid">
          {services.map((item, index) => (
            <div key={index} className="service-card">
              <div className="service-icon"></div>
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
