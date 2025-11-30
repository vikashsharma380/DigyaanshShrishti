import "../styles/footer.css";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#" },
      { name: "Careers", href: "#" },
    ],

    services: [
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
      { name: "Digital Marketing", href: "#services" },
    ],

    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "FAQs", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const social = ["FB", "IG", "IN", "TW"];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LOGO + DESCRIPTION */}
        <div className="footer-about">
          <h2 className="footer-logo">Digyaanshshrishti</h2>
          <p>
            Transforming businesses through innovative digital solutions. Your
            trusted partner in the digital age.
          </p>

          <div className="footer-social">
            {social.map((item, i) => (
              <div key={i} className="social-box">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY LINKS */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            {footerLinks.company.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES LINKS */}
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            {footerLinks.services.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT LINKS */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            {footerLinks.support.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Digyaanshshrishti. All rights reserved.
        </p>
        <p>Crafted with passion for digital excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
