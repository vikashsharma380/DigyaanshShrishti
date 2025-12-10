import { useState } from "react";

const ContactSection = () => {
  const contactInfo = [
    {
      title: "Phone",
      value: "7004062960",
      link: "tel:7004062960",
      icon: "📞",
    },
    {
      title: "Email",
      value: "digyaanshshrishti@gmail.com",
      link: "mailto:digyaanshshrishti@gmail.com",
      icon: "📧",
    },
    {
      title: "Office",
      value:
        "Office Address: Sadhu Sadan Near Bapudham Station to Janpul Road, Ward 22, Shantipuri, Motihari, East Champaran, Bihar - 845401",
      link: "#",
      icon: "📍",
    },
    {
      title: "CIN No.",
      value: "U63992BR2024PTC068371",
      link: "#",
      icon: "📄",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://13.62.228.124:5000/api/contact/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const out = await res.json();

    if (out.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitted(false), 2500);
    } else {
      alert("Failed to send message");
    }
  } catch (err) {
    alert("Server error!");
  }
};


  return (
    <>
      <style>{`
        .contact {
          padding: 120px 0;
          background: linear-gradient(140deg, rgba(196, 193, 200, 0.66), rgba(16, 15, 16, 0.58)), 
                      url('https://safetycounselling.com/wp-content/uploads/2022/07/The-Major-Pluses-of-OSHA-General-Industry-and-OSHA-10-and-30-Contruction-Training-for-Employers-and-Employees-by-Safety-Counselling-505-881-1112-scaled.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .contact::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 0, 123, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 15s infinite ease-in-out;
        }

        .contact::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(110, 0, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 20s infinite ease-in-out reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        .contact-container {
          max-width: 1300px;
          margin: auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;        
        }

        /* HEADER */
        .contact-header {
          text-align: center;
          max-width: 700px;
          margin: auto;
          margin-bottom: 80px;
          animation: slideInDown 0.8s ease-out;
        }

        .contact-header span {
          font-size: 13px;
          text-transform: uppercase;
          opacity: 0.85;
          letter-spacing: 3px;
          font-weight: 600;
          display: block;
          margin-bottom: 20px;
        }

        .contact-header h2 {
          font-size: 48px;
          margin: 15px 0;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .contact-header p {
          font-size: 18px;
          opacity: 0.85;
          line-height: 1.6;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* GRID */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* LEFT INFO BOXES */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slideInLeft 0.8s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .info-box {
          display: flex;
          gap: 20px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          color: rgba(1, 1, 1, 0.77);
        }

        .info-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
          transition: left 0.4s ease;
        }

        .info-box:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .info-box:hover::before {
          left: 100%;
        }

        .info-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          opacity: 1;
          border-radius: 14px;
          flex-shrink: 0;
          transition: all 0.4s ease;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .info-box:hover .info-icon {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1) rotate(5deg);
        }

        .info-title {
          font-size: 12px;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
        }

        .info-value {
          font-size: 18px;
          font-weight: 700;
          margin-top: 8px;
          transition: all 0.3s ease;
        }

        .info-box:hover .info-value {
          letter-spacing: 0.5px;
        }

        /* TRUSTED LOGOS */
        .trusted-by {
          margin-top: 40px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .trusted-by p {
          font-size: 14px;
          opacity: 0.85;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .trusted-logos {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .logo-box {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-box:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        /* FORM */
        .contact-form {
          background: white;
          border-radius: 24px;
          padding: 50px;
          color: #222;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: slideInRight 0.8s ease-out;
          position: relative;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .contact-form::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(140deg, #6e00ff, #ff007b);
          border-radius: 24px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-form:hover::before {
          opacity: 0.1;
        }

        .contact-form h3 {
          font-size: 32px;
          margin-bottom: 10px;
          font-weight: 800;
          color: #111;
          letter-spacing: -0.5px;
        }

        .input-row {
          display: flex;
          gap: 20px;
        }

        input,
        textarea {
          width: 100%;
          padding: 16px 18px;
          border-radius: 14px;
          border: 2px solid #e0e0e0;
          font-size: 16px;
          background: #fafafa;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
        }

        input:hover,
        textarea:hover {
          background: white;
          border-color: #d0d0d0;
        }

        input:focus,
        textarea:focus {
          background: white;
          border-color: #6e00ff;
          box-shadow: 0 0 0 4px rgba(110, 0, 255, 0.1), inset 0 0 0 1px rgba(110, 0, 255, 0.2);
          outline: none;
          transform: translateY(-2px);
        }

        textarea {
          min-height: 160px;
          resize: none;
        }

        .send-btn {
          width: 100%;
          padding: 18px;
          border-radius: 14px;
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
          background: black;
          color: white;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .send-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .send-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .send-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(255, 0, 123, 0.4);
        }

        .send-btn:active {
          transform: translateY(-2px);
        }

        /* SUCCESS STATE */
        .form-success {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          animation: popIn 0.5s ease-out;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .form-success h4 {
          font-size: 24px;
          color: #111;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .form-success p {
          font-size: 14px;
          color: #666;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(140deg, #4ade80, #22c55e);
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .contact {
            padding: 80px 0;
          }

          .contact-header {
            margin-bottom: 60px;
          }

          .contact-header h2 {
            font-size: 36px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-form {
            padding: 35px;
          }

          .input-row {
            flex-direction: column;
          }

          .contact-info,
          .contact-form {
            animation: none;
          }
        }

        @media (max-width: 600px) {
          .contact {
            padding: 60px 0;
          }

          .contact-header h2 {
            font-size: 28px;
          }

          .contact-header p {
            font-size: 16px;
          }

          .contact-form {
            padding: 25px;
          }

          .contact-form h3 {
            font-size: 24px;
          }

          .info-box {
            padding: 18px;
          }

          .info-icon {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <section id="contact" className="contact">
        <div className="contact-container">
          {/* Contact Header */}
          <div className="contact-header">
            <span>Contact Us</span>
            <h2>Let's Build Something Amazing</h2>
            <p>
              Ready to start your digital journey? Get in touch with us and
              let's discuss how we can help.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left Side Info */}
            <div className="contact-info">
              {contactInfo.map((item, index) => (
                <a key={index} href={item.link} className="info-box">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <span className="info-title">{item.title}</span>
                    <p className="info-value">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Right Side Form */}
            <div className="contact-form">
              {submitted && (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>We'll get back to you soon.</p>
                </div>
              )}

              <h3>Send us a message</h3>

              <div onSubmit={handleSubmit} style={{ display: "contents" }}>
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

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="send-btn"
                >
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
