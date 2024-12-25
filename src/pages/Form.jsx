import React, { useState } from "react";
import { toast } from "react-toastify";
import FormNavbar from "../components/FormComponents/FormNavbar/FormNavbar";
import EditForm from "../components/FormComponents/EditForm/EditForm";
import Response from "../components/FormComponents/Response/Response";

function Form() {
  const [currentTab, setCurrentTab] = useState("flow");
  const [flow, setFlow] = useState([]);

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
      <FormNavbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSave={handleSubmitFlow} // Pass the function to the Navbar
      />
      {currentTab === "flow" && <EditForm flow={flow} setFlow={setFlow} />}
      {currentTab === "response" && <Response />}
    </div>
  );
}

export default Form;
