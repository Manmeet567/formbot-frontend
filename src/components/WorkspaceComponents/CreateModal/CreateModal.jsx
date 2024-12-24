import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createForm } from "../../../redux/slices/formSlice";
import { createFolder } from "../../../redux/slices/folderSlice";
import "./CreateModal.css";

function CreateModal({ useFor, setIsModalOpen }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { activeWorkspace } = useSelector((state) => state.workspace);

  const handleCreateFolder = () => {
    if (inputValue.trim() === "") {
      alert("Folder title is required!");
      return;
    }

    const folderData = { title: inputValue };
    dispatch(createFolder({ activeWorkspace: activeWorkspace?.workspaceId, folderData }));
    setInputValue(""); // Clear the input after submission
    setIsModalOpen(false); // Close the modal
  };

  const handleCreateForm = () => {
    if (inputValue.trim() === "") {
      alert("Form title is required!");
      return;
    }

    const formData = { title: inputValue };
    dispatch(createForm({ workspaceId, formData }));
    setInputValue(""); // Clear the input after submission
    setIsModalOpen(false); // Close the modal
  };

  // Handle the form submission based on the `useFor` prop
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
