import React from "react";
import "./InviteModal.css";
import { IoCloseSharp } from "react-icons/io5";

function InviteModal({ setIsModalOpen }) {
  return (
    <div className="invite-modal">
      <IoCloseSharp
        style={{
          fontSize: "25px",
          color: "#F55050",
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(false)}
      />
      <div className="im-header open-sans">
        <p className="im-text">Invite by Email</p>
        <select>
          <option value="edit">Edit</option>
          <option value="view">View</option>
        </select>
      </div>
      <div className="im-fields">
        <input
          type="email"
          placeholder="Enter email id"
          className="open-sans"
        />
        <button className="im-btn poppins">Send Invite</button>
        <p className="im-text open-sans">Invite by link</p>
        <button className="im-btn poppins">Copy link</button>
      </div>
    </div>
  );
}

export default InviteModal;
