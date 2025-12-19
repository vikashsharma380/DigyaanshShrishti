import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BSDM = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/bsdm")
      .then((res) => res.json())
      .then((data) => {
        if (data?.heroImages) setImages(data.heroImages);
      });
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "150px 20px 60px 20px",
          background: "linear-gradient(135deg, #f8f6ff 0%, #f0ebff 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "auto" }}>
          {/* HERO SLIDER */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 400,
              borderRadius: 20,
              marginBottom: 40,
              overflow: "hidden",
              backgroundColor: "#000", // empty gaps hide karne ke liye
            }}
          >
            {images.length > 0 &&
              images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="BSDM Project"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // full cover
                    objectPosition: "center", // center focus
                    opacity: idx === current ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                  }}
                />
              ))}
          </div>

          <h1
            style={{
              fontSize: 46,
              fontWeight: 700,
              marginBottom: 28,
              color: "#1a1a2e",
              letterSpacing: "-0.5px",
            }}
          >
            Bihar Skill Development Mission (BSDM)
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.9,
              color: "#555",
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            <strong style={{ color: "#2d5a7b", fontWeight: 600 }}>
              Bihar Skill Development Mission (BSDM)
            </strong>{" "}
            is a flagship initiative of the Government of Bihar aimed at
            empowering youth by providing industry-oriented skill training. The
            mission focuses on bridging the gap between education and employment
            by aligning training programs with real-world job requirements.
          </p>

          {/* SECTION */}
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
            Overview of BSDM Programs
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginTop: 24,
              marginBottom: 16,
              padding: "24px 28px",
              background: "rgba(45, 90, 123, 0.05)",
              borderLeft: "4px solid #2d5a7b",
              borderRadius: "6px",
            }}
          >
            Under BSDM, candidates are trained in multiple domains such as IT,
            office administration, facility management, security services,
            construction trades, and soft skills. The programs are designed to
            ensure that trainees gain both theoretical understanding and
            practical hands-on experience.
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
            Our organization actively implements BSDM projects by following all
            government guidelines, maintaining transparency, and ensuring high
            training quality. We work closely with certified trainers and
            assessment agencies to deliver measurable outcomes.
          </p>

          {/* BENEFITS */}
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
            Key Benefits of BSDM Training
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
              Industry-relevant curriculum approved by government bodies
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
              Certified trainers with real-world experience
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
              Practical training with modern tools and infrastructure
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
              Assessment, certification, and placement assistance
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
              Improved employability and career growth opportunities
            </li>
          </ul>

          {/* BLOG STYLE */}
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
            Our Role in Successful BSDM Implementation
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginBottom: 16,
              padding: "24px 28px",
              background: "rgba(45, 90, 123, 0.05)",
              borderLeft: "4px solid #2d5a7b",
              borderRadius: "6px",
            }}
          >
            We ensure end-to-end execution of BSDM projects, starting from
            candidate mobilization and registration to training delivery,
            assessment, and certification. Our structured approach guarantees
            that every trainee receives quality education and career guidance.
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
            Beyond training, we also focus on personality development, workplace
            discipline, and communication skills so that candidates are fully
            prepared to enter professional environments with confidence.
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: 60,
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
              Want to Enroll or Partner with BSDM?
            </h3>
            <p
              style={{
                fontSize: 18,
                color: "#666",
                lineHeight: 1.8,
                marginBottom: 28,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Contact us to learn more about ongoing BSDM programs, eligibility
              criteria, training centers, and partnership opportunities.
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
              Get Started Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BSDM;
