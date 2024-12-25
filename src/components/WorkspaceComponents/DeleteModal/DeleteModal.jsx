import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder } from "../../../redux/slices/folderSlice";
import { deleteForm } from "../../../redux/slices/formSlice";

function DeleteModal({ deleteFor, setIsDeleteModal, deleteId }) {
  const dispatch = useDispatch();
  const { activeWorkspace } = useSelector((state) => state.workspace);

  const handleFolderDelete = (folderId) => {
    const workspaceId = activeWorkspace?.workspaceId;
    dispatch(deleteFolder({ folderId, workspaceId }));
    setIsDeleteModal(false);
  };

  const handleFormDelete = (formId) => {
    const workspaceId = activeWorkspace?.workspaceId;
    dispatch(deleteForm({ formId, workspaceId }));
    setIsDeleteModal(false);
  };

  const handleSubmit = () => {
    if (deleteFor === "folder") {
      handleFolderDelete(deleteId);
    } else if (deleteFor === "form") {
      handleFormDelete(deleteId);
    } else {
      console.log("Invalid value");
    }
  };
  return (
    <div className="create-modal open-sans">
      <p style={{ textAlign: "center" }}>
        Are you sure you want to delete this{" "}
        {deleteFor === "folder" ? "folder" : "form"} ?
      </p>
      <div className="cm-btns">
        <span onClick={handleSubmit}>Confirm</span>
        <span onClick={() => setIsDeleteModal(false)}>Cancel</span>
      </div>
    </div>
  );
}

export default DeleteModal;
