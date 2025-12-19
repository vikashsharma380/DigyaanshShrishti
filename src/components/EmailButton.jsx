import React from "react";
import { FaEnvelope } from "react-icons/fa";

const EmailButton = () => {
  const email = "contact@digyaanshshrishti.com";
  const subject = encodeURIComponent("Service Enquiry");
  const body = encodeURIComponent(
    "Hello,\n\nI would like to know more about your services.\n\nRegards,"
  );

  return (
    <a
      href={`mailto:${email}?subject=${subject}&body=${body}`}
      style={{
        position: "fixed",
        bottom: "96px", // 👈 WhatsApp ke upar rahega
        right: "24px",
        width: "56px",
        height: "56px",
        backgroundColor: "#111827", // professional dark
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
        zIndex: 9999,
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      aria-label="Send Email"
    >
      <FaEnvelope size={22} color="#ffffff" />
    </a>
  );
};

export default EmailButton;
