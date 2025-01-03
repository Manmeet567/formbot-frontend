import { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import "./MainWorkspace.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../Modal/Modal";
import CreateModal from "../CreateModal/CreateModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveWorkspace,
  setPermission,
} from "../../../redux/slices/workspaceSlice";
import { setfolders, setActiveFolder } from "../../../redux/slices/folderSlice";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../../utils/apiClient";
import { setForms, setActiveForm } from "../../../redux/slices/formSlice";
import { Link } from "react-router-dom";

function MainWorkspace({ setAccessError }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeWorkspace, permission } = useSelector(
    (state) => state.workspace
  );

  const { folders, activeFolder } = useSelector((state) => state.folder);
  const { forms } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(setActiveFolder(null));
    dispatch(setActiveForm(null));
  }, []);

  const { workspaceId } = useParams();
  useEffect(() => {
    const fetchSingleWorkspace = async () => {
      try {
        const response = await apiClient.get(
          `/workspace/${workspaceId}/get-workspace`
        );
        dispatch(setActiveWorkspace(response?.data?.workspace));
        dispatch(setPermission(response?.data?.workspace?.permission));
        dispatch(setfolders(response?.data?.folders));
        dispatch(setForms(response?.data?.forms));
        return;
      } catch (error) {
        console.log(error);
        setAccessError(error?.response?.data?.error);
      }
    };

    if (!activeWorkspace || activeWorkspace._id !== workspaceId) {
      fetchSingleWorkspace();
    }
  }, [workspaceId, activeWorkspace, dispatch]);

  const filteredForms = activeFolder
    ? forms
    : forms?.filter(
        (form) => !form.folderId && form.workspaceId === activeWorkspace?._id
      );

  const handleFolderClick = (folder) => {
    dispatch(setActiveFolder(folder));
    navigate(`/folder/${workspaceId}/${folder._id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [useFor, setUseFor] = useState("");
  const [deleteFor, setDeleteFor] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModal(true);
  const closeDeleteModal = () => setIsDeleteModal(false);

  return (
    <div className="main-workspace">
      {!activeWorkspace && (
        <p
          className="poppins"
          style={{ fontSize: "30px", color: "var(--text-color)" }}
        >
          Loading...
        </p>
      )}
      {activeWorkspace && (
        <>
          <div className="mw-folders open-sans">
            {activeWorkspace && permission === "edit" && (
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
            )}
            {folders?.length !== 0 &&
              folders.map((folder) => (
                <div
                  className={`mwf-folder ${
                    activeFolder?._id === folder._id ? "activeFolder" : ""
                  }`}
                  key={folder._id}
                  onClick={() => handleFolderClick(folder)}
                >
                  <span>{folder?.title}</span>
                  {activeWorkspace && permission === "edit" && (
                    <RiDeleteBin6Line
                      className="mwf-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteFor("folder");
                        setDeleteId(folder?._id);
                        openDeleteModal();
                      }}
                      title="Delete Folder"
                    />
                  )}
                </div>
              ))}
          </div>

          <div className="mw-forms open-sans">
            {activeWorkspace && permission === "edit" && (
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
            )}

            {filteredForms?.length !== 0 &&
              filteredForms.map((form) => (
                <Link to={`/form/${workspaceId}/${form?._id}`} key={form._id}>
                  <div className="mwf-form">
                    <p>{form?.title}</p>
                    {activeWorkspace && permission === "edit" && (
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
                          setDeleteFor("form");
                          setDeleteId(form?._id);
                          openDeleteModal();
                        }}
                      />
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} center={false}>
        <CreateModal useFor={useFor} setIsModalOpen={setIsModalOpen} />
      </Modal>

      <Modal isOpen={isDeleteModal} onClose={closeDeleteModal} center={false}>
        <DeleteModal
          deleteFor={deleteFor}
          setIsDeleteModal={setIsDeleteModal}
          deleteId={deleteId}
        />
      </Modal>
    </div>
  );
}

export default MainWorkspace;
