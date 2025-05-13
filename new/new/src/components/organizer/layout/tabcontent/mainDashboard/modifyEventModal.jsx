import { useState } from "react";

export default function ModifyEventModal({ clickedEvent, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: clickedEvent.name,
    description: clickedEvent.description,
    date: clickedEvent.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send update request to backend
    fetch(`/api/events/${clickedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedEvent) => {
        onSubmit(updatedEvent);
        onClose();
      })
      .catch((err) => console.error("Error updating event:", err));
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Modify Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
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
            Event Description
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
          <label className="block text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
