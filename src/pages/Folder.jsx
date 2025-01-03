import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MainFolder from "../components/WorkspaceComponents/MainWorkspace/MainFolder";

function Folder() {
  const [accessError, setAccessError] = useState(null);
  return (
    <div className="folder">
      {!accessError && (
        <>
          <Navbar />
          <MainFolder setAccessError={setAccessError} />
        </>
      )}
      {accessError && (
        <p
          className="inter"
          style={{
            color: "var(--text-color)",
            padding: "40px",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          {accessError}
        </p>
      )}
    </div>
  );
}

export default Folder;
