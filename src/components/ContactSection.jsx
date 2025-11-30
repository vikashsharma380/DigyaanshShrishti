import { useState } from "react";
import "../styles/contact.css";

const ContactSection = () => {
  const contactInfo = [
    {
      title: "Email",
      value: "hello@digyaanshshrishti.com",
      link: "mailto:hello@digyaanshshrishti.com",
    },
    { title: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
    { title: "Address", value: "Mumbai, India", link: "#" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We will contact you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* Contact Header */}
        <div className="contact-header">
          <span>Contact Us</span>
          <h2>Let's Build Something Amazing</h2>
          <p>
            Ready to start your digital journey? Get in touch with us and let's
            discuss how we can help.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Side Info */}
          <div className="contact-info">
            {contactInfo.map((item, index) => (
              <a key={index} href={item.link} className="info-box">
                <div className="info-icon"></div>
                <div>
                  <span className="info-title">{item.title}</span>
                  <p className="info-value">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="trusted-by">
              <p>Trusted by businesses worldwide</p>
              <div className="trusted-logos">
                <div className="logo-box"></div>
                <div className="logo-box"></div>
                <div className="logo-box"></div>
                <div className="logo-box"></div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-form">
            <h3>Send us a message</h3>

            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>

              <button type="submit" className="btn-primary send-btn">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
