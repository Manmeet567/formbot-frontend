import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MainWorkspace from "../components/WorkspaceComponents/MainWorkspace/MainWorkspace";

function Workspace() {
  const [accessError, setAccessError] = useState(null);

  return (
    <div className="workspace">
      {!accessError && (
        <>
          <Navbar />
          <MainWorkspace setAccessError={setAccessError} />
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

export default Workspace;
