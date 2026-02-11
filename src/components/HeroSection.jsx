import "../styles/hero.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <div className="badge">
            <span>Multi-Industry Professional Services</span>
          </div>

          <h1 className="hero-title">
            Delivering <span className="hero-highlight">Quality Services</span> You
            Can Trust
          </h1>

          <p className="hero-subtext">
            From housekeeping and manpower to IT solutions, construction,
            security, and skill development&mdash;our expertise helps organisations
            operate smoothly and efficiently.
          </p>

          <div className="hero-buttons">
            <a href="#services" className="btn-primary big">
              Explore Services &rarr;
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>50+</h3>
              <p>Projects</p>
            </div>
            <div>
              <h3>100+</h3>
              <p>Happy Clients</p>
            </div>
            <div>
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>

        {/* RIGHT GRAPHICS */}
        <div className="hero-right">
          <div className="floating-box box1"></div>
          <div className="floating-box box2"></div>
          <div className="floating-box box3"></div>
          <div className="floating-box box4"></div>

          <div className="hero-card">
            <div className="hero-card-slider">
              <div className="hero-card-track">
                <div className="hero-card-slide">
                  <div className="mini-box"></div>
                  <h3>Trusted Services</h3>
                  <p>Serving multiple industries with excellence</p>
                </div>
                <div className="hero-card-slide">
                  <div className="mini-box"></div>
                  <h3>Verified Workforce</h3>
                  <p>Background-checked staff with ongoing training</p>
                </div>
                <div className="hero-card-slide">
                  <div className="mini-box"></div>
                  <h3>On-Time Delivery</h3>
                  <p>Clear SLAs and responsive support teams</p>
                </div>
              </div>
            </div>
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
