import React, { useEffect, useState } from "react";

const ModalWrapper = ({ onClose, children }) => {
  const [visible, setVisible] = useState(false);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 200); // match the fade-out duration
  };

  useEffect(() => {
    setVisible(true); // Trigger fade-in on mount
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`w-1/2 transform transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
