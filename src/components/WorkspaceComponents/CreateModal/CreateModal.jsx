import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createForm } from "../../../redux/slices/formSlice";
import { createFolder } from "../../../redux/slices/folderSlice";
import { useParams } from "react-router-dom";
import "./CreateModal.css";

function CreateModal({ useFor, setIsModalOpen }) {
  const [inputValue, setInputValue] = useState(""); // For both folder and form input
  const dispatch = useDispatch();
  const { workspaceId } = useParams(); // Assuming you have workspaceId in the URL

  // Handle folder creation
  const handleCreateFolder = () => {
    if (inputValue.trim() === "") {
      alert("Folder title is required!");
      return;
    }

    const folderData = { title: inputValue };
    dispatch(createFolder({ workspaceId, folderData }));
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
