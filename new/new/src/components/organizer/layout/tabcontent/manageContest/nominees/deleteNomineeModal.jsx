import { useState } from "react";
import NomineeSelectList from "./nomineeSelectList";

export default function DeleteNomineeModal({ onClose, nominees, refresh }) {
  const [selected, setSelected] = useState(null);

  const handleDelete = () => {
    fetch(`/api/nominees/${selected.id}`, { method: "DELETE" }).then(() => {
      refresh();
      onClose();
    });
  };

  return (
    <div className="w-full h-auto p-8">
      {!selected ? (
        <NomineeSelectList nominees={nominees} onSelect={setSelected} />
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
          <p>
            Are you sure you want to delete <strong>{selected.name}</strong>?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="text-gray-600">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
