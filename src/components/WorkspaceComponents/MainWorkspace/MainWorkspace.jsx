import { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import "./MainWorkspace.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../Modal/Modal";
import CreateModal from "../CreateModal/CreateModal";

function MainWorkspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useFor, setUseFor] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="main-workspace">
      <div className="mw-folders open-sans">
        <div className="mwf-create" onClick={() => {setUseFor("folder"); openModal();}}>
          <AiOutlineFolderAdd style={{ fontSize: "20px" }} />
          <span>Create a folder</span>
        </div>
        <div className="mwf-folder">
          <span>Computer Networks</span>
          <RiDeleteBin6Line className="mwf-delete" />
        </div>
      </div>
      <div className="mw-forms open-sans">
        <div className="mwf-create-form" onClick={() => {setUseFor("form"); openModal();}}>
          <FaPlus style={{ fontSize: "40px" }} />
          <p>Create a typebot</p>
        </div>
        <div className="mwf-form">
          <p>New form</p>
          <RiDeleteBin6Line
            style={{
              fontSize: "24px",
              position: "absolute",
              top: "-10px",
              right: "-10px",
              color: "#f55050",
              cursor: "pointer",
            }}
            title="Delete Form"
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} center={false}>
        <CreateModal useFor={useFor} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}

export default MainWorkspace;
