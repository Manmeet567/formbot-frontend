import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createForm, createFolder } from '../redux/slices/workspaceSlice';  // Update the import path based on your project structure

function Workspace() {
  const dispatch = useDispatch();

  // State to hold folder and form input data
  const [folderTitle, setFolderTitle] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');

  // Handle folder creation
  const handleCreateFolder = () => {
    if (folderTitle.trim() === '') {
      alert('Folder title is required!');
      return;
    }

    const folderData = { title: folderTitle }; // Add more folder fields as necessary
    dispatch(createFolder({ workspaceId, folderData }));
    setFolderTitle(''); // Reset input field
  };

  // Handle form creation
  const handleCreateForm = () => {
    if (formTitle.trim() === '') {
      alert('Form title is required!');
      return;
    }

    const formData = { title: formTitle };  // Add more form fields as necessary
    dispatch(createForm({ workspaceId, formData }));
    setFormTitle(''); // Reset input field
  };

  return (
    <div className='workspace'>
      <h2>Workspace</h2>
      
      {/* Folder creation */}
      <div>
        <input
          type="text"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
          placeholder="Enter folder title"
        />
        <button onClick={handleCreateFolder}>Add Folder</button>
      </div>

      {/* Form creation */}
      <div>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Enter form title"
        />
        <button onClick={handleCreateForm}>Add Form</button>
      </div>
    </div>
  );
}

export default Workspace;
