import { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import "./MainWorkspace.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../Modal/Modal";
import CreateModal from "../CreateModal/CreateModal";
import { useSelector, useDispatch } from "react-redux";
import { setWorkspace } from "../../../redux/slices/workspaceSlice";
import { setfolders } from "../../../redux/slices/folderSlice";
import { setForms } from "../../../redux/slices/formSlice";
import apiClient from "../../../../utils/apiClient";
import { deleteFolder } from "../../../redux/slices/folderSlice";
import { deleteForm } from "../../../redux/slices/formSlice";
import DeleteModal from "../DeleteModal/DeleteModal";

function MainWorkspace() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { activeWorkspace, workspace } = useSelector(
    (state) => state.workspace
  );
  const { folders } = useSelector((state) => state.folder);

  const { forms } = useSelector((state) => state.form);

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (userData && activeWorkspace) {
        try {
          const response = await apiClient.get(
            `/workspace/${activeWorkspace?.workspaceId}/get-workspace`
          );
          dispatch(setWorkspace(response?.data?.workspace));
          dispatch(setfolders(response?.data?.folders));
          dispatch(setForms(response?.data?.forms));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchWorkspace();
  }, [activeWorkspace]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [useFor, setUseFor] = useState("");
  const [deleteFor, setDeleteFor] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModal(true);
  const closeDeleteModal = () => setIsDeleteModal(false);

  const handleFolderDelete = (folderId) => {
    const workspaceId = activeWorkspace?.workspaceId;
    dispatch(deleteFolder({ folderId, workspaceId }));
  };

  const handleFormDelete = (formId) => {
    const workspaceId = activeWorkspace?.workspaceId;
    dispatch(deleteForm({ formId, workspaceId }));
  };

  return (
    <div className="main-workspace">
      {!workspace && (
        <p
          className="poppins"
          style={{ fontSize: "30px", color: "var(--text-color)" }}
        >
          Loading...
        </p>
      )}
      {workspace && (
        <>
          <div className="mw-folders open-sans">
            <div
              className="mwf-create"
              onClick={() => {
                setUseFor("folder");
                openModal();
              }}
            >
              <AiOutlineFolderAdd style={{ fontSize: "20px" }} />
              <span>Create a folder</span>
            </div>
            {folders?.length !== 0 &&
              folders.map((folder) => (
                <div className="mwf-folder" key={folder?._id}>
                  <span>{folder?.title}</span>
                  <RiDeleteBin6Line
                    className="mwf-delete"
                    onClick={() => {
                      setDeleteFor("folder");
                      setDeleteId(folder?._id);
                      openDeleteModal();
                    }}
                    title="Delete Folder"
                  />
                </div>
              ))}
          </div>
          <div className="mw-forms open-sans">
            <div
              className="mwf-create-form"
              onClick={() => {
                setUseFor("form");
                openModal();
              }}
            >
              <FaPlus style={{ fontSize: "40px" }} />
              <p>Create a typebot</p>
            </div>
            {forms?.length !== 0 &&
              forms.map((form) => (
                <div className="mwf-form" key={form?._id}>
                  <p>{form?.title}</p>
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
                    onClick={() => {
                      // handleFormDelete(form?._id);

                      setDeleteFor("form");
                      setDeleteId(form?._id)
                      openDeleteModal();
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} center={false}>
        <CreateModal useFor={useFor} setIsModalOpen={setIsModalOpen} />
      </Modal>

      <Modal isOpen={isDeleteModal} onClose={closeDeleteModal} center={false}>
        <DeleteModal deleteFor={deleteFor} setIsDeleteModal = {setIsDeleteModal} deleteId = {deleteId}  />
      </Modal>
    </div>
  );
}

export default MainWorkspace;
