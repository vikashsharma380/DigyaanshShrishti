import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const IT = () => (
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
          src="https://tosinso.com/files/get/cd5673e1-36cc-49bd-acd4-9f2d4354ee75"
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
          Information Technology Services
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
            Information Technology Services
          </strong>{" "}
          focus on delivering reliable, scalable, and secure digital solutions
          for businesses and government organizations. We help organizations
          adopt technology that improves efficiency, security, and growth.
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
          From software development to system maintenance, our IT solutions are
          tailored to meet real operational needs.
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
          IT Services We Provide
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
            Custom software & web application development
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
            Networking & infrastructure setup
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
            System administration & technical support
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
            Data management & security solutions
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
            IT consulting & maintenance services
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
          Our team ensures smooth digital operations with minimal downtime and
          maximum performance.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default IT;
