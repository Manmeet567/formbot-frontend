import { useEffect, useState } from "react";
import "./CheckResponses.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckResponses({ flow }) {
  const { formId } = useParams();
  const { activeForm, responses } = useSelector((state) => state.form);

  useEffect(() => {
    console.log("responses:", responses);
  }, [responses]);

  return (
    <div className="check-responses open-sans">
      {responses?.length > 0 && (
        <div className="cr-views-bar">
          <div className="crvb">
            <p>Views</p>
            <p>{activeForm?.visitCount}</p>
          </div>
          <div className="crvb">
            <p>Starts</p>
            <p>{responses?.length}</p>
          </div>
        </div>
      )}

      {responses?.length == 0 && (
        <div className="no-responses">
          <p className="inter">No Response yet collected</p>
        </div>
      )}
    </div>
  );
}

export default CheckResponses;
