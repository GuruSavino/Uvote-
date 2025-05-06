export default function ModalWrapper({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
