import React from 'react'
import './CreateModal.css';

function CreateModal({useFor, setIsModalOpen}) {
  return (
    <div className='create-modal open-sans'>
        <p>Create New {useFor === "form" ? "Form" : "Folder"}</p>
        <input type="text" placeholder={`Enter ${useFor === "form" ? "form" : "folder"} name`} />
        <div className="cm-btns">
            <span>Done</span>
            <span onClick={() => setIsModalOpen(false)}>Cancel</span>
        </div>
    </div>
  )
}

export default CreateModal