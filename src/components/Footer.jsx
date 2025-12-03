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
      { name: "Housekeeping Management", href: "#services" },
      { name: "Information Technology", href: "#services" },
      { name: "Security & Surveillance", href: "#services" },
      { name: "Construction Services", href: "#services" },
      { name: "BSDM Projects", href: "#services" },
      { name: "Manpower Supply", href: "#services" },
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
          <h2 className="footer-logo">
            DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
          </h2>
          <p>
            Providing professional services across housekeeping, IT,
            construction, manpower, security, and government skill development.
            Delivering reliability, trust, and excellence in every project.
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
          © {new Date().getFullYear()} DIGYAANSH SHRISHTI MAINTENANCE PVT. LTD.
          All rights reserved.
        </p>
        <p>
          Committed to quality, reliability & professional service excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
