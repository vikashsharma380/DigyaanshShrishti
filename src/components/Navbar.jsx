import { useState } from "react";
import "../styles/navbar.css";
import Logo from "../assets/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO SECTION */}
        <a href="#home" className="logo">
          <img src={Logo} alt="logo" className="logo-img" />
          DIGYAANSH SHRISHTI <br /> MAINTENANCE PVT. LTD.
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
          <a href="/login" className="btn-primary">
            Get Started
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/login" className="btn-primary">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
