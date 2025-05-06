import { useState } from "react";

// export default function AddNomineeModal({ onClose, onAdd }) {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newNominee = {
//       id: Date.now(), // temp unique ID
//       name: form.name,
//       description: form.description,
//       image: form.image,
//       code: "GD" + Math.floor(Math.random() * 100000), // simple code generator
//       votes: 0,
//     };

//     onAdd(newNominee);
//     onClose();
//   };

//   return (
//     <div className="p-4">
//       <h3 className="text-xl font-semibold mb-4">Add New Nominee</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="image"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Nominee
//         </button>
//       </form>
//     </div>
//   );
// }

export default function AddNomineeModal({ onClose, onSubmit }) {
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
        onClose();
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
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
