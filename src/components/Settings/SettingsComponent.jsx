import React, { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/authSlice";
import "./SettingsComponent.css";
import { logout } from "../../redux/slices/authSlice";
import { updateOwnerName } from "../../redux/slices/workspaceSlice";

function SettingsComponent() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isOldPasswordVisible, setOldPasswordVisibility] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisibility] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !email && (!oldPassword || !newPassword)) {
      toast.error("At least one field must be updated.");
      return;
    }

    if (userData?.name === name) {
      toast.error(`${name} is already your username!`);
      return;
    }

    if (userData?.email === email) {
      toast.error(`${email} is already your email for this account!`);
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      toast.error("Both old and new passwords must be filled to update.");
      return;
    }
    const updatedData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(oldPassword && newPassword && { oldPassword, newPassword }),
    };

    dispatch(updateUser(updatedData));
    dispatch(updateOwnerName({ userId: userData?._id, userName: name }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="settings">
      <p className="open-sans">Settings</p>
      <form onSubmit={handleSubmit} className="open-sans">
        <div className="s-field">
          <CiUser className="sf-first-icon" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="s-field">
          <CiMail className="sf-first-icon" />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="s-field">
          <CiLock className="sf-first-icon" />
          <input
            type={isOldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {isOldPasswordVisible ? (
            <IoEyeOffOutline onClick={() => setOldPasswordVisibility(false)} />
          ) : (
            <IoEyeOutline onClick={() => setOldPasswordVisibility(true)} />
          )}
        </div>
        <div className="s-field">
          <CiLock className="sf-first-icon" />
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {isNewPasswordVisible ? (
            <IoEyeOffOutline onClick={() => setNewPasswordVisibility(false)} />
          ) : (
            <IoEyeOutline onClick={() => setNewPasswordVisibility(true)} />
          )}
        </div>
        <button type="submit">Update</button>
      </form>

      <div className="settings-logout poppins" onClick={handleLogout}>
        <MdLogout style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Log out</span>
      </div>
    </div>
  );
}

export default SettingsComponent;
