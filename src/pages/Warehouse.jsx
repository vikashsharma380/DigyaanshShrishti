import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fallbackImages = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
];

const Warehouse = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState(fallbackImages);

  useEffect(() => {
    fetch("https://api.digyaanshshrishti.com/api/page-images/warehouse")
      .then((res) => res.json())
      .then((data) => {
        const remote = data?.images || [];
        if (remote.length > 0) {
          setImages(remote);
        }
      })
      .catch(() => {});
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
            Warehouse Operations Services
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
            We deliver reliable{" "}
            <strong style={{ color: "#2d5a7b", fontWeight: 600 }}>
              warehouse operations and logistics support
            </strong>{" "}
            to keep inventory flow smooth and accurate.
          </p>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              color: "#555",
              marginBottom: 32,
            }}
          >
            Our trained teams handle storage, loading-unloading, segregation,
            and facility upkeep with clear SOPs and safety compliance.
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
                    alt="Warehouse Services"
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
            Our Warehouse Solutions Include
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
            <li style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}>
              <span
                style={{
                  position: "absolute",
                  left: -22,
                  color: "#2d5a7b",
                  fontWeight: "bold",
                }}
              >
                &bull;
              </span>
              Inventory handling and stock movement
            </li>
            <li style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}>
              <span
                style={{
                  position: "absolute",
                  left: -22,
                  color: "#2d5a7b",
                  fontWeight: "bold",
                }}
              >
                &bull;
              </span>
              Loading, unloading, and material segregation
            </li>
            <li style={{ marginBottom: 12, position: "relative", paddingLeft: 12 }}>
              <span
                style={{
                  position: "absolute",
                  left: -22,
                  color: "#2d5a7b",
                  fontWeight: "bold",
                }}
              >
                &bull;
              </span>
              Storage, racking, and aisle upkeep
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
                &bull;
              </span>
              Safety compliance and process supervision
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Warehouse;
