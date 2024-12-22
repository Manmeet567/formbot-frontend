import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import "./Navbar.css";
import InviteModal from "../InviteModal/InviteModal";
import Modal from '../Modal/Modal';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="navbar open-sans">
      <div className="nv-left"></div>
      <div className="nv-workspace">
        <p>Hiro's Workspace</p>
      </div>
      <div className="nv-right">
        <div className="nv-switch">
          <p>Light</p>
          <ToggleSwitch />
          <p>Dark</p>
        </div>
        <button onClick={() => openModal()}>Share</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} center={true}>
        <InviteModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </nav>
  );
}

export default Navbar;
