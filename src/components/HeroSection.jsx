import "../styles/hero.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        {/* LEFT TEXT CONTENT */}
        <div className="hero-left">
          <div className="badge">
            <span>Transforming Digital Experiences</span>
          </div>

          <h1 className="hero-title">
            Empowering Your <span className="highlight">Digital Journey</span>{" "}
            with Innovation
          </h1>

          <p className="hero-subtext">
            We craft exceptional digital solutions that drive growth, enhance
            user experiences, and transform businesses for the modern world.
          </p>

          <div className="hero-buttons">
            <a href="/login" className="btn-primary big">Get Started →</a>

            <button classn="btn-outline big">Learn More</button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>200+</h3>
              <p>Projects</p>
            </div>

            <div>
              <h3>50+</h3>
              <p>Clients</p>
            </div>

            <div>
              <h3>5+</h3>
              <p>Years</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE GRAPHIC BOXES */}
        <div className="hero-right">
          <div className="floating-box box1" />
          <div className="floating-box box2" />
          <div className="floating-box box3" />
          <div className="floating-box box4" />

          {/* MAIN CARD */}
          <div className="hero-card">
            <div>
              <div className="mini-box"></div>
              <h3>Digital Excellence</h3>
              <p>Crafting tomorrow's solutions today</p>
            </div>

            <div className="dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
