import React, { useState } from "react";
import "./InviteModal.css";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addSharedUser } from "../../redux/slices/workspaceSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function InviteModal({ setIsModalOpen }) {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();

  // State to track email and permission
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view"); // default permission is "view"

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    try {
      dispatch(addSharedUser({ workspaceId, email, permission }));
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to send invite. Please try again.");
      console.log(error)
    }
  };

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
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)} 
        >
          <option value="edit">Edit</option>
          <option value="view">View</option>
        </select>
      </div>
      <div className="im-fields">
        <input
          type="email"
          placeholder="Enter email id"
          className="open-sans"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <button className="im-btn poppins" onClick={handleSubmit}>
          Send Invite
        </button>
        <p className="im-text open-sans">Invite by link</p>
        <button className="im-btn poppins">Copy link</button>
      </div>
    </div>
  );
}

export default InviteModal;
