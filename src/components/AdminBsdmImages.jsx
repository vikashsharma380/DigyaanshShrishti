import { useState } from "react";

export default function AdminBsdmImages() {
  const [heroImage, setHeroImage] = useState(null);
  const [sectionImage, setSectionImage] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    if (heroImage) formData.append("heroImage", heroImage);
    if (sectionImage) formData.append("sectionImage", sectionImage);

    await fetch("/api/bsdm/update", {
      method: "PUT",
      body: formData,
    });

    alert("Images Updated Successfully");
  };

  return (
    <div>
      <h2>Update BSDM Images</h2>

      <input type="file" onChange={(e) => setHeroImage(e.target.files[0])} />
      <br />

      <input type="file" onChange={(e) => setSectionImage(e.target.files[0])} />
      <br />

      <button onClick={submit}>Upload</button>
    </div>
  );
}
