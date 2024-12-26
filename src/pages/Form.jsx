import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormNavbar from "../components/FormComponents/FormNavbar/FormNavbar";
import EditForm from "../components/FormComponents/EditForm/EditForm";
import Response from "../components/FormComponents/Response/Response";
import { getForm } from "../redux/slices/formSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("flow");
  const [flow, setFlow] = useState([]);
  const { workspaceId, folderId, formId } = useParams();
  const { activeForm, loading, error } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(getForm({ workspaceId, folderId, formId }));
  }, []);

  const handleSubmitFlow = () => {
    if (flow.length === 0) {
      toast.error("Flow is empty!");
      return;
    }

    const missingField = flow.some(
      (item) => item.type === "bubble" && !item.fieldValue
    );

    if (missingField) {
      toast.error("All bubble elements must have a field value!");
      return;
    }

    const hasButtonInput = flow.some((item) => item.field === "Button");

    if (!hasButtonInput) {
      toast.error("Flow must contain at least one button input element!");
      return;
    }

    console.log("Flow submitted:", flow);
  };

  return (
    <div className="form">
      {loading ? (
        <p
          className="inter"
          style={{
            color: "var(--text-color)",
            padding: "40px",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Loading...
        </p>
      ) : !error ? (
        <>
          <FormNavbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onSave={handleSubmitFlow}
          />
          {currentTab === "flow" && <EditForm flow={flow} setFlow={setFlow} />}
          {currentTab === "response" && <Response />}
        </>
      ) : (
        <p
          className="inter"
          style={{
            color: "var(--text-color)",
            padding: "40px",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Form;
