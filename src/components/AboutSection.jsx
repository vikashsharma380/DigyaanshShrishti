import "../styles/about.css";

const AboutSection = () => {
  const highlights = [
    "Professional Housekeeping & Facility Management",
    "Complete IT Support & Technical Solutions",
    "Advanced Security & Surveillance Services",
    "Civil Construction & Infrastructure Work",
    "Government-Approved BSDM Skill Programs",
    "Skilled & Unskilled Manpower Supply",
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        {/* LEFT SIDE GRAPHIC CARD */}
        <div className="about-left">
          <div className="about-outer"></div>
          <div className="about-middle"></div>

          <div className="about-inner">
            <h1 className="about-years">3+</h1>
            <h3 className="about-heading">Years of Excellence</h3>
            <p>
              Delivering reliable multi-industry services with quality,
              commitment, and trust.
            </p>
          </div>

          <div className="about-stamp">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="about-right">
          <span className="about-tag">About Us</span>

          <h2 className="about-title">
            Your Trusted{" "}
            <span className="highlight-accent">Service Partner</span>
          </h2>

          <p className="about-text">
            We are a multi-service solutions company providing professional
            support across housekeeping, security, IT, construction, manpower,
            and skill development. With a strong commitment to quality and a
            trained workforce, we ensure reliable and efficient services for
            businesses, organisations, and government projects.
          </p>

          <div className="about-grid">
            {highlights.map((item, i) => (
              <div key={i} className="about-item">
                <span className="tick">✔</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <button className="btn-primary about-btn">Learn More About Us</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
