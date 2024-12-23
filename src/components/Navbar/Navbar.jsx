import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./Navbar.css";
import InviteModal from "../InviteModal/InviteModal";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { logout } from "../../redux/slices/authSlice"; // Import the logout action
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // State for controlling dropdown open/close
  const [openWorkspace, setOpenWorkspace] = useState(false);

  const handleLogout = () => {
    setOpenWorkspace(false);
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <nav className="navbar open-sans">
      <div className="nv-left"></div>

      {/* Custom Dropdown */}
      <div className="nv-workspace">
        <div
          className="nv-workspace-header"
          onClick={() => setOpenWorkspace(!openWorkspace)}
          style={
            openWorkspace
              ? {
                  backgroundColor: "var(--nav-select-bg-color)",
                  border: "1px solid var(--nav-border-color)",
                  borderRadius: "6px 6px 0px 0px",
                }
              : {}
          }
        >
          <p>{userData?.name}'s Workspace</p>
          {openWorkspace ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {openWorkspace && (
          <div className="nv-workspace-options">
            <Link to="/settings">
              <div
                style={{ borderBottom: "1px solid var(--nav-border-color)", color:"var(--nav-text-color)" }}
              >
                Settings
              </div>
            </Link>
            <div
              onClick={handleLogout} 
              style={{ color: "#FFA54C" }}
            >
              Logout
            </div>
          </div>
        )}
      </div>

      <div className="nv-right">
        <div className="nv-switch">
          <p>Light</p>
          <ToggleSwitch />
          <p>Dark</p>
        </div>
        <button onClick={openModal}>Share</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} center={true}>
        <InviteModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </nav>
  );
}

export default Navbar;
