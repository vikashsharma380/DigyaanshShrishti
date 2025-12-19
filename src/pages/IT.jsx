import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const IT = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/page-images/it")
      .then((res) => res.json())
      .then((data) => setImages(data.images || []));
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
          padding: "110px 20px",
          background: "linear-gradient(135deg, #f8f6ff 0%, #f0ebff 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "auto" }}>
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
            }}
          >
            From software development to system maintenance, our IT solutions
            are tailored to meet real operational needs.
          </p>

          {/* IMAGE SLIDER */}
          <div
            style={{
              margin: "50px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 780,
                borderRadius: 18,
                boxShadow: "0 16px 40px rgba(45, 90, 123, 0.25)",
                border: "1px solid rgba(45, 90, 123, 0.1)",
                overflow: "hidden",
                height: 400,
              }}
            >
              {images.length > 0 &&
                images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="IT Services"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: idx === current ? 1 : 0,
                      transition: "opacity 0.6s ease-in-out",
                    }}
                  />
                ))}
            </div>
          </div>

          <h2
            style={{
              marginTop: 60,
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
              Custom software & web application development
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
              Networking & infrastructure setup
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
              System administration & technical support
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
              marginTop: 32,
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
};

export default IT;
