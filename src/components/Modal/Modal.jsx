import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, center, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal closes
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" style={center ? {alignItems:"center"} : {}} onClick={handleOutsideClick}>
      {children}
    </div>,
    document.getElementById("modal-root") // Render the modal into a designated div in index.html
  );
};

export default Modal;
