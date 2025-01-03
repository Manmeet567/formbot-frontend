import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormNavbar from "../components/FormComponents/FormNavbar/FormNavbar";
import EditForm from "../components/FormComponents/EditForm/EditForm";
import CheckResponses from "../components/FormComponents/CheckResponses/CheckResponses";
import { getForm, getResponses, updateFlow } from "../redux/slices/formSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("flow");
  const [flow, setFlow] = useState([]);
  const { workspaceId, folderId, formId } = useParams();
  const { activeForm, loading, error } = useSelector((state) => state.form);
  const [formTitle, setFormTitle] = useState(activeForm?.title || "");

  useEffect(() => {
    dispatch(getForm({ workspaceId, folderId, formId }));
    dispatch(getResponses({ formId }));
  }, []);

  useEffect(() => {
    setFlow(activeForm?.flow);
  }, [activeForm]);

  const handleSubmitFlow = () => {
    if (flow.length === 0) {
      toast.error("Flow is empty!");
      return;
    }

    // Check for missing field value in bubble elements
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
    const titleChanged = formTitle !== activeForm?.title;

    if (!flowChanged && !titleChanged) {
      toast.error("Nothing has changed!");
      return;
    }

    // Prepare update object based on what changed
    const updateData = {};
    if (flowChanged) updateData.flow = flow;
    if (titleChanged) updateData.title = formTitle;

    // Dispatch only if there's an actual change
    if (Object.keys(updateData).length > 0) {
      dispatch(updateFlow({ formId: formId, ...updateData }));
    }
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
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onSave={handleSubmitFlow}
          />
          {currentTab === "flow" && <EditForm flow={flow} setFlow={setFlow} />}
          {currentTab === "response" && <CheckResponses flow={flow} />}
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
