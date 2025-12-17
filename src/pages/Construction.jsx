import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Construction = () => {
  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "120px 20px",
          background: "linear-gradient(135deg, #f8f6ff 0%, #f0ebff 100%)",
        }}
      >
        <div style={{ maxWidth: 1150, margin: "auto" }}>
          {/* TITLE */}
          <h1
            style={{
              fontSize: 46,
              marginBottom: 20,
              fontWeight: 700,
              color: "#1a1a2e",
              letterSpacing: "-0.5px",
            }}
          >
            Professional Construction Services
          </h1>

          {/* INTRO */}
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.9,
              color: "#444",
              fontWeight: 500,
              marginBottom: 18,
            }}
          >
            Our{" "}
            <strong style={{ color: "#2d5a7b", fontWeight: 600 }}>
              Construction Services
            </strong>{" "}
            focus on delivering high-quality, durable, and cost-effective
            infrastructure solutions for residential, commercial, industrial,
            and government projects. We combine technical expertise, skilled
            manpower, and disciplined project management to ensure reliable
            execution at every stage.
          </p>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.9,
              color: "#555",
              marginBottom: 32,
            }}
          >
            With a strong emphasis on planning, safety, and quality assurance,
            we undertake construction projects that meet engineering standards
            and client expectations. Our approach ensures transparency,
            accountability, and long-term value.
          </p>

          {/* IMAGE (CONTROLLED SIZE) */}
          <div
            style={{
              margin: "45px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://wallpaperaccess.com/full/8432871.jpg"
              alt="Construction Services"
              style={{
                width: "100%",
                maxWidth: 780,
                height: "auto",
                borderRadius: 18,
                boxShadow: "0 16px 40px rgba(45, 90, 123, 0.25)",
                border: "1px solid rgba(45, 90, 123, 0.1)",
              }}
            />
          </div>

          {/* SECTION */}
          <h2
            style={{
              marginTop: 60,
              fontSize: 36,
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: 24,
              borderBottom: "3px solid #2d5a7b",
              paddingBottom: 16,
              display: "inline-block",
            }}
          >
            End-to-End Construction Capabilities
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            We offer comprehensive construction services covering project
            planning, execution, supervision, and completion. Our team follows
            structured workflows and standardized processes to maintain quality
            consistency across all phases of construction.
          </p>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginBottom: 32,
            }}
          >
            From groundwork to finishing, we ensure that each activity is
            executed with precision, safety compliance, and strict adherence to
            approved specifications.
          </p>

          {/* LIST */}
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
            Our Construction Services Include
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
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Residential and commercial building construction
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Civil and structural construction works
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Renovation, repair, and maintenance projects
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Government and institutional construction contracts
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Deployment of skilled technical manpower
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
              On-site supervision and quality monitoring
            </li>
          </ul>

          {/* QUALITY */}
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
            Quality Assurance & Safety Standards
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginTop: 32,
              marginBottom: 16,
              padding: "24px 28px",
              background: "rgba(45, 90, 123, 0.05)",
              borderLeft: "4px solid #2d5a7b",
              borderRadius: "6px",
            }}
          >
            Quality and safety are integral to our construction operations. We
            use approved construction materials, modern tools, and trained
            professionals to ensure structural integrity and durability. Safety
            protocols are strictly enforced at all sites to protect workers and
            stakeholders.
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
            Regular inspections, progress reviews, and documentation ensure
            compliance with engineering norms, government regulations, and
            project timelines.
          </p>

          {/* WHY US */}
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
            Why Choose Our Construction Services
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginTop: 32,
              marginBottom: 28,
            }}
          >
            Our strength lies in disciplined execution, experienced manpower,
            and a client-focused approach. We aim to build long-term
            relationships by delivering projects that meet functional,
            aesthetic, and structural requirements.
          </p>

          <ul
            style={{
              fontSize: 18,
              lineHeight: 2.2,
              paddingLeft: 25,
              marginBottom: 40,
              color: "#444",
            }}
          >
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Experienced engineering and technical teams
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Strict quality and safety compliance
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Timely and cost-effective project delivery
            </li>
            <li
              style={{
                marginBottom: 12,
                position: "relative",
                paddingLeft: 12,
              }}
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
              Transparent work processes and reporting
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
              Reliable execution for private and government projects
            </li>
          </ul>

          {/* CTA */}
          <div
            style={{
              marginTop: 65,
              padding: 50,
              background: "linear-gradient(135deg, #ffffff 0%, #f5f7fb 100%)",
              borderRadius: 20,
              boxShadow: "0 16px 50px rgba(45, 90, 123, 0.18)",
              border: "1px solid rgba(45, 90, 123, 0.12)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 18,
              }}
            >
              Planning a Construction Project?
            </h3>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: "#666",
                marginBottom: 28,
                maxWidth: "600px",
                margin: "0 auto 28px",
              }}
            >
              Get in touch with us to discuss your construction requirements.
              Our team will assist you with planning, execution, and successful
              delivery of your project with professionalism and transparency.
            </p>
            <button
              style={{
                background: "linear-gradient(135deg, #2d5a7b 0%, #1e3f52 100%)",
                color: "#fff",
                padding: "16px 40px",
                fontSize: "17px",
                fontWeight: 600,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(45, 90, 123, 0.25)",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 12px 30px rgba(45, 90, 123, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(45, 90, 123, 0.25)";
              }}
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Construction;
