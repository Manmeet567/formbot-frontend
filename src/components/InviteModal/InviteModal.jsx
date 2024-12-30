import React, { useState } from "react";
import "./InviteModal.css";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addSharedUser } from "../../redux/slices/workspaceSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

function InviteModal({ setIsModalOpen }) {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const [inviteLoading, setInviteLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");

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
      console.log(error);
    }
  };

  const handleCopyLink = async () => {
    try {
      setInviteLoading(true);
      const response = await apiClient.post(
        `/workspace/${workspaceId}/generate-invite`,
        { permission }
      );
      setInviteLoading(false);
      const inviteToken = response.data.token;

      const inviteLink = `${
        import.meta.env.VITE_CLIENT_BASE_URL
      }/share-workspace/${inviteToken}`;

      navigator.clipboard
        .writeText(inviteLink)
        .then(() => {
          toast.success("Invite link copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy link. Please try again.");
          console.error("Error copying invite link: ", err);
        });
    } catch (err) {
      setInviteLoading(false);
      toast.error("Failed to generate invite link.");
      console.error("Error generating invite link:", err);
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="im-btn poppins" onClick={handleSubmit}>
          Send Invite
        </button>
        <p className="im-text open-sans">Invite by link</p>
        <button
          className="im-btn poppins"
          disabled={inviteLoading ? true : false}
          onClick={handleCopyLink}
        >
          {inviteLoading ? "Generating Link..." : "Copy link"}
        </button>
      </div>
    </div>
  );
}

export default InviteModal;
