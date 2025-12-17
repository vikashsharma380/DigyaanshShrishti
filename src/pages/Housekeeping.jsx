import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Housekeeping = () => (
  <>
    <Navbar />
    <main
      style={{
        padding: "110px 20px",
        background: "linear-gradient(135deg, #f8f6ff 0%, #f0ebff 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <img
          src="https://insights.workwave.com/wp-content/uploads/2019/07/iStock-906777508-e1564417323957.jpg"
          style={{
            width: "100%",
            borderRadius: 20,
            boxShadow: "0 16px 40px rgba(45, 90, 123, 0.25)",
            border: "1px solid rgba(45, 90, 123, 0.1)",
            marginBottom: 40,
          }}
        />

        <h1
          style={{
            marginTop: 0,
            marginBottom: 28,
            fontSize: 46,
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "-0.5px",
          }}
        >
          Housekeeping Management Services
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.9,
            color: "#555",
            marginBottom: 18,
            fontWeight: 500,
          }}
        >
          Our{" "}
          <strong style={{ color: "#2d5a7b", fontWeight: 600 }}>
            Housekeeping Management Services
          </strong>{" "}
          are designed to maintain the highest standards of cleanliness,
          hygiene, and facility upkeep across offices, hospitals, hotels,
          educational institutions, and commercial spaces. A clean environment
          directly impacts productivity, safety, and overall brand image.
        </p>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.9,
            color: "#555",
            marginBottom: 32,
            padding: "24px 28px",
            background: "rgba(45, 90, 123, 0.05)",
            borderLeft: "4px solid #2d5a7b",
            borderRadius: "6px",
          }}
        >
          We provide trained housekeeping staff equipped with modern tools,
          standardized procedures, and supervisory support to ensure consistent
          quality and operational efficiency.
        </p>

        <h2
          style={{
            marginTop: 50,
            fontSize: 36,
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: 28,
            borderBottom: "3px solid #2d5a7b",
            paddingBottom: 16,
            display: "inline-block",
          }}
        >
          Our Housekeeping Solutions Include
        </h2>

        <ul
          style={{
            fontSize: 18,
            lineHeight: 2.2,
            paddingLeft: 25,
            marginTop: 24,
            marginBottom: 32,
            color: "#444",
          }}
        >
          <li
            style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}
          >
            <span
              style={{
                position: "absolute",
                left: -22,
                color: "#2d5a7b",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            Daily & deep cleaning services
          </li>
          <li
            style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}
          >
            <span
              style={{
                position: "absolute",
                left: -22,
                color: "#2d5a7b",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            Hospital & healthcare sanitation
          </li>
          <li
            style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}
          >
            <span
              style={{
                position: "absolute",
                left: -22,
                color: "#2d5a7b",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            Office & corporate facility management
          </li>
          <li
            style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}
          >
            <span
              style={{
                position: "absolute",
                left: -22,
                color: "#2d5a7b",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            Waste management & hygiene control
          </li>
          <li style={{ position: "relative", paddingLeft: 12 }}>
            <span
              style={{
                position: "absolute",
                left: -22,
                color: "#2d5a7b",
                fontWeight: "bold",
              }}
            >
              •
            </span>
            Trained manpower with supervision
          </li>
        </ul>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.9,
            color: "#555",
            padding: "24px 28px",
            background: "rgba(45, 90, 123, 0.05)",
            borderLeft: "4px solid #2d5a7b",
            borderRadius: "6px",
          }}
        >
          Our structured approach ensures compliance with safety standards,
          cleanliness protocols, and client-specific requirements.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default Housekeeping;
