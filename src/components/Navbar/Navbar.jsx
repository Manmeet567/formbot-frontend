import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./Navbar.css";
import InviteModal from "../InviteModal/InviteModal";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { logout } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom"; // added useNavigate to handle navigation

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For programmatic navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const {activeWorkspace} = useSelector((state) => state.workspace);
  const [openWorkspace, setOpenWorkspace] = useState(false);
  const [activeName, setActiveName] = useState(null); 

  useEffect(() => {
    console.log("UserData: ", userData);
    console.log("Active Workspace:", activeWorkspace)
    setActiveName(activeWorkspace?.ownerName);

  }, [activeWorkspace]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    setOpenWorkspace(false);
    dispatch(logout());
  };

  const filteredWorkspaces =
    userData?.workspaceAccess?.filter(
      (workspace) => activeWorkspace?._id !== workspace?._id
    ) || [];

  const handleWorkspaceClick = (workspace) => {
    
    setOpenWorkspace(false);
    navigate(`/workspace/${workspace._id}`); 
  };

  return (
    <nav className="navbar open-sans">
      <div className="nv-left"></div>

      {/* Custom Dropdown */}
      <div className="nv-workspace">
        <div
          className="nv-workspace-header"
          onClick={() => {
            if (activeWorkspace) {
              setOpenWorkspace(!openWorkspace);
            }
          }}
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
          <p>{activeWorkspace ? `${activeName}'s Workspace` : "Loading..."}</p>
          {openWorkspace ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {openWorkspace && (
          <div className="nv-workspace-options">
            {filteredWorkspaces?.map((workspace) => (
              <div
                key={workspace?._id}
                style={{
                  borderBottom: "1px solid var(--nav-border-color)",
                  color: "var(--nav-text-color)",
                  cursor: "pointer",
                }}
                onClick={() => handleWorkspaceClick(workspace)} // Handle click
              >
                <p style={{ color: "var(--nav-text-color)" }}>
                  {workspace?.ownerName
                    ? `${workspace?.ownerName}'s Workspace`
                    : "Loading..."}
                </p>
              </div>
            ))}
            <Link to="/settings">
              <div
                style={{
                  borderBottom: "1px solid var(--nav-border-color)",
                  color: "var(--nav-text-color)",
                }}
              >
                Settings
              </div>
            </Link>
            <div onClick={handleLogout} style={{ color: "#FFA54C" }}>
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
