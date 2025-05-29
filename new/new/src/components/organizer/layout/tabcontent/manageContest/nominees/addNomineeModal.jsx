import { useState } from "react";

export default function AddNomineeModal({ onClose, onSubmit }) {
  // export default function AddNomineeModal({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setFormData((prev) => ({ ...prev, imageFile: file }));
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optionally send to backend as FormData if image is involved
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("image", formData.imageFile);

    fetch("/api/nominees", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((newNominee) => {
        onSubmit(newNominee);
        //onClose();
      })
      .catch((err) => {
        console.error("Error uploading nominee:", err);
      });
  };

  //preview image
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 w-full">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700  pe-8">
          Upload Nominee Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full"
        />
      </div>

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="h-32 mt-2 rounded" />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Nominee
      </button>
    </form>
  );
}
