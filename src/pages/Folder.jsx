import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import MainFolder from '../components/WorkspaceComponents/MainWorkspace/MainFolder'

function Folder() {
  return (
    <div className='folder'>
        <Navbar />
        <MainFolder />
    </div>
  )
}

export default Folder