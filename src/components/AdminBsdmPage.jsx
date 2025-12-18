import { useEffect, useState } from "react";

const AdminBsdmPage = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [sectionImage, setSectionImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({});

  useEffect(() => {
    fetch("/api/bsdm")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPreview({
            heroImage: data.heroImage,
            sectionImage: data.sectionImage,
          });
        }
      });
  }, []);

  const uploadImages = async () => {
    if (!heroImage && !sectionImage) {
      alert("Please select at least one image");
      return;
    }

    const formData = new FormData();
    if (heroImage) formData.append("heroImage", heroImage);
    if (sectionImage) formData.append("sectionImage", sectionImage);

    setLoading(true);

    try {
      const res = await fetch("/api/bsdm/update", {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert("BSDM Images Updated Successfully");
        setPreview(result.page);
        setHeroImage(null);
        setSectionImage(null);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 900 }}>
      <h2 style={{ fontSize: 28, marginBottom: 30 }}>
        BSDM Page Image Management
      </h2>

      {/* HERO IMAGE */}
      <div style={{ marginBottom: 30 }}>
        <h4>Hero Image</h4>

        {preview.heroImage && (
          <img
            src={preview.heroImage}
            alt="Hero Preview"
            style={{
              width: "100%",
              maxHeight: 250,
              objectFit: "cover",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setHeroImage(e.target.files[0])}
        />
      </div>

      {/* SECTION IMAGE */}
      <div style={{ marginBottom: 30 }}>
        <h4>Section Image</h4>

        {preview.sectionImage && (
          <img
            src={preview.sectionImage}
            alt="Section Preview"
            style={{
              width: "100%",
              maxHeight: 250,
              objectFit: "cover",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSectionImage(e.target.files[0])}
        />
      </div>

      <button
        onClick={uploadImages}
        disabled={loading}
        style={{
          padding: "14px 30px",
          fontSize: 16,
          background: "linear-gradient(135deg,#2d5a7b,#1e3f52)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminBsdmPage;
