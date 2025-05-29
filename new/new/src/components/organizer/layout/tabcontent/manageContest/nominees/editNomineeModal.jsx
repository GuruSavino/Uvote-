import { useState } from "react";
import NomineeSelectList from "./nomineeSelectList";

export default function EditNomineeModal({ onClose, nominees, refresh }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});

  const handleEdit = () => {
    fetch(`/api/nominees/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      refresh();
      onClose();
    });
  };

  return (
    <div className="w-full p-8 h-auto">
      {!selected ? (
        <NomineeSelectList nominees={nominees} onSelect={setSelected} />
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Edit {selected.name}</h3>
          <input
            type="text"
            placeholder="Name"
            defaultValue={selected.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-2 border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Code"
            defaultValue={selected.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full mb-2 border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Image URL"
            defaultValue={selected.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full mb-4 border p-2 rounded"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
