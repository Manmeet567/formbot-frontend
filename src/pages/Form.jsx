import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormNavbar from "../components/FormComponents/FormNavbar/FormNavbar";
import EditForm from "../components/FormComponents/EditForm/EditForm";
import CheckResponses from "../components/FormComponents/CheckResponses/CheckResponses";
import { getForm, updateFlow } from "../redux/slices/formSlice";
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

  useEffect(() => {
    setFlow(activeForm?.flow);
  }, [activeForm]);

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
    const flowChanged =
      JSON.stringify(flow) !== JSON.stringify(activeForm?.flow);

    if (!flowChanged) {
      toast.error("Flow hasn't changed");
      return;
    }

    console.log("Flow submitted:", flow);
    dispatch(updateFlow({ formId: formId, flow }));
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
          {currentTab === "response" && <CheckResponses />}
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
