import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createForm } from "../../../redux/slices/formSlice";
import { createFolder } from "../../../redux/slices/folderSlice";
import "./CreateModal.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CreateModal({ useFor, setIsModalOpen }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { workspaceId, folderId } = useParams();

  const handleCreateFolder = () => {
    if (inputValue.trim() === "") {
      toast.error("Folder title is required!");
      return;
    }

    const folderData = { title: inputValue };
    dispatch(
      createFolder({
        workspaceId,
        folderData,
      })
    );
    setInputValue("");
    setIsModalOpen(false);
  };

  const handleCreateForm = () => {
    if (inputValue.trim() === "") {
      toast.error("Form title is required!");
      return;
    }

    const formData = { title: inputValue };
    dispatch(
      createForm({
        workspaceId,
        folderId,
        formData,
      })
    );
    setInputValue("");
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (useFor === "folder") {
      handleCreateFolder();
    } else if (useFor === "form") {
      handleCreateForm();
    } else {
      console.log("Invalid useFor value");
    }
  };

  return (
    <div className="create-modal open-sans">
      <p>Create New {useFor === "form" ? "Form" : "Folder"}</p>
      <input
        type="text"
        placeholder={`Enter ${useFor === "form" ? "form" : "folder"} name`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update input value
      />
      <div className="cm-btns">
        <span onClick={handleSubmit}>Done</span>
        <span onClick={() => setIsModalOpen(false)}>Cancel</span>
      </div>
    </div>
  );
}

export default CreateModal;
