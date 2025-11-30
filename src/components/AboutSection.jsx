import "../styles/about.css";

const AboutSection = () => {
  const highlights = [
    "Experienced team of developers and designers",
    "Agile methodology for faster delivery",
    "24/7 support and maintenance",
    "Transparent communication throughout projects",
    "Scalable and future-proof solutions",
    "Client-centric approach in every project",
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        {/* LEFT SIDE GRAPHIC CARD */}
        <div className="about-left">
          <div className="about-outer"></div>
          <div className="about-middle"></div>

          <div className="about-inner">
            <h1 className="about-years">5+</h1>
            <h3 className="about-heading">Years of Excellence</h3>
            <p>
              Delivering innovative digital solutions to businesses worldwide
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
            <span className="highlight-accent">Digital Partner</span>
          </h2>

          <p className="about-text">
            At Digyaanshshrishti, we believe in the power of technology to
            transform businesses. Our dedicated team combines creativity with
            technical expertise to deliver solutions that exceed expectations.
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
